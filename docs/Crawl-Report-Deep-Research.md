# Crawl Report — Deep Code-Level Research

Companion to [Crawl-Report-Issues-Verification.md](Crawl-Report-Issues-Verification.md). For every issue marked **True** or **Partially true** in that document, this file maps the *complete surface area in the codebase* that needs to change — not just one example. Every claim is backed by a verified file:line reference. No assumptions.

> [!warning] Superseded by the Verified Website Replacement (9 September 2026)
> The implementation plan below was never carried out as written. The 8 September brief imposed a strict evidence rule, and the work in [[Website-Replacement-Implementation-2026-09-09]] overtook every decision here. File:line references below reflect the code **before** `a249d39` and are now stale.
>
> | Ref | Decision here | What actually happened |
> |---|---|---|
> | Q1 | Filter `ServicesGrid` to routed services | **Done differently.** Homepage rebuilt; three duplicate slug lists consolidated into `getRoutedServices()` |
> | M1 | Strip case-study figures, keep narrative | **Moot.** Case-studies route withdrawn with 301s; `Testimonials.tsx` deleted. Any future case study must satisfy the evidence type in `caseStudies.ts` |
> | M2 / M3 | Publish `Pixelette Group Ltd` / `17506745` in footer and privacy policy | **On hold.** Values are in `SITE_CONFIG`, but the brief says the current number must not be reused. Now go-live blocker 2 pending written confirmation of the contracting entity |
> | M4 | Standardise on "9 active certifications" | **Reversed.** The aggregate was one person's eight credentials plus a paid corporate membership; removed as an unsupported claim. Credentials now publish individually from `credentials.ts`, with FIP, CEH, IRCA and CQI withheld |
> | Q9 | Add `/services` + 3 case-study URLs to sitemap | **Partly done.** `/services` is in the sitemap; case-study URLs are not, because the route no longer exists |
> | Q5, Q6, Q8 | Dropped / leave as-is | Unchanged |
>
> Do not implement M1 or M4 from this note: the replacement copy they propose is contrary to the brief. M1's suggested "98% pass rate" for `industries.ts` and M4's "including our own ISO 27001 Certified Practice" are both now banned claims that the build gate would reject.

---

## Issue 8 — Homepage 404s: 12 service slugs without page routes

### Verified problem
[src/data/services.ts](src/data/services.ts) defines 22 services. Only 10 have `page.tsx` routes under [src/app/services/](src/app/services/). When the homepage's [ServicesGrid.tsx:49](src/components/sections/ServicesGrid.tsx#L49) renders the full list of 22 with `href={\`/services/${service.slug}\`}`, 12 of those links return 404.

### The 12 broken slugs (all in [src/data/services.ts](src/data/services.ts))
| Slug | Defined at line | Route file? |
|---|---|---|
| `iso-27701` | 453 | ❌ |
| `soc-2` | 478 | ❌ |
| `sama-csf` | 502 | ❌ |
| `nca-ecc` | 523 | ❌ |
| `qcb-nia` | 543 | ❌ |
| `zero-trust` | 563 | ❌ |
| `ad-hardening` | 584 | ❌ |
| `cloud-security-architecture` | 604 | ❌ |
| `bia-bra` | 625 | ❌ |
| `dr-planning` | 645 | ❌ |
| `ai-risk-assessment` | 666 | ❌ |
| `managed-advisory` | 687 | ❌ |

### Existing 10 routes ([src/app/services/](src/app/services/))
`iso-27001`, `iso-22301`, `iso-9001`, `iso-14001`, `iso-42001`, `cyber-essentials`, `vciso`, `vdpo`, `penetration-testing`, `gdpr-privacy`.

### Link generators across the codebase (full audit)

