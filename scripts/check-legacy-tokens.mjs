/**
 * Fails if any Tailwind utility still references a retired dark-theme colour
 * token (primary / accent / surface / glass). Tailwind v4 emits nothing for an
 * unknown utility, so a missed `text-accent` would otherwise fail silently:
 * no build error, just inherited colour. This is the gate for that.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const SRC = join(ROOT, "src");
const PATTERN =
  /\b(bg|text|border|from|via|to|ring|fill|stroke|outline|divide)-(primary|accent|surface|glass)(-(light|dark|border))?\b/;

/**
 * Retired Pixelette Technologies pattern-guide values. The site ran these
 * between the revamp (8890cd4) and the Certified brand layer; anything still
 * carrying one has been missed by the palette change and will render a full
 * palette behind the rest of the page, silently.
 *
 * Deliberately a dumb hex matcher with no comment parsing, which is why the
 * provenance notes in globals.css write bare values like "was 414D5C" with no
 * hash. If you need to name a retired colour in prose, do it the same way.
 */
const RETIRED_HEX =
  /#(056F62|045A4F|C7EBDF|E4F4EF|06222B|123240|0B2C36|04211F|080F0F|1C4744|1B3D4A|2A6460|0A2A34|04191F|F4F7FA|E2E8EF|DFE6EE|DDE4EC|C3D1DE|414D5C|5D6B7D|62707F)\b/i;

/**
 * Raw hex anywhere else. Colour belongs in a token, so that the next brand
 * layer is one file to edit rather than an archaeology exercise.
 *
 * Pure white and black are not palette colours - globals.css legitimately sets
 * white label text on a filled button - so they are always allowed.
 */
const RAW_HEX = /#(?!(?:FFF{1,4}|FFFFFF|000|000000)\b)[0-9A-Fa-f]{6}\b/i;

/**
 * Files where a literal hex is unavoidable, each for a stated reason:
 *   constants.ts     EMAIL_COLORS - HTML email cannot read custom properties
 *   globals.css      defines the tokens in the first place
 *   manifest.ts      PWA manifest is JSON, consumed outside the document
 *   notifications.ts Slack attachment severity colours, not site palette
 */
const RAW_HEX_EXEMPT =
  /^src[\\/](lib[\\/]constants\.ts|app[\\/]globals\.css|app[\\/]manifest\.ts|lib[\\/]alice[\\/]notifications\.ts)$/;

const hits = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full);
      continue;
    }
    if (!/\.(tsx?|jsx?|css|mdx?)$/.test(entry)) continue;
    const rel = relative(ROOT, full);
    const rawHexAllowed = RAW_HEX_EXEMPT.test(rel);
    readFileSync(full, "utf8")
      .split("\n")
      .forEach((line, i) => {
        const at = `${rel}:${i + 1}: ${line.trim()}`;
        if (PATTERN.test(line)) hits.push(["retired utility", at]);
        else if (RETIRED_HEX.test(line)) hits.push(["retired guide hex", at]);
        else if (!rawHexAllowed && RAW_HEX.test(line)) hits.push(["raw hex, use a token", at]);
      });
  }
}

walk(SRC);

if (hits.length > 0) {
  console.error("Colour that has escaped the token layer:\n");
  for (const [kind, at] of hits) console.error(`  [${kind}] ${at}`);
  console.error(`\n${hits.length} occurrence(s).`);
  process.exit(1);
}

console.log("No retired colour tokens found.");
