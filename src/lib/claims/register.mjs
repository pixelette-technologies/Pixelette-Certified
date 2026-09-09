/**
 * THE CLAIMS REGISTER
 *
 * Brief §16: "Keep all claims behind an internal claims register. A website copy
 * change that adds an accreditation, badge, statistic or client result should
 * require evidence approval before deployment."
 *
 * This file is that register, in executable form. It has two consumers:
 *
 *   1. scripts/check-claims.mjs  - the build gate that walks src/ and public/
 *   2. src/app/api/chat/route.ts - Alice's deterministic pre-delivery guard
 *
 * They share one definition on purpose. This codebase has already been bitten by
 * the alternative: see the provenance comment on EMAIL_COLORS in
 * src/lib/constants.ts, which records the transactional emails drifting a full
 * palette behind the site because a constant had no importers. A banned-claim
 * list that exists in two places will diverge, and the half that diverges is the
 * half nobody is watching.
 *
 * WHY .mjs AND NOT .ts
 * The lint script must run under plain `node` with no build step and no
 * --experimental-strip-types flag, which is unflagged on Node 25 locally but not
 * guaranteed on Vercel's runtime. tsconfig has allowJs, so this is still
 * type-checked from the TypeScript side.
 *
 * WHY THIS FILE IS NOT SCANNED BY THE GATE
 * The scanner skips src/lib/claims/ entirely. The one file that must contain
 * every banned phrase verbatim is therefore exempt by construction rather than
 * by an exemption rule, which is the cleanest possible self-reference.
 *
 * ADDING AN EXEMPTION
 * Every entry in a rule's `exempt` array requires `reason`, `evidence`,
 * `approvedBy` and `date`. An exemption with an empty `evidence` string is
 * itself a lint failure. That requirement is what makes this a register rather
 * than an ignore-list: you cannot silence a rule without naming the document
 * that justifies it, and the diff shows who approved it.
 */

/**
 * @typedef {Object} ClaimExemption
 * @property {string} path      Repo-relative path, or a path prefix
 * @property {string} reason    Why this occurrence is legitimate
 * @property {string} evidence  The document that substantiates it. MUST be non-empty.
 * @property {string} approvedBy Who signed it off
 * @property {string} date      ISO date of approval
 */

/**
 * @typedef {Object} ClaimRule
 * @property {string} id
 * @property {string} category
 * @property {RegExp} pattern
 * @property {string} why           Printed on failure, so it must explain itself
 * @property {boolean} [skipComments] Skip lines that are pure comments
 * @property {boolean} [runtime]    Also applied to Alice's generated replies
 * @property {RegExp} [fileFilter]  Only apply to files matching this
 * @property {boolean} [negationAware] Skip when preceded by a negator (mandated disclosures)
 * @property {ClaimExemption[]} exempt
 */

/**
 * Credentials that may appear anywhere on the property, as INDIVIDUAL or NETWORK
 * practitioner credentials only, never as corporate accreditations.
 *
 * Sourced from the brief's verification register (§14). Deliberately absent:
 *   FIP    - marked HOLD, current IAPP status not verified
 *   CEH    - not in the register at all
 *   IRCA   - the supplied certificate proves course completion, not current
 *            registration, so the title may not be used
 *   CQI    - corporate membership, not a practitioner credential
 *
 * Publishing a new credential means adding a string here, which is a one-line
 * reviewable diff a reviewer can trace back to a certificate.
 */
export const APPROVED_CREDENTIALS = [
  "PECB Certified ISO/IEC 42001 Lead Auditor",
  "CISA",
  "AIGP",
  "CIPM",
  "CIPP/US",
  "CCSK",
  "CCZT",
];

