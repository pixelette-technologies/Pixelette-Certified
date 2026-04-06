// Returns conversation history for a given session ID

import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/alice/supabase";
import type { ChatMessage } from "@/lib/alice/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("sessionId");

  if (!sessionId) {
    return NextResponse.json({ messages: [] });
  }

  try {
    const supabase = getSupabaseServer();

    const { data, error } = await supabase
      .from("conversations")
      .select("messages")
      .eq("session_id", sessionId)
      .order("started_at", { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      return NextResponse.json({ messages: [] });
    }

    const messages = Array.isArray(data.messages)
      ? (data.messages as ChatMessage[])
      : [];

    return NextResponse.json({ messages });
  } catch {
    return NextResponse.json({ messages: [] });
  }
}
