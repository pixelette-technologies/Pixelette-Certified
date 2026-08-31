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

const hits = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full);
      continue;
    }
    if (!/\.(tsx?|jsx?|css|mdx?)$/.test(entry)) continue;
    readFileSync(full, "utf8")
      .split("\n")
      .forEach((line, i) => {
        if (PATTERN.test(line)) hits.push(`${relative(ROOT, full)}:${i + 1}: ${line.trim()}`);
      });
  }
}

walk(SRC);

if (hits.length > 0) {
  console.error("Retired colour tokens still in use:\n");
  for (const hit of hits) console.error("  " + hit);
  console.error(`\n${hits.length} occurrence(s).`);
  process.exit(1);
}

console.log("No retired colour tokens found.");
