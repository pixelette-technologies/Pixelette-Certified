// Rate limiting for Clara's chat API - in-memory sliding window per IP

const LIMITS = {
  MINUTE_MAX: 20,
  MINUTE_WINDOW_MS: 60 * 1000,
  DAILY_MAX: 200,
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

export function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now();

  // Lazy cleanup of stale entries
  cleanupExpiredEntries(now);

  let entry = store.get(ip);
  if (!entry) {
    entry = {
      minuteCount: 0,
      minuteWindowStart: now,
      dayCount: 0,
      dayWindowStart: now,
    };
  }

  // Reset minute window if expired
  if (now - entry.minuteWindowStart > LIMITS.MINUTE_WINDOW_MS) {
    entry.minuteCount = 0;
    entry.minuteWindowStart = now;
  }

  // Reset day window if expired
  if (now - entry.dayWindowStart > LIMITS.DAILY_WINDOW_MS) {
    entry.dayCount = 0;
    entry.dayWindowStart = now;
  }

  // Check minute limit
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

  // Check daily limit
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

  // Allow and increment
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

export function resetRateLimits(): void {
  store.clear();
}

/**
 * Extract the client IP from a Next.js Request, handling reverse proxies.
 */
export function extractClientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0].trim();
    if (first) return first;
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const cfIp = request.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();

  return "unknown";
}
