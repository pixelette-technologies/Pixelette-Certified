// Notification handlers - admin email alerts for qualified leads

import { Resend } from "resend";
import Anthropic from "@anthropic-ai/sdk";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_ADDRESS = "Clara <clara@pixelettecertified.com>";

interface LeadNotificationInput {
  leadId: string;
  conversationId: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  website: string | null;
  country: string | null;
  teamSize: string | null;
  industry: string | null;
  certificationInterest: string | null;
  urgency: string | null;
  existingCertifications: string | null;
  score: number;
  classification: "cold" | "warm" | "hot" | "urgent";
  breakdown: Array<{ signal: string; points: number }>;
  conversationSummary: string;
  messageCount: number;
}

const RESPONSE_WINDOWS: Record<string, string> = {
  urgent: "Within 1 hour",
  hot: "Within 24 hours",
  warm: "Within 48 hours",
  cold: "Within 1 week",
};

const SUGGESTED_ACTIONS: Record<string, string> = {
  urgent: "Contact within 1 hour. Call directly. Reference any specific deadlines mentioned.",
  hot: "Contact within 24 hours via phone or email. Personalised outreach.",
  warm: "Contact within 48 hours via email. Include relevant case study.",
  cold: "Add to nurture list. No immediate action required.",
};

export async function sendLeadNotification(
  input: LeadNotificationInput
): Promise<{ sent: boolean; error?: string }> {
  console.log("[Clara Notifications] sendLeadNotification called", {
    leadId: input.leadId,
    classification: input.classification,
    score: input.score,
    toEmail: process.env.CLARA_ADMIN_EMAIL,
    fromEmail: FROM_ADDRESS,
  });

  const adminEmail = process.env.CLARA_ADMIN_EMAIL;
  if (!adminEmail) {
    console.error("[Clara Notifications] CLARA_ADMIN_EMAIL not set");
    return { sent: false, error: "CLARA_ADMIN_EMAIL not configured" };
  }

  const displayName = input.name || "Anonymous visitor";
  const displayCompany = input.company ? `, ${input.company}` : "";
  const displayCert = input.certificationInterest || "general enquiry";
  const classUpper = input.classification.toUpperCase();

  const subject = `[${classUpper} - Score ${input.score}] ${displayName}${displayCompany} — ${displayCert}`;

  const responseWindow = RESPONSE_WINDOWS[input.classification] || "No deadline";
  const suggestedAction = SUGGESTED_ACTIONS[input.classification] || "Review at your convenience.";
  const timestamp = new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC";

  // Build contact details section (omit null fields)
  const contactLines: string[] = [];
  if (input.name) contactLines.push(`  Name:          ${input.name}`);
  if (input.email) contactLines.push(`  Email:         ${input.email}`);
  if (input.phone) contactLines.push(`  Phone:         ${input.phone}`);
  if (input.company) contactLines.push(`  Company:       ${input.company}`);
  if (input.website) contactLines.push(`  Website:       ${input.website}`);
  if (input.country) contactLines.push(`  Country:       ${input.country}`);
  if (input.teamSize) contactLines.push(`  Team size:     ${input.teamSize}`);
  if (input.industry) contactLines.push(`  Industry:      ${input.industry}`);

  // Build breakdown section
  const breakdownLines = input.breakdown.map(
    (b) => `  ${b.signal.padEnd(42)} +${b.points}`
  );
  const totalLine = `  ${"TOTAL".padEnd(42)}  ${input.score}/100`;

  const body = `
===============================================
CLARA LEAD ALERT — ${classUpper}
===============================================

Lead Score:        ${input.score}/100
Classification:    ${classUpper}
Response Window:   ${responseWindow}
Messages:          ${input.messageCount}

===============================================
CONTACT DETAILS
===============================================
${contactLines.length > 0 ? contactLines.join("\n") : "  No contact details captured yet."}

===============================================
CERTIFICATION INTEREST
===============================================
  Primary interest:          ${input.certificationInterest || "Not specified"}
  Urgency:                   ${input.urgency || "Not specified"}
  Existing certifications:   ${input.existingCertifications || "None mentioned"}

===============================================
CONVERSATION SUMMARY
===============================================
${input.conversationSummary}

===============================================
SCORING BREAKDOWN
===============================================
${breakdownLines.join("\n")}
  ------------------------------------------
${totalLine}

===============================================
SUGGESTED NEXT ACTION
===============================================
  ${suggestedAction}

===============================================
METADATA
===============================================
  Conversation ID:   ${input.conversationId}
  Lead ID:           ${input.leadId}
  Received at:       ${timestamp}

-----------------------------------------------
Sent by Clara — AI Accreditation Advisor
Pixelette Certified
pixelettecertified.com
`.trim();

  try {
    console.log("[Clara Notifications] About to call Resend API with payload:", {
      from: FROM_ADDRESS,
      to: [adminEmail],
      subject,
    });

    const response = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [adminEmail],
      subject,
      text: body,
    });

    console.log("[Clara Notifications] Resend raw response:", JSON.stringify(response, null, 2));

    if (response.error) {
      console.error("[Clara Notifications] Resend rejected send:", response.error);
      return {
        sent: false,
        error: `${response.error.name || "resend_error"}: ${response.error.message || "Unknown error"}`,
      };
    }

    if (response.data && response.data.id) {
      console.log("[Clara Notifications] Resend accepted send, email ID:", response.data.id);
      return { sent: true };
    }

    console.warn("[Clara Notifications] Unexpected Resend response shape:", response);
    return { sent: false, error: "Unexpected Resend response shape" };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[Clara Notifications] Failed to send email (exception):", message);
    return { sent: false, error: message };
  }
}

