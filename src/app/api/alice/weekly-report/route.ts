// Alice weekly report cron endpoint — secured via CRON_SECRET

import { NextRequest, NextResponse } from "next/server";
import { generateAndSendWeeklyReport } from "@/lib/alice/weeklyReport";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await generateAndSendWeeklyReport();
  return NextResponse.json(result);
}