| Location | Behaviour | Generates 404? |
|---|---|---|
| [src/components/sections/ServicesGrid.tsx:49](src/components/sections/ServicesGrid.tsx#L49) | Iterates all 22 with raw `/services/${slug}` | **Yes — for 12 slugs** |
| [src/app/services/ServicesOverviewContent.tsx:33-40](src/app/services/ServicesOverviewContent.tsx#L33-L40) | `serviceHref()` returns `/contact` for unrouted slugs | No (workaround) |
| [src/components/layout/Footer.tsx:106](src/components/layout/Footer.tsx#L106) | SOC 2 hardcoded to `/contact`; other footer service links all hit live routes | No |
| [src/lib/constants.ts:54-64](src/lib/constants.ts#L54-L64) | NAV dropdown lists only the 10 routed services | No |
| [src/app/sitemap.ts:65-77](src/app/sitemap.ts#L65-L77) | Filters to only 10 routed slugs | No |
| `relatedSlugs` in [src/data/services.ts](src/data/services.ts) | All 22 services only reference the 10 routed slugs in `relatedSlugs` (verified: lines 84, 126, 167, 208, 250, 289, 329, 366, 404, 443, 474, 498, 519, 539, 559, 580, 600, 621, 641, 662, 683, 703) | No |

### Decision logged (Q1)
**Filter `ServicesGrid` to render only the 10 routed services, and add a "View all services" link pointing to `/services`.**

Once implemented, the homepage will not render any 404-bound service cards; visitors who want the full list click the "View all services" link to reach `/services`, which already routes unrouted slugs to `/contact` via `serviceHref()`.

**Status:** 🟡 Answered — pending implementation.

---

## Issue 7 — Generic, unnamed FinTech testimonial / Issue 15 — Case-study anonymisation & unverified figures

### Verified problem
The "FinTech client closed a major bank contract within 30 days" and the headline metrics (340%, 35%, six-figure NHS, 3 enterprise contracts in 60 days) propagate across **6 distinct files**, all anonymous and all unverified per the source report's NEVER-DO rule.

### All locations referencing the FinTech "30 days" claim

| File:line | Context |
|---|---|
| [src/app/page.tsx:96](src/app/page.tsx#L96) | Homepage commercial-impact bullet: *"One client closed a major bank contract within 30 days of certification (see FinTech case study)"* |
| [src/components/sections/Testimonials.tsx:11](src/components/sections/Testimonials.tsx#L11) | Homepage testimonials carousel — *"CTO, FinTech"* attribution |
| [src/data/industries.ts:37](src/data/industries.ts#L37) | FinTech industry card snippet |
| [src/app/case-studies/page.tsx:31](src/app/case-studies/page.tsx#L31) | Case studies index — "UK FinTech" card result line |
| [src/app/case-studies/[slug]/page.tsx:11-46](src/app/case-studies/[slug]/page.tsx#L11-L46) | Full case study detail page with anonymous "UK FinTech" + "CTO" testimonial |
| [src/lib/alice/systemPrompt.ts:139-141](src/lib/alice/systemPrompt.ts#L139-L141) | Alice chatbot system prompt: case study reference + quote |

### The 340% pipeline figure

| File:line | Context |
|---|---|
| [src/data/industries.ts:40](src/data/industries.ts#L40) | FinTech industry stat block |
| [src/app/case-studies/page.tsx:31](src/app/case-studies/page.tsx#L31) | Case studies index card |
| [src/app/case-studies/[slug]/page.tsx:31](src/app/case-studies/[slug]/page.tsx#L31) | Case study detail metric |
| [src/lib/alice/systemPrompt.ts:139,286](src/lib/alice/systemPrompt.ts#L139) | Alice chatbot prompt result + case-study trigger |

### The 35% insurance premium reduction

| File:line | Context |
|---|---|
| [src/app/case-studies/page.tsx:55](src/app/case-studies/page.tsx#L55) | Healthcare Tech card result |
| [src/app/case-studies/[slug]/page.tsx:33,108](src/app/case-studies/[slug]/page.tsx#L33) | Case study detail metric (referenced twice) |
| [src/lib/alice/systemPrompt.ts:153,288](src/lib/alice/systemPrompt.ts#L153) | Alice prompt result + trigger |

### Six-figure NHS framework contract

| File:line | Context |
|---|---|
| [src/app/case-studies/page.tsx:55](src/app/case-studies/page.tsx#L55) | Healthcare Tech card result |
| [src/lib/alice/systemPrompt.ts:153](src/lib/alice/systemPrompt.ts#L153) | Alice prompt |

### "3 enterprise contracts in 60 days" (AI SaaS)

| File:line | Context |
|---|---|
| [src/app/case-studies/page.tsx:43](src/app/case-studies/page.tsx#L43) | AI SaaS Platform card result |
| [src/app/case-studies/[slug]/page.tsx:70](src/app/case-studies/[slug]/page.tsx#L70) | Case study detail metric |
| [src/lib/alice/systemPrompt.ts:146,287](src/lib/alice/systemPrompt.ts#L146) | Alice prompt result + trigger |

### Decision logged (M1)
**Option 2 — strip figures, keep timeline/narrative only.**

Required edits across 6 files (synchronised — leaving Alice stale while editing static pages creates an immediate live-vs-chatbot inconsistency):
- [src/app/page.tsx:96](src/app/page.tsx#L96) — replace "30 days" claim with timeline-agnostic phrasing
- [src/components/sections/Testimonials.tsx:11](src/components/sections/Testimonials.tsx#L11) — strip "30 days of certification" from the FinTech testimonial
- [src/data/industries.ts:37-42](src/data/industries.ts#L37-L42) — FinTech snippet + 340%/35% stat block need replacement with verified org-wide claims (suggested: 98% pass rate + Fixed-fee)
- [src/app/case-studies/page.tsx:31,43,55](src/app/case-studies/page.tsx#L31) — strip 340% / 60-day / 35% / six-figure from the 3 result lines
- [src/app/case-studies/[slug]/page.tsx](src/app/case-studies/[slug]/page.tsx) — strip unverified figures from UK FinTech, AI SaaS, and Healthcare metric arrays; rewrite FinTech testimonial "sixty days" line
- [src/lib/alice/systemPrompt.ts:139-153, 286-288](src/lib/alice/systemPrompt.ts#L139) — strip from PART 6 case study results/quotes AND PART 13 case study references

**Status:** 🟡 Answered — pending implementation.

---

## Issues 6 + 13 — Company registration number missing; trading-name disclosure partial

### Verified problem
The privacy policy correctly states *"Pixelette Certified is a trading name of Pixelette Group Ltd, registered in England and Wales"* ([src/app/privacy-policy/page.tsx:26](src/app/privacy-policy/page.tsx#L26)). But:
- No Companies House number (`17506745`) anywhere in `src/` (`grep` returns zero matches).
- The footer copyright line names both entities but omits registration number, registered office, and the trading-name relationship.

### Locations where company identity / legal info appears

| File:line | Current content | Gap |
|---|---|---|
| [src/lib/constants.ts:10](src/lib/constants.ts#L10) | `address: "77 Fulham Palace Road, London W6 8JA"` | No registered office distinction, no Co. No. |
| [src/components/layout/Footer.tsx:165](src/components/layout/Footer.tsx#L165) | `© 2026 Pixelette Group, Pixelette Certified. All rights reserved.` | No Co. No., no "Registered in England and Wales" |
| [src/app/privacy-policy/page.tsx:26-28](src/app/privacy-policy/page.tsx#L26-L28) | Trading-name disclosure correct | No Co. No. |
| [src/app/about/AboutContent.tsx](src/app/about/AboutContent.tsx) | "Our Story" mentions Pixelette Group decade-long | No legal-entity identification |
| [src/app/contact/ContactContent.tsx](src/app/contact/ContactContent.tsx) | Contact details | No legal entity info |

### Decisions logged (M2 + M3)
- **M2 (legal entity data):** Confirmed values — `legalEntity: "Pixelette Group Ltd"`, `companyNumber: "17506745"`, `jurisdiction: "England and Wales"`. Add as new fields on `SITE_CONFIG` in [constants.ts](src/lib/constants.ts).
- **M3 (registered office):** Companies House lookup against Co. No. 17506745 confirms `66 Paul Street, London, EC2A 4NA` is correct. No address change needed in code.

Required edits across 3 files:
- [src/lib/constants.ts](src/lib/constants.ts) — add `legalEntity`, `companyNumber`, `jurisdiction` fields to `SITE_CONFIG`
- [src/components/layout/Footer.tsx:162-176](src/components/layout/Footer.tsx#L162-L176) — bottom bar to display *"Pixelette Group Ltd · Company No. 17506745 · Registered in England and Wales"*, referencing SITE_CONFIG
- [src/app/privacy-policy/page.tsx:25-29](src/app/privacy-policy/page.tsx#L25-L29) — section 1 to add "under company number 17506745" after the existing trading-name disclosure

External follow-up (outside this repo): proposal template still carries `77 Fulham Palace Road` — needs aligning to the registered office 66 Paul Street.

**Status:** 🟡 Answered — pending implementation.

---

## Issue 4 — DROPPED

Verified that the "Beat any quote by 10%" commitment does not exist in the codebase **or** in current proposal/sales artefacts. The crawl report cited a deprecated draft. No inconsistency to resolve. No code changes needed.

---

## Issue 10 — DROPPED (by design)

Price opacity is a deliberate product decision. Every engagement is scoped per client, every tier in [src/data/services.ts](src/data/services.ts) reads `"Scoped to your business"`, and Alice's prompt at [systemPrompt.ts:252](src/lib/alice/systemPrompt.ts#L252) explicitly enforces *"NEVER quote specific pound amounts for consulting fees"*. The crawl report flagged the absence of prices as friction, but it reflects intent, not a gap. No code changes needed.

---

## Issue 14 — "8 active certifications" vs other counts

### Verified counts in the codebase

| Source | Number stated | Includes which credentials |
|---|---|---|
| [src/app/contact/ContactContent.tsx:446](src/app/contact/ContactContent.tsx#L446) | **8** "across PECB, ISACA, IAPP, and CQI/IRCA" | 4 issuing bodies — by definition excludes EC-Council (CEH) and the corporate-cert practice |
| [src/app/about/AboutContent.tsx:258](src/app/about/AboutContent.tsx#L258) | **8** individual credentials listed for Muhammad Waleed | ISO 27001 LA (IRCA), ISO 42001 LA (PECB), AIGP, FIP, CIPP/US, CIPM, CISA, **CEH** |
| [src/app/about/AboutContent.tsx:28-65](src/app/about/AboutContent.tsx#L28-L65) | **6 credential cards** covering 10 distinct credentials | Adds "ISO 27001 Certified Practice" (corporate) + "CQI Corporate Member" (corporate) |
| [src/lib/alice/systemPrompt.ts:158-167](src/lib/alice/systemPrompt.ts#L158-L167) | **10** credentials listed | Same 10 as About page cards |

### Internal mismatch
- Contact-page "8 across 4 bodies" excludes CEH. About-page Waleed list "8 individual" includes CEH. They both say "8" but count different things.
- Source-report claim of "proposal says 9" cannot be verified codebase-side.

### Decision logged (M4)
**Option 3 — standardise on 9** (8 personal credentials + 1 corporate practice = ISO 27001 Certified Practice). CQI Corporate Member to be moved to a separate "corporate membership" line so memberships and certifications are no longer conflated.

Required edits across 2 files:
- [src/app/contact/ContactContent.tsx:446](src/app/contact/ContactContent.tsx#L446) — replace existing trust-signal text with: *"9 active certifications across IRCA, PECB, IAPP, ISACA, and EC-Council, including our own ISO 27001 Certified Practice"*
- [src/lib/alice/systemPrompt.ts:157-167](src/lib/alice/systemPrompt.ts#L157-L167) — restructure: header reads "9 active certifications..."; the 9 certs listed; CQI Corporate Member split out as a separate "Plus corporate membership" line

About credential cards at [AboutContent.tsx:28-65](src/app/about/AboutContent.tsx#L28-L65) need no edit — they make no count claim and are already compatible with the new framing.

**Status:** 🟡 Answered — pending implementation.

---

## Issue 12 — Not actionable codebase-side

The blog at [src/app/blog/[slug]/page.tsx:418-440](src/app/blog/[slug]/page.tsx#L418-L440) is technically accurate and internally consistent — it correctly distinguishes Feb 2025 (Unacceptable Risk), Aug 2026 (GPAI), and Aug 2027 (high-risk AI). The "Dec 2027 first-mover backstop" framing lives entirely outside the repo (strategy doc + sales scripts), so reconciliation has to happen in those external artefacts. The blog stays as-is.

---

## Issue 19 — Sitemap missing live pages

### Verified problem
[src/app/sitemap.ts](src/app/sitemap.ts) declares 19 URLs (9 static + 10 routed services). The following live routes are omitted:

| Live route | Page file | Indexable? |
|---|---|---|
| `/services` | [src/app/services/page.tsx](src/app/services/page.tsx) | Not declared |
| `/case-studies/uk-fintech-iso-27001` | [src/app/case-studies/[slug]/page.tsx](src/app/case-studies/[slug]/page.tsx) | Not declared |
| `/case-studies/ai-saas-iso-42001-iso-27001` | same dynamic route | Not declared |
| `/case-studies/healthcare-tech-cyber-essentials-iso-27001` | same dynamic route | Not declared |
| `/blog/[slug]` (×18) | [src/app/blog/[slug]/page.tsx](src/app/blog/[slug]/page.tsx) | Not declared — *not flagged by source crawl report, but factually identical situation* |

### Existing sitemap entries ([sitemap.ts:8-77](src/app/sitemap.ts#L8-L77))
9 static: `/`, `/about`, `/pricing`, `/contact`, `/case-studies`, `/blog`, `/industries`, `/privacy-policy`, `/cookie-policy`.
10 service routes: see Issue 8 above.

### Decision logged (Q9)
**Source-report scope only** — add `/services` and the 3 case-study detail URLs to [src/app/sitemap.ts](src/app/sitemap.ts). Iterate from the already-exported `caseStudies` array in [src/app/case-studies/page.tsx:20-57](src/app/case-studies/page.tsx#L20-L57) so the sitemap stays fresh if a 4th case study is added. Hard-code the single `/services` line. **Blog post URLs intentionally excluded** — not in source-report scope; can be revisited later if SEO retrofit (Issue 17) progresses.

**Status:** 🟡 Answered — pending implementation.

---

## Summary — files in scope for the development plan

All decisions are logged. No code changes have been made yet — this list is the implementation surface area.

| File | Issues | What needs to change |
|---|---|---|
| [src/components/sections/ServicesGrid.tsx](src/components/sections/ServicesGrid.tsx) | 8 | Filter the rendered services to the 10 routed slugs; add a "View all services" link to `/services` |
| [src/app/page.tsx](src/app/page.tsx) | 7 | Replace "30 days" claim at line 96 with timeline-agnostic phrasing |
| [src/components/sections/Testimonials.tsx](src/components/sections/Testimonials.tsx) | 7 | Strip "30 days of certification" from the FinTech testimonial at line 11 |
| [src/data/industries.ts](src/data/industries.ts) | 7, 15 | Rewrite FinTech `caseStudySnippet` at line 37 + replace 340%/35% stat block at lines 40-41 with verified org-wide claims. Scope is the FinTech industry card only (the one tied to the UK FinTech case study). |
| [src/app/case-studies/page.tsx](src/app/case-studies/page.tsx) | 15 | Strip 340% / 60-day / 35% / six-figure from result lines at 31, 43, 55 |
| [src/app/case-studies/[slug]/page.tsx](src/app/case-studies/[slug]/page.tsx) | 15 | Strip unverified figures from UK FinTech, AI SaaS, Healthcare metric arrays; rewrite FinTech testimonial "sixty days" line |
| [src/lib/alice/systemPrompt.ts](src/lib/alice/systemPrompt.ts) | 7, 14, 15 | Strip case-study figures (lines 139-153, 286-288). Restructure credentials block (157-167) to "9 active certifications…" + separate corporate membership line |
| [src/components/layout/Footer.tsx](src/components/layout/Footer.tsx) | 6, 13 | Bottom bar to display *"Pixelette Group Ltd · Company No. 17506745 · Registered in England and Wales"* via SITE_CONFIG refs |
| [src/lib/constants.ts](src/lib/constants.ts) | 6, 13 | Add `legalEntity`, `companyNumber`, `jurisdiction` fields to SITE_CONFIG |
| [src/app/contact/ContactContent.tsx](src/app/contact/ContactContent.tsx) | 14 | Trust-signal text at line 446 → "9 active certifications across IRCA, PECB, IAPP, ISACA, and EC-Council, including our own ISO 27001 Certified Practice" |
| [src/app/privacy-policy/page.tsx](src/app/privacy-policy/page.tsx) | 6, 13 | Section 1 to add "under company number 17506745" after the existing trading-name disclosure |
| [src/app/sitemap.ts](src/app/sitemap.ts) | 19 | Add `/services` (hard-coded) + iterate `caseStudies` from `case-studies/page.tsx` to emit the 3 detail URLs |
| [src/app/about/AboutContent.tsx](src/app/about/AboutContent.tsx) | 14 | **No change** — cards make no count claim |

---

## Decisions log — all source-report questions answered

| Ref | Question | Answer | Notes |
|---|---|---|---|
| Q1 (Issue 8) | How to fix 12 homepage 404s? | **C** — filter `ServicesGrid` to the 10 routed services + add "View all services" link to `/services` | See Issue 8 above |
| M1 (Issues 7+15) | Case study unverified figures? | **Option 2** — strip figures, keep timeline/narrative | See Issue 7+15 above |
| M2 (Issues 6+13) | Legal entity data for SITE_CONFIG? | **Confirmed** — `legalEntity: "Pixelette Group Ltd"`, `companyNumber: "17506745"`, `jurisdiction: "England and Wales"` | See Issues 6+13 above |
| M3 (Issues 6+13) | Registered office per Companies House? | **66 Paul Street, London, EC2A 4NA** — site is correct, no code change to the `address` field | See Issues 6+13 above |
| Q5 (Issue 4) | "Beat any quote by 10%"? | **Dropped** — commitment doesn't exist in current artefacts | See Issue 4 above |
| Q6 (Issue 10) | Pricing figures on site? | **Dropped** — price opacity is by design | See Issue 10 above |
| M4 (Issue 14) | Credential count convention? | **Option 3 — 9** (8 personal + 1 corporate practice; CQI Corporate Member moved to "corporate membership") | See Issue 14 above |
| Q8 (Issue 12) | EU AI Act messaging? | **A** — leave blog as-is, reconciliation external | See Issue 12 above |
| Q9 (Issue 19) | Sitemap scope? | **A** — source-report scope (`/services` + 3 case-study URLs); blog posts intentionally excluded | See Issue 19 above |

## What's open

*Updated 18 September 2026:* only the legal-entity question (M2/M3) survives, tracked as blocker 2 in [[Website-Replacement-Implementation-2026-09-09#Before this can go live]]. Everything else is closed or superseded — see the banner at the top.

*Original text, 3 September 2026:* Nothing. All issues raised in `Full-Crawl-Report-2026-05-19.md` have been addressed — either with a logged decision pending implementation, or marked as dropped / not actionable codebase-side. Ready for the development plan.
