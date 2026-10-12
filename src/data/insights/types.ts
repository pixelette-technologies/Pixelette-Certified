/**
 * The Insights article model.
 *
 * Each article lives in its own file under ./articles and is collected by
 * ./index.ts. One file per article keeps editorial review to a single diff per
 * piece, which matters here: every article carries regulatory statements that
 * have to be checked against their sources before publication.
 *
 * The shape encodes the editorial standard in the 25 September 2026 rebuild
 * specification (§19, §32): a category, a standfirst, dates, a structured body,
 * sources for substantive claims, and one restrained service link at the end.
 * `sources` is not optional, so an article without references cannot compile.
 */

export const INSIGHT_CATEGORIES = [
  "UK compliance",
  "US assurance",
  "GCC regulation",
  "AI governance",
  "Cyber and GRC",
] as const;

export type InsightCategory = (typeof INSIGHT_CATEGORIES)[number];

/** Purpose-built diagrams. Add a key here only when a visual explains the article. */
export const INSIGHT_VISUALS = ["gcc-landscape"] as const;

export type InsightVisual = (typeof INSIGHT_VISUALS)[number];

export type InsightBlock =
  /** A body paragraph. May contain bracketed source markers such as [1]. */
  | { type: "p"; text: string }
  /** A section heading, sentence case, no terminal full stop. */
  | { type: "h2"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  /**
   * A boxed aside. Use it for a key distinction, or for an example, in which
   * case the title must say it is illustrative ("Illustrative example").
   */
  | { type: "callout"; title: string; text: string };

export interface InsightSource {
  title: string;
  publisher: string;
  url: string;
}

export interface Insight {
  /** The URL segment. Existing slugs are retained for continuity. */
  slug: string;
  /** The on-page H1. Sentence case. */
  title: string;
  /** The <title>. The layout appends "| Pixelette Certified". */
  seoTitle: string;
  /** One or two sentences under the H1 saying what the article covers. */
  standfirst: string;
  /** Meta description, around 150 characters. */
  description: string;
  /**
   * Archive scan line, about 18 to 22 words. The standfirst stays on the
   * article page. This is the only sentence shown in Latest and Browse.
   */
  summary: string;
  /**
   * When set, this article is the configured featured insight on the index.
   * Do not infer the feature from list order. At most one article should set it.
   */
  featured?: boolean;
  /**
   * Key for a purpose-built diagram on the index. Absent means the article
   * stays typographic, including in the archive.
   */
  visual?: InsightVisual;
  category: InsightCategory;
  /** The jurisdiction the article addresses, e.g. "United Kingdom". */
  jurisdiction: string;
  /** ISO date first published. */
  published: string;
  /** ISO date of the last substantive revision, where there has been one. */
  updated?: string;
  readingTime: string;
  body: InsightBlock[];
  sources: InsightSource[];
  /** The single service link shown at the end of the article. */
  service: { label: string; href: string };
  /** Slugs of up to three related articles. */
  related: string[];
}
