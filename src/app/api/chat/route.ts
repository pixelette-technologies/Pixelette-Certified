// Alice chat API route - handles POST requests from the chat widget

import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import type { ChatRequest, ChatMessage, ChatResponse, ChatErrorResponse } from "@/lib/alice/types";
import { ALICE_SYSTEM_PROMPT } from "@/lib/alice/systemPrompt";
import { extractFields } from "@/lib/alice/extractFields";
import {
  getOrCreateConversation,
  appendMessagesToConversation,
  upsertLeadForConversation,
} from "@/lib/alice/database";
import {
  sendLeadNotification,
  sendSlackNotification,
  generateConversationSummary,
} from "@/lib/alice/notifications";
import {
  extractUrlFromMessage,
  scrapeWebsite,
  formatScrapedContentForClaude,
} from "@/lib/alice/scraper";
import { checkRateLimit, extractClientIp } from "@/lib/alice/rateLimit";
import { verifyTurnstileToken } from "@/lib/alice/turnstile";
import { getSupabaseServer } from "@/lib/alice/supabase";
import { generateAIQualityCheck, saveQualityCheck } from "@/lib/alice/qualityCheck";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MAX_HISTORY_LENGTH = 20;

const CLASSIFICATION_RANK: Record<string, number> = {
  cold: 0,
  warm: 1,
  hot: 2,
  urgent: 3,
};

