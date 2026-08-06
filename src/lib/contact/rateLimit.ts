// Rate limiting for the public contact form — in-memory sliding window per IP.
//
// Modelled on src/lib/alice/rateLimit.ts but with tighter limits: a contact form
// should see far fewer legitimate submissions than a chat widget. The store is
// kept separate from Alice's so chat traffic and contact traffic don't share a
// counter.
//
// NOTE: in-memory state is per-serverless-instance and resets on cold start, so
// this mitigates bursts and casual abuse rather than acting as a global counter.
// Turnstile and the honeypot are the primary bot defences; this is a backstop.

const LIMITS = {
  MINUTE_MAX: 3,
  MINUTE_WINDOW_MS: 60 * 1000,
  DAILY_MAX: 15,
  DAILY_WINDOW_MS: 24 * 60 * 60 * 1000,
};

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: Date;
  reason?: "minute_limit" | "daily_limit";
}

interface RateLimitEntry {
  minuteCount: number;
  minuteWindowStart: number;
  dayCount: number;
  dayWindowStart: number;
}

const store = new Map<string, RateLimitEntry>();

function cleanupExpiredEntries(now: number): void {
  for (const [ip, entry] of store) {
    const minuteExpired = now - entry.minuteWindowStart > LIMITS.MINUTE_WINDOW_MS;
    const dayExpired = now - entry.dayWindowStart > LIMITS.DAILY_WINDOW_MS;
    if (minuteExpired && dayExpired) {
      store.delete(ip);
    }
  }
}

export function checkContactRateLimit(ip: string): RateLimitResult {
  const now = Date.now();

  cleanupExpiredEntries(now);

  const entry = store.get(ip) ?? {
    minuteCount: 0,
    minuteWindowStart: now,
    dayCount: 0,
    dayWindowStart: now,
  };

  if (now - entry.minuteWindowStart > LIMITS.MINUTE_WINDOW_MS) {
    entry.minuteCount = 0;
    entry.minuteWindowStart = now;
  }
  if (now - entry.dayWindowStart > LIMITS.DAILY_WINDOW_MS) {
    entry.dayCount = 0;
    entry.dayWindowStart = now;
  }

  if (entry.minuteCount >= LIMITS.MINUTE_MAX) {
    store.set(ip, entry);
    return {
      allowed: false,
      limit: LIMITS.MINUTE_MAX,
      remaining: 0,
      resetAt: new Date(entry.minuteWindowStart + LIMITS.MINUTE_WINDOW_MS),
      reason: "minute_limit",
    };
  }
  if (entry.dayCount >= LIMITS.DAILY_MAX) {
    store.set(ip, entry);
    return {
      allowed: false,
      limit: LIMITS.DAILY_MAX,
      remaining: 0,
      resetAt: new Date(entry.dayWindowStart + LIMITS.DAILY_WINDOW_MS),
      reason: "daily_limit",
    };
  }

  entry.minuteCount++;
  entry.dayCount++;
  store.set(ip, entry);

  return {
    allowed: true,
    limit: LIMITS.MINUTE_MAX,
    remaining: LIMITS.MINUTE_MAX - entry.minuteCount,
    resetAt: new Date(entry.minuteWindowStart + LIMITS.MINUTE_WINDOW_MS),
  };
}
