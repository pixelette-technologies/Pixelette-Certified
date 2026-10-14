import type { Metadata } from "next";

import { SITE_URL, company } from "@/content/company";

/** Generated default card — see `src/app/opengraph-image.tsx`. */
export const DEFAULT_OG_IMAGE = "/opengraph-image";

const OG_IMAGE_ALT = `${company.name}: ${company.tagline}`;

/**
 * Open Graph + Twitter image fields for the shared generated card.
 * Used by root layout defaults; pages should prefer `pageMetadata`.
 */
export function shareImageMetadata(image: string = DEFAULT_OG_IMAGE): {
  openGraphImages: NonNullable<NonNullable<Metadata["openGraph"]>["images"]>;
  twitterCard: "summary_large_image";
  twitterImages: string[];
} {
  const openGraphImages =
    image === DEFAULT_OG_IMAGE
      ? [{ url: image, width: 1200, height: 630, alt: OG_IMAGE_ALT }]
      : [{ url: image, alt: OG_IMAGE_ALT }];

  return {
    openGraphImages,
    twitterCard: "summary_large_image",
    twitterImages: [image],
  };
}

/**
 * Per-page metadata builder.
 *
 * The opengraph-image file convention is NOT inherited by nested routes, so
 * every page names `/opengraph-image` explicitly (unless `ogImage` overrides).
 * Open Graph does not inherit the root title template — brand is added to
 * og:title unless `absoluteTitle` is set.
 *
 * The KB builder extracts exact string literals from
 * `pageMetadata({ title, description, path })` calls — keep those fields as
 * string literals at the call site where possible.
 */
export function pageMetadata(input: {
  title: string;
  description: string;
  path: string;
  /**
   * Emit the title exactly as given, bypassing the root layout's
   * "%s | Pixelette Certified" template.
   */
  absoluteTitle?: boolean;
  /** Defaults to the generated `/opengraph-image` card. */
  ogImage?: string;
  noIndex?: boolean;
  /** Defaults to `website`. Use `article` for insight posts. */
  ogType?: "website" | "article";
  /** Publication metadata, for insight articles. */
  article?: { publishedTime?: string; modifiedTime?: string; authors?: string[] };
}): Metadata {
  const url = `${SITE_URL}${input.path === "/" ? "" : input.path}`;
  const image = input.ogImage ?? DEFAULT_OG_IMAGE;
  const { openGraphImages, twitterCard, twitterImages } = shareImageMetadata(image);

  const ogTitle = input.absoluteTitle
    ? input.title
    : `${input.title} · ${company.name}`;

  return {
    title: input.absoluteTitle ? { absolute: input.title } : input.title,
    description: input.description,
    alternates: { canonical: url },
    robots: input.noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: input.article || input.ogType === "article" ? "article" : "website",
      siteName: company.name,
      locale: "en_GB",
      title: ogTitle,
      description: input.description,
      url,
      images: openGraphImages,
      ...(input.article ?? {}),
    },
    twitter: {
      card: twitterCard,
      title: ogTitle,
      description: input.description,
      images: twitterImages,
    },
  };
}