export async function POST(request: Request) {
  try {
    let body: ChatRequest;

    try {
      body = (await request.json()) as ChatRequest;
    } catch {
      return NextResponse.json<ChatErrorResponse>(
        { error: "Invalid JSON in request body." },
        { status: 400 }
      );
    }

    if (!body.message || typeof body.message !== "string" || body.message.trim().length === 0) {
      return NextResponse.json<ChatErrorResponse>(
        { error: "Please provide a non-empty message." },
        { status: 400 }
      );
    }

    // Rate limiting — check before any database or Claude API calls
    const ip = extractClientIp(request);
    if (process.env.ALICE_RATE_LIMIT_ENABLED === "true") {
      const rateResult = checkRateLimit(ip);

      if (!rateResult.allowed) {
        const maskedIp = ip.includes(".")
          ? ip.split(".").slice(0, 2).join(".") + ".*.*"
          : ip.split(":").slice(0, 2).join(":") + ":*";
        console.warn(`[Alice Rate Limit] Blocked IP ${maskedIp}: ${rateResult.reason}`);

        const retryAfter = Math.ceil(
          (rateResult.resetAt.getTime() - Date.now()) / 1000
        );

        return NextResponse.json(
          {
            error: "rate_limited",
            reason: rateResult.reason,
            message: "Rate limit exceeded. Please wait before sending another message.",
            resetAt: rateResult.resetAt.toISOString(),
          },
          {
            status: 429,
            headers: { "Retry-After": String(Math.max(retryAfter, 1)) },
          }
        );
      }
    }

    const trimmedMessage = body.message.trim();

    // Get or create conversation from database
    const conversation = await getOrCreateConversation(body.sessionId || null, {
      language: "en",
    });

    // Turnstile verification — only on newly created conversations
    const turnstileEnabled = process.env.ALICE_TURNSTILE_ENABLED === "true";
    if (turnstileEnabled && conversation.wasCreated) {
      if (!body.turnstileToken) {
        console.warn(`[Alice Turnstile] First message missing token for conversation ${conversation.conversationId}`);
        // Clean up orphan conversation row
        if (conversation.conversationId) {
          const supabase = getSupabaseServer();
          await supabase.from("conversations").delete().eq("id", conversation.conversationId);
        }
        return NextResponse.json(
          {
            error: "turnstile_required",
            message: "Human verification is required to start a conversation.",
          },
          { status: 403 }
        );
      }

      const verification = await verifyTurnstileToken(body.turnstileToken, ip);
      if (!verification.success) {
        console.warn(`[Alice Turnstile] Verification failed for conversation ${conversation.conversationId}: ${verification.errorCodes?.join(", ")}`);
        // Clean up orphan conversation row
        if (conversation.conversationId) {
          const supabase = getSupabaseServer();
          await supabase.from("conversations").delete().eq("id", conversation.conversationId);
        }
        return NextResponse.json(
          {
            error: "turnstile_failed",
            message: "Human verification failed. Please refresh the page and try again.",
            codes: verification.errorCodes,
          },
          { status: 403 }
        );
      }

      console.log(`[Alice Turnstile] Verified first message for conversation ${conversation.conversationId}`);
    }

    // Use database messages as authoritative history, fall back to request history
    let history: ChatMessage[] = conversation.messages;
    if (history.length === 0 && body.history && Array.isArray(body.history)) {
      for (const msg of body.history) {
        if (msg.role && msg.content && (msg.role === "user" || msg.role === "assistant")) {
          history.push({ role: msg.role, content: msg.content });
        }
      }
    }

    // Cap history length
    const trimmedHistory = history.slice(-MAX_HISTORY_LENGTH);

    // Check for URL in the new message and scrape if found
    let scrapedUrl: string | null = null;
    let scrapedContext: string | null = null;
    try {
      const detectedUrl = extractUrlFromMessage(trimmedMessage);
      if (detectedUrl) {
        scrapedUrl = detectedUrl;
        console.log("[Alice Scraper] URL detected in message:", detectedUrl);
        const scraped = await scrapeWebsite(detectedUrl);
        scrapedContext = formatScrapedContentForClaude(scraped);
        console.log(`[Alice Scraper] Scrape result: success=${scraped.success}, words=${scraped.wordCount}`);
      }
    } catch (err) {
      console.error("[Alice Scraper] Scraping failed:", err);
    }

    // Build messages array for Claude
    const messages: ChatMessage[] = [...trimmedHistory];

    // Inject scraped content as context before the user's message
    if (scrapedContext) {
      messages.push({
        role: "user",
        content: `[SYSTEM NOTE] The visitor just shared a website URL and we scraped the following content for you to analyse. Use this to make intelligent certification recommendations. If the site looks like a personal blog, hobby site, or clearly not a commercial business, follow Part 9 of your instructions and be honest about it not needing certifications.\n\n${scrapedContext}`,
      });
      messages.push({
        role: "assistant",
        content: "I have reviewed the website content. Let me respond to the visitor now.",
      });
    }

    messages.push({ role: "user", content: trimmedMessage });

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: ALICE_SYSTEM_PROMPT,
      messages,
    });

    const textBlock = response.content.find((block) => block.type === "text");
    const rawReply = textBlock ? textBlock.text : "";

    const { cleanReply, captured } = extractFields(rawReply);

    // Persist messages to database
    const userMsg: ChatMessage = { role: "user", content: trimmedMessage };
    const assistantMsg: ChatMessage = { role: "assistant", content: cleanReply };

    try {
      await appendMessagesToConversation(conversation.conversationId, userMsg, assistantMsg);
    } catch (err) {
      console.error("[Alice DB] appendMessagesToConversation failed:", err);
    }

    // Auto-populate website from scraped URL if not already captured
    if (scrapedUrl && !captured.website) {
      captured.website = scrapedUrl;
    }

    // Persist lead data and check for classification upgrade
    const hasCaptured = Object.keys(captured).length > 0;
    if (hasCaptured) {
      try {
        const result = await upsertLeadForConversation(
          conversation.conversationId,
          conversation.sessionId,
          captured
        );

        // Fire notification on classification upgrade only
        if (result && result.leadId) {
          const oldRank = result.oldClassification
            ? CLASSIFICATION_RANK[result.oldClassification] ?? 0
            : -1;
          const newRank = CLASSIFICATION_RANK[result.newClassification] ?? 0;
          const willNotify = newRank > oldRank && newRank >= 1;

          console.log("[Alice Chat] Notification check:", {
            oldClassification: result.oldClassification,
            newClassification: result.newClassification,
            oldRank,
            newRank,
            willNotify,
          });

          if (willNotify) {
            console.log("[Alice Chat] Firing notification for lead:", result.leadId);
            const summary = await generateConversationSummary(messages);

            try {
              const emailResult = await sendLeadNotification({
                leadId: result.leadId,
                conversationId: conversation.conversationId,
                name: result.mergedFields.name || null,
                email: result.mergedFields.email || null,
                phone: result.mergedFields.phone || null,
                company: result.mergedFields.company || null,
                website: result.mergedFields.website || null,
                country: result.mergedFields.country || null,
                teamSize: result.mergedFields.team_size || null,
                industry: result.mergedFields.industry || null,
                certificationInterest: result.mergedFields.certification_interest || null,
                urgency: result.mergedFields.urgency || null,
                existingCertifications: result.mergedFields.existing_certifications || null,
                score: result.score,
                classification: result.newClassification,
                breakdown: result.breakdown,
                conversationSummary: summary,
                messageCount: messages.length,
              });
              console.log("[Alice Chat] Email notification result:", emailResult);
            } catch (err) {
              console.error("[Alice Notifications] Email notification failed:", err);
            }

            if (result.newClassification === "hot" || result.newClassification === "urgent") {
              try {
                const slackResult = await sendSlackNotification({
                  leadId: result.leadId,
                  conversationId: conversation.conversationId,
                  name: result.mergedFields.name || null,
                  company: result.mergedFields.company || null,
                  email: result.mergedFields.email || null,
                  phone: result.mergedFields.phone || null,
                  certificationInterest: result.mergedFields.certification_interest || null,
                  urgency: result.mergedFields.urgency || null,
                  industry: result.mergedFields.industry || null,
                  score: result.score,
                  classification: result.newClassification as "hot" | "urgent",
                  breakdown: result.breakdown,
                  conversationSummary: summary,
                });
                console.log("[Alice Chat] Slack notification result:", slackResult);
              } catch (err) {
                console.error("[Alice Notifications] Slack notification failed:", err);
              }
            }

            // Fire AI quality check in the background (non-blocking)
            console.log(`[Alice Quality] Triggering AI quality check for conversation ${conversation.conversationId}`);
            generateAIQualityCheck(messages)
              .then((aiResult) => {
                if (aiResult) {
                  return saveQualityCheck({
                    conversationId: conversation.conversationId,
                    aiScore: aiResult.score,
                    aiNotes: aiResult.notes,
                  });
                }
                return null;
              })
              .catch((err) => {
                console.error("[Alice Quality] Background quality check failed:", err);
              });
          }
        }
      } catch (err) {
        console.error("[Alice DB] upsertLeadForConversation failed:", err);
      }
    }

    return NextResponse.json<ChatResponse>({
      reply: cleanReply,
      captured: hasCaptured ? captured : undefined,
      sessionId: conversation.sessionId,
      conversationId: conversation.conversationId || undefined,
    });
  } catch (error) {
    console.error("Alice chat error:", error);
    return NextResponse.json<ChatErrorResponse>(
      { error: "I am having a brief technical issue. Please try again in a moment." },
      { status: 500 }
    );
  }
}
