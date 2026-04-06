// Temporary Supabase connection test route — remove before production

import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/clara/supabase";

const EXPECTED_TABLES = ["conversations", "leads", "quality_checks", "questions_log"];

export async function GET() {
  if (process.env.CLARA_DEV_ENDPOINTS_ENABLED !== 'true') {
    return new Response('Not found', { status: 404 });
  }

  try {
    const supabase = getSupabaseServer();

    // Verify tables exist by querying each one
    const found: string[] = [];
    const missing: string[] = [];

    for (const table of EXPECTED_TABLES) {
      const { error } = await supabase.from(table).select("id").limit(0);
      if (error) {
        missing.push(table);
      } else {
        found.push(table);
      }
    }

    if (missing.length > 0) {
      return NextResponse.json(
        { status: "error", message: `Missing tables: ${missing.join(", ")}`, tables: found },
        { status: 500 }
      );
    }

    // Get row counts
    const { count: conversationCount } = await supabase
      .from("conversations")
      .select("*", { count: "exact", head: true });

    const { count: leadCount } = await supabase
      .from("leads")
      .select("*", { count: "exact", head: true });

    return NextResponse.json({
      status: "ok",
      message: "Clara schema verified",
      tables: found.sort(),
      counts: {
        conversations: conversationCount ?? 0,
        leads: leadCount ?? 0,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { status: "error", message },
      { status: 500 }
    );
  }
}
