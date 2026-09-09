/**
 * Fails if any banned marketing claim has escaped the claims register.
 *
 * Brief §16: "A website copy change that adds an accreditation, badge, statistic
 * or client result should require evidence approval before deployment." This is
 * that gate. The rules themselves live in src/lib/claims/register.mjs, which is
 * shared with Alice's runtime guard so the two can never drift.
 *
 * Modelled on check-legacy-tokens.mjs, with three deliberate differences:
 *
 *   1. ALL rules are evaluated per line, not `else if`. A single line often
 *      carries both a statistic and a timeline (SITE_CONFIG.description did),
 *      and reporting one hit at a time means a developer fixes it, re-runs, and
 *      gets a second failure on the same line.
 *   2. public/ is walked as well as src/. llms.txt and llms-full.txt restated
 *      every banned claim to AI crawlers, and a src-only scanner never saw them.
 *      Filenames are checked too, which catches a third-party badge image
 *      dropped into public/logos/.
 *   3. Required disclosures are checked. Without that inverse rule, deleting an
 *      inoculating sentence during a redesign passes every forbid rule.
 */
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, relative, sep } from "node:path";
import {
  CLAIM_RULES,
  REQUIRED_DISCLOSURES,
  PROHIBITION_TEXT_FILES,
  APPROVED_CREDENTIALS,
  CREDENTIAL_TOKEN_PATTERN,
  isCommentLine,
  hasNegationBefore,
  validateRegister,
} from "../src/lib/claims/register.mjs";

const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const SRC = join(ROOT, "src");
const PUBLIC = join(ROOT, "public");

/** Source files worth scanning. .mjs and .json included so neither can smuggle copy. */
const SCANNABLE = /\.(tsx?|jsx?|mjs|mts|css|mdx?|json)$/;
/** Text assets in public/ that are served verbatim. */
const PUBLIC_TEXT = /\.(txt|md|json|html?|xml)$/;
/** Third-party marks that must not appear as asset filenames (text labels only). */
const THIRD_PARTY_MARK = /(?:pecb|iapp|isaca|irca|cqi|ukas|iasme|crest|ec-council|aicpa|pci)/i;

/** The register defines its own exemption; skipping the directory is cleaner than a regex. */
const SKIP_DIRS = new Set(["node_modules", ".next", ".git"]);
const REGISTER_DIR = join("src", "lib", "claims");

const hits = [];

function record(category, id, why, location) {
  hits.push({ category, id, why, location });
}

/** Files whose whole job is to enumerate the banned claims. See the register. */
function isProhibitionText(relPath) {
  const normalised = relPath.split(sep).join("/");
  return PROHIBITION_TEXT_FILES.some((ex) => normalised === ex.path.split(sep).join("/"));
}

function isExempt(rule, relPath) {
  const normalised = relPath.split(sep).join("/");
  return (rule.exempt ?? []).some((ex) => normalised.startsWith(ex.path.split(sep).join("/")));
}

function scanText(relPath, contents) {
  // Prohibition text is skipped for the forbid rules only. The required-
  // disclosure check below still applies to these files, so the constraints
  // themselves cannot be deleted silently.
  if (isProhibitionText(relPath)) return;

  const lines = contents.split("\n");

  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    const comment = isCommentLine(line);
    const location = `${relPath}:${i + 1}: ${trimmed.slice(0, 140)}`;

    for (const rule of CLAIM_RULES) {
      if (rule.skipComments && comment) continue;
      if (rule.fileFilter && !rule.fileFilter.test(relPath)) continue;
      if (isExempt(rule, relPath)) continue;

      // Every rule is tested, not else-if: one line can breach several, and a
      // developer who fixes the first hit should not be surprised by a second.
      const found = line.match(rule.pattern);
      if (!found) continue;

      // The brief does not just forbid claiming accreditation, it REQUIRES
      // disclosing its absence. "We are not UKAS accredited, not an IASME
      // Certification Body, not a PCI QSA" is the mandated wording and contains
      // three banned tokens. Failing it would push authors toward vagueness.
      if (rule.negationAware && found.index !== undefined && hasNegationBefore(line, found.index, found[0])) {
        continue;
      }

      record(rule.category, rule.id, rule.why, location);
    }

    // Credential allowlist. Any recognised credential token that is not in
    // APPROVED_CREDENTIALS fails, which is the mechanism that makes publishing
    // a new credential a deliberate, reviewable, one-line diff.
    if (!comment) {
      const tokens = trimmed.match(CREDENTIAL_TOKEN_PATTERN);
      for (const token of tokens ?? []) {
        const approved = APPROVED_CREDENTIALS.some((c) => c.toUpperCase().includes(token.toUpperCase()));
        if (!approved) {
          record(
            "unregistered credential",
            "credential-allowlist",
            `"${token}" is not in APPROVED_CREDENTIALS. Add it to src/lib/claims/register.mjs only with a certificate to point at.`,
            location
          );
        }
      }
    }
  });
}

