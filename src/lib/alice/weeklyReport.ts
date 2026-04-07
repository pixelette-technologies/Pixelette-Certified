// Alice weekly report — generates and emails a lead summary every Monday

import { Resend } from "resend";
import { getSupabaseServer } from "@/lib/alice/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_ADDRESS = "Alice <alice@pixelettecertified.com>";

interface WeeklyReportResult {
  success: boolean;
  leadsThisWeek: number;
  error?: string;
}

export async function generateAndSendWeeklyReport(): Promise<WeeklyReportResult> {
  try {
    const supabase = getSupabaseServer();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const since = sevenDaysAgo.toISOString();

    // Query 1: Lead counts by classification
    const { data: allLeads } = await supabase
      .from("leads")
      .select("classification")
      .gte("created_at", since);

    const counts: Record<string, number> = { cold: 0, warm: 0, hot: 0, urgent: 0 };
    const totalLeads = allLeads?.length || 0;
    for (const lead of allLeads || []) {
      const c = lead.classification as string;
      if (c in counts) counts[c]++;
    }

    // Query 2: Top hot/urgent unactioned leads
    const { data: unactionedLeads } = await supabase
      .from("leads")
      .select("name, company, email, classification, score, certification_interest, created_at")
      .gte("created_at", since)
      .in("classification", ["hot", "urgent"])
      .eq("status", "new")
      .order("score", { ascending: false })
      .limit(5);

    // Query 3: Average score
    const { data: scoreData } = await supabase
      .from("leads")
      .select("score")
      .gte("created_at", since);

    const avgScore = scoreData && scoreData.length > 0
      ? Math.round(scoreData.reduce((sum, l) => sum + (l.score || 0), 0) / scoreData.length)
      : 0;

    // Query 4: Top questions
    const { data: questions } = await supabase
      .from("questions_log")
      .select("question")
      .gte("created_at", since);

    // Count question frequency manually
    const questionCounts: Record<string, number> = {};
    for (const q of questions || []) {
      const text = q.question;
      questionCounts[text] = (questionCounts[text] || 0) + 1;
    }
    const topQuestions = Object.entries(questionCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    // Build the report
    const now = new Date();
    const weekEndingDate = now.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const timestamp = now.toLocaleString("en-GB", { timeZone: "Europe/London" }) + " UK";

    // Unactioned leads section
    let unactionedSection = "";
    if (unactionedLeads && unactionedLeads.length > 0) {
      unactionedSection = unactionedLeads
        .map((l) => `[${(l.classification as string).toUpperCase()}] ${l.name || "Anonymous"}, ${l.company || "Unknown"}, ${l.certification_interest || "General"}, Score ${l.score}`)
        .join("\n");
    } else {
      unactionedSection = "No urgent or hot leads awaiting action.";
    }

    // Top questions section
    let questionsSection = "";
    if (topQuestions.length > 0) {
      questionsSection = topQuestions
        .map(([q, freq], i) => `${i + 1}. "${q}", asked ${freq}x`)
        .join("\n");
    } else {
      questionsSection = "No questions logged this week.";
    }

    // Red flags
    const redFlags: string[] = [];
    const urgentUnactioned = unactionedLeads?.filter((l) => l.classification === "urgent").length || 0;
    if (urgentUnactioned > 0) {
      redFlags.push(`${urgentUnactioned} URGENT lead(s) have not been actioned.`);
    }
    if (totalLeads === 0) {
      redFlags.push("No leads captured this week. Check that Alice is running correctly.");
    }
    if (avgScore > 0 && avgScore < 20) {
      redFlags.push(`Average lead score is very low (${avgScore}). Review Alice's qualification logic.`);
    }
    const redFlagsSection = redFlags.length > 0 ? redFlags.join("\n") : "No red flags this week.";

    const body = `
===========================================
ALICE WEEKLY LEAD REPORT
Week ending: ${weekEndingDate}
===========================================

SUMMARY
===========================================
Total leads this week:     ${totalLeads}
Average lead score:        ${avgScore}/100
Urgent leads:              ${counts.urgent}
Hot leads:                 ${counts.hot}
Warm leads:                ${counts.warm}
Cold leads:                ${counts.cold}

TOP UNACTIONED LEADS (still marked New)
===========================================
${unactionedSection}

TOP QUESTIONS ASKED THIS WEEK
===========================================
${questionsSection}

RED FLAGS
===========================================
${redFlagsSection}

===========================================
Sent by Alice, AI Accreditation Advisor
Pixelette Certified | pixelettecertified.com
Report generated: ${timestamp}
===========================================
`.trim();

    const subject = `Alice Weekly Report, w/e ${weekEndingDate} | ${totalLeads} leads, ${counts.urgent} urgent`;

    // Send to both admin and Rana
    const recipients: string[] = [];
    if (process.env.ALICE_ADMIN_EMAIL) recipients.push(process.env.ALICE_ADMIN_EMAIL);
    if (process.env.WEEKLY_REPORT_EMAIL) recipients.push(process.env.WEEKLY_REPORT_EMAIL);

    if (recipients.length === 0) {
      console.error("[Alice Weekly Report] No recipients configured");
      return { success: false, leadsThisWeek: totalLeads, error: "No recipients configured" };
    }

    const response = await resend.emails.send({
      from: FROM_ADDRESS,
      to: recipients,
      subject,
      text: body,
    });

    if (response.error) {
      console.error("[Alice Weekly Report] Resend rejected:", response.error);
      return { success: false, leadsThisWeek: totalLeads, error: response.error.message };
    }

    console.log(`[Alice Weekly Report] Sent to ${recipients.join(", ")}: ${subject}`);
    return { success: true, leadsThisWeek: totalLeads };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[Alice Weekly Report] Failed:", message);
    return { success: false, leadsThisWeek: 0, error: message };
  }
}