/** @type {ClaimRule[]} */
export const CLAIM_RULES = [
  // ─────────────────────────────────────────────────────────────────────────
  // Unevidenced statistics
  // skipComments is false throughout this class: a statistic sitting in a
  // comment is one copy-paste away from being copy.
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "pass-rate",
    category: "unevidenced statistic",
    // Phrase-based rather than number-based, so it catches 98%, the two 100%
    // variants in industries.ts, and any future figure, in one rule.
    pattern: /first[-\s]attempt\s+(?:audit\s+)?pass\s+rate/i,
    why: "No pass-rate claim may be published. No sampling frame, denominator or evidence exists.",
    runtime: true,
    exempt: [],
  },
  {
    id: "pct-98",
    category: "unevidenced statistic",
    pattern: /\b98\s*%/,
    why: "The 98% figure is unevidenced and is removed from the property.",
    runtime: true,
    exempt: [],
  },
  {
    id: "fifty-plus-certifications",
    category: "unevidenced statistic",
    /*
     * Two guards, each earning its place:
     *   (?<!\d)   so the legitimate "150+ entries" and "150+ employees" in
     *             services.ts pass untouched.
     *   (?!\s*\d) so arithmetic in a code comment ("50 + 1 + 50 exceeds this
     *             cap") is not read as a quantity claim. A "50+" used as a
     *             claim is never followed by another number.
     */
    pattern: /(?<!\d)50\s*\+(?!\s*\d)/,
    why: "The '50+ certifications delivered' figure is unevidenced. The supplied partner profile cites 40+ engagements, not 50+ Pixelette certifications.",
    runtime: true,
    exempt: [],
  },
  {
    id: "certifications-delivered-count",
    category: "unevidenced statistic",
    pattern: /\b(?:\d+|fifty|dozens?|hundreds?)\s*\+?\s*(?:iso\s+)?certifications?\s+(?:delivered|completed|achieved)/i,
    why: "No count of certifications delivered may be published, in digits or words.",
    runtime: true,
    exempt: [],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Universal timelines
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "timeline-promise",
    exempt: [
      {
        path: "src/lib/alice/notifications.ts",
        reason:
          "Internal admin notification templates state a team RESPONSE window (\"Within 1 week\"), not a time to certification. These strings are emailed to staff and are never rendered to a visitor.",
        evidence:
          "src/lib/alice/notifications.ts RESPONSE_WINDOWS - lead follow-up SLAs, reviewed 8 September 2026.",
        approvedBy: "Upper management brief, implemented by engineering",
        date: "2026-09-08",
      },
    ],
    category: "universal timeline",
    pattern: /\b(?:in|within|takes?|from|as little as)\s+(?:just\s+|only\s+|as little as\s+)?\d{1,2}(?:\s*(?:-|–|to)\s*\d{1,2})?\s*weeks?\b/i,
    why: "No universal completion time may be promised before scoping. Rewrite durations as words rather than digits where a genuine third-party timescale must be described.",
    runtime: true,
  },
  {
    id: "timeline-noun",
    category: "universal timeline",
    pattern: /\b\d{1,2}\s*[-–]?\s*week\s+(?:certification|roadmap|delivery|engagement|timeline|programme|program|project|model|cycle|plan)/i,
    why: "No weeks-to-certification product framing, e.g. '10 Week Certification Roadmap'.",
    runtime: true,
    exempt: [],
  },
  {
    id: "week-stat-tile",
    category: "universal timeline",
    // Quote-anchored so it can only match a data value, never prose.
    pattern: /["'`]\s*\d{1,2}\s*wk\s*["'`]/i,
    why: "Per-industry week-count stat tiles are unevidenced client outcomes.",
    exempt: [],
  },
  {
    id: "average-to-certification",
    category: "universal timeline",
    pattern: /average\s+to\s+certification|weeks?\s+average|avg[^,\n]{0,20}certification/i,
    why: "No average time to certification may be published.",
    runtime: true,
    exempt: [],
  },
  {
    id: "booking-window",
    category: "unevidenced statistic",
    pattern: /\bbook(?:s|ed|ing)?\b[^.\n]{0,60}\bwithin\s+(?:two|2)\s+weeks\b/i,
    why: "'Most clients book within two weeks' is an unevidenced conversion statistic.",
    runtime: true,
    exempt: [],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Accreditation and status claims - the legally load-bearing class.
  // skipComments is false: a commented-out CREST claim is one uncomment away.
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "crest",
    negationAware: true,
    category: "accreditation claim",
    // Case-sensitive so it cannot fire on "crestfallen" or "crescent".
    pattern: /\bCREST\b/,
    why: "No qualifying corporate or tester evidence was supplied. Penetration testing is HOLD for the first release.",
    runtime: true,
    exempt: [],
  },
  {
    id: "iasme",
    negationAware: true,
    category: "accreditation claim",
    // Naming the body that administers Cyber Essentials is factual and useful
    // in explanatory content. What must never appear is a claim to hold that
    // status ourselves, so the rule targets the self-claim, not the token.
    pattern: /\b(?:we|we're|our|Pixelette)\b[^.\n]{0,40}\bIASME\b|\bIASME[-\s](?:Certification Body|licensed|licence|accredited|assessor)/i,
    why: "No Pixelette IASME Certification Body or assessor status is verified. Use 'Cyber Essentials Readiness and Coordination' only.",
    runtime: true,
    exempt: [],
  },
  {
    id: "pci-qsa",
    negationAware: true,
    category: "accreditation claim",
    pattern: /\bQSA\b|PCI[\s-]*QSA/i,
    why: "No current QSA company or individual status evidence was supplied. Use 'PCI DSS Readiness and Compliance Support'.",
    runtime: true,
    exempt: [],
  },
  {
    id: "ceh",
    negationAware: true,
    category: "unregistered credential",
    pattern: /\bCEH\b|Certified Ethical Hacker/i,
    why: "CEH does not appear in the brief's verification register at all.",
    runtime: true,
    exempt: [],
  },
  {
    id: "fip",
    negationAware: true,
    category: "unregistered credential",
    // \b after FIP correctly fails inside "FIPS", so no false positive there.
    pattern: /\bFIP\b|Fellow of Information Privacy/i,
    why: "FIP is marked HOLD. Current IAPP status was not verified. Recheck before publishing.",
    runtime: true,
    exempt: [],
  },
  {
    id: "irca",
    negationAware: true,
    category: "unregistered credential",
    // No exemptions, deliberately. Blog prose about the third-party auditor
    // population ("IRCA-registered auditors") is technically legitimate, but at
    // scan time the token is indistinguishable from a self-claim. A blanket ban
    // is enforceable; a contextual one is not. Rewrite as "registered lead
    // auditors" without the brand.
    pattern: /\bIRCA\b/,
    why: "The supplied certificate proves completion of a CQI/IRCA-certified course, not current IRCA registration. The title may not be used until registry status is verified.",
    runtime: true,
    exempt: [],
  },
  {
    id: "cqi",
    negationAware: true,
    category: "unregistered credential",
    pattern: /\bCQI\b/,
    why: "CQI corporate membership is not a practitioner credential and is not in the approved register.",
    runtime: true,
    exempt: [],
  },
  {
    id: "ukas-self-claim",
    negationAware: true,
    category: "accreditation claim",
    // The discriminator that does the real work. "UKAS-accredited certification
    // body" (the legitimate generic prose, ~11 occurrences) passes; a bare
    // "UKAS-accredited" describing us fails.
    pattern: /UKAS[-\s]accredited(?![^.\n]{0,40}(?:certification bod|audit bod|auditor|assessment bod|\bCB\b))/i,
    why: "Pixelette Certified is not UKAS accredited. UKAS accreditation may only be described as a property of a third-party certification body.",
    runtime: true,
    exempt: [],
  },
  {
    id: "ukas-possessive",
    negationAware: true,
    category: "accreditation claim",
    pattern: /\b(?:we|we're|our|Pixelette)\b[^.\n]{0,40}\bUKAS\b/i,
    why: "A possessive next to UKAS reads as our accreditation even when the noun is a third party's.",
    runtime: true,
    exempt: [],
  },
  {
    id: "self-certification-body",
    negationAware: true,
    category: "accreditation claim",
    // Generic prose "certification body" (~36 legitimate occurrences) passes;
    // a first-person or copular self-description fails.
    // \b before the alternatives is load-bearing: without it, "our" matched
    // inside "your", so the entirely compliant sentence "the assessment is
    // carried out by your certification body" was reported as a self-claim.
    pattern: /\b(?:we are|we're|as an?|our)\s+(?:an?\s+)?(?:UKAS[-\s]accredited\s+)?(?:accredited\s+)?certification body/i,
    why: "Pixelette Certified is not a certification body and does not issue certificates.",
    runtime: true,
    exempt: [],
  },
  {
    id: "certified-practice",
    negationAware: true,
    category: "accreditation claim",
    pattern: /certified practice|own ISMS certified|we hold (?:the same|our own) (?:certification|ISO)/i,
    why: "No valid corporate ISO 27001 certificate for the contracting Pixelette entity was supplied.",
    runtime: true,
    exempt: [],
  },
  {
    id: "uk-accredited",
    negationAware: true,
    category: "accreditation claim",
    pattern: /\bUK[-\s]accredited\b/i,
    why: "'UK-accredited' asserts a corporate accreditation that does not exist.",
    runtime: true,
    exempt: [],
  },
  {
    id: "we-issue-certificates",
    negationAware: true,
    category: "accreditation claim",
    pattern: /\bwe\s+(?:issue|award|grant|certify)\b[^.\n]{0,40}(?:certificate|certification|report)/i,
    why: "Certificates and reports are issued by independent bodies, never by Pixelette Certified.",
    runtime: true,
    exempt: [],
  },
  {
    id: "soc2-certification",
    negationAware: true,
    category: "framework wording",
    // Tightened from a 20-character proximity match, which fired on any
    // comma-separated service list containing both "certification readiness"
    // and "SOC 2 Readiness". Only the actual banned construction matches now.
    pattern: /SOC\s*2\s+certif\w*|certif\w+\s+(?:to|for|of)\s+SOC\s*2/i,
    why: "SOC 2 is an examination and report under attestation standards, not a certification. Use 'SOC 2 Readiness'.",
    runtime: true,
    exempt: [],
  },
  {
    id: "cyber-essentials-body",
    negationAware: true,
    category: "framework wording",
    pattern: /Cyber Essentials\s+(?:Certification Body|assessor|certification body)/i,
    why: "No IASME-authorised status is verified. Use 'Cyber Essentials Readiness and Coordination'.",
    runtime: true,
    exempt: [],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Social-proof shapes. Structural rather than lexical: these catch the FORM
  // an unevidenced client claim takes, so reintroducing one has to be deliberate.
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "blockquote",
    category: "unevidenced social proof",
    pattern: /<blockquote/i,
    why: "After remediation there are no legitimate client quotations. Reintroducing one requires a consent record.",
    fileFilter: /\.(tsx?|jsx?|mdx?)$/,
    exempt: [],
  },
  {
    id: "testimonial",
    negationAware: true,
    category: "unevidenced social proof",
    pattern: /testimonial/i,
    why: "Testimonials are removed until client identity, permission and source evidence exist.",
    exempt: [],
  },
  {
    id: "case-study",
    negationAware: true,
    category: "unevidenced social proof",
    /*
     * Targets the withdrawn ROUTE and the old data shape, not the noun.
     *
     * Banning the phrase outright proved wrong once the remediation was done:
     * the evidence-policy copy has to be able to say "we do not publish client
     * case studies", and src/data/caseStudies.ts is the module that defines the
     * type. Both are the fix, not the problem.
     *
     * Content is enforced somewhere stronger than a regex now: CaseStudy has a
     * non-optional `evidence` block, so an unevidenced study cannot compile.
     */
    pattern: /["'`\/]case-studies\b|caseStudySnippet|\bcase[-\s]stud(?:y|ies)\b[^.\n]{0,30}\b(?:proves?|shows?|demonstrates?|delivered|achieved)\b/i,
    why: "The /case-studies route is withdrawn and unevidenced client outcomes may not be published. The CaseStudy type in src/data/caseStudies.ts enforces the evidence record; this rule catches the route and the old data shape coming back.",
    exempt: [],
  },
  {
    id: "anonymous-attribution",
    category: "unevidenced social proof",
    // Catches the shape of a role-only attribution in a data file, which is how
    // all three testimonials and all three case studies were encoded.
    pattern: /(?:author|role|company):\s*["'](?:CTO|CEO|CIO|CISO|Head of |Founder|VP |Director of )/i,
    why: "Role-only anonymous attribution is the encoding pattern of an unevidenced client quote.",
    exempt: [],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Puffery and superlatives
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "among-the-first",
    category: "puffery",
    pattern: /among\s+(?:the\s+)?first\b/i,
    why: "Unsubstantiated primacy claim.",
    runtime: true,
    exempt: [],
  },
  {
    id: "pioneer",
    category: "puffery",
    pattern: /\bpioneer(?:s|ing)?\b/i,
    why: "Unsubstantiated primacy claim.",
    runtime: true,
    exempt: [],
  },
  {
    id: "one-of-few",
    category: "puffery",
    pattern: /\bone of the (?:very )?few\b/i,
    why: "Unsubstantiated market-position claim.",
    runtime: true,
    exempt: [],
  },
  {
    id: "worlds-first",
    category: "puffery",
    pattern: /\bworld'?s first\b/i,
    why: "Unsubstantiated primacy claim.",
    runtime: true,
    exempt: [],
  },
  {
    id: "gold-standard",
    category: "puffery",
    pattern: /\bgold standard\b/i,
    why: "Unsubstantiated superlative applied to a credential.",
    runtime: true,
    exempt: [],
  },
  {
    id: "most-comprehensive",
    category: "puffery",
    pattern: /\bmost comprehensive/i,
    why: "Unsubstantiated superlative applied to a credential set or practitioner.",
    runtime: true,
    exempt: [],
  },
  {
    id: "guarantee",
    category: "puffery",
    // skipComments AND a file filter excluding .css: globals.css carries heavy
    // provenance prose and RevealObserver.tsx uses "guarantee" about animation
    // behaviour. Two independent controls rather than one, because a future
    // comment could easily reintroduce the word innocently.
    pattern: /\bguarantee(?:d|s)?\b/i,
    why: "No universal guarantee of certification or regulatory compliance may be offered. The named 'Pass First Guarantee' is withdrawn.",
    skipComments: true,
    fileFilter: /\.(tsx?|jsx?|mdx?)$/,
    runtime: true,
    exempt: [],
  },
];

/**
 * Files whose PURPOSE is to enumerate the banned claims, and which therefore
 * have to contain them verbatim to work at all.
 *
 * This is not a loophole, it is an acknowledgement that a prohibition must name
 * what it prohibits. "Never claim a 98% pass rate" cannot be written without
 * the string "98%". The scanner would otherwise force the constraint to be
 * written vaguely, which would make it less effective.
 *
 * These files are not unguarded. Three other controls cover them:
 *
 *   1. REQUIRED_DISCLOSURES below asserts that PART 6: NEVER CLAIM is still
 *      present in the prompt, so the constraints cannot be quietly deleted.
 *   2. The runtime guard in src/app/api/chat/route.ts checks Alice's actual
 *      OUTPUT against these same rules, which is the thing that reaches a
 *      visitor. Static instructions are not published copy; generated replies
 *      are.
 *   3. The post-conversation quality judge returns a COMPLIANCE verdict and
 *      routes failures to Slack.
 *
 * Consequence worth stating plainly: a genuine banned claim added to one of
 * these two files would not be caught by this gate. Any diff touching them must
 * be read by a human, which is why they are listed here rather than hidden in a
 * path filter.
 *
 * @type {ClaimExemption[]}
 */
export const PROHIBITION_TEXT_FILES = [
  {
    path: "src/lib/alice/systemPrompt.ts",
    reason:
      "PART 6 (NEVER CLAIM) and the per-section reminders must name each banned claim verbatim for the constraint to bind. Alice's real gate is the runtime output check, not this static scan.",
    evidence:
      "Verified Website Replacement brief, 8 September 2026, sections 'Non-negotiable publication rule' and 'Credential wording that must NOT appear'.",
    approvedBy: "Upper management brief, implemented by engineering",
    date: "2026-09-08",
  },
  {
    path: "src/lib/alice/qualityCheck.ts",
    reason:
      "The quality judge's FAIL criteria enumerate the banned claims so it can detect them. Removing the terms would blind the detector.",
    evidence:
      "Verified Website Replacement brief, 8 September 2026, section 16 (developer handoff), claims register requirement.",
    approvedBy: "Upper management brief, implemented by engineering",
    date: "2026-09-08",
  },
  {
    path: "scripts/check-claims.mjs",
    reason: "The gate's own documentation describes what it catches.",
    evidence: "Same brief, section 16.",
    approvedBy: "Upper management brief, implemented by engineering",
    date: "2026-09-08",
  },
];

/**
 * Disclosures that MUST be present. The inverse of everything above: without
 * these, someone deleting an inoculating sentence during a future redesign
 * passes every forbid rule and reintroduces the problem by omission.
 *
 * @type {{ path: string, mustContain: string, why: string }[]}
 */
export const REQUIRED_DISCLOSURES = [
  {
    path: "src/components/seo/JsonLd.tsx",
    mustContain: "not by Pixelette Certified",
    why: "The machine-readable disclaimer rides on OrganizationSchema, which renders on every page. Removing it silently strips the disclosure sitewide.",
  },
  {
    path: "src/app/about/AboutContent.tsx",
    mustContain: "not an accredited certification body",
    why: "The About page must carry the negative disclosure alongside the credential list.",
  },
  {
    path: "src/lib/alice/systemPrompt.ts",
    mustContain: "PART 6: NEVER CLAIM",
    why: "Alice's hard constraints must remain in her prompt. Deleting the section removes every guard at once.",
  },
];

/** Recognised credential tokens, used to enforce the allowlist above. */
export const CREDENTIAL_TOKEN_PATTERN =
  /\b(?:CIPP?\/[A-Z]{1,2}|CIPM|CIPT|CISA|CISM|CISSP|CRISC|CGEIT|AIGP|CCSK|CCZT|CEH|FIP)\b/g;

/** True when the trimmed line is a pure comment. */
export function isCommentLine(line) {
  return /^(?:\/\/|\/\*|\*|<!--|#)/.test(line.trim());
}

/**
 * True when a negator appears shortly before `index`.
 *
 * This exists because for several rules the COMPLIANT wording contains the
 * banned phrase. The brief does not merely forbid claiming accreditation, it
 * requires disclosing the absence of it - "we are not UKAS accredited, not an
 * IASME Certification Body, not a PCI QSA". A rule that fails the mandated
 * disclosure would push authors toward vagueness, which is the opposite of what
 * the brief wants. The same applies to Alice: the correct answer to "what is
 * your pass rate?" is "we do not publish a pass rate".
 *
 * Applied only to rules flagged `negationAware`. The statistics and timeline
 * rules deliberately are NOT: there is no legitimate reason for "98%" to appear
 * in site copy at all, negated or otherwise.
 */
const NEGATOR =
  /\b(?:do not|does not|don't|doesn't|did not|didn't|never|no longer|not|nor|cannot|can't|without)\b/;

export function hasNegationBefore(text, index, matched = "") {
  // The negator can sit either side of the match start. "We are not UKAS
  // accredited" is matched from "We", so the negator is INSIDE the match;
  // "we do not publish a pass rate" has it before. Both are the compliant
  // wording, so both must pass.
  const before = text.slice(Math.max(0, index - 60), index).toLowerCase();
  if (new RegExp(NEGATOR.source + "[^.]*$").test(before)) return true;
  return NEGATOR.test(matched.toLowerCase());
}

/**
 * Find claim-rule matches in a block of text.
 *
 * @param {string} text
 * @param {{ runtimeOnly?: boolean, filePath?: string }} [options]
 * @returns {{ id: string, category: string, why: string, match: string }[]}
 */
export function findClaimMatches(text, options = {}) {
  const { runtimeOnly = false, filePath } = options;
  const hits = [];

  for (const rule of CLAIM_RULES) {
    if (runtimeOnly && !rule.runtime) continue;
    if (filePath && rule.fileFilter && !rule.fileFilter.test(filePath)) continue;

    const found = text.match(rule.pattern);
    if (!found) continue;

    // Alice legitimately says "we do not publish a pass rate". Do not suppress
    // a compliant refusal just because it names the thing being refused.
    if (runtimeOnly && rule.negationAware && found.index !== undefined && hasNegationBefore(text, found.index, found[0])) {
      continue;
    }

    hits.push({
      id: rule.id,
      category: rule.category,
      why: rule.why,
      match: found[0],
    });
  }

  return hits;
}

/**
 * Validate the register itself. Called by the lint script before it walks
 * anything: a malformed exemption must fail the build, otherwise "add an
 * exemption" degrades into "add an ignore".
 *
 * @returns {string[]} problems, empty when the register is well-formed
 */
export function validateRegister() {
  const problems = [];
  const seen = new Set();

  // Prohibition-text files carry the same evidence burden as any exemption.
  for (const ex of PROHIBITION_TEXT_FILES) {
    if (!ex.path) problems.push("a prohibition-text entry has no path");
    if (!ex.evidence || !ex.evidence.trim()) {
      problems.push(`prohibition-text entry for "${ex.path}" has no evidence`);
    }
    if (!ex.approvedBy || !ex.approvedBy.trim()) {
      problems.push(`prohibition-text entry for "${ex.path}" has no approver`);
    }
    if (!ex.date || !/^\d{4}-\d{2}-\d{2}$/.test(ex.date)) {
      problems.push(`prohibition-text entry for "${ex.path}" has no valid ISO date`);
    }
  }

  for (const rule of CLAIM_RULES) {
    if (seen.has(rule.id)) problems.push(`duplicate rule id: ${rule.id}`);
    seen.add(rule.id);

    if (!rule.why || !rule.why.trim()) {
      problems.push(`rule ${rule.id} has no "why", so its failure message would not explain itself`);
    }

    for (const ex of rule.exempt ?? []) {
      if (!ex.path) problems.push(`rule ${rule.id} has an exemption with no path`);
      if (!ex.evidence || !ex.evidence.trim()) {
        problems.push(
          `rule ${rule.id} exemption for "${ex.path}" has no evidence. ` +
            `An exemption without a named evidence document is an ignore-list entry, not a register entry.`
        );
      }
      if (!ex.approvedBy || !ex.approvedBy.trim()) {
        problems.push(`rule ${rule.id} exemption for "${ex.path}" has no approver`);
      }
      if (!ex.date || !/^\d{4}-\d{2}-\d{2}$/.test(ex.date)) {
        problems.push(`rule ${rule.id} exemption for "${ex.path}" has no valid ISO date`);
      }
    }
  }

  return problems;
}