function walk(dir, { filter, checkFilenames = false }) {
  if (!existsSync(dir)) return;

  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const rel = relative(ROOT, full);

    if (statSync(full).isDirectory()) {
      if (SKIP_DIRS.has(entry)) continue;
      if (rel.startsWith(REGISTER_DIR)) continue; // exempt by construction
      walk(full, { filter, checkFilenames });
      continue;
    }

    if (checkFilenames && THIRD_PARTY_MARK.test(entry)) {
      record(
        "third-party mark",
        "third-party-logo",
        "Credentials may be shown as text labels only. Logo-use rights have not been confirmed for any third-party mark.",
        `${rel}: asset filename`
      );
    }

    if (!filter.test(entry)) continue;
    scanText(rel, readFileSync(full, "utf8"));
  }
}

// ── 1. The register must be well-formed before it is trusted ────────────────
const registerProblems = validateRegister();
if (registerProblems.length > 0) {
  console.error("The claims register itself is malformed:\n");
  for (const problem of registerProblems) console.error(`  ${problem}`);
  console.error("\nFix src/lib/claims/register.mjs before this gate can run.");
  process.exit(1);
}

// ── 2. Walk the property ───────────────────────────────────────────────────
walk(SRC, { filter: SCANNABLE });
walk(PUBLIC, { filter: PUBLIC_TEXT, checkFilenames: true });

// ── 3. Required disclosures must still be present ──────────────────────────
for (const disclosure of REQUIRED_DISCLOSURES) {
  const full = join(ROOT, disclosure.path);
  if (!existsSync(full)) {
    record(
      "missing disclosure",
      "required-disclosure",
      `${disclosure.why} (file not found)`,
      disclosure.path
    );
    continue;
  }
  if (!readFileSync(full, "utf8").includes(disclosure.mustContain)) {
    record(
      "missing disclosure",
      "required-disclosure",
      disclosure.why,
      `${disclosure.path}: expected to contain "${disclosure.mustContain}"`
    );
  }
}

// ── 4. Report ──────────────────────────────────────────────────────────────
if (hits.length === 0) {
  console.log("No unregistered claims found.");
  process.exit(0);
}

console.error("Claims that are not in the register:\n");

const byCategory = new Map();
for (const hit of hits) {
  if (!byCategory.has(hit.category)) byCategory.set(hit.category, new Map());
  const byRule = byCategory.get(hit.category);
  if (!byRule.has(hit.id)) byRule.set(hit.id, { why: hit.why, locations: [] });
  byRule.get(hit.id).locations.push(hit.location);
}

for (const [category, byRule] of byCategory) {
  for (const [id, { why, locations }] of byRule) {
    console.error(`  [${category}] ${id}`);
    console.error(`    ${why}`);
    for (const location of locations) console.error(`      ${location}`);
    console.error("");
  }
}

const ruleCount = [...byCategory.values()].reduce((sum, byRule) => sum + byRule.size, 0);
console.error(`${hits.length} occurrence(s) across ${ruleCount} rule(s).\n`);
console.error(
  "A website copy change that adds an accreditation, badge, statistic or client\n" +
    "result requires evidence approval before deployment (brief §16). If this claim\n" +
    "is now evidenced, add an entry to the rule's `exempt` array in\n" +
    "src/lib/claims/register.mjs naming the evidence and the approver, and include\n" +
    "that evidence in the pull request."
);

process.exit(1);
