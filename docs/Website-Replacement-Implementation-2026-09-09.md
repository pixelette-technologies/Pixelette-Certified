# Verified Website Replacement — Implementation Record

Implementation of *Pixelette Certified | Verified Website Replacement Copy* (brief dated 8 September 2026) against the `pixelette-certified` codebase.

- **Commit:** `a249d39` on `main`, 86 files, +5038 / −2039
- **Branch:** `compliance/verified-website-replacement` (merged, retained locally)
- **Status:** implemented and verified. **Not yet deployed.** Four prerequisites outstanding, see [[#Before this can go live]]. Last reviewed 18 September 2026 — see [[#Status log]].

The brief did two things at once: it repositioned the commercial proposition, and it imposed a strict evidence rule. The second is the reason this was urgent — the site was publishing accreditation and performance claims that no supplied evidence supported, and it was publishing them in places a casual review would not look.

---

## Why this was larger than a copy change

The initial read suggested text and section reordering. It was not, for three reasons found during implementation:

1. **The claims were in machine-readable data, not just visible copy.** `OrganizationSchema` renders from [layout.tsx:132](src/app/layout.tsx#L132), so the "98% first-attempt pass rate" claim was in schema.org structured data on *every* URL in the sitemap. Invisible in a browser, fully visible to a crawler or an AI overview.
2. **`public/llms.txt` and `public/llms-full.txt` restated every banned claim** for AI crawlers, including the company number and the full credential recital. Outside `src/`, so any source-only sweep misses them entirely.
3. **The chatbot asserted the claims conversationally.** [systemPrompt.ts](src/lib/alice/systemPrompt.ts) contained the statistics, three fabricated-looking case studies with verbatim quotes, and a scripted instruction to deploy the 98% figure whenever a visitor mentioned a competitor — in what reads as a pre-contractual sales conversation, logged to Supabase and emailed to the team.

A fourth, found later: every service's `process` array was a week-numbered table ("Week 1" … "Weeks 10–12") rendered across ten pages. That is a per-standard time-to-certificate promise, and no numeric search for `10 weeks` would ever have surfaced it.

---

## What was removed

| Claim | Where it was | Action |
|---|---|---|
| "98% first-attempt pass rate" | 13 files incl. `OrganizationSchema`, OpenGraph, root metadata | Removed |
| "50+ certifications delivered" | [constants.ts](src/lib/constants.ts), homepage, About, About metadata | Removed |
| Universal 10-week promise | 22 files, incl. one blog slug | Removed / reframed as scope-dependent |
| "ISO 27001 Certified Practice" | 7 places incl. a homepage badge band above the fold and an `EducationalOccupationalCredential` entry | Removed |
| "among the first in the UK", "pioneers" | 13 occurrences | Removed |
| "CREST-certified testers" | [services.ts](src/data/services.ts) pen-testing entry | Service withdrawn entirely |
| "SOC 2 Compliance Report issued" | SOC 2 `features` and `pricing`, twice | Reworded — a consultancy cannot issue that report |
| Anonymous testimonials | `Testimonials.tsx`, 3 quotes | Component deleted |
| Case studies | Two independent data copies, 3 studies | Route withdrawn, 301s added |
| Per-service week tables | 73 process steps across the catalogue | Renumbered to `Phase 1…5` |
| "Pass First Guarantee" | Homepage ×2, plus one FAQ stating it in prose | Removed — see [[#Open questions for management]] |

The prose form mattered as much as the numeric one. The ISO 27001 FAQ read *"Clients who go through our full implementation process do not fail Stage 2 on documentation grounds"* — a pass-rate claim that would survive any purge based on digits.

---

## Credentials: the structural fix

The brief's core rule is that accreditation belongs to the entity that holds it. The site was converting one practitioner's certificates into corporate capability in three places, and they had already drifted — two of them published a "9 active certifications" aggregate that is arithmetically **one person's eight credentials plus a paid corporate membership**.

Fixes:

- [about/page.tsx](src/app/about/page.tsx) — the `Organization.hasCredential` array and **both** `Person` blocks are deleted rather than reworded. schema.org has no property meaning *"practitioners in our delivery network hold these"*, so no compliant rewrite exists. Pairing `worksFor` with `hasCredential` is precisely the mechanism that converts an individual's certificates into an organisational capability in a knowledge graph.
- [credentials.ts](src/data/credentials.ts) is now the single source, with a `verifiable` gate. Seven credentials publish; **FIP, CEH, IRCA and CQI are withheld** per the brief's verification register.
- No named practitioner appears anywhere on the site. The 18 blog bylines are now organisational, which is correct regardless of how the employment question resolves.
- The About page carries a deliberate **negative disclosure card** ("What we are not"), which the claims gate asserts must remain present.

---

## The claims register (brief §16)

> "Keep all claims behind an internal claims register. A website copy change that adds an accreditation, badge, statistic or client result should require evidence approval before deployment."

Implemented as executable code rather than a document.

**[src/lib/claims/register.mjs](src/lib/claims/register.mjs)** — ~30 rules, shared by two consumers so they cannot drift:

1. [scripts/check-claims.mjs](scripts/check-claims.mjs) — the build gate
2. [api/chat/route.ts](src/app/api/chat/route.ts) — Alice's runtime guard

Sharing one definition is deliberate. This codebase has already been bitten by the alternative — see the provenance comment on `EMAIL_COLORS` in [constants.ts](src/lib/constants.ts), which records the transactional emails drifting a full palette behind the site because a constant had no importers.

### How the gate behaves

- Walks `src/` **and `public/`**, and checks asset filenames for third-party marks
- Evaluates **all** rules per line, not `else if` — one line frequently breaches several
- Asserts **required disclosures** are still present, so deleting an inoculating sentence during a future redesign cannot pass silently
- Wired into `npm run build`, which is what Vercel runs. **An unregistered claim cannot reach production.**

### Adding an exemption

Every entry in a rule's `exempt` array requires `reason`, `evidence`, `approvedBy` and `date`. **An exemption with an empty `evidence` field fails the build.** That is what makes it a register rather than an ignore-list: a rule cannot be silenced without naming the document that justifies it, and the diff shows who approved it.

### Rule design notes worth knowing

Several rules needed care, and the reasoning is not obvious from the regex:

- **Negation-awareness.** The brief does not merely forbid claiming accreditation, it *requires* disclosing its absence. "We are not UKAS accredited, not an IASME Certification Body, not a PCI QSA" contains three banned tokens and is the mandated wording. Fifteen rules check for a negator both before and *inside* the match.
- **`our` needs a word boundary.** Without it, the rule matched inside "y**our** certification body", flagging the compliant sentence *"the assessment is carried out by your certification body"* as a self-claim.
- **`50+` needs a trailing guard.** `(?!\s*\d)` stops arithmetic in a comment ("50 + 1 + 50") reading as a quantity claim, while still catching "50+ certifications delivered".
- **The case-study rule targets the route and the old data shape, not the noun.** Banning the word broke the evidence-policy copy, which has to be able to say "we do not publish client case studies". Content is enforced somewhere stronger instead — see below.
- **Prohibition-text files are exempt by construction.** `systemPrompt.ts` and `qualityCheck.ts` must contain the banned phrases verbatim for their constraints to bind. They are listed in `PROHIBITION_TEXT_FILES` with evidence, and are covered by three other controls. **A genuine claim added to those two files would not be caught by the gate — any diff touching them needs a human.**

### Type-level enforcement

[caseStudies.ts](src/data/caseStudies.ts) encodes the evidence rule in the **type**. `evidence` is non-optional, requiring a named verifier, a date, an approval reference, and every factual claim paired with its source. Under `strict`, **an unevidenced case study cannot compile**. That is stronger than a regex and costs nothing.

---

## Alice

Fixed first and shipped ahead of the site, because she makes novel, unreviewed, persuasive assertions per visitor in any language.

- **PART 6: NEVER CLAIM** inserted *before* the knowledge base and repeated at the end. A constraint stated ahead of the material it constrains is followed more reliably than one appended after it.
- **Deterministic pre-delivery guard** in the chat route — the only non-probabilistic control in the system. On a hit it substitutes a safe fallback and alerts Slack.
- **[qualityCheck.ts](src/lib/alice/qualityCheck.ts)** previously asked whether *"pricing and timelines [were] quoted accurately per her knowledge base"* — which after remediation would have scored compliant behaviour **down**. Replaced with a separate `COMPLIANCE: PASS|FAIL` verdict.
- **[scraper.ts](src/lib/alice/scraper.ts)** denylists our own hosts. A visitor pasting our URL was re-injecting live or CDN-stale page copy into her context as an apparent prior turn.
- **New PART 14, "Proof without case studies."** The vacuum matters: "who else have you worked with?" is the most common qualifying question, and a model will confabulate to fill it if the prompt leaves nothing there.

---

## Site architecture

- Homepage rebuilt as the brief's twelve sections in `src/components/sections/home/`. [page.tsx](src/app/page.tsx) contains **no copy of its own** — every string lives in its section or under `src/data`, which is what makes the next claims sweep tractable.
- Four commercial pillars ([pillars.ts](src/data/pillars.ts)) replace the flat catalogue.
- Services carry `status: core | supporting | retired` rather than being deleted. `relatedSlugs` are plain strings, so a deleted entry silently removes a card from six other pages with no error and no build failure.
- New routes: `/services/soc-2`, `/services/managed-compliance`, `/services/additional-frameworks`, `/resources`.
- `/industries` → `/who-we-help`, with its canonical tag and JSON-LD URLs moved in the same change. Leaving either behind would publish a canonical pointing at a URL that redirects away from itself.
- Service titles now use the brief's §15 public names. The ISO 27001 page `<h1>` read *"ISO 27001 Certification"* — the exact framing §15 exists to prevent.

Three duplicate copies of the "which services have routes" slug list were consolidated into `getRoutedServices()`. All three still listed `penetration-testing`, so a withdrawn service would have stayed in the sitemap after its route was deleted.

---

## Contact form

Rebuilt to the brief's field set with an optional document upload.

**The ordering is the design.** All file handling sits behind Turnstile:

```
content-length      → 413, body never read
extractClientIp     → rate limit → 429   (headers only, so nothing is buffered)
parse formData      → 400
honeypot            → fake 200
privacy consent     → 400
validate            → 400
Turnstile           → 403
─── only now is the file touched ───
size → extension → magic bytes → hash → upload
```

An unverified bot can never cause a write to the bucket.

- **Type validation never trusts `file.type`.** Extension and magic bytes must agree. OOXML is a zip, so `.docx` is confirmed by scanning the first 4 KiB for the `word/` package marker — that rejects a renamed archive without a zip parser. Plain text has no signature and is validated by content.
- **Split consent is real, not presentational.** Separate statement, columns and timestamp; unticked by default; never gates submission. Coercion is `=== true` plus the exact strings a checkbox sends — multipart submits *strings*, and `"false"` is truthy.
- **Attachments are not emailed.** A signed URL keeps one copy in one place we can delete; a copy in an inbox would be outside the 24-month retention control we promise.
- Migrations `0005`/`0006` are **additive**, so the previous route still inserts against them. That property is what makes migrate-first safe.

Two pre-existing bugs fixed while in there: the two Resend calls were sequential awaits, so a *customer*-email failure 500'd after the admin was already notified and produced duplicate rows on retry; and the route had no explicit runtime.

---

## Deliberate deviations from the brief

| Deviation | Reasoning |
|---|---|
| ISO 9001 / 14001 / 22301 kept as `supporting` rather than withdrawn | The brief says these must not be *core*, not that they must be removed. They are indexed and rank. Only penetration testing, which the brief bans outright, is redirected. |
| "AI Governance" nav item deep-links to `/services/iso-42001` | A separate hub would duplicate that page and cannibalise it in search, or be thin. Neither is worth shipping in a release whose purpose is removing unsubstantiated claims. Build it when there is distinct advisory-intent content, then change one `href`. |
| Legal entity and company number left in place | The brief says do not reuse the current number, but a privacy policy must identify the data controller, and an unnamed controller is a worse breach than an unverified one. Routed through one constant and flagged as a go-live gate. |
| Blog claims purged, prose not fully rewritten | Deferred by decision. All banned claims are gone; several posts remain *structured* around the old fast-track argument. |
| §16's register implemented as code, not a document | Stronger than a spreadsheet — it blocks the build. If a paper artefact is also expected for audit, it is roughly half a day's work. |

---

## Verification

| Check | Result |
|---|---|
| `npm run lint:claims` | 0 occurrences, wired into `npm run build` |
| `tsc --noEmit` | Clean |
| `npm run lint` | 0 errors |
| Production build | 62 static pages |
| Rendered HTML audited against the brief, section by section | **88 checks, 0 gaps** |
| Contact pipeline logic | **42 checks, 0 failures** |
| Banned claims in rendered HTML / client bundles | None |
| Service-role key in client bundle | Absent |

The rendered-HTML audit checks what a visitor and a crawler actually receive, not what the source says. The credentials portion is negative as well as positive: FIP, CEH, IRCA and CQI are confirmed **absent** from output.

The contact-pipeline checks cover the cases where a mistake is a security bug rather than a cosmetic one: renamed executables, disguised archives, path traversal, bidi-override filenames, `"false"` submitted as consent, and `2027-02-31` (which `new Date()` silently rolls into March, so a format-only check would accept it).

---

## Before this can go live

**1. Apply migrations `0005` and `0006` to Supabase — before the code deploys.**
The contact insert is best-effort and only logs on failure. Deploying first produces a *silent* data-loss window: emails sending, nothing recorded, and nobody noticing until someone queries the table. See [[#The two migrations]] for what they contain.

**2. Confirm the contracting legal entity and company number.**
Footer, privacy policy and Organization JSON-LD all read from `SITE_CONFIG` in [constants.ts](src/lib/constants.ts), so this is a single edit once confirmed.

**3. Set three environment variables** (documented in `.env.example`). Point preview at a **separate bucket** so preview traffic never lands customer documents in production.

**4. Run the Alice adversarial script against the live endpoint.** Twelve questions designed to elicit each banned claim, two repeated in Arabic since the constraints must survive translation. Archive the transcripts — they are a §16 artefact.

### The two migrations

The contact form was rebuilt to the brief's field set, and the table created in [0003](supabase/migrations/0003_contact_submissions.sql) only had `name, email, company, phone, country, service, message` plus privacy-consent columns. Without these migrations the new answers still reach the team by email but are never recorded.

**[0005_contact_enquiry_fields.sql](supabase/migrations/0005_contact_enquiry_fields.sql)** — columns on `contact_submissions`:

| Group | Columns | Notes |
|---|---|---|
| Identity | `first_name`, `last_name` | Legacy `name` still written as `first_name \|\| ' ' \|\| last_name`, so its `not null` holds and existing reporting keeps working |
| Qualification | `enquiry_reason`, `organisation_size`, `jurisdiction`, `deadline`, `no_fixed_deadline` | CHECK-constrained to the slugs in `src/lib/contact/constants.ts`; a deadline and "no fixed deadline" are mutually exclusive |
| Marketing consent | `marketing_opt_in`, `marketing_consent_text`, `marketing_consent_timestamp` | Stored **separately** from privacy consent, which is what makes the brief's "kept separate" requirement auditable. Consent text is null when opt-in is false |
| Attachment | `attachment_bucket`, `_path`, `_filename`, `_mime`, `_size_bytes`, `_sha256` | Metadata only; the file lives in the private bucket |

Plus three partial indexes — the one on `created_at where attachment_path is not null` lets the 24-month attachment purge find rows still owning a file without a full scan. `country` is deprecated in favour of `jurisdiction`, left null on new rows rather than dropped.

**[0006_contact_attachments_bucket.sql](supabase/migrations/0006_contact_attachments_bucket.sql)** — the private `contact-attachments` Storage bucket: `public = false` set explicitly, 4 MiB limit (under Vercel's ~4.5 MB body ceiling), MIME allowlist. **No `storage.objects` policies**, deliberately: RLS is on by default, so zero policies means only the service-role key can read or write. The browser never talks to Storage. Split from 0005 because it writes to the `storage` schema, which needs different privileges — a storage permission failure cannot block the column migration.

**Why migrate first.** Every 0005 column is nullable or defaulted and nothing is renamed or dropped, so the *currently deployed* route still inserts successfully against the migrated schema. The reverse order is not safe: new code against the old schema fails every insert while the emails keep sending.

---

## Open questions for management

1. Contracting legal entity and company number **(blocker)**
2. Is Muhammad Waleed staff or an approved-network practitioner? The site is correct either way, but if he is staff we are currently giving away a real credibility asset.
3. Written permission covering use of network practitioner credentials
4. Practitioner availability for each service left active in the menu
5. Legal check on "90 days post-certification support" and the £4,500–£8,000 certification body fee
6. **Does the remediation commitment exist in the standard contract?** The "Pass First Guarantee" was removed because it was tied to the unverified 98% figure. The underlying promise — covering remediation caused by a gap in our documentation — is a strong differentiator that depends on no statistic. If it is contractual, it can return.
7. Is a written claims register document also expected?

---

## Related

- [[Crawl-Report-Issues-Verification]] — several issues it raised as *True* are closed by this work: anonymous testimonials (#7), unverified case-study figures (#15), the "9 active certifications" aggregate (#14), and homepage service 404s (#8, via `getRoutedServices()`).
- Company registration display (#6, #13) remains open, deliberately — see blocker 2 above.
- [[Crawl-Report-Deep-Research]] — its decisions M1, M4, Q1 and Q9 were overtaken by this work; M2/M3 are on hold behind blocker 2. The note carries a banner recording which.
- [[Group-Footer-and-Privacy-Choices-2026-09-18]] — later work under the same brief. The footer was rebuilt to the group structure, and analytics consent became real. Blocker 2 still governs its legal line, and it raises a false statement in the privacy policy about chat storage.

---

## Status log

| Date | State |
|---|---|
| 9 September 2026 | Implemented and verified (`a249d39`), vault record added (`da4f8cc`) |
| 18 September 2026 | **No change.** No commits since `da4f8cc`. All four go-live prerequisites and all seven management questions remain open. Migrations 0005/0006 present in the repo; not confirmed applied to Supabase. |
| 18 September 2026, later | Footer and analytics consent work landed on `main` (`f9274d5`, `d41347d`) — see [[Group-Footer-and-Privacy-Choices-2026-09-18]]. **Prerequisites unchanged:** the legal line still reads the unconfirmed entity, and migrations 0005/0006 are still unconfirmed against Supabase. `npm run build` was broken before that work and is now fixed. |
| 25 September 2026 | Positioning superseded by the strategic rebuild (`968937c`). See [[Strategic-Rebuild-Implementation-2026-09-25]]. The evidence rules and claims gate carry forward and are extended. |
