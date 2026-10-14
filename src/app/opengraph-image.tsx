import { readFileSync } from "node:fs";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { company, HOMEPAGE_POSITIONING } from "@/content/company";

/**
 * Default social card, generated at build time.
 *
 * Architecture matches the Pixelette Technologies / Holdings card: fixed
 * 1200×630 column, space-between, three children (lockup / positioning /
 * footer). Colours, mark and copy are Certified-only — petrol wash, green
 * wordmark, homepage H1.
 *
 * Nested routes do not inherit this file convention; every page names
 * `/opengraph-image` via `pageMetadata` in `src/lib/seo.ts`.
 *
 * No certification badges on this card. Claims on the default share image
 * would appear on every LinkedIn / Slack / X / iMessage share; only the
 * incorporation line is shown.
 */
export const alt = `${company.name}: ${HOMEPAGE_POSITIONING.h1}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Transparent Certified wordmark from the header. Read once per build into a
 * data URI — Satori rejects relative paths, and fetching the live host at
 * build time is unreliable.
 *
 * Artwork: public/logos/logo-green-text.svg, viewBox / intrinsic 273×80.
 * Header logo is h-9 (36px) tall; card lockup is 2.5× that so it holds against
 * a 62px headline. Width follows the same aspect rule as the header.
 */
const LOGO_DATA_URI = `data:image/svg+xml;base64,${readFileSync(
  join(process.cwd(), "public", "logos", "logo-green-text.svg"),
).toString("base64")}`;

const LOGO_HEIGHT = 90;
const LOGO_WIDTH = Math.round((LOGO_HEIGHT * 273) / 80);

/** Site tokens from globals.css — brand wash, ink, brand, body. */
const COLOR = {
  ink: "#0A0A0A",
  brand: "#065456",
  body: "#3F4E4E",
  page: "#FFFFFF",
  wash: "#D2EFEC",
} as const;

const [lineOne, lineTwo, lineThree] = HOMEPAGE_POSITIONING.lines;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          // Soft wash matching `.wash` / `--color-brand-wash` on marketing surfaces.
          background: `linear-gradient(150deg, ${COLOR.page} 0%, ${COLOR.wash} 100%)`,
          padding: "72px 80px",
          // Display face on the site is Newsreader → Georgia; Satori-safe match.
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori draws
              this, not a browser; next/image cannot exist in an ImageResponse. */}
          <img
            src={LOGO_DATA_URI}
            width={LOGO_WIDTH}
            height={LOGO_HEIGHT}
            alt={company.name}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 62,
              lineHeight: 1.1,
              color: COLOR.ink,
              letterSpacing: "-0.02em",
            }}
          >
            {lineOne}
          </div>
          <div
            style={{
              fontSize: 62,
              lineHeight: 1.1,
              color: COLOR.ink,
              letterSpacing: "-0.02em",
            }}
          >
            {lineTwo}
          </div>
          <div
            style={{
              fontSize: 62,
              lineHeight: 1.1,
              color: COLOR.brand,
              letterSpacing: "-0.02em",
            }}
          >
            {lineThree}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 21,
            color: COLOR.body,
            fontFamily: "sans-serif",
          }}
        >
          <span>
            UK cyber security and compliance consultancy
          </span>
        </div>
      </div>
    ),
    size,
  );
}
