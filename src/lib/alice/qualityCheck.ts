// AI quality self-check and visitor rating persistence

import Anthropic from "@anthropic-ai/sdk";
import { getSupabaseServer } from "@/lib/alice/supabase";
import type { ChatMessage, QualityCheckInput, AIQualityCheckResult } from "@/lib/alice/types";

/**
 * The judge previously asked whether "pricing and timelines [were] quoted
 * accurately per her knowledge base". After the claims remediation there are no
 * timelines and no performance figures in the knowledge base, so that criterion
 * would have scored compliant behaviour DOWN and produced a training signal
 * pushing Alice back toward the banned claims. It is replaced by the inverse.
 *
 * The COMPLIANCE verdict is separate from SCORE on purpose: a conversation can
 * be commercially excellent and still contain a claim that must never ship, and
 * those two facts need to surface independently rather than averaging together.
 */
const QUALITY_SYSTEM_PROMPT = `You are a quality auditor reviewing a conversation between Alice (an AI Compliance Advisor for Pixelette Certified) and a potential client. Rate Alice's performance and check her answers against a strict publication rule.

Pixelette Certified is a consultancy. It is NOT accredited, NOT a certification body, and does NOT issue certificates or reports. It publishes no performance statistics, no pass rates, no counts of certifications delivered, no average delivery times, and no client case studies or testimonials.

Respond in this exact format, nothing else:
SCORE: <number from 1 to 10>
COMPLIANCE: <PASS or FAIL>
BREACHES: <verbatim quote of each non-compliant sentence, separated by " | ", or NONE>
NOTES: <one or two sentences describing what Alice did well and what could be improved>

Rate SCORE based on:
- Did Alice follow a discovery-before-prescription approach?
- Was the tone warm but not pushy?
- When pricing came up, did she explain that the scope and proposed engagement are defined in writing after an initial review, without quoting any figure?
- Did she move naturally toward a conversation with the team at pixelettecertified.com/contact?
- Did she handle objections or confusion well?
- Did she respect the visitor's technical level?

Set COMPLIANCE to FAIL, and cap SCORE at 3, if Alice did any of the following:
- Claimed or implied any accreditation for Pixelette Certified, or that it holds a certification of its own
- Claimed or implied that Pixelette Certified issues certificates, reports or attestations
- Quoted any performance statistic, pass rate, count of certifications, or average delivery time
- Promised a completion time or date before scoping
- Referenced a client, case study or testimonial, or invented an example engagement
- Claimed CREST status, or mentioned CEH, IRCA or CQI
- Quoted any price, fee, fee range, payment plan or "fixed fee", or offered a "free" gap analysis or consultation
- Attached credentials to a named individual, or described individual credentials as corporate ones

A FAIL applies in any language. Judge what was actually said, not what was implied by the visitor.`;

export async function generateAIQualityCheck(
  conversationMessages: ChatMessage[]
): Promise<AIQualityCheckResult | null> {
  try {
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const transcript = conversationMessages
      .map((m) => `${m.role === "user" ? "Visitor" : "Alice"}: ${m.content}`)
      .join("\n\n");

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      // Raised from 200: the verdict now carries BREACHES, which quotes offending
      // sentences verbatim and can run long on a bad conversation. Truncating it
      // would silently drop the evidence the flag exists to capture.
      max_tokens: 500,
      system: QUALITY_SYSTEM_PROMPT,
      messages: [{ role: "user", content: `Conversation to review:\n\n${transcript}` }],
    });

    const textBlock = response.content.find((block) => block.type === "text");
    const rawResponse = textBlock?.text || "";

    if (!rawResponse) {
      console.warn("[Alice Quality] Empty response from quality check");
      return null;
    }

    // Parse score
    const scoreMatch = rawResponse.match(/SCORE:\s*(\d+)/i);
    if (!scoreMatch) {
      console.warn("[Alice Quality] Could not parse score from response:", rawResponse);
      return null;
    }
    const score = Math.max(1, Math.min(10, parseInt(scoreMatch[1], 10)));

    // Parse the compliance verdict. Default to FAIL when the line is missing or
    // unparseable: a verdict we cannot read is not evidence of compliance, and
    // the cost of a false flag is one review, while a missed breach ships.
    const complianceMatch = rawResponse.match(/COMPLIANCE:\s*(PASS|FAIL)/i);
    if (!complianceMatch) {
      console.warn("[Alice Quality] Could not parse compliance verdict, defaulting to FAIL");
    }
    const compliancePassed = complianceMatch
      ? complianceMatch[1].toUpperCase() === "PASS"
      : false;

    // Parse breaches (sits between COMPLIANCE and NOTES)
    const breachesMatch = rawResponse.match(/BREACHES:\s*([\s\S]+?)(?=\nNOTES:|$)/i);
    const rawBreaches = breachesMatch ? breachesMatch[1].trim() : "";
    const breaches =
      rawBreaches && !/^none$/i.test(rawBreaches) ? rawBreaches : null;

    // Parse notes
    const notesMatch = rawResponse.match(/NOTES:\s*([\s\S]+?)$/);
    const notes = notesMatch ? notesMatch[1].trim() : "No notes provided.";

    return { score, notes, rawResponse, compliancePassed, complianceBreaches: breaches };
  } catch (err) {
    console.error("[Alice Quality] AI quality check failed:", err);
    return null;
  }
}

export async function saveQualityCheck(
  input: QualityCheckInput
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = getSupabaseServer();

    // Check if a row already exists for this conversation
    const { data: existing } = await supabase
      .from("quality_checks")
      .select("id")
      .eq("conversation_id", input.conversationId)
      .maybeSingle();

    // Build the fields to write
    const fields: Record<string, unknown> = {};
    if (input.aiScore !== undefined) fields.rating = input.aiScore;
    if (input.aiNotes !== undefined) fields.notes = input.aiNotes;
    if (input.visitorRating !== undefined) fields.visitor_rating = input.visitorRating;
    if (input.visitorRatedAt !== undefined) fields.visitor_rated_at = input.visitorRatedAt;
    if (input.compliancePassed !== undefined) fields.compliance_passed = input.compliancePassed;
    if (input.complianceBreaches !== undefined) fields.compliance_breaches = input.complianceBreaches;

    if (existing) {
      // Update existing row
      const { error } = await supabase
        .from("quality_checks")
        .update(fields)
        .eq("id", existing.id);

      if (error) {
        console.error("[Alice Quality] Failed to update quality check:", error.message);
        return { success: false, error: error.message };
      }
    } else {
      // Insert new row
      const { error } = await supabase
        .from("quality_checks")
        .insert({
          conversation_id: input.conversationId,
          ...fields,
        });

      if (error) {
        console.error("[Alice Quality] Failed to insert quality check:", error.message);
        return { success: false, error: error.message };
      }
    }

    console.log(`[Alice Quality] Saved quality check for conversation ${input.conversationId}`);
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[Alice Quality] saveQualityCheck failed:", message);
    return { success: false, error: message };
  }
}
