// Clara database helpers - conversation storage and lead management

import { getSupabaseServer } from "@/lib/clara/supabase";
import { calculateLeadScore } from "@/lib/clara/scoring";
import type { ChatMessage, CapturedFields } from "@/lib/clara/types";

interface ConversationResult {
  conversationId: string;
  sessionId: string;
  messages: ChatMessage[];
}

interface ConversationMetadata {
  pageUrl?: string;
  userAgent?: string;
  language?: string;
}

export interface LeadUpsertResult {
  leadId: string | null;
  oldClassification: "cold" | "warm" | "hot" | "urgent" | null;
  newClassification: "cold" | "warm" | "hot" | "urgent";
  score: number;
  breakdown: Array<{ signal: string; points: number }>;
  mergedFields: CapturedFields;
  isNew: boolean;
}

export async function getOrCreateConversation(
  sessionId: string | null | undefined,
  metadata: ConversationMetadata
): Promise<ConversationResult> {
  const supabase = getSupabaseServer();

  if (sessionId) {
    const { data, error } = await supabase
      .from("conversations")
      .select("id, session_id, messages")
      .eq("session_id", sessionId)
      .order("started_at", { ascending: false })
      .limit(1)
      .single();

    if (!error && data) {
      const messages = Array.isArray(data.messages) ? (data.messages as ChatMessage[]) : [];
      return { conversationId: data.id, sessionId: data.session_id, messages };
    }

    if (error) {
      console.error("[Clara DB] Failed to look up conversation, creating new one:", error.message);
    }
  }

  const newSessionId = crypto.randomUUID();
  const { data, error } = await supabase
    .from("conversations")
    .insert({
      session_id: newSessionId,
      messages: [],
      message_count: 0,
      page_url: metadata.pageUrl || null,
      user_agent: metadata.userAgent || null,
      language: metadata.language || "en",
    })
    .select("id, session_id")
    .single();

  if (error || !data) {
    console.error("[Clara DB] Failed to create conversation:", error?.message);
    return { conversationId: "", sessionId: newSessionId, messages: [] };
  }

  return { conversationId: data.id, sessionId: data.session_id, messages: [] };
}

export async function appendMessagesToConversation(
  conversationId: string,
  userMessage: ChatMessage,
  assistantMessage: ChatMessage
): Promise<void> {
  if (!conversationId) return;

  const supabase = getSupabaseServer();

  const { data, error: fetchError } = await supabase
    .from("conversations")
    .select("messages, message_count")
    .eq("id", conversationId)
    .single();

  if (fetchError || !data) {
    console.error("[Clara DB] Failed to load conversation for append:", fetchError?.message);
    return;
  }

  const currentMessages = Array.isArray(data.messages) ? data.messages : [];
  const updatedMessages = [...currentMessages, userMessage, assistantMessage];

  const { error: updateError } = await supabase
    .from("conversations")
    .update({
      messages: updatedMessages,
      message_count: (data.message_count || 0) + 2,
      last_message_at: new Date().toISOString(),
    })
    .eq("id", conversationId);

  if (updateError) {
    console.error("[Clara DB] Failed to append messages:", updateError.message);
  }
}

// Valid lead table columns — filter out any extra fields Clara invents
const VALID_LEAD_FIELDS = new Set([
  "name", "email", "phone", "company", "website", "industry", "country",
  "team_size", "existing_certifications", "certification_interest",
  "urgency", "tender_pressure", "preferred_contact",
]);

function filterValidFields(captured: CapturedFields): CapturedFields {
  const filtered: CapturedFields = {};
  for (const [key, val] of Object.entries(captured)) {
    if (VALID_LEAD_FIELDS.has(key) && val && val.trim().length > 0) {
      filtered[key as keyof CapturedFields] = val.trim();
    }
  }
  return filtered;
}