export async function generateConversationSummary(
  messages: Array<{ role: string; content: string }>
): Promise<string> {
  try {
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const transcript = messages
      .map((m) => `${m.role === "user" ? "Visitor" : "Clara"}: ${m.content}`)
      .join("\n\n");

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 400,
      system:
        "You are summarising a conversation between a visitor and Clara, an AI accreditation advisor for Pixelette Certified. Produce a concise summary in 5-7 bullet points covering: who the visitor is and what they do, their primary certification need, urgency signals and deadlines, pain points or triggers mentioned, any objections raised, and key next action. Use plain English. No preamble. Start directly with the bullets.",
      messages: [{ role: "user", content: transcript }],
    });

    const textBlock = response.content.find((block) => block.type === "text");
    return textBlock?.text || "Summary generation failed. See full transcript in database.";
  } catch (err) {
    console.error("[Clara Notifications] Summary generation failed:", err);
    return "Summary generation failed. See full transcript in database.";
  }
}

// --- Slack notification for HOT and URGENT leads ---

interface SlackNotificationInput {
  leadId: string;
  conversationId: string;
  name: string | null;
  company: string | null;
  email: string | null;
  phone: string | null;
  certificationInterest: string | null;
  urgency: string | null;
  industry: string | null;
  score: number;
  classification: "hot" | "urgent";
  breakdown: Array<{ signal: string; points: number }>;
  conversationSummary: string;
}

export async function sendSlackNotification(
  input: SlackNotificationInput
): Promise<{ sent: boolean; error?: string }> {
  try {
    const webhookUrl = process.env.CLARA_SLACK_WEBHOOK_URL;
    if (!webhookUrl) {
      console.log("[Clara Notifications] Slack webhook URL not configured");
      return { sent: false, error: "webhook_url_missing" };
    }

    const emoji = input.classification === "urgent" ? "\u{1F6A8}" : "\u{1F525}";
    const colour = input.classification === "urgent" ? "#E63946" : "#F4A261";
    const classificationLabel = input.classification.toUpperCase();
    const responseWindow = input.classification === "urgent" ? "Within 1 hour" : "Within 24 hours";

    const payload = {
      attachments: [
        {
          color: colour,
          blocks: [
            {
              type: "header",
              text: {
                type: "plain_text",
                text: `${emoji} ${classificationLabel} LEAD \u2014 Score ${input.score}/100`,
                emoji: true,
              },
            },
            {
              type: "section",
              fields: [
                { type: "mrkdwn", text: `*Name:*\n${input.name || "Not provided"}` },
                { type: "mrkdwn", text: `*Company:*\n${input.company || "Not provided"}` },
                { type: "mrkdwn", text: `*Email:*\n${input.email || "Not provided"}` },
                { type: "mrkdwn", text: `*Phone:*\n${input.phone || "Not provided"}` },
                { type: "mrkdwn", text: `*Certification:*\n${input.certificationInterest || "Not specified"}` },
                { type: "mrkdwn", text: `*Industry:*\n${input.industry || "Not specified"}` },
              ],
            },
            {
              type: "section",
              text: { type: "mrkdwn", text: `*Urgency:*\n${input.urgency || "Not specified"}` },
            },
            { type: "divider" },
            {
              type: "section",
              text: { type: "mrkdwn", text: `*Conversation summary:*\n${input.conversationSummary}` },
            },
            { type: "divider" },
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `*Response window:* ${responseWindow}\n*Conversation ID:* \`${input.conversationId}\`\n*Lead ID:* \`${input.leadId}\``,
              },
            },
            {
              type: "context",
              elements: [
                { type: "mrkdwn", text: "Sent by Clara \u2014 AI Accreditation Advisor at Pixelette Certified" },
              ],
            },
          ],
        },
      ],
    };

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const body = await res.text();

    if (res.status === 200 && body === "ok") {
      console.log(`[Clara Notifications] Slack accepted notification for lead: ${input.leadId}`);
      return { sent: true };
    }

    console.error(`[Clara Notifications] Slack rejected notification: status=${res.status} body=${body}`);
    return { sent: false, error: body };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`[Clara Notifications] Slack notification failed (exception): ${message}`);
    return { sent: false, error: message };
  }
}
