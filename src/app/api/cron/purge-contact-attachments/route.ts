// Retention purge for enquiry attachments — secured via CRON_SECRET.
//
// CONSENT_NOTICE promises visitors that "we retain enquiries and attachments for
// 24 months". Without this job that promise is only true of the database row:
// the uploaded document would sit in the bucket indefinitely, which would make
// an erasure request impossible to honour and would contradict our own privacy
// notice. A compliance consultancy carrying an unbounded document store is not
// a good look, so the promise and the mechanism ship together.

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/alice/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RETENTION_MONTHS = 24;
/** Bounded so one run cannot exceed the function timeout. Monthly cadence means
 *  a backlog would clear over a few runs rather than needing one huge sweep. */
const BATCH_SIZE = 200;

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bucket = process.env.CONTACT_ATTACHMENTS_BUCKET || "contact-attachments";
  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - RETENTION_MONTHS);

  try {
    const supabase = getSupabaseServer();

    // The partial index on (created_at) where attachment_path is not null exists
    // precisely to make this query cheap.
    const { data: rows, error: selectError } = await supabase
      .from("contact_submissions")
      .select("id, attachment_path")
      .lt("created_at", cutoff.toISOString())
      .not("attachment_path", "is", null)
      .limit(BATCH_SIZE);

    if (selectError) {
      console.error("[Purge] Select failed:", selectError.message);
      return NextResponse.json({ error: "Select failed" }, { status: 500 });
    }
    if (!rows || rows.length === 0) {
      return NextResponse.json({ purged: 0, message: "Nothing past retention." });
    }

    const paths = rows.map((r) => r.attachment_path as string).filter(Boolean);
    const { error: removeError } = await supabase.storage.from(bucket).remove(paths);

    if (removeError) {
      // Do NOT null the columns if the object removal failed: that would lose
      // the only pointer to a file we still hold, making it unpurgeable.
      console.error("[Purge] Storage remove failed:", removeError.message);
      return NextResponse.json({ error: "Storage removal failed" }, { status: 500 });
    }

    const { error: updateError } = await supabase
      .from("contact_submissions")
      .update({
        attachment_bucket: null,
        attachment_path: null,
        attachment_filename: null,
        attachment_mime: null,
        attachment_size_bytes: null,
        attachment_sha256: null,
      })
      .in("id", rows.map((r) => r.id));

    if (updateError) {
      console.error("[Purge] Column clear failed:", updateError.message);
      return NextResponse.json({ error: "Row update failed" }, { status: 500 });
    }

    console.log(`[Purge] Removed ${paths.length} attachment(s) past ${RETENTION_MONTHS} months.`);
    return NextResponse.json({ purged: paths.length });
  } catch (err) {
    console.error("[Purge] Threw:", err);
    return NextResponse.json({ error: "Purge failed" }, { status: 500 });
  }
}
