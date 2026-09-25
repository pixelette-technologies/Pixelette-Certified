# Strategic Rebuild: Implementation Record

Implementation of the *Pixelette Certified website: full strategic rebuild specification* (received 25 September 2026) against the `pixelette-certified` codebase.

- **Status:** implemented, built and verified locally. **Not committed, not deployed.** Go-live prerequisites below, including those carried over from [[Website-Replacement-Implementation-2026-09-09#Before this can go live]].
- **Supersedes** the positioning in [[Website-Replacement-Implementation-2026-09-09]] (four pillars, buyer triggers, compliance diagnostic). Its evidence rules and claims gate are kept and extended.

The specification repositions the site as a UK-headquartered cyber security, compliance, assurance and AI governance consultancy focused on the **UK, United States and GCC**, delivered through a specialist practitioner network, with **no public pricing** and strict independence wording.

---

## Implementation map

| | Pages |
|---|---|
| Kept, rewritten | Home, `/services`, `/services/{iso-27001, iso-42001, soc-2, vciso, iso-22301, cyber-essentials}`, `/who-we-help`, `/about`, `/contact`, `/blog` (now "Insights"), all articles, privacy policy |
| New | `/services/cyber-assurance`, `/services/privacy`, `/services/gcc-regulatory-compliance`, `/markets`, `/markets/{united-kingdom, united-states, gcc}`, `/experience`, one GCC regulation article |
| Consolidated (308) | `gdpr-privacy`, `vdpo` → `/services/privacy`; `managed-compliance` → `/services/vciso`; `additional-frameworks` → `/services`; `/resources` → `/blog` |
| Removed (308) | `/pricing` → `/contact`; `iso-9001`, `iso-14001` → `/services`; `/case-studies/*` → `/experience`; `penetration-testing` → `/services/cyber-assurance`; two retired article slugs; seven old category archives |
| Navigation | Services (8 + View all services), Markets (3), Who we help, Experience, Insights, About, Contact. CTA "Discuss your requirements". Desktop bar from `xl`, drawer below |

## Architecture changes

- **One dynamic route per content type.** `app/services/[slug]`, `app/markets/[market]`, `app/blog/[slug]`, all `dynamicParams = false`. Eleven near-identical service page files are gone.
- **`services.ts` rewritten.** No `pricing`, no `process` week tables, no `retired` entries. `relatedSlugs` is typed against a `ServiceSlug` union, so a dangling reference is a **build error** rather than a silently missing card. That replaces the old "mark as retired" defence.
- **`markets.ts`, `experience.ts`, `industries.ts` (six groups)** are new data sources. `pillars.ts`, `blogPosts.ts`, `lib/categories.ts` deleted.
- **Insights model** in `src/data/insights/`: one file per article, typed `Insight` with a non-optional `sources` array, so an unsourced article cannot compile. Categories: UK compliance, US assurance, GCC regulation, AI governance, Cyber and GRC.
- **`ENGAGEMENT_TERMS`** in `constants.ts` is the single replacement for every pricing statement: "Following an initial review, we define the scope, delivery approach and proposed engagement in writing before work begins."
- Sitemap now derives from the same data as the routes; `llms.txt` and `llms-full.txt` rewritten.
- Organization JSON-LD: markets UK/US/SA/QA/AE, no offers or prices, independence sentence kept (gate asserts it). Service JSON-LD no longer carries `Offer`/`price`.

## Claims gate (`register.mjs`)

- **FIP approved** and its HOLD rule deleted, because §12 lists FIP as evidenced. ISO 27001 lead-auditor **training** is published, described as training.
- **CREST rule narrowed** to self-claims (`CREST-certified`, first-person proximity). §18 requires saying that CREST-accredited delivery can be arranged where a customer requires it.
- **New rules** from §6/§41: `price-figure`, `pricing-language` (fixed fee, transparent pricing, monthly retainer, most popular…), `pricing-tier-data`, `free-offer`, `sales-cliche`, `get-certified`, `global-reach`, `ten-weeks`. All runtime too, so Alice's replies are guarded.

## Contact form

Fields per §33: what you are working towards (11), where it applies (UK, US, Saudi Arabia, UAE, Qatar, Other), what prompted it (6), first/last name, company, work email, role (optional), message, optional attachment. Phone, organisation size and deadline dropped from the form (columns kept).

**Migration [[0007_contact_rebuild_fields.sql]]** adds `requirement_trigger` and `job_role` and replaces the `enquiry_reason`/`jurisdiction` CHECKs with ones accepting **both old and new slugs**. Additive. Requires 0005 and 0006 first. `PRIVACY_POLICY_VERSION` bumped to `2026-09-25`.

## Alice

Prompt rewritten to the new positioning. Removed: the certification-body fee range, "fixed-fee", payment plans, "free Compliance Diagnostic", 90-day support promise, vCISO tiers, 13 sectors, the phone number, "global delivery". Penetration testing may now be discussed; CREST status may not be claimed. Quality judge criteria and the blocked-reply fallback updated to match.

## Insights

All 18 articles rewritten by three research subagents to the §19 standard, with primary-source references and every unsourced figure removed (each agent logged what it cut). Two slugs retired: `real-cost-not-being-iso-27001-certified` (built on cost figures) and `vanta-drata-vs-real-consultancy` (disparaging slug, now `compliance-automation-platforms-and-consultancy`). New: `gcc-cyber-regulation-saudi-arabia-qatar`.

**Human check needed before publishing.** Several official sites (europa.eu, iso.org, ukas.com, nca.gov.sa, dgp.sdaia.gov.sa) blocked automated fetches. Some points were confirmed only via search results on the official domain:
- EU AI Act high-risk dates as amended by the **Digital Omnibus on AI (Regulation (EU) 2026/1744)**: 2 December 2027 (Annex III) and 2 August 2028 (Annex I). Open the EUR-Lex links in a browser.
- FCA PS26/2 dates, Cyber Essentials requirements v3.3 changes, DTAC form 2.0, NHS DCB review.
- Saudi PDPL in-force and grace-period dates (14 September 2023 / 2024).
- SOC 2 Type 1/Type 2 citation to the AICPA guide.

## Verification

| Check | Result |
|---|---|
| `check-claims.mjs` | No unregistered claims |
| `tsc` (src) and `next build` TypeScript | Clean |
| `eslint src` | 0 errors, 3 pre-existing warnings |
| Legacy colour tokens | None |
| `next build` | 59 static pages |
| Route check against `next start` | All pages 200, unknown slug 404, 18 redirects to the intended targets |
| Rendered-HTML crawl (45 internal URLs) | No internal link redirects or 404s, one H1 per page, no dashes or exclamation marks, no banned phrase. Hero H1 exact |
| Screenshots | Desktop 1440px and mobile 520px checked |

Build gotcha: `.next/dev/types` from an old dev session referenced deleted pages and failed the build's type check. Deleting `.next/dev` fixed it. Port 3000 on this machine was the **Marketing site's** dev server, not this one.

## Before this can go live

1. **Legal review of the privacy policy** (§35 requires it). Changes: the delivery network and processors disclosed, the international transfers section rewritten (it no longer claims UK/EEA-first processing), and the false "chat messages are not stored" sentence corrected. **Chat retention period is still unstated**, which is a decision, not a fact in the repo.
2. **Apply migrations 0005, 0006, 0007 in order** before deploying.
3. Carried over: **confirm legal entity and company number** (`SITE_CONFIG`), environment variables, and the Alice adversarial script. The script now needs extra questions on pricing and "free" offers.
4. **Phone number no longer rendered** on the contact page or in schema. `+44 20 7946 0958` is in Ofcom's drama range (see [[Group-Footer-and-Privacy-Choices-2026-09-18#Open questions]]). Restore only with a real number.
5. **Practitioner experience** (`src/data/experience.ts`) uses only the specification's categories, with no specifics. It needs sign-off that each area is genuinely evidenced.
6. Human read of the article sources flagged above.
7. The logo SVG still contains the old tagline "Compliance. Governance. Cyber Trust." This is a brand asset, not changed here.

## Status log

| Date | State |
|---|---|
| 25 September 2026 | Implemented and verified locally. Uncommitted, pending review. |

## Related

- [[Website-Replacement-Implementation-2026-09-09]]
- [[Group-Footer-and-Privacy-Choices-2026-09-18]]
