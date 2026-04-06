// Lead scoring logic - calculates qualification score from conversation signals

import type { CapturedFields, ChatMessage } from "@/lib/clara/types";

interface ScoreBreakdownItem {
  signal: string;
  points: number;
}

interface ScoreResult {
  score: number;
  classification: "cold" | "warm" | "hot" | "urgent";
  breakdown: ScoreBreakdownItem[];
}

export function classifyScore(score: number): "cold" | "warm" | "hot" | "urgent" {
  if (score >= 76) return "urgent";
  if (score >= 51) return "hot";
  if (score >= 26) return "warm";
  return "cold";
}

export function calculateLeadScore(input: {
  captured: CapturedFields;
  messages: ChatMessage[];
}): ScoreResult {
  const { captured, messages } = input;
  const breakdown: ScoreBreakdownItem[] = [];

  // Concatenate all user messages for scanning
  const userMessages = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content)
    .join(" ");
  const userMessagesLower = userMessages.toLowerCase();

  // --- Provided email ---
  if (captured.email && captured.email.trim().length > 0) {
    breakdown.push({ signal: "Provided email", points: 10 });
  }

  // --- Provided phone ---
  if (captured.phone && captured.phone.trim().length > 0) {
    breakdown.push({ signal: "Provided phone", points: 15 });
  }

  // --- Provided website ---
  if (captured.website && captured.website.trim().length > 0) {
    breakdown.push({ signal: "Provided website", points: 10 });
  }

  // --- Team size ---
  const teamSizePoints = scoreTeamSize(captured.team_size);
  if (teamSizePoints > 0) {
    const label = teamSizePoints === 15 ? "Team size over 150" : "Team size 50-150";
    breakdown.push({ signal: label, points: teamSizePoints });
  }

  // --- Mentioned tender ---
  if (/\btenders?\b|\btendering\b/i.test(userMessages)) {
    breakdown.push({ signal: "Mentioned tender", points: 20 });
  }

  // --- Mentioned enterprise clients ---
  if (/enterprise\s+(client|customer|contract|deal)s?/i.test(userMessages)) {
    breakdown.push({ signal: "Mentioned enterprise clients", points: 15 });
  }

  // --- Asked about pricing ---
  if (/\b(price|pricing|cost|how much|fees?)\b/i.test(userMessages)) {
    breakdown.push({ signal: "Asked about pricing", points: 15 });
  }

  // --- Asked for a quote ---
  if (/\b(quote|proposal|estimate)\b/i.test(userMessages)) {
    breakdown.push({ signal: "Asked for a quote", points: 20 });
  }

  // --- Urgency ---
  const urgencyPoints = scoreUrgency(captured.urgency, userMessagesLower);
  if (urgencyPoints > 0) {
    const label = urgencyPoints === 20 ? "Urgency under 1 month" : "Urgency 1-3 months";
    breakdown.push({ signal: label, points: urgencyPoints });
  }

  // --- Multiple certifications mentioned ---
  if (hasMultipleCertifications(captured.certification_interest, userMessagesLower)) {
    breakdown.push({ signal: "Multiple certifications mentioned", points: 15 });
  }

  // --- Already has a certification ---
  if (
    captured.existing_certifications &&
    captured.existing_certifications.trim().length > 0 &&
    !/^(none|no)$/i.test(captured.existing_certifications.trim())
  ) {
    breakdown.push({ signal: "Already has a certification", points: 5 });
  }

  // --- Conversation over 10 messages ---
  if (messages.length > 10) {
    breakdown.push({ signal: "Conversation over 10 messages", points: 5 });
  }

  // --- Specific deadline mentioned ---
  if (hasSpecificDeadline(userMessagesLower)) {
    breakdown.push({ signal: "Specific deadline mentioned", points: 15 });
  }

  // --- Mentioned AI product or EU AI Act ---
  if (hasAISignal(userMessages)) {
    breakdown.push({ signal: "Mentioned AI product or EU AI Act", points: 15 });
  }

  // --- Asked to book gap analysis ---
  if (/gap analysis|book a call|schedule a call|consultation|let'?s talk|book a meeting/i.test(userMessages)) {
    breakdown.push({ signal: "Asked to book gap analysis", points: 25 });
  }

  // --- Regulatory sector ---
  if (isRegulatorySector(captured.industry)) {
    breakdown.push({ signal: "Regulatory sector", points: 10 });
  }

  const rawScore = breakdown.reduce((sum, item) => sum + item.points, 0);
  const score = Math.min(rawScore, 100);

  return {
    score,
    classification: classifyScore(score),
    breakdown,
  };
}

