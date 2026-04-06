// Temporary rate limit diagnostic route — remove before production

import { NextResponse } from "next/server";
import { checkRateLimit, extractClientIp, resetRateLimits } from "@/lib/clara/rateLimit";

export async function GET(request: Request) {
  if (process.env.CLARA_DEV_ENDPOINTS_ENABLED !== 'true') {
    return new Response('Not found', { status: 404 });
  }

  const ip = extractClientIp(request);
  const result = checkRateLimit(ip);

  // Mask IP for privacy
  const maskedIp = ip.includes(".")
    ? ip.split(".").slice(0, 2).join(".") + ".*.*"
    : ip.split(":").slice(0, 2).join(":") + ":*";

  return NextResponse.json({
    ip: maskedIp,
    ...result,
    resetAt: result.resetAt.toISOString(),
  });
}

export async function DELETE() {
  if (process.env.CLARA_DEV_ENDPOINTS_ENABLED !== 'true') {
    return new Response('Not found', { status: 404 });
  }

  resetRateLimits();
  return NextResponse.json({ status: "ok", message: "Rate limit state cleared" });
}
