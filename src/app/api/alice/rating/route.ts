// Visitor rating endpoint — stores visitor feedback on Alice's helpfulness

import { NextResponse } from "next/server";
import { saveQualityCheck } from "@/lib/alice/qualityCheck";
import { getSupabaseServer } from "@/lib/alice/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { conversationId, rating } = body as { conversationId?: string; rating?: string };

    if (!conversationId || typeof conversationId !== "string") {
      return NextResponse.json(
        { error: "invalid_conversation_id" },
        { status: 400 }
      );
    }

    if (rating !== "helpful" && rating !== "not_helpful") {
      return NextResponse.json(
        { error: "invalid_rating", message: 'Rating must be "helpful" or "not_helpful"' },
        { status: 400 }
      );
    }

    // Verify conversation exists
    const supabase = getSupabaseServer();
    const { data: conversation } = await supabase
      .from("conversations")
      .select("id")
      .eq("id", conversationId)
      .maybeSingle();

    if (!conversation) {
      return NextResponse.json(
        { error: "conversation_not_found" },
        { status: 404 }
      );
    }

    const result = await saveQualityCheck({
      conversationId,
      visitorRating: rating,
      visitorRatedAt: new Date().toISOString(),
    });

    if (!result.success) {
      return NextResponse.json(
        { error: "save_failed", message: result.error },
        { status: 500 }
      );
    }

    console.log(`[Alice Quality] Visitor rated conversation ${conversationId}: ${rating}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Alice Quality] Rating endpoint error:", error);
    return NextResponse.json(
      { error: "server_error" },
      { status: 500 }
    );
  }
}
