// AI quality self-check and visitor rating persistence

import Anthropic from "@anthropic-ai/sdk";
import { getSupabaseServer } from "@/lib/clara/supabase";
import type { ChatMessage, QualityCheckInput, AIQualityCheckResult } from "@/lib/clara/types";

const QUALITY_SYSTEM_PROMPT = `You are a quality auditor reviewing a conversation between Clara (an AI Accreditation Advisor for Pixelette Certified) and a potential client. Your job is to rate Clara's performance on a scale of 1 to 10 and note any issues or missed opportunities.

Respond in this exact format, nothing else:
SCORE: <number from 1 to 10>
NOTES: <one or two sentences describing what Clara did well and what could be improved>

Rate based on:
- Did Clara follow discovery-before-prescription approach?
- Was the tone warm but not pushy?
- Were pricing and timelines quoted accurately per her knowledge base?
- Did she move toward the gap analysis call naturally?
- Did she handle objections or confusion well?
- Did she respect the visitor's technical level?`;

export async function generateAIQualityCheck(
  conversationMessages: ChatMessage[]
): Promise<AIQualityCheckResult | null> {
  try {
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const transcript = conversationMessages
      .map((m) => `${m.role === "user" ? "Visitor" : "Clara"}: ${m.content}`)
      .join("\n\n");

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 200,
      system: QUALITY_SYSTEM_PROMPT,
      messages: [{ role: "user", content: `Conversation to review:\n\n${transcript}` }],
    });

    const textBlock = response.content.find((block) => block.type === "text");
    const rawResponse = textBlock?.text || "";

    if (!rawResponse) {
      console.warn("[Clara Quality] Empty response from quality check");
      return null;
    }

    // Parse score
    const scoreMatch = rawResponse.match(/SCORE:\s*(\d+)/i);
    if (!scoreMatch) {
      console.warn("[Clara Quality] Could not parse score from response:", rawResponse);
      return null;
    }
    const score = Math.max(1, Math.min(10, parseInt(scoreMatch[1], 10)));

    // Parse notes
    const notesMatch = rawResponse.match(/NOTES:\s*([\s\S]+?)$/);
    const notes = notesMatch ? notesMatch[1].trim() : "No notes provided.";

    return { score, notes, rawResponse };
  } catch (err) {
    console.error("[Clara Quality] AI quality check failed:", err);
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

    if (existing) {
      // Update existing row
      const { error } = await supabase
        .from("quality_checks")
        .update(fields)
        .eq("id", existing.id);

      if (error) {
        console.error("[Clara Quality] Failed to update quality check:", error.message);
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
        console.error("[Clara Quality] Failed to insert quality check:", error.message);
        return { success: false, error: error.message };
      }
    }

    console.log(`[Clara Quality] Saved quality check for conversation ${input.conversationId}`);
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[Clara Quality] saveQualityCheck failed:", message);
    return { success: false, error: message };
  }
}
