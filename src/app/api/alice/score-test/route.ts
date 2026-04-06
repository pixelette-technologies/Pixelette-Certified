// Temporary scoring test route — remove before production

import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/alice/supabase";
import { calculateLeadScore } from "@/lib/alice/scoring";
import type { ChatMessage, CapturedFields } from "@/lib/alice/types";

export async function POST(request: Request) {
  if (process.env.ALICE_DEV_ENDPOINTS_ENABLED !== 'true') {
    return new Response('Not found', { status: 404 });
  }

  try {
    const body = await request.json();
    const { leadId, sessionId } = body as { leadId?: string; sessionId?: string };

    if (!leadId && !sessionId) {
      return NextResponse.json(
        { status: "error", message: "Provide either leadId or sessionId" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServer();

    // Load lead
    let lead = null;
    let leadError = null;

    if (leadId) {
      const result = await supabase.from("leads").select("*").eq("id", leadId).limit(1);
      lead = result.data?.[0];
      leadError = result.error;
    } else {
      // Try direct session_id match first
      const direct = await supabase.from("leads").select("*").eq("session_id", sessionId!).order("created_at", { ascending: false }).limit(1);
      lead = direct.data?.[0];
      leadError = direct.error;

      // Fallback: find via conversation -> lead_id link
      if (!lead) {
        const convResult = await supabase.from("conversations").select("lead_id").eq("session_id", sessionId!).order("started_at", { ascending: false }).limit(1);
        const leadIdFromConv = convResult.data?.[0]?.lead_id;
        if (leadIdFromConv) {
          const linked = await supabase.from("leads").select("*").eq("id", leadIdFromConv).limit(1);
          lead = linked.data?.[0];
          leadError = linked.error;
        }
      }
    }

    if (leadError || !lead) {
      return NextResponse.json(
        { status: "error", message: `Lead not found: ${leadError?.message || "no matching row"}` },
        { status: 404 }
      );
    }

    // Load conversation messages
    let messages: ChatMessage[] = [];
    const { data: conv } = await supabase
      .from("conversations")
      .select("messages")
      .eq("session_id", lead.session_id)
      .order("started_at", { ascending: false })
      .limit(1)
      .single();

    if (conv && Array.isArray(conv.messages)) {
      messages = conv.messages as ChatMessage[];
    }

    // Build captured fields from lead
    const captured: CapturedFields = {
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      website: lead.website,
      industry: lead.industry,
      country: lead.country,
      team_size: lead.team_size,
      existing_certifications: lead.existing_certifications,
      certification_interest: lead.certification_interest,
      urgency: lead.urgency,
      tender_pressure: lead.tender_pressure,
      preferred_contact: lead.preferred_contact,
    };

    const result = calculateLeadScore({ captured, messages });

    return NextResponse.json({
      status: "ok",
      calculated: {
        score: result.score,
        classification: result.classification,
        breakdown: result.breakdown,
      },
      stored: {
        score: lead.score,
        classification: lead.classification,
      },
      lead: {
        id: lead.id,
        name: lead.name,
        email: lead.email,
        company: lead.company,
        industry: lead.industry,
      },
      messageCount: messages.length,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { status: "error", message },
      { status: 500 }
    );
  }
}