export async function upsertLeadForConversation(
  conversationId: string,
  sessionId: string,
  captured: CapturedFields
): Promise<LeadUpsertResult | null> {
  const validCaptured = filterValidFields(captured);
  const hasValues = Object.keys(validCaptured).length > 0;
  if (!hasValues) return null;

  const supabase = getSupabaseServer();

  // Load conversation messages for scoring
  let conversationMessages: ChatMessage[] = [];
  if (conversationId) {
    const { data: convData } = await supabase
      .from("conversations")
      .select("messages")
      .eq("id", conversationId)
      .single();

    if (convData && Array.isArray(convData.messages)) {
      conversationMessages = convData.messages as ChatMessage[];
    }
  }

  // Check if a lead already exists for this session
  const { data: existingLead, error: lookupError } = await supabase
    .from("leads")
    .select("id, score, classification, name, email, phone, company, website, industry, country, team_size, existing_certifications, certification_interest, urgency, tender_pressure, preferred_contact")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (lookupError && lookupError.code !== "PGRST116") {
    console.error("[Clara DB] Failed to look up existing lead:", lookupError.message);
  }

  if (existingLead) {
    const oldClassification = existingLead.classification as "cold" | "warm" | "hot" | "urgent";

    // Merge fields
    const updates: Record<string, string | number> = {};
    for (const [key, newVal] of Object.entries(validCaptured)) {
      if (newVal && newVal.trim().length > 0) {
        const oldVal = existingLead[key as keyof typeof existingLead] as string | null;
        if (!oldVal || oldVal.trim().length === 0) {
          updates[key] = newVal.trim();
        }
      }
    }

    if (validCaptured.industry && validCaptured.industry.trim().length > 0) {
      updates.industry = validCaptured.industry.trim();
    }

    // Build merged fields for scoring
    const mergedCaptured: CapturedFields = {};
    for (const key of VALID_LEAD_FIELDS) {
      const newVal = validCaptured[key as keyof CapturedFields]?.trim();
      const oldVal = (existingLead[key as keyof typeof existingLead] as string | null)?.trim();
      mergedCaptured[key as keyof CapturedFields] = (updates[key] as string) || oldVal || newVal || undefined;
    }

    const { score, classification, breakdown } = calculateLeadScore({
      captured: mergedCaptured,
      messages: conversationMessages,
    });

    updates.score = score;
    updates.classification = classification;

    if (Object.keys(updates).length > 0) {
      const { error: updateError } = await supabase
        .from("leads")
        .update(updates)
        .eq("id", existingLead.id);

      if (updateError) {
        console.error("[Clara DB] Failed to update lead:", updateError.message);
      }
    }

    return {
      leadId: existingLead.id,
      oldClassification,
      newClassification: classification,
      score,
      breakdown,
      mergedFields: mergedCaptured,
      isNew: false,
    };
  }

  // Insert new lead
  const leadFields: Record<string, string | number | null> = { session_id: sessionId };
  for (const [key, val] of Object.entries(validCaptured)) {
    if (val && val.trim().length > 0) {
      leadFields[key] = val.trim();
    }
  }

  const { score, classification, breakdown } = calculateLeadScore({
    captured: validCaptured,
    messages: conversationMessages,
  });
  leadFields.score = score;
  leadFields.classification = classification;

  const { data: newLead, error: insertError } = await supabase
    .from("leads")
    .insert(leadFields)
    .select("id")
    .single();

  if (insertError || !newLead) {
    console.error("[Clara DB] Failed to insert lead:", insertError?.message);
    return null;
  }

  if (conversationId) {
    const { error: linkError } = await supabase
      .from("conversations")
      .update({ lead_id: newLead.id })
      .eq("id", conversationId);

    if (linkError) {
      console.error("[Clara DB] Failed to link lead to conversation:", linkError.message);
    }
  }

  return {
    leadId: newLead.id,
    oldClassification: null,
    newClassification: classification,
    score,
    breakdown,
    mergedFields: validCaptured,
    isNew: true,
  };
}
