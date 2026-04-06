// Website scraper - fetches and parses visitor websites for Alice's analysis

import axios from "axios";
import * as cheerio from "cheerio";

export interface ScrapedWebsite {
  url: string;
  success: boolean;
  title: string | null;
  description: string | null;
  bodyText: string | null;
  wordCount: number;
  error: string | null;
}

const MAX_WORDS = 2000;

// Private/internal IP ranges and blocked schemes
const BLOCKED_HOSTS = ["localhost", "127.0.0.1", "0.0.0.0", "[::1]"];
const PRIVATE_PREFIXES = ["192.168.", "10.", "172.16.", "172.17.", "172.18.", "172.19.", "172.20.", "172.21.", "172.22.", "172.23.", "172.24.", "172.25.", "172.26.", "172.27.", "172.28.", "172.29.", "172.30.", "172.31."];

function isPrivateOrBlocked(hostname: string): boolean {
  const lower = hostname.toLowerCase();
  if (BLOCKED_HOSTS.includes(lower)) return true;
  if (PRIVATE_PREFIXES.some((p) => lower.startsWith(p))) return true;
  if (!lower.includes(".")) return true; // single-word hostnames
  return false;
}

/**
 * Extract a URL from a visitor's chat message.
 * Returns the first valid public URL found, or null.
 */
export function extractUrlFromMessage(message: string): string | null {
  // Match explicit URLs and bare domains
  const urlPattern = /(?:https?:\/\/[^\s<>"{}|\\^`[\]]+)|(?:(?:www\.)?[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z]{2,})+(?:\/[^\s<>"{}|\\^`[\]]*)?)/gi;

  const matches = message.match(urlPattern);
  if (!matches) return null;

  for (const raw of matches) {
    // Skip if too long
    if (raw.length > 200) continue;

    // Prepend https:// if no scheme
    const candidate = raw.startsWith("http://") || raw.startsWith("https://")
      ? raw
      : `https://${raw}`;

    try {
      const parsed = new URL(candidate);

      // Only allow http/https
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") continue;

      // Block private/internal
      if (isPrivateOrBlocked(parsed.hostname)) continue;

      // Must have a dot in hostname
      if (!parsed.hostname.includes(".")) continue;

      return parsed.href;
    } catch {
      continue;
    }
  }

  return null;
}

/**
 * Scrape a website's homepage and extract visible text content.
 * Never throws — returns a result object with success/error fields.
 */
export async function scrapeWebsite(url: string): Promise<ScrapedWebsite> {
  const result: ScrapedWebsite = {
    url,
    success: false,
    title: null,
    description: null,
    bodyText: null,
    wordCount: 0,
    error: null,
  };

  try {
    const response = await axios.get(url, {
      timeout: 5000,
      maxContentLength: 5 * 1024 * 1024,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; AliceBot/1.0; +https://pixelettecertified.com)",
        Accept: "text/html,application/xhtml+xml",
      },
      validateStatus: (status) => status < 400,
      maxRedirects: 3,
      responseType: "text",
    });

    const html = response.data as string;
    const $ = cheerio.load(html);

    // Extract title
    result.title = $("title").first().text().trim() || null;

    // Extract meta description
    result.description =
      $('meta[name="description"]').attr("content")?.trim() ||
      $('meta[property="og:description"]').attr("content")?.trim() ||
      null;

    // Remove non-content elements before extracting body text
    $("script, style, nav, header, footer, iframe, noscript, svg").remove();
    $(".navigation, .nav, .footer, .header, .menu, .sidebar, .cookie-banner").remove();

    // Extract and clean body text
    let bodyText = $("body").text();
    // Collapse whitespace
    bodyText = bodyText.replace(/\s+/g, " ").trim();

    if (bodyText.length > 0) {
      const words = bodyText.split(/\s+/);
      result.wordCount = words.length;

      if (words.length > MAX_WORDS) {
        result.bodyText = words.slice(0, MAX_WORDS).join(" ") + " ... [truncated]";
      } else {
        result.bodyText = bodyText;
      }

      result.success = true;
    } else {
      result.error = "No visible text content found on page";
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.code === "ECONNABORTED") {
        result.error = "Request timed out after 5 seconds";
      } else if (err.response) {
        result.error = `HTTP ${err.response.status}: ${err.response.statusText}`;
      } else if (err.code === "ENOTFOUND") {
        result.error = "Domain not found (DNS lookup failed)";
      } else {
        result.error = err.message;
      }
    } else {
      result.error = err instanceof Error ? err.message : "Unknown scraping error";
    }
    console.error(`[Alice Scraper] Failed to scrape ${url}: ${result.error}`);
  }

  return result;
}

/**
 * Format scraped website content as context for Alice's Claude API call.
 */
export function formatScrapedContentForClaude(scraped: ScrapedWebsite): string {
  if (!scraped.success) {
    return [
      `[WEBSITE ANALYSIS - Visitor shared: ${scraped.url}]`,
      `Note: This website could not be fetched (${scraped.error}). Do not fabricate details about it. Ask the visitor about their business verbally instead.`,
      `[END WEBSITE ANALYSIS]`,
    ].join("\n");
  }

  return [
    `[WEBSITE ANALYSIS - Visitor shared: ${scraped.url}]`,
    `Title: ${scraped.title || "not found"}`,
    `Description: ${scraped.description || "not found"}`,
    `Content (first ${MAX_WORDS} words):`,
    scraped.bodyText || "content could not be extracted",
    `[END WEBSITE ANALYSIS]`,
  ].join("\n");
}