// --- Helper functions ---

function scoreTeamSize(teamSize: string | undefined): number {
  if (!teamSize || teamSize.trim().length === 0) return 0;

  const cleaned = teamSize.toLowerCase().replace(/[,\s]+/g, " ").trim();

  // Handle "150+", "over 150", "200+", etc.
  const overMatch = cleaned.match(/(?:over|more than|\+|above)\s*(\d+)|(\d+)\s*\+/);
  if (overMatch) {
    const num = parseInt(overMatch[1] || overMatch[2], 10);
    if (num >= 150) return 15;
    if (num >= 50) return 10;
    return 0;
  }

  // Handle ranges: "50-150", "50 to 150"
  const rangeMatch = cleaned.match(/(\d+)\s*[-–to]+\s*(\d+)/);
  if (rangeMatch) {
    const high = parseInt(rangeMatch[2], 10);
    if (high > 150) return 15;
    if (high >= 50) return 10;
    return 0;
  }

  // Handle plain numbers: "80", "80 employees"
  const numMatch = cleaned.match(/(\d+)/);
  if (numMatch) {
    const num = parseInt(numMatch[1], 10);
    if (num > 150) return 15;
    if (num >= 50) return 10;
  }

  return 0;
}

function scoreUrgency(urgencyField: string | undefined, userMessagesLower: string): number {
  const text = [urgencyField?.toLowerCase() || "", userMessagesLower].join(" ");

  // Under 1 month signals
  const urgentPatterns =
    /\b(urgent|asap|immediately|this week|next week|within days|[1-4]\s*weeks?|1\s*month|a month|four weeks|three weeks|two weeks|one week)\b/;
  if (urgentPatterns.test(text)) return 20;

  // 1-3 months signals
  const moderatePatterns =
    /\b(2\s*months?|3\s*months?|60\s*days|90\s*days|quarter|next quarter|q[1-4])\b/;
  if (moderatePatterns.test(text)) return 10;

  // Check for "weeks" mentions indicating short timeline
  if (/\b\d+\s*weeks?\b/.test(text)) {
    const weeksMatch = text.match(/(\d+)\s*weeks?/);
    if (weeksMatch) {
      const weeks = parseInt(weeksMatch[1], 10);
      if (weeks <= 4) return 20;
      if (weeks <= 12) return 10;
    }
  }

  return 0;
}

const CERT_NAMES = [
  "iso 27001",
  "iso 42001",
  "iso 9001",
  "iso 22301",
  "iso 14001",
  "cyber essentials",
  "soc 2",
  "soc2",
  "gdpr",
];

function hasMultipleCertifications(
  certInterest: string | undefined,
  userMessagesLower: string
): boolean {
  // Check captured field for multiple certs
  if (certInterest) {
    const lower = certInterest.toLowerCase();
    const found = CERT_NAMES.filter((cert) => lower.includes(cert));
    if (found.length >= 2) return true;
    // Check for comma/and separated items
    if (/,|\band\b/.test(lower) && found.length >= 1) return true;
  }

  // Check user messages for multiple distinct cert mentions
  const found = CERT_NAMES.filter((cert) => userMessagesLower.includes(cert));
  return found.length >= 2;
}

function hasSpecificDeadline(userMessagesLower: string): boolean {
  // Date patterns: "by March", "before June", "end of Q2", "by 15th", etc.
  if (/\b(deadline|by end of|before)\b/.test(userMessagesLower)) return true;
  // Month mentions with urgency context
  if (
    /\b(by|before|end of|closing in|due)\s+(january|february|march|april|may|june|july|august|september|october|november|december)\b/.test(
      userMessagesLower
    )
  )
    return true;
  // "closing in X weeks/months"
  if (/closing in \d+\s*(weeks?|months?|days?)/i.test(userMessagesLower)) return true;
  // Specific date patterns like "15/03", "March 15"
  if (/\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/.test(userMessagesLower)) return true;

  return false;
}

function hasAISignal(userMessages: string): boolean {
  // Match AI as whole word/acronym, not inside words like "said" or "email"
  if (/\bAI\b/.test(userMessages)) return true;
  if (/artificial intelligence|machine learning|\bML\b|eu ai act|ai act|ai governance/i.test(userMessages)) return true;
  return false;
}

function isRegulatorySector(industry: string | undefined): boolean {
  if (!industry || industry.trim().length === 0) return false;
  return /fintech|finance|financial|banking|healthcare|medical|health tech|government|public sector|pharmaceutical|pharma/i.test(
    industry
  );
}
