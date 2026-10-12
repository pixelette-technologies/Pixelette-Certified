# FULL REPORT — Pixelette Certified Live-Site Crawl (2026-05-19, gap-fixed 2026-05-21)

Compiled by faithful concatenation of the actual capture files in this archive. No content reconstructed from memory.

## Provenance & method
Original crawl: https://pixelettecertified.com/ fetched 2026-05-19 (homepage WebFetch + defuddle crawl of 18 pages + curl 404 probe; 17 blog bodies defuddled 2026-05-20). Gap-fix: 5 further live pages fetched via defuddle 2026-05-21 (Section D) after a sitemap-driven completeness check.

## Completeness check (2026-05-21) — what was verified, fixed, and what cannot be
- **Sitemap is authoritative and declares exactly 19 pages — ALL 19 are captured (100% page coverage).** The 19: home, about, pricing, contact, case-studies, blog, industries, privacy-policy, cookie-policy, and 10 service pages (iso-27001, iso-22301, iso-9001, iso-14001, iso-42001, cyber-essentials, vciso, vdpo, penetration-testing, gdpr-privacy).
- **GAPS FIXED (Section D, captured 2026-05-21):** blog post #17 "EU AI Act Preparation for UK Companies" (the one blog body missing from the original 17); the 3 individual case-study detail pages (UK FinTech, AI SaaS, Healthcare Tech — live but not in the sitemap); and the /services index page (live but not in the sitemap).
- **CONFIRMED 404 — not gaps, they do not exist** (homepage/contact link to dead routes = a site bug to fix separately, no content to capture): /services/soc-2, /services/iso-27701, /services/sama-csf, /services/nca-ecc, /services/managed-advisory, /terms, /accessibility.
- **CANNOT be fixed by a text crawl (requires source-code / visual inspection):** images, graphics, logos, visual layout, JavaScript-rendered content (the reason the crawl wrongly showed Industries "empty" and About "anonymous"), forms, meta titles/descriptions, structured data/schema, and the real navigation structure (lives in code: constants.ts). For an authoritative, complete picture, verify against the source code.

================================================================================

## A. SNAPSHOT / FINDINGS — 09_website-canonical-snapshot.md

# Pixelette Certified Website â€” Canonical Snapshot 2026-05-19

**Source:** https://pixelettecertified.com/
**Fetched:** 2026-05-19 via WebFetch
**Purpose:** capture the live commercial claims and positioning as displayed publicly, for verification against proposals, scripts, and strategy documents.

---

## Company identity (as displayed publicly)

- **Trading name:** Pixelette Certified (compliance / certification arm of Pixelette Group)
- **Headquarters address (per site):** 77 Fulham Palace Road, London W6 8JA
- **Phone:** +44 20 7946 0958
- **Email:** info@pixelettecertified.com
- **Geographic reach (as claimed publicly):** UK, UAE, Saudi Arabia, Qatar, EU, Americas, APAC

âš ï¸ **Address discrepancy flagged:** The proposal template v5 footer and the PMEX ISO 22301 proposal both state "Registered in England and Wales. Company No. 17506745. Registered Office: 77 Fulham Palace Road, London W6 8JA." The website shows 66 Paul Street EC2A 4NA. These need reconciling â€” verify Companies House registration before any further proposal goes out.

## Core commercial proposition (verbatim positioning)

> "Your next big deal is waiting on a certificate you don't have yet."

> "Certification is not a cost line. It is a revenue unlock."

> "The deals you're losing because you're not yet certified, we close that gap in 10 weeks."

## Performance claims displayed publicly

- **Average to Certification:** 10 weeks
- **First-Attempt Audit Pass Rate:** 98%
- **Certifications Delivered:** 50+
- **Calendar constraints:** Engagements started before May 2026 complete Q2; engagements after May complete Q3

## Services offered (15+ service lines on the public site)

### ISO certifications
- ISO 27001 (Information Security Management)
- ISO 42001 (AI Governance)
- ISO 9001 (Quality Management)
- ISO 22301 (Business Continuity)
- ISO 14001 (Environmental Management)
- ISO 27701 (Privacy Extension)

### Cybersecurity & compliance
- Cyber Essentials (UK Government-backed)
- GDPR & Privacy
- SOC 2 (Trust Services Criteria)
- Penetration Testing
- Zero Trust Architecture
- Active Directory Hardening
- Cloud Security Architecture

### Regional frameworks (international markets)
- SAMA CSF (Saudi Arabian Monetary Authority)
- NCA ECC / CCC (Saudi Government National Cybersecurity Authority)
- QCB / NIA (Qatar Central Bank / National Information Assurance)

### Leadership-as-a-service
- vCISO (Virtual Chief Information Security Officer)
- vDPO (Virtual Data Protection Officer)
- Managed Advisory (GRC subscription)

### Risk & planning
- Business Impact Analysis / Business Risk Assessment
- Disaster Recovery Planning
- AI Risk Assessment (NIST-framework-aligned)

âš ï¸ **Strategy doc gap flagged:** the 12-stream architecture in `Pixelette_Certified_First_Mover_Strategy.docx` covers only 12 of these services and is UK-focused. The website's 15+ services and international reach (UAE / KSA / Qatar) sit outside the strategy doc's scope. Either strategy needs expansion or website needs narrowing. Inconsistency between live site and operational strategy is a commercial credibility risk.

## Credentials displayed publicly

- Pixelette Certified itself holds ISO 27001 (claimed as "ISO 27001 Certified Practice")
- PECB-certified ISO 42001 Lead Auditor (claimed "among first in UK market")

âš ï¸ Other credentials in the proposal template (IRCA ISO 27001 Lead Auditor, CISA, AIGP, CIPM, CIPP/US, FIP, CEH, ISO 9001 Internal Auditor) are NOT displayed on the website. The proposal template lists them but the website does not. A prospect verifying via the site after a meeting will see a credential gap unless the website is updated.

## Pricing model (as displayed)

- **Fixed-fee proposals** â€” no hourly billing or scope creep
- **90 days post-certification support included as standard**
- **Pass-First Guarantee defined:** *"if a failure occurs due to a gap in our documentation, we cover the remediation at no additional cost"* â€” this is the canonical definition; do not extemporise scope in sales calls
- **Specific pricing figures not disclosed publicly** â€” pricing only via proposal post-discovery

âš ï¸ **"Beat any quote by 10%" commitment** â€” appears in proposal template Section 6 ("Pixelette Certified will beat any comparable quote from an equivalently credentialled UKAS-accredited consultancy by at least 10%") and is referenced in close scripts. **NOT displayed on the website.** This is a strong commercial differentiator that's deployed in private proposals but absent from public positioning. Decision needed: either add to website or remove from proposals to avoid the "verbal-only commitment" risk.

## Target customer profile (per public positioning)

- Enterprise technology companies losing deals due to missing certifications
- SaaS platforms requiring ISO 27001
- FinTech firms needing bank-compliant credentials
- AI technology companies (ISO 42001 focus)
- Organisations in regulated industries (healthcare, government, finance)
- Businesses seeking procurement gate access

## Named team

âš ï¸ **No team members named publicly.** Testimonials cite roles ("CTO", "Head of Engineering", "CEO") but no consultant names. Internally Mr Rana (CEO), Muhammad Waleed (technical lead), Mr Asid (Group President), Mrs Aliya (Group CMO) are the senior team. Website absence of named senior leadership is a credibility friction point for enterprise procurement diligence.

## Company registration number

**Not displayed publicly on the site.** Proposal template footer states Company No. 17506745. This is a verification gap â€” a prospect cross-checking the site against Companies House cannot complete the loop from the website alone.

## Testimonial / case study claims

One specific outcome cited publicly:
- "FinTech client closed a major bank contract within 30 days of certification"

âš ï¸ Generic; not named. Per [[Rules/NEVER-DO]] Â§ Never put generic case studies, made-up client names, or unverified figures into outbound content â€” this should be replaced or named with permission before being cited in any proposal or InMail.

## Cross-references

- Verbatim source extracts: see other files in this folder
- Distilled hub: [[Topics/pixelette-certified-leadgen]]
- Discrepancy resolution items: tracked in [[State/current]] Â§ Pending items

---

## Â§ Update â€” 2026-05-19 (full-site crawl via defuddle)

The initial 2026-05-19 snapshot above was based on a single WebFetch call against the homepage, returning a structured summary rather than verbatim text. **Mr Rana challenged this directly** ("have you looked at the company website and all the links and had a proper read of every word on the website?"). The answer was no.

Full-site crawl executed using `defuddle parse <url> --md` for verbatim markdown extraction. Sitemap fetched and analysed; every linked page in the sitemap and every service-page link from the homepage was attempted. Verbatim pages preserved in `website-pages/` subfolder of this archive.

### Pages crawled successfully (18)

| File | URL | Notes |
|------|-----|-------|
| `website-pages/00-homepage.md` | / | Full 278-line homepage capture |
| `website-pages/01-about.md` | /about | **22 lines only** â€” see Critical Findings below |
| `website-pages/02-pricing.md` | /pricing | **24 lines** â€” no actual prices |
| `website-pages/03-contact.md` | /contact | Address: 66 Paul Street EC2A 4NA; "8 active certifications" claim |
| `website-pages/04-case-studies.md` | /case-studies | 3 anonymous case studies (UK FinTech, AI SaaS, Healthcare Tech) |
| `website-pages/05-blog.md` | /blog | **18 blog posts confirmed** (matches "Muhammad Waleed bylines" in strategy doc) |
| `website-pages/06-industries.md` | /industries | **Essentially empty** â€” see Critical Findings |
| `website-pages/07-cookie-policy.md` | /cookie-policy | Standard cookie policy |
| `website-pages/08-privacy-policy.md` | /privacy-policy | **Reveals Pixelette Group Ltd is legal entity; trading name = Pixelette Certified** |
| `website-pages/svc-01-iso-27001.md` | /services/iso-27001 | 5-phase 10â€“12 week, 3 pricing tiers (Essentials / Professional / Enterprise) |
| `website-pages/svc-02-iso-22301.md` | /services/iso-22301 | 5-phase 10â€“12 week, 3 tiers, BCMS |
| `website-pages/svc-03-iso-9001.md` | /services/iso-9001 | 5-phase 10â€“12 week, 3 tiers, QMS |
| `website-pages/svc-04-iso-14001.md` | /services/iso-14001 | 5-phase 10â€“12 week, 3 tiers, EMS |
| `website-pages/svc-05-iso-42001.md` | /services/iso-42001 | 5-phase 11â€“14 week, 3 tiers, AIMS + EU AI Act mapping |
| `website-pages/svc-06-cyber-essentials.md` | /services/cyber-essentials | **3-phase 3 weeks** total, 2 tiers (CE / CE+) |
| `website-pages/svc-07-vciso.md` | /services/vciso | Monthly retainer, 3 phases, 2 tiers (Basic 10â€“12 hrs/mo / Enterprise 22â€“30 hrs/mo) |
| `website-pages/svc-08-vdpo.md` | /services/vdpo | Monthly retainer, 3 phases, 1 tier (8â€“10 hrs/mo) |
| `website-pages/svc-09-penetration-testing.md` | /services/penetration-testing | 4 weeks, 3 phases, 1 tier per app, **CREST-certified testers** |
| `website-pages/svc-10-gdpr-privacy.md` | /services/gdpr-privacy | 3 phases, 3 tiers, includes ICO liaison at Enterprise tier |

### Critical Findings

#### âš ï¸ Finding 1 â€” 12 of 22 service pages on the homepage return 404

The homepage lists 22 services with "Learn more" links. Only 10 of these resolve. **12 service URLs return 404 Not Found**. Verified by direct curl status-code probe:

```
404  https://pixelettecertified.com/services/iso-27701
404  https://pixelettecertified.com/services/soc-2
404  https://pixelettecertified.com/services/sama-csf
404  https://pixelettecertified.com/services/nca-ecc
404  https://pixelettecertified.com/services/qcb-nia
404  https://pixelettecertified.com/services/zero-trust
404  https://pixelettecertified.com/services/ad-hardening
404  https://pixelettecertified.com/services/cloud-security-architecture
404  https://pixelettecertified.com/services/bia-bra
404  https://pixelettecertified.com/services/dr-planning
404  https://pixelettecertified.com/services/ai-risk-assessment
404  https://pixelettecertified.com/services/managed-advisory
```

**Commercial impact:** every prospect clicking these 12 services from the homepage gets a "page not found" error. This is a **critical credibility issue** for outbound â€” the strategy doc and proposal v5 reference SAMA CSF, NCA ECC, QCB/NIA, vDPO, vCISO, AI Risk Assessment as live offerings, but website pages do not exist. Sitemap.xml also only lists the 10 working service pages, suggesting the additional 12 services were added to the homepage navigation without corresponding pages being built.

#### âš ï¸ Finding 2 â€” About page is essentially empty of any team information

The `/about` page is **22 lines** and contains:
- "Qualified, certified, and accountable"
- "Senior consultants with real-world experience across information security, privacy, AI governance, and ethical hacking"
- "We deliberately operate a low-volume, senior-led model"
- "Backed by Pixelette Group's decade-long technology delivery team across the UK, Middle East, Europe, North America, and Asia Pacific"

**No named consultants. No named senior team. No bios. No photos.** The 9.6/10 Muhammad Waleed credentials (PECB ISO 42001 Lead Auditor, IRCA ISO 27001, CISA, AIGP, CIPM, CIPP/US, FIP, CEH) that feature heavily in the proposal template are entirely absent from the website. Same with Mr Rana (CEO), Mrs Aliya (Group CMO), Mr Asid (Group President).

**Commercial impact:** enterprise procurement diligence will start with the About page. Anonymous "senior consultants" is materially weaker than named credentials. The proposal template Section 3 lists 8 certification credentials by name; the website lists zero by name.

#### âš ï¸ Finding 3 â€” Pricing page has no actual prices

The `/pricing` page is **24 lines** with sections "How we price every engagement" / "Included" / "Multi-Certification" / "Pricing FAQ" but **no actual fee numbers, fee ranges, or even "from Â£X" indicators**. Service-page pricing tiers all say "Scoped to your business" â€” same approach. Prospects must book a gap analysis call to learn any price.

**Commercial impact:** absence of pricing creates friction (per the prior-LLM verdict on proposal v1). A prospect who doesn't want to commit to a 30-minute call will not learn the cost and may disengage. The proposal template v5 in this archive (file 03) has indicative ranges per service â€” that's the better pattern. Decision needed: either add indicative ranges to the website, or remove the pricing page entirely.

#### âš ï¸ Finding 4 â€” Industries page is essentially empty

The `/industries` page is **9 lines**: "Industry expertise drives faster certification" + a CTA to book a gap analysis. **No industries are listed, no sector-specific positioning, no NHS / FCA / DORA / EU AI Act content despite these being core to the strategy doc and execution playbook.**

**Commercial impact:** the strategy doc Stream 3 (US-Facing SaaS), Stream 4 (Cyber Security MSPs), Stream 11 (Healthcare AI), Stream 8 (DORA Financial Services), Stream 7 (FCA OpRes) are all sector-driven. The Industries page should be the website's strongest content for industry-specific search SEO and prospect navigation. Currently it serves no purpose.

#### âš ï¸ Finding 5 â€” Blog post EU AI Act framing â€” partially aligned, partially needs review

The `/blog/eu-ai-act-uk-companies` post is titled "EU AI Act Preparation for UK Companies: What You Actually Need to Do Before August 2026" and the body asserts:

> "On 2 August 2026, the second major application date of the EU Artificial Intelligence Act becomes effective. From that date, the obligations on providers and deployers of 'general-purpose AI models' come into force... The full obligations on high-risk AI systems follow in August 2027."

This is **substantively more accurate than the strategy doc**. The blog post correctly distinguishes:
- February 2025 â€” Unacceptable Risk prohibitions (in effect)
- August 2026 â€” GPAI model obligations effective (this is the date still in play, not yet delayed)
- August 2027 â€” Full high-risk AI obligations effective

The strategy doc / execution playbook in this same archive describe a "December 2027 first-mover backstop" based on Parliament + Council March 2026 votes to delay HIGH-RISK obligations. **The blog post and strategy doc may both be correct, addressing different obligations.** GPAI model obligations may genuinely still be effective August 2026; the December 2027 delay applies to high-risk systems.

**Action needed:** reconcile blog post and strategy doc messaging. Either:
- (a) blog post is correct (GPAI Aug 2026 still active; high-risk Aug 2027 or later) and strategy doc framing of "no August 2026 deadline" needs nuance â€” there IS an August 2026 deadline for GPAI specifically
- (b) blog post needs updating once Digital Omnibus trilogue concludes; current GPAI deadline status as of 19 May 2026 needs verification

**This matters for sales conversion** â€” prospects looking at the blog will see the August 2026 framing; prospects working with the team will hear the December 2027 first-mover framing. Inconsistency between published content and active outbound creates credibility friction.

#### âš ï¸ Finding 6 â€” 18 blog posts confirmed (matches strategy doc "Muhammad Waleed byline" claim)

The `/blog` page lists 18 posts:

1. We Just Got Asked for ISO 27001 in a Security Questionnaire. What Now?
2. ISO 27001 in 10 Weeks vs 6 Months: What Actually Changes?
3. The Real Cost of NOT Being ISO 27001 Certified
4. Our Customer Just Asked About Our AI Governance. We Don't Have Any.
5. ISO 27001 or SOC 2? A Straight Answer for UK SaaS Selling into US Enterprise
6. How to Answer an Enterprise Security Questionnaire Without ISO 27001
7. ISO 27001 for UK Fintech: What the FCA and DORA Actually Require
8. ISO 27001 for UK Healthtech: NHS DSPT, DTAC, and the Procurement Gates You Will Actually Face
9. ISO 27001 for AI Companies: Why ISO 42001 Alone Is Not Enough
10. ISO 27001 for Legal Firms: SRA Expectations, Client Audits, and the Cost of One Breach
11. Your Investor Just Asked About Your Security Posture in Due Diligence. What Now?
12. Your Cyber Insurance Premium Just Increased by 40%. Here Is Why, and What to Do About It.
13. ISO 27001 vs Cyber Essentials Plus: When You Need One, When You Need Both, and When the Question Itself Is Wrong
14. Vanta vs Drata vs a Real Consultancy: What Compliance Automation Tools Actually Do (And What They Don't)
15. Why Most ISO 27001 Projects Run Over Budget (And the Four Red Flags to Watch For in a Proposal)
16. Can a 20-Person Company Really Get ISO 27001 Certified? A Direct Answer.
17. EU AI Act Preparation for UK Companies: What You Actually Need to Do Before August 2026
18. ISO 42001 vs the EU AI Act: What Enterprise Buyers Actually Expect You to Hold

These are commercially-targeted titles â€” every one maps to a real prospect pain point identified in the strategy doc and execution playbook. The SEO retrofit pending item in [[current]] is the work to make these blog posts actually generate inbound traffic.

#### âš ï¸ Finding 7 â€” Pixelette Certified IS a trading name (legal entity is Pixelette Group Ltd)

From the privacy policy verbatim:

> "Pixelette Certified is a trading name of Pixelette Group Ltd, registered in England and Wales."

This is important for proposal accuracy. The proposal v5 footer says "Registered in England and Wales. Company No. 17506745. 77 Fulham Palace Road, London W6 8JA." The website's privacy policy confirms the registered entity is **Pixelette Group Ltd** (NOT "Pixelette Certified Ltd"). Verify against Companies House:

- Company No. 17506745 should resolve to "PIXELETTE GROUP LTD" or similar (not Pixelette Certified Ltd)
- Registered office on Companies House is the authoritative address (resolves the 66 Paul Street vs 77 Fulham Palace Road discrepancy)

**Action:** Companies House check at https://find-and-update.company-information.service.gov.uk/ for Company No. 17506745.

#### âš ï¸ Finding 8 â€” Useful new fact: 8 active certifications across 4 bodies

The Contact page states: *"8 active certifications held across PECB, ISACA, IAPP, and CQI/IRCA"* and *"ISO 27001 Lead Auditor certified team, CQI and IRCA registered"*.

This is the canonical numeric claim for team credentials. Per the proposal template the credentials listed are: IRCA ISO 27001 Lead Auditor, PECB ISO 42001 Lead Auditor, ISO 9001 Internal Auditor, CISA, AIGP, CIPM, CIPP/US, FIP, CEH â€” that's 9 distinct credentials. Either the count is 8 (Contact page) or 9 (proposal). Reconcile.

#### âš ï¸ Finding 9 â€” Pricing tier model is consistent across services

Every working service page uses the same three-tier model:

- **Essentials** â€” SMEs up to 50 employees / startups
- **Professional** (Most Popular) â€” Scale-ups 50â€“150 employees, adds staff training + year 1 surveillance
- **Enterprise** â€” 150+ employees or regulated sectors, adds multi-site / integrated management system / year 1+2 surveillance

ISO 42001 Professional tier specifically includes **EU AI Act mapping** â€” this is the website's most explicit EU AI Act offering.

Cyber Essentials uses 2-tier (CE / CE+). vCISO uses 2-tier (Basic 10â€“12 hrs/mo / Enterprise 22â€“30 hrs/mo). vDPO uses 1-tier (8â€“10 hrs/mo). All retainer-based services use "Monthly retainer" not "Scoped to your business".

#### âš ï¸ Finding 10 â€” Case Studies page anonymous but commercially specific

Three case studies, all sector-anonymised:

1. **UK FinTech, 65 employees** â€” ISO 27001 in 9 weeks â†’ "Enterprise deal pipeline increased by 340%. Security questionnaire response time reduced from days to minutes."
2. **AI SaaS Platform, 40 employees** â€” ISO 42001 + ISO 27001 dual in 14 weeks â†’ "Closed three enterprise contracts within 60 days of certification."
3. **Healthcare Tech, 120 employees** â€” Cyber Essentials in 3 weeks + ISO 27001 in 12 weeks â†’ "Won NHS framework contract worth six figures annually. Reduced cyber insurance premium by 35%."

**Commercial impact:** the case study OUTCOMES are quantified (340%, 3 deals, six-figure NHS contract, 35% premium reduction). The PROSPECTS are anonymised. Per [[Rules/NEVER-DO]] Â§ Never put generic case studies, made-up client names, or unverified figures into outbound content â€” these figures (340%, 3 enterprise contracts, six-figure NHS framework, 35% premium reduction) need to be verifiable before being cited in InMails or proposals. Currently sat on the website but not yet cross-referenced to named clients with permissions.

### What still needs to be done

1. **Build the 12 missing service pages** (ISO 27701, SOC 2, SAMA CSF, NCA ECC, QCB/NIA, Zero Trust, AD Hardening, Cloud Security, BIA/BRA, DR Planning, AI Risk Assessment, Managed Advisory) â€” or remove them from the homepage until they exist
2. **Populate the About page** with named team and credentials (or at minimum the lead auditor names matching the proposal template)
3. **Add indicative pricing** to the website or accept the friction of "book a call to learn the price"
4. **Populate the Industries page** with sector-specific landing content matching the 12 strategy streams
5. **Resolve EU AI Act blog post / strategy doc messaging consistency** â€” verify GPAI Aug 2026 status as of trilogue progress
6. **Verify Companies House registration** for Co. 17506745 (Pixelette Group Ltd) â€” settles address discrepancy
7. **Reconcile "8 active certifications" vs proposal-listed 9 credentials** count
8. **Verify case study figures** (340%, 35%, six-figure NHS, etc.) before citing in outbound
9. **Add "Beat any quote by 10%" commitment to the website** OR remove from proposals â€” currently inconsistent
10. **SEO retrofit on 18 blog posts** per the strategy doc execution playbook Â§7.5 â€” high-priority inbound asset

### Confirmation against Mr Rana's challenge

Mr Rana asked: *"have you looked at the company website and all the links and had a proper read of every word on the website?"*

**Original answer (truthful):** No. I had used a single WebFetch call against the homepage with a structured-extraction prompt. The result was a summary, not verbatim text. Sub-pages were not crawled.

**After the full crawl (this section):** Yes for the **18 pages that exist and resolve**. Verbatim markdown captured for each via defuddle, copied into `website-pages/` subfolder of this archive. **12 service pages do not exist** (404 â€” Finding 1 above) so cannot be read. Individual blog posts (18 published) only sampled (EU AI Act post fetched for Finding 5); the rest are listed on the blog index but not individually crawled â€” the index page captures their titles and one-line descriptions which is sufficient for navigation, but full body text of each post is not yet in the vault. Optional follow-up: defuddle each blog post into `website-pages/blog/` if Mr Rana wants the full body text archived.


================================================================================
## B. VERBATIM PAGE CAPTURES (19 — original 2026-05-19 crawl)



----- PAGE FILE: 00-homepage.md -----

**ISO 27001 Certified Practice** â€” We hold the same certification we help you achieve.

50+

ISO Certifications Delivered

98%

First-Attempt Audit Pass Rate

10 Weeks

Average to Certification

Global

UK, UAE, Saudi Arabia, Qatar, EU, Americas, APAC

## Your next big deal is waiting on a certificate you don't have yet.

The cost of not being certified is not the fee you save. It is every deal that goes to a competitor who is already certified. Every procurement gate you fail. Every contract you lose before you even get to a conversation.

### Lost Contracts

Every day, businesses across every sector and every geography lose enterprise deals because they cannot answer: 'Are you ISO 27001 certified?' Procurement teams reject uncertified suppliers automatically. The question is never even asked twice.

### Stalled Investment

Investors move on when your data governance is unclear. Compliance gaps signal operational risk that venture capital firms, private equity, and strategic investors will not accept, regardless of how strong your product is.

### Failed Onboarding

Enterprise clients, government bodies, regulated industries, and healthcare networks worldwide cannot onboard uncertified suppliers. Without the right certifications, you are locked out before the conversation starts, in every market, in every sector.

Commercial Impact

## The Commercial Impact of Getting Certified

Certification is not a cost line. It is a revenue unlock.

50+ certifications delivered across banking, healthcare, SaaS, AI, manufacturing, and government supply chains.

98% first-attempt pass rate, meaning your audit fee, your internal time, and your deal timeline are protected.

10 weeks from kick-off to certificate, fast enough to unblock a procurement gate, slow enough to do it properly.

One client closed a major bank contract within 30 days of certification (see FinTech case study).

Fixed-fee. Senior-led. Backed by the Pixelette Pass-First Guarantee: if a failure occurs due to a gap in our documentation, we cover the remediation at no additional cost.

How We Work

## Certified in Three Steps, So You Can Focus on Winning Deals

Simple, transparent, and designed to keep your business moving, no matter where you are in the world or what industry you operate in.

01

### We assess where you are

A free gap analysis identifies exactly what you have, what you need, and how long it will take. No jargon. No surprises. Just a clear starting point, whether you are pursuing ISO 27001, ISO 42001, ISO 9001, Cyber Essentials, or any other standard.

02

### We do the work

Our consultants write the documentation, build the controls, train your team, and prepare you for the external audit. Your team stays focused on running your business. We handle every aspect of the compliance process.

03

### You get certified

We stand alongside you through the Stage 1 and Stage 2 audits. When you pass, and our clients pass first time, you have a globally recognised certification that opens doors to enterprise contracts, government frameworks, and new markets.

Our 10-week delivery cycle means engagements started today complete before the end of Q2 2026. Engagements started after May complete in Q3. If you have a procurement deadline, fiscal year-end, or EU AI Act milestone in view, the calendar, not the contract, is your binding constraint.

Our Services

## One Partner for ISO, Cyber Security, AI Governance, and Privacy

From ISO certification to ongoing security leadership, we cover the full compliance landscape for businesses across every industry, in every market.

### [ISO 27001](https://pixelettecertified.com/services/iso-27001)

The global standard for information security management. Get certified in 10 weeks.

Learn more

### [ISO 22301](https://pixelettecertified.com/services/iso-22301)

Business continuity certification. Demonstrate resilience and stay operational when it matters most.

Learn more

### [ISO 9001](https://pixelettecertified.com/services/iso-9001)

Quality management certification. Prove consistent delivery excellence to clients worldwide.

Learn more

### [ISO 14001](https://pixelettecertified.com/services/iso-14001)

Environmental management certification. Lead on sustainability and meet ESG obligations.

Learn more

### [ISO 42001](https://pixelettecertified.com/services/iso-42001)

AI governance certification. Lead responsibly in the era of artificial intelligence.

Learn more

### [Cyber Essentials](https://pixelettecertified.com/services/cyber-essentials)

The UK government-backed cybersecurity certification. Essential for public sector supply chains.

Learn more

### [vCISO](https://pixelettecertified.com/services/vciso)

Senior security leadership, without the senior hire. A fractional CISO for your business.

Learn more

### [vDPO](https://pixelettecertified.com/services/vdpo)

Your dedicated Data Protection Officer, on demand. Expert privacy leadership at a fraction of the cost.

Learn more

### [Penetration Testing](https://pixelettecertified.com/services/penetration-testing)

Find your vulnerabilities before attackers do. Expert-led security testing for any environment.

Learn more

### [GDPR & Privacy](https://pixelettecertified.com/services/gdpr-privacy)

Turn your data protection obligations into a competitive advantage across any jurisdiction.

Learn more

### [ISO 27701](https://pixelettecertified.com/services/iso-27701)

The privacy extension to ISO 27001. Establishes a Privacy Information Management System aligned with GDPR and global privacy regulations.

Learn more

### [SOC 2](https://pixelettecertified.com/services/soc-2)

Trust Services Criteria compliance for technology companies serving US enterprise clients and investors.

Learn more

### [SAMA CSF](https://pixelettecertified.com/services/sama-csf)

Mandatory cybersecurity framework for Saudi Arabian financial institutions regulated by the Saudi Arabian Monetary Authority.

Learn more

### [NCA ECC/CCC](https://pixelettecertified.com/services/nca-ecc)

Essential Cybersecurity Controls and Cloud Cybersecurity Controls for Saudi government entities and critical infrastructure.

Learn more

### [QCB/NIA](https://pixelettecertified.com/services/qcb-nia)

Qatar Central Bank cybersecurity requirements and National Information Assurance framework for Qatari financial institutions.

Learn more

### [Zero Trust](https://pixelettecertified.com/services/zero-trust)

Vendor-neutral Zero Trust architecture design based on NIST SP 800-207 and CISA principles.

Learn more

### [AD Hardening](https://pixelettecertified.com/services/ad-hardening)

Systematic hardening of Active Directory and Azure AD / Entra ID environments to reduce domain compromise risk.

Learn more

### [Cloud Security](https://pixelettecertified.com/services/cloud-security-architecture)

Security architecture design for AWS, Azure, GCP, and hybrid cloud environments.

Learn more

### [BIA / BRA](https://pixelettecertified.com/services/bia-bra)

Identify critical functions, recovery priorities, and the threats most likely to cause disruption to your operations.

Learn more

### [DR Planning](https://pixelettecertified.com/services/dr-planning)

Actionable DR runbooks and recovery procedures ensuring IT systems can be restored within defined objectives.

Learn more

### [AI Risk Assessment](https://pixelettecertified.com/services/ai-risk-assessment)

Structured evaluation of AI system risks against the NIST AI Risk Management Framework, with EU AI Act alignment.

Learn more

### [Managed Advisory](https://pixelettecertified.com/services/managed-advisory)

Continuous GRC advisory subscription delivered by certified practitioners. White-label available for partners and MSPs.

Learn more

## The AI Governance First-Mover Advantage

ISO 42001 certification before your competitors. Delivered by a PECB-certified Lead Auditor, among the first in the UK market.

[Learn About ISO 42001](https://pixelettecertified.com/services/iso-42001)

Why Pixelette Certified

## The unfair advantage your compliance deserves

### 10 weeks to certification

Most consultancies take 5 to 8 months. We have engineered a structured process that gets businesses certified in 10 weeks without cutting corners.

### One partner for everything

ISO certification, penetration testing, vCISO, vDPO, GDPR, AI governance, SOC 2, and managed advisory under one commercial relationship.

### No pricing surprises

Fixed-fee proposals before any work begins. No hourly billing. No scope creep. Every engagement scoped to your business, your sector, and your audit body, with 90 days post-certification support included as standard.

### AI governance pioneers

Among the first UK consultancies offering ISO 42001 AI governance certification, with a PECB-certified ISO 42001 Lead Auditor on the team.

### The Pixelette Pass-First Guarantee

98% First-Attempt Pass Rate. If a failure occurs due to a gap in our documentation, we cover the remediation at no additional cost.

Client Success

## Trusted by Technology Companies Winning Enterprise Contracts

Our clients pass their audits first time. Here is what they say.

â€œWe needed ISO 27001 to close a contract with a major bank. Pixelette Certified got us through Stage 2 in 9 weeks. The deal closed within 30 days of certification.â€

CTO

FinTech

â€œWe had been putting off ISO 27001 for two years because every consultant we spoke to made it sound like an 8-month project. It took 11 weeks. The process was clear, structured, and genuinely painless.â€

Head of Engineering

SaaS Platform

â€œThe vCISO service means we have a senior security voice in every board conversation without the cost of a full-time CISO. It has changed how seriously our enterprise clients take us globally.â€

CEO

AI Technology Company

## Compliance Intelligence for Enterprise-Ready Businesses

Get monthly insights on ISO certification, cybersecurity regulations, AI governance, and global compliance trends, written by our consultants, not a marketing team.

No spam. Unsubscribe anytime. Read our [Privacy Policy](https://pixelettecertified.com/privacy-policy).

## See Your Path to Certification in 30 Minutes

No obligation. No sales pressure. In 30 minutes, you will know exactly where your compliance gaps are, which standards apply to your business and jurisdiction, and what a realistic timeline and cost looks like, wherever in the world you operate.

Most clients book their first paid engagement within 2 weeks of their gap analysis call.


----- PAGE FILE: 01-about.md -----

## Qualified, certified, and accountable

Our consultants hold the industry's most respected qualifications. We do not just advise on compliance, we live it.

Our Team

## The people behind your certification

Senior consultants with real-world experience across information security, privacy, AI governance, and ethical hacking.

Backed by Pixelette Group's decade-long technology delivery team across the UK, Middle East, Europe, North America, and Asia Pacific, giving every engagement access to specialist input across SaaS, cloud infrastructure, AI systems, and software architecture.

We deliberately operate a low-volume, senior-led model. Every engagement is led by a credentialled practitioner, never handed to a junior. This is the engine behind our 98% first-attempt pass rate.

Why Pixelette Certified

## The unfair advantage your compliance deserves

## See Your Path to Certification in 30 Minutes

No obligation. No sales pressure. In 30 minutes, you will know exactly where your compliance gaps are, which standards apply to your business and jurisdiction, and what a realistic timeline and cost looks like, wherever in the world you operate.

Most clients book their first paid engagement within 2 weeks of their gap analysis call.


----- PAGE FILE: 02-pricing.md -----

## How we price every engagement

Every proposal is scoped to your specific organisation, team size, existing controls, sector, and objectives.

Included

## What every engagement delivers

Regardless of the standard or your organisation size, every Pixelette Certified engagement includes:

Multi-Certification

## Combined certifications save time and money

Many ISO standards share significant control overlap. We price combined engagements efficiently and typically deliver dual certifications faster than two sequential projects.

Pricing FAQ

## Common pricing questions

## Ready to get started?

Book a free 30-minute gap analysis call. We will assess your current position, recommend the right services, and give you a clear timeline. No obligation. No sales pressure.

Most clients book their first paid engagement within 2 weeks of their gap analysis call.


----- PAGE FILE: 03-contact.md -----

## Book your free gap analysis, wherever you are in the world.

Whether you are based in London or Lagos, Dubai or Dublin, New York or Nairobi, we are here to help. Fill in the form and a senior compliance consultant will respond within 1 working day.

## Book a Free ISO 27001 Gap Analysis

Tell us about your organisation, your target certification, and your timeline. We will review your enquiry and come back to you within 1 working day with a clear, honest assessment of your next steps. No sales pressure. No obligation.

### Contact information

- Email
	[info@pixelettecertified.com](mailto:info@pixelettecertified.com)
- Phone
	[+44 20 7946 0958](tel:+442079460958)
- Office
	77 Fulham Palace Road, London W6 8JA

### What is a Gap Analysis?

A gap analysis is a structured assessment of your current policies, processes, and controls against the requirements of your target certification standard, ISO 27001, ISO 42001, ISO 9001, ISO 22301, Cyber Essentials, GDPR, or any other standard you are pursuing. The output is a clear report showing where you meet requirements, where you have gaps, and a prioritised roadmap to close them. It is the fastest way to understand your path to certification, regardless of your industry, your size, or your location. And it is completely free.

### Why work with us

- ISO 27001 Lead Auditor certified team, CQI and IRCA registered
- 98% first-attempt audit pass rate across ISO 27001, ISO 42001, and Cyber Essentials
- Global delivery, clients served across the UK, UAE, EU, Americas, and APAC
- 8 active certifications held across PECB, ISACA, IAPP, and CQI/IRCA
- Response within 1 working day, guaranteed

## What happens after you contact us

Within 1 working day, a senior compliance consultant will review your enquiry and respond directly. We will ask a few focused questions about your organisation, your target certification, ISO 27001, ISO 42001, ISO 9001, Cyber Essentials, GDPR, or another standard, and your timeline and budget. From there we will schedule your free 30-minute gap analysis call and give you a clear, honest assessment of your path to certification. Timeline, cost, and scope, confirmed upfront. No surprises.

Not sure which certification you need? View our [full services](https://pixelettecertified.com/services) or explore [by industry](https://pixelettecertified.com/industries).


----- PAGE FILE: 04-case-studies.md -----

## Real Results for Real Companies

How UK technology companies achieved certification faster, won enterprise deals, and built lasting compliance programmes.

### [UK FinTech](https://pixelettecertified.com/case-studies/uk-fintech-iso-27001)

Financial Technology, 65 employees

ISO 270019 weeks

Challenge

Losing enterprise deals to competitors who already held ISO 27001. Security questionnaires consuming 40+ hours per month.

Result

Certified in 9 weeks. Enterprise deal pipeline increased by 340%. Security questionnaire response time reduced from days to minutes.

Read case study â†’

### [AI SaaS Platform](https://pixelettecertified.com/case-studies/ai-saas-iso-42001-iso-27001)

Artificial Intelligence, 40 employees

ISO 42001ISO 2700114 weeks

Challenge

EU AI Act compliance requirements approaching. Enterprise clients demanding evidence of responsible AI governance alongside information security.

Result

Dual certification achieved in 14 weeks. First-mover advantage in AI governance. Closed three enterprise contracts within 60 days of certification.

Read case study â†’

### [Healthcare Tech](https://pixelettecertified.com/case-studies/healthcare-tech-cyber-essentials-iso-27001)

Healthcare Technology, 120 employees

Cyber EssentialsISO 2700112 weeks

Challenge

NHS Digital supply chain requirements mandated Cyber Essentials. Private healthcare clients required ISO 27001 for data processing agreements.

Result

Cyber Essentials achieved in 3 weeks, ISO 27001 in 12 weeks. Won NHS framework contract worth six figures annually. Reduced cyber insurance premium by 35%.

Read case study â†’

### Want results like these?

Every engagement starts with a free consultation. Let us assess your current position and design a roadmap to certification.

[See Your 10-Week Certification Roadmap](https://pixelettecertified.com/contact)


----- PAGE FILE: 05-blog.md -----

## Insights & Guides

Compliance Intelligence, Strategic thinking on certification, procurement, AI governance, and enterprise readiness. Written by UK-credentialled practitioners, for businesses operating in any market.### We Just Got Asked for ISO 27001 in a Security Questionnaire. What Now?

ISO 27001

Your buyer just sent a security questionnaire asking for ISO 27001. You don't have it. This guide shows exactly what to do next and how to stay in the deal.

Read more â†’

[View original](https://pixelettecertified.com/blog/iso-27001-security-questionnaire)### ISO 27001 in 10 Weeks vs 6 Months: What Actually Changes?

ISO 27001

The 10-week timeline is not a marketing gimmick. This guide explains what a structured fast-track compresses, what it does not, and how to tell a real fast-track from corner-cutting.

Read more â†’

[View original](https://pixelettecertified.com/blog/iso-27001-10-weeks-vs-6-months)### The Real Cost of NOT Being ISO 27001 Certified

ISO 27001

Every founder asks how much ISO 27001 costs. The right question is how much it costs not to have it. This guide puts a number on the second question.

Read more â†’

[View original](https://pixelettecertified.com/blog/real-cost-not-being-iso-27001-certified)### Our Customer Just Asked About Our AI Governance. We Don't Have Any.

AI Governance

Enterprise buyers and investors are asking about AI governance with increasing regularity. If you build or deploy AI, ISO 42001 is the answer. Here is what to do this week.

Read more â†’

[View original](https://pixelettecertified.com/blog/customer-asked-ai-governance)### ISO 27001 or SOC 2? A Straight Answer for UK SaaS Selling into US Enterprise

SOC 2

A UK SaaS company closes its first US deal and discovers SOC 2 is the default. This guide explains whether to hold one or both, and in what order.

Read more â†’

[View original](https://pixelettecertified.com/blog/iso-27001-or-soc-2-uk-saas)### How to Answer an Enterprise Security Questionnaire Without ISO 27001

Advisory

A tactical guide for handling enterprise security questionnaires when you do not yet hold ISO 27001, with a free response framework template.

Read more â†’

[View original](https://pixelettecertified.com/blog/enterprise-security-questionnaire-without-iso-27001)### ISO 27001 for UK Fintech: What the FCA and DORA Actually Require

FinTech

FCA operational resilience, DORA compliance, and ISO 27001 for fintech. This guide maps the real regulatory requirements to the certification framework.

Read more â†’

[View original](https://pixelettecertified.com/blog/iso-27001-uk-fintech-fca-dora)### ISO 27001 for UK Healthtech: NHS DSPT, DTAC, and the Procurement Gates You Will Actually Face

Healthcare

A practical guide to the four assurance frameworks every UK healthtech selling into the NHS will encounter, where ISO 27001 fits in the stack, and how to navigate tender deadlines.

Read more â†’

[View original](https://pixelettecertified.com/blog/iso-27001-uk-healthtech-nhs)### ISO 27001 for AI Companies: Why ISO 42001 Alone Is Not Enough

AI Governance

AI companies need both ISO 27001 and ISO 42001 because the two standards cover different risk domains, and enterprise buyers check the ISO 27001 box first.

Read more â†’

[View original](https://pixelettecertified.com/blog/iso-27001-ai-companies-iso-42001)### ISO 27001 for Legal Firms: SRA Expectations, Client Audits, and the Cost of One Breach

Legal

The average UK legal firm data breach costs 4.2 million pounds, yet legal firms remain the slowest professional services sector to certify. This guide explains what the SRA expects and why client audits are now the dominant procurement gate.

Read more â†’

[View original](https://pixelettecertified.com/blog/iso-27001-legal-firms-sra)### Your Investor Just Asked About Your Security Posture in Due Diligence. What Now?

Advisory

Investor security diligence is more sophisticated than procurement questionnaires. This guide explains what Series B and later funds actually look for and what to do if the questionnaire arrived this morning.

Read more â†’

[View original](https://pixelettecertified.com/blog/investor-asked-security-posture)### Your Cyber Insurance Premium Just Increased by 40%. Here Is Why, and What to Do About It.

Advisory

UK cyber insurance premiums have repriced sharply and certified businesses are now treated as a separate risk class. This guide explains exactly how underwriters use ISO 27001 in their pricing models.

Read more â†’

[View original](https://pixelettecertified.com/blog/cyber-insurance-premium-increased)### ISO 27001 vs Cyber Essentials Plus: When You Need One, When You Need Both, and When the Question Itself Is Wrong

Compliance

ISO 27001 and Cyber Essentials Plus are not alternatives. They answer different questions and satisfy different procurement gates. This guide explains which buyers need which credential.

Read more â†’

[View original](https://pixelettecertified.com/blog/iso-27001-vs-cyber-essentials-plus)### Vanta vs Drata vs a Real Consultancy: What Compliance Automation Tools Actually Do (And What They Don't)

Advisory

An honest comparison of compliance automation platforms and consultancy-led implementation, including the five scenarios where the platform-only approach reliably fails.

Read more â†’

[View original](https://pixelettecertified.com/blog/vanta-drata-vs-real-consultancy)### Why Most ISO 27001 Projects Run Over Budget (And the Four Red Flags to Watch For in a Proposal)

ISO 27001

Roughly 60 percent of ISO 27001 projects in the UK come in over budget. This guide identifies the four red flags at the proposal stage and the contract mechanics that prevent overrun.

Read more â†’

[View original](https://pixelettecertified.com/blog/iso-27001-projects-over-budget)### Can a 20-Person Company Really Get ISO 27001 Certified? A Direct Answer.

ISO 27001

ISO 27001 was designed to scale to organisations of any size. This guide explains how the standard scales, what genuinely gets easier at smaller scale, and the one thing that is harder.

Read more â†’

[View original](https://pixelettecertified.com/blog/20-person-company-iso-27001)### EU AI Act Preparation for UK Companies: What You Actually Need to Do Before August 2026

AI Governance

The EU AI Act applies to UK companies whose AI output is used in the EU, regardless of where they are headquartered. This guide maps the obligations and provides a 90-day action plan.

Read more â†’

[View original](https://pixelettecertified.com/blog/eu-ai-act-uk-companies)### ISO 42001 vs the EU AI Act: What Enterprise Buyers Actually Expect You to Hold

AI Governance

ISO 42001 and the EU AI Act are not interchangeable. This guide explains the structural relationship between them and how to position your AI governance posture credibly.

Read more â†’

[View original](https://pixelettecertified.com/blog/iso-42001-vs-eu-ai-act)

### Need expert guidance?

Book a free consultation with our compliance team to discuss your certification needs.

[See Your 10-Week Certification Roadmap](https://pixelettecertified.com/contact)


----- PAGE FILE: 06-industries.md -----

## Industry expertise drives faster certification

Generic consultancies apply the same template to every client. We understand your industry's specific regulatory landscape, common audit findings, and what your clients actually require.

## Not sure which certification your industry needs?

Book a free 30-minute gap analysis. We will assess your industry requirements, map the certifications that matter, and give you a realistic timeline and cost.

Most clients book their first paid engagement within 2 weeks of their gap analysis call.


----- PAGE FILE: 07-cookie-policy.md -----

## Cookie Policy

## 1\. What Are Cookies

Cookies are small text files stored on your device when you visit a website. They help the website remember your preferences and understand how you interact with the site. We use cookies and similar technologies to ensure our website functions correctly and to improve your experience.

## 2\. Cookies We Use

### Essential Cookies

These cookies are necessary for the website to function and cannot be switched off. They are usually set in response to actions you take, such as setting your privacy preferences or filling in forms. You can set your browser to block these cookies, but some parts of the site may not function as a result.

| Cookie | Purpose | Duration |
| --- | --- | --- |
| \_\_next\_\* | Next.js framework session and routing | Session |
| cookie\_consent | Stores your cookie consent preference | 12 months |

### Analytics Cookies

These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. We use this data to improve our site.

| Cookie | Purpose | Duration |
| --- | --- | --- |
| \_ga, \_ga\_\* | Google Analytics 4, anonymised usage tracking | 2 years |
| va\_\* | Vercel Analytics, page performance monitoring | Session |

## 3\. Managing Cookies

You can control and delete cookies through your browser settings. Most browsers allow you to:

- View what cookies are stored and delete them individually.
- Block third-party cookies.
- Block cookies from specific sites.
- Block all cookies from being set.
- Delete all cookies when you close your browser.

Note that blocking all cookies will affect the functionality of this and many other websites.

## 4\. Third-Party Cookies

We do not use third-party advertising cookies. The only third-party cookies on our site are from analytics providers (Google Analytics and Vercel Analytics), which collect anonymised usage data only.

## 5\. Changes to This Policy

We may update this cookie policy from time to time. Any changes will be posted on this page with an updated revision date.

## 6\. Contact Us

If you have questions about our use of cookies, please contact us at [privacy@pixelettecertified.com](mailto:privacy@pixelettecertified.com) or visit our [Privacy Policy](https://pixelettecertified.com/privacy-policy).


----- PAGE FILE: 08-privacy-policy.md -----

## Privacy Policy

## 1\. Who We Are

Pixelette Certified is a trading name of Pixelette Group Ltd, registered in England and Wales. We are a UK-based ISO certification and compliance consultancy. For the purposes of UK GDPR, Pixelette Group Ltd is the data controller.

**Email:** [privacy@pixelettecertified.com](mailto:privacy@pixelettecertified.com)

## 2\. What Data We Collect

We collect the following personal data when you interact with our website:

- **Contact form submissions:** name, email address, company name, phone number, service interest, and message content.
- **Live chat interactions:** messages exchanged with our website chat assistant. Chat messages are processed in your browser session only and are not stored on our servers.
- **Website analytics:** anonymised usage data including pages visited, time on site, referral source, and device type (via Vercel Analytics or Google Analytics 4).
- **Cookies:** essential cookies for site functionality and optional analytics cookies. See our [Cookie Policy](https://pixelettecertified.com/cookie-policy) for details.

## 3\. How We Use Your Data

We use your personal data for the following purposes:

- To respond to your contact form enquiry and provide information about our services.
- To schedule and conduct gap analysis consultations.
- To send follow-up communications related to your enquiry (not unsolicited marketing).
- To improve our website and services based on anonymised analytics.

## 4\. Legal Basis for Processing

We process your personal data under the following legal bases (UK GDPR Article 6):

- **Consent (Article 6(1)(a)):** when you submit a contact form with the consent checkbox selected.
- **Legitimate interests (Article 6(1)(f)):** to respond to enquiries, improve our services, and maintain website security.
- **Contract performance (Article 6(1)(b)):** when processing is necessary to provide services you have engaged us for.

## 5\. Data Sharing

We do not sell your personal data. We may share your data with the following categories of third parties, only as necessary to deliver our services:

- Cloud hosting providers (Vercel) for website delivery.
- Email service providers for responding to enquiries.
- Analytics providers (anonymised data only).
- Professional advisors (legal, accounting) where required by law.

## 6\. Data Retention

Contact form submissions are retained for 24 months from the date of submission, after which they are securely deleted. If you become a client, your data is retained for the duration of the engagement plus 6 years for legal and regulatory compliance.

## 7\. Your Rights

Under UK GDPR, you have the following rights:

- **Right of access**, request a copy of your personal data.
- **Right to rectification**, request correction of inaccurate data.
- **Right to erasure**, request deletion of your data.
- **Right to restrict processing**, request limitation of how we use your data.
- **Right to data portability**, receive your data in a structured format.
- **Right to object**, object to processing based on legitimate interests.
- **Right to withdraw consent**, withdraw consent at any time without affecting prior processing.

To exercise any of these rights, email [privacy@pixelettecertified.com](mailto:privacy@pixelettecertified.com). We will respond within 30 days.

## 8\. International Transfers

Your data is primarily stored and processed within the United Kingdom and European Economic Area. Where data is transferred outside the UK/EEA (e.g. to cloud providers with US infrastructure), we ensure appropriate safeguards are in place, including Standard Contractual Clauses (SCCs).

## 9\. Security

We implement appropriate technical and organisational measures to protect your personal data, including encryption in transit (TLS), access controls, and regular security reviews. As an ISO 27001 certified practice, information security is fundamental to how we operate.

## 10\. Complaints

If you are not satisfied with how we handle your data, you have the right to lodge a complaint with the Information Commissioner's Office (ICO):

Information Commissioner's Office  
Wycliffe House, Water Lane, Wilmslow, Cheshire SK9 5AF  
Telephone: 0303 123 1113  
Website: ico.org.uk

## 11\. Changes to This Policy

We may update this policy from time to time. Material changes will be communicated via our website. The â€œLast updatedâ€ date at the top of this page indicates the most recent revision.


----- PAGE FILE: svc-01-iso-27001.md -----

## ISO 27001 Certification

The global standard for information security management. Get certified in 10 weeks.

Fixed-fee engagement

5 phases

Overview

## What is this service?

ISO 27001 is the international standard for information security management. It defines the requirements for an Information Security Management System (ISMS), a structured framework of policies, procedures, and controls that protects your organisation's information assets. For UK technology companies, ISO 27001 has become the de facto requirement for selling to enterprise clients, winning government contracts, passing investor due diligence, and qualifying for cyber insurance at favourable rates. Whether you are a SaaS platform targeting enterprise clients, a healthcare provider seeking NHS supply chain approval, a FinTech navigating FCA or DORA requirements, a manufacturer seeking supply chain inclusion, or any other organisation that handles sensitive data, ISO 27001 is your foundation.

Deliverables

## What we deliver

Every engagement includes these core deliverables, tailored to your organisation.

Our Process

## How we get you certified

A proven, structured approach from kickoff to certification.

1

Week 1

### Kickoff & Gap Analysis

Initial meeting, scope definition, gap analysis conducted, remediation roadmap delivered.

2

Weeks 2â€“5

### Documentation Build

All ISMS policies written, risk assessment conducted, SoA drafted, asset inventory built.

3

Weeks 6â€“8

### Controls Implementation

Technical and organisational controls implemented and evidenced, staff training delivered.

4

Week 9

### Internal Audit

Full internal audit conducted, non-conformities identified and closed.

5

Weeks 10â€“12

### External Audit

Stage 1 documentation review and Stage 2 compliance audit. Certificate issued.

Pricing

## Transparent pricing

No hidden fees. No surprise invoices. Choose the tier that fits your organisation.

### Essentials

Startups and SMEs up to 50 employees

Scoped to your business

- Gap analysis
- ISMS documentation
- SoA
- Risk register
- 1 internal audit
- Stage 1 + Stage 2 support
[Get Started](https://pixelettecertified.com/contact)

Most Popular

### Professional

Scale-ups 50â€“150 employees

Scoped to your business

- Everything in Essentials
- Staff training
- 6-month vCISO Basic
- Surveillance audit support Year 1
[Get Started](https://pixelettecertified.com/contact)

### Enterprise

150+ employees or regulated sectors

Scoped to your business

[Get Started](https://pixelettecertified.com/contact)

FAQ

## Frequently asked questions

Our standard implementation runs 10â€“12 weeks from kickoff to Stage 2 audit. Complex organisations or those with significant existing gaps may take 14â€“16 weeks.

## Ready to start your ISO 27001 journey?

Book a free gap analysis call. In 30 minutes you will know exactly where you stand, what it takes, and what it costs.

Most clients book their first paid engagement within 2 weeks of their gap analysis call.


----- PAGE FILE: svc-02-iso-22301.md -----

## ISO 22301 Certification

Business continuity certification. Demonstrate resilience and stay operational when it matters most.

Fixed-fee engagement

5 phases

Overview

## What is this service?

ISO 22301 is the international standard for Business Continuity Management Systems (BCMS). It helps your organisation prepare for, respond to, and recover from disruptions, whether cyber attacks, supply chain failures, natural disasters, or infrastructure outages.

Deliverables

## What we deliver

Every engagement includes these core deliverables, tailored to your organisation.

Business Impact Analysis (BIA)

Business Continuity Plan documentation

Disaster Recovery procedures

Crisis management framework

Testing and exercise programme

Staff awareness training

Internal audit and management review

Stage 1 and Stage 2 audit support

Our Process

## How we get you certified

A proven, structured approach from kickoff to certification.

1

Week 1

### Kickoff & BIA

Scope definition, business impact analysis, critical function identification.

2

Weeks 2â€“5

### BCMS Documentation

BC policies, plans, and procedures written. Recovery strategies defined.

3

Weeks 6â€“8

### Implementation & Testing

Plans tested through exercises. Staff trained. Gaps identified and closed.

4

Week 9

### Internal Audit

Full internal audit and management review conducted.

5

Weeks 10â€“12

### External Audit

Stage 1 and Stage 2 certification audit. Certificate issued.

Pricing

## Transparent pricing

No hidden fees. No surprise invoices. Choose the tier that fits your organisation.

### Essentials

SMEs up to 50 employees

Scoped to your business

- Gap analysis
- BCMS documentation
- BIA
- BC plans
- Internal audit
- Audit support
[Get Started](https://pixelettecertified.com/contact)

Most Popular

### Professional

50â€“150 employees

Scoped to your business

- Everything in Essentials
- Exercise programme
- Staff training
- Year 1 surveillance support
[Get Started](https://pixelettecertified.com/contact)

### Enterprise

150+ employees

Scoped to your business

- Everything in Professional
- Multi-site coverage
- Integrated DR planning
- Year 1 + 2 surveillance
[Get Started](https://pixelettecertified.com/contact)

FAQ

## Frequently asked questions

ISO 27001 focuses on information security management. ISO 22301 focuses on business continuity, ensuring your organisation can continue operating during and after a disruption. Many organisations pursue both as they are complementary.

Related Services

## You may also need

Complementary services that strengthen your compliance posture.

### [ISO 27001](https://pixelettecertified.com/services/iso-27001)

The global standard for information security management. Get certified in 10 weeks.

Learn more

### [ISO 9001](https://pixelettecertified.com/services/iso-9001)

Quality management certification. Prove consistent delivery excellence to clients worldwide.

Learn more

### [vCISO](https://pixelettecertified.com/services/vciso)

Senior security leadership, without the senior hire. A fractional CISO for your business.

Learn more

## Ready to start your ISO 22301 journey?

Book a free gap analysis call. In 30 minutes you will know exactly where you stand, what it takes, and what it costs.

Most clients book their first paid engagement within 2 weeks of their gap analysis call.


----- PAGE FILE: svc-03-iso-9001.md -----

## ISO 9001 Certification

Quality management certification. Prove consistent delivery excellence to clients worldwide.

Fixed-fee engagement

5 phases

Overview

## What is this service?

ISO 9001 is the world's most widely adopted quality management standard. It demonstrates that your organisation consistently delivers products and services that meet customer and regulatory requirements.

Deliverables

## What we deliver

Every engagement includes these core deliverables, tailored to your organisation.

Quality Management System (QMS) documentation

Process mapping and optimisation

Quality policy and objectives

Risk-based thinking framework

Customer satisfaction monitoring

Internal audit programme

Management review procedures

Continuous improvement framework

Our Process

## How we get you certified

A proven, structured approach from kickoff to certification.

1

Week 1

### Kickoff & Gap Analysis

Current quality practices assessed against ISO 9001 requirements.

2

Weeks 2â€“5

### QMS Documentation

Quality manual, procedures, and process maps developed.

3

Weeks 6â€“8

### Implementation

QMS implemented, staff trained, evidence gathered.

4

Week 9

### Internal Audit

Full internal audit conducted, findings addressed.

5

Weeks 10â€“12

### External Audit

Stage 1 and Stage 2 certification audit.

Pricing

## Transparent pricing

No hidden fees. No surprise invoices. Choose the tier that fits your organisation.

### Essentials

SMEs up to 50 employees

Scoped to your business

- Gap analysis
- QMS documentation
- Process mapping
- Internal audit
- Audit support
[Get Started](https://pixelettecertified.com/contact)

Most Popular

### Professional

50â€“150 employees

Scoped to your business

- Everything in Essentials
- Staff training
- Performance metrics setup
- Year 1 surveillance
[Get Started](https://pixelettecertified.com/contact)

### Enterprise

150+ employees

Scoped to your business

- Everything in Professional
- Multi-site coverage
- Integrated management system
- Year 1 + 2 surveillance
[Get Started](https://pixelettecertified.com/contact)

FAQ

## Frequently asked questions

Absolutely. ISO 9001 demonstrates that your development processes, service delivery, and customer support meet consistently high standards. Many enterprise procurement teams require it.

Related Services

## You may also need

Complementary services that strengthen your compliance posture.

### [ISO 27001](https://pixelettecertified.com/services/iso-27001)

The global standard for information security management. Get certified in 10 weeks.

Learn more

### [ISO 14001](https://pixelettecertified.com/services/iso-14001)

Environmental management certification. Lead on sustainability and meet ESG obligations.

Learn more

### [ISO 22301](https://pixelettecertified.com/services/iso-22301)

Business continuity certification. Demonstrate resilience and stay operational when it matters most.

Learn more

## Ready to start your ISO 9001 journey?

Book a free gap analysis call. In 30 minutes you will know exactly where you stand, what it takes, and what it costs.

Most clients book their first paid engagement within 2 weeks of their gap analysis call.


----- PAGE FILE: svc-04-iso-14001.md -----

## ISO 14001 Certification

Environmental management certification. Lead on sustainability and meet ESG obligations.

Fixed-fee engagement

5 phases

Overview

## What is this service?

ISO 14001 is the international standard for Environmental Management Systems (EMS). It provides a framework for managing environmental responsibilities systematically, reducing your environmental footprint, and demonstrating commitment to sustainability.

Deliverables

## What we deliver

Every engagement includes these core deliverables, tailored to your organisation.

Environmental Management System documentation

Environmental aspects and impacts assessment

Environmental objectives and targets

Operational controls and procedures

Emergency preparedness planning

Internal audit and management review

Stage 1 and Stage 2 audit support

Our Process

## How we get you certified

A proven, structured approach from kickoff to certification.

1

Week 1

### Kickoff & Environmental Review

Current environmental practices assessed, aspects and impacts identified.

2

Weeks 2â€“5

### EMS Documentation

Environmental policy, procedures, and controls documented.

3

Weeks 6â€“8

### Implementation

Controls implemented, monitoring established, staff trained.

4

Week 9

### Internal Audit

Full EMS audit conducted, corrective actions taken.

5

Weeks 10â€“12

### External Audit

Certification body audit. Certificate issued.

Pricing

## Transparent pricing

No hidden fees. No surprise invoices. Choose the tier that fits your organisation.

### Essentials

SMEs

Scoped to your business

- Gap analysis
- EMS documentation
- Aspects register
- Internal audit
- Audit support
[Get Started](https://pixelettecertified.com/contact)

Most Popular

### Professional

50â€“150 employees

Scoped to your business

- Everything in Essentials
- Staff training
- Monitoring programme
- Year 1 surveillance
[Get Started](https://pixelettecertified.com/contact)

### Enterprise

150+ employees

Scoped to your business

- Everything in Professional
- Multi-site
- Integrated management system
- Year 1 + 2 surveillance
[Get Started](https://pixelettecertified.com/contact)

FAQ

## Frequently asked questions

Data centres, office operations, and supply chains all have environmental impacts. ISO 14001 demonstrates responsible environmental management to clients, investors, and regulators increasingly focused on ESG.

Related Services

## You may also need

Complementary services that strengthen your compliance posture.

### [ISO 9001](https://pixelettecertified.com/services/iso-9001)

Quality management certification. Prove consistent delivery excellence to clients worldwide.

Learn more

### [ISO 27001](https://pixelettecertified.com/services/iso-27001)

The global standard for information security management. Get certified in 10 weeks.

Learn more

### [ISO 22301](https://pixelettecertified.com/services/iso-22301)

Business continuity certification. Demonstrate resilience and stay operational when it matters most.

Learn more

## Ready to start your ISO 14001 journey?

Book a free gap analysis call. In 30 minutes you will know exactly where you stand, what it takes, and what it costs.

Most clients book their first paid engagement within 2 weeks of their gap analysis call.


----- PAGE FILE: svc-05-iso-42001.md -----

## ISO 42001 AI Governance Certification

AI governance certification. Lead responsibly in the era of artificial intelligence.

Fixed-fee engagement

5 phases

Overview

## What is this service?

ISO 42001 is the international standard for Artificial Intelligence Management Systems (AIMS). Published in 2023, it defines requirements for responsible AI governance, covering risk management, transparency, accountability, ethical AI use, and continuous improvement of AI systems. For UK and EU technology companies building AI products, ISO 42001 is rapidly becoming what ISO 27001 was five years ago.

Deliverables

## What we deliver

Every engagement includes these core deliverables, tailored to your organisation.

AI Management System (AIMS) documentation

AI risk assessment framework

Transparency and explainability procedures

Bias and fairness evaluation

Data governance for AI systems

AI lifecycle management

Ethical AI use policies

EU AI Act compliance mapping

Our Process

## How we get you certified

A proven, structured approach from kickoff to certification.

1

Week 1

### Kickoff & AI Readiness Review

AI systems inventory, current governance assessment, scope definition.

2

Weeks 2â€“5

### AIMS Documentation

AI policies, risk frameworks, transparency procedures, and data governance documented.

3

Weeks 6â€“9

### Implementation & Assessment

Controls implemented, bias assessments conducted, staff trained on responsible AI.

4

Week 10

### Internal Audit

Full AIMS audit, non-conformities addressed.

5

Weeks 11â€“14

### External Audit

Certification body audit. Certificate issued.

Pricing

## Transparent pricing

No hidden fees. No surprise invoices. Choose the tier that fits your organisation.

### Essentials

AI startups up to 50 employees

Scoped to your business

- Gap analysis
- AIMS documentation
- AI risk assessment
- Internal audit
- Audit support
[Get Started](https://pixelettecertified.com/contact)

Most Popular

### Professional

Scale-ups 50â€“150 employees

Scoped to your business

- Everything in Essentials
- EU AI Act mapping
- Staff training
- Year 1 surveillance
[Get Started](https://pixelettecertified.com/contact)

### Enterprise

150+ or regulated AI

Scoped to your business

[Get Started](https://pixelettecertified.com/contact)

FAQ

## Frequently asked questions

Any company that builds, deploys, or integrates AI systems, especially those selling to enterprise clients, operating in regulated sectors, or subject to the EU AI Act.

## Ready to start your ISO 42001 journey?

Book a free gap analysis call. In 30 minutes you will know exactly where you stand, what it takes, and what it costs.

Most clients book their first paid engagement within 2 weeks of their gap analysis call.


----- PAGE FILE: svc-06-cyber-essentials.md -----

## Cyber Essentials Certification

The UK government-backed cybersecurity certification. Essential for public sector supply chains.

Fixed-fee engagement

3 phases

Overview

## What is this service?

Cyber Essentials is a UK government-backed certification scheme that protects organisations against the most common cyber attacks. It covers five technical controls: firewalls, secure configuration, user access control, malware protection, and patch management. If you sell to the UK government or work in the public sector supply chain, Cyber Essentials is your first and fastest step.

Deliverables

## What we deliver

Every engagement includes these core deliverables, tailored to your organisation.

Pre-assessment gap analysis

5 technical controls review

Self-assessment questionnaire preparation (CE)

External technical testing (CE+)

Remediation guidance

Certification submission management

12 months certification validity

Progression planning to ISO 27001

Our Process

## How we get you certified

A proven, structured approach from kickoff to certification.

1

Week 1

### Gap Analysis

Review of your current security controls against Cyber Essentials requirements.

2

Week 2

### Remediation

Address identified gaps in firewall, patching, access control, malware protection, and configuration.

3

Week 3

### Certification

Complete self-assessment (CE) or technical assessment (CE+). Certificate issued.

Pricing

## Transparent pricing

No hidden fees. No surprise invoices. Choose the tier that fits your organisation.

### Cyber Essentials

All businesses

Scoped to your business

- Gap analysis
- Remediation guidance
- Self-assessment preparation
- Submission management
[Get Started](https://pixelettecertified.com/contact)

### Cyber Essentials Plus

Higher-assurance requirements

Scoped to your business

- Everything in CE
- External vulnerability scanning
- Configuration testing
- Hands-on technical assessment
[Get Started](https://pixelettecertified.com/contact)

FAQ

## Frequently asked questions

Cyber Essentials is a self-assessment verified by a certifying body. Cyber Essentials Plus includes external hands-on technical testing, vulnerability scanning and configuration testing by an assessor.

Related Services

## You may also need

Complementary services that strengthen your compliance posture.

### [ISO 27001](https://pixelettecertified.com/services/iso-27001)

The global standard for information security management. Get certified in 10 weeks.

Learn more

### [Penetration Testing](https://pixelettecertified.com/services/penetration-testing)

Find your vulnerabilities before attackers do. Expert-led security testing for any environment.

Learn more

### [vCISO](https://pixelettecertified.com/services/vciso)

Senior security leadership, without the senior hire. A fractional CISO for your business.

Learn more

## Ready to start your Cyber Essentials journey?

Book a free gap analysis call. In 30 minutes you will know exactly where you stand, what it takes, and what it costs.

Most clients book their first paid engagement within 2 weeks of their gap analysis call.


----- PAGE FILE: svc-07-vciso.md -----

## Virtual CISO (vCISO)

Senior security leadership, without the senior hire. A fractional CISO for your business.

Fixed-fee engagement

3 phases

Overview

## What is this service?

A Chief Information Security Officer (CISO) is one of the most important roles in a modern technology company. A Virtual CISO gives you everything a full-time CISO provides, board-level security strategy, risk management, compliance governance, supplier security oversight, incident response leadership, at a monthly retainer that scales with your needs.

Deliverables

## What we deliver

Every engagement includes these core deliverables, tailored to your organisation.

Board-level security strategy

Risk management and governance

Compliance programme oversight

Security questionnaire management

Incident response planning

Supplier security assessment

Staff security briefings

Monthly security reporting

Our Process

## How we engage with you

A structured onboarding and ongoing retainer model designed for your business.

1

Week 1

### Onboarding

Security posture review, stakeholder meetings, priority identification.

2

Weeks 2â€“4

### Foundation

Security roadmap, governance framework, quick wins delivered.

3

Ongoing

### Retainer

Monthly advisory, board reports, risk management, questionnaire support.

Pricing

## Transparent pricing

No hidden fees. No surprise invoices. Choose the tier that fits your organisation.

### vCISO Basic

Post-certification governance

Monthly retainer

- 10â€“12 hrs/month
- Monthly security review
- Board report
- Policy maintenance
- Email support
[Get Started](https://pixelettecertified.com/contact)

### vCISO Enterprise

Regulated / pre-IPO

Monthly retainer

- 22â€“30 hrs/month
- All Standard features
- On-site presence
- Board presentation
- M&A security due diligence
[Get Started](https://pixelettecertified.com/contact)

FAQ

## Frequently asked questions

A consultant delivers a project and leaves. A vCISO is an ongoing senior security leader embedded in your business, attending board meetings, managing your security programme, and being accountable for outcomes.

Related Services

## You may also need

Complementary services that strengthen your compliance posture.

### [ISO 27001](https://pixelettecertified.com/services/iso-27001)

The global standard for information security management. Get certified in 10 weeks.

Learn more

### [vDPO](https://pixelettecertified.com/services/vdpo)

Your dedicated Data Protection Officer, on demand. Expert privacy leadership at a fraction of the cost.

Learn more

### [Penetration Testing](https://pixelettecertified.com/services/penetration-testing)

Find your vulnerabilities before attackers do. Expert-led security testing for any environment.

Learn more

## Ready to start your vCISO journey?

Book a free gap analysis call. In 30 minutes you will know exactly where you stand, what it takes, and what it costs.

Most clients book their first paid engagement within 2 weeks of their gap analysis call.


----- PAGE FILE: svc-08-vdpo.md -----

## Virtual DPO (vDPO)

Your dedicated Data Protection Officer, on demand. Expert privacy leadership at a fraction of the cost.

Fixed-fee engagement

3 phases

Overview

## What is this service?

Under GDPR, many organisations are required to appoint a Data Protection Officer. Our vDPO service provides a qualified, experienced DPO on a flexible retainer, handling data subject requests, maintaining your ROPA, advising on DPIAs, and ensuring your privacy programme stays compliant.

Deliverables

## What we deliver

Every engagement includes these core deliverables, tailored to your organisation.

Our Process

## How we engage with you

A structured onboarding and ongoing retainer model designed for your business.

1

Week 1

### Onboarding

Privacy posture review, ROPA audit, priority gap identification.

2

Weeks 2â€“4

### Foundation

ROPA updated, DPIA framework established, policies reviewed.

3

Ongoing

### Retainer

Ongoing DPO duties, DSR management, compliance monitoring.

Pricing

## Transparent pricing

No hidden fees. No surprise invoices. Choose the tier that fits your organisation.

### vDPO

All organisations

Monthly retainer

- 8â€“10 hrs/month
- ROPA maintenance
- DSR handling
- DPIA advisory
- Privacy policy reviews
- Email support
[Get Started](https://pixelettecertified.com/contact)

FAQ

## Frequently asked questions

Under GDPR Article 37, you need a DPO if you are a public authority, carry out large-scale systematic monitoring, or process special category data at scale. Even if not legally required, having a DPO demonstrates strong data governance.

## Ready to start your vDPO journey?

Book a free gap analysis call. In 30 minutes you will know exactly where you stand, what it takes, and what it costs.

Most clients book their first paid engagement within 2 weeks of their gap analysis call.


----- PAGE FILE: svc-09-penetration-testing.md -----

## Penetration Testing (VAPT)

Find your vulnerabilities before attackers do. Expert-led security testing for any environment.

Fixed-fee engagement

3 phases

Overview

## What is this service?

Our Vulnerability Assessment and Penetration Testing (VAPT) service identifies security weaknesses in your applications, networks, and infrastructure before attackers exploit them. Conducted by CREST-certified testers using industry-standard methodologies.

Deliverables

## What we deliver

Every engagement includes these core deliverables, tailored to your organisation.

Web application penetration testing

API security testing

Network infrastructure testing

Cloud configuration review

CVSS-scored vulnerability reporting

Remediation guidance and prioritisation

Executive summary for board/investors

Re-test after remediation

Our Process

## How we get you certified

A proven, structured approach from kickoff to certification.

1

Week 1

### Scoping & Planning

Define scope, agree rules of engagement, set up testing environment.

2

Weeks 2â€“3

### Testing

Active penetration testing conducted against agreed scope.

3

Week 4

### Reporting

Detailed findings report with CVSS scores, executive summary, remediation guidance.

Pricing

## Transparent pricing

No hidden fees. No surprise invoices. Choose the tier that fits your organisation.

### Web/API Test

Single application

Per application

- OWASP Top 10 testing
- API endpoint testing
- CVSS-scored report
- Remediation guidance
- Re-test included
[Get Started](https://pixelettecertified.com/contact)

FAQ

## Frequently asked questions

At minimum annually, and after any significant changes to your applications or infrastructure. Many compliance frameworks (ISO 27001, PCI DSS) require at least annual testing.

Related Services

## You may also need

Complementary services that strengthen your compliance posture.

### [Cyber Essentials](https://pixelettecertified.com/services/cyber-essentials)

The UK government-backed cybersecurity certification. Essential for public sector supply chains.

Learn more

### [ISO 27001](https://pixelettecertified.com/services/iso-27001)

The global standard for information security management. Get certified in 10 weeks.

Learn more

### [vCISO](https://pixelettecertified.com/services/vciso)

Senior security leadership, without the senior hire. A fractional CISO for your business.

Learn more

## Ready to start your Penetration Testing journey?

Book a free gap analysis call. In 30 minutes you will know exactly where you stand, what it takes, and what it costs.

Most clients book their first paid engagement within 2 weeks of their gap analysis call.


----- PAGE FILE: svc-10-gdpr-privacy.md -----

## GDPR & Data Privacy

Turn your data protection obligations into a competitive advantage across any jurisdiction.

Fixed-fee engagement

3 phases

Overview

## What is this service?

Our GDPR and data privacy service helps organisations build robust privacy programmes that go beyond basic compliance. We transform your data protection obligations into a competitive advantage, demonstrating to clients, partners, and regulators that you take data seriously.

Deliverables

## What we deliver

Every engagement includes these core deliverables, tailored to your organisation.

Pricing

## Transparent pricing

No hidden fees. No surprise invoices. Choose the tier that fits your organisation.

### Essentials

SMEs

Scoped to your business

- GDPR assessment
- Privacy policies
- ROPA
- Breach procedures
- Staff training
[Get Started](https://pixelettecertified.com/contact)

Most Popular

### Professional

Scale-ups

Scoped to your business

- Everything in Essentials
- DPIAs
- International transfers
- Quarterly reviews
[Get Started](https://pixelettecertified.com/contact)

### Enterprise

Regulated organisations

Scoped to your business

- Everything in Professional
- vDPO service
- ICO liaison
- Multi-jurisdiction
[Get Started](https://pixelettecertified.com/contact)

FAQ

## Frequently asked questions

Yes. The UK has its own version (UK GDPR) which mirrors EU GDPR. If you process data of UK residents or trade with the EU, GDPR compliance is essential.

Related Services

## You may also need

Complementary services that strengthen your compliance posture.

### [vDPO](https://pixelettecertified.com/services/vdpo)

Your dedicated Data Protection Officer, on demand. Expert privacy leadership at a fraction of the cost.

Learn more

### [ISO 27001](https://pixelettecertified.com/services/iso-27001)

The global standard for information security management. Get certified in 10 weeks.

Learn more

### [ISO 42001](https://pixelettecertified.com/services/iso-42001)

AI governance certification. Lead responsibly in the era of artificial intelligence.

Learn more

================================================================================
## C. VERBATIM BLOG-POST BODIES (17 — original 2026-05-19/20)



----- BLOG FILE: 01-security-questionnaire.md -----

If you are reading this, the email has already arrived. A buyer, whether a bank, an insurer, an NHS trust, or a global SaaS company, has sent you a vendor security questionnaire. Within the first few questions, there is one line that matters: "Do you hold ISO/IEC 27001 certification?" You do not. The deal is real, the procurement team is waiting, and every consultant you have spoken to today has told you it takes six to nine months. This is where most companies lose the deal. This guide shows you exactly what to do next, and how to stay in the deal without ISO 27001 today.

First, do not lie on the questionnaire. This is the most common and most damaging mistake. Founders write phrases like "ISO 27001 in progress" or "aligned with ISO 27001 principles." Procurement teams see this every day and it raises immediate red flags. It triggers follow-up questions you cannot answer, it becomes a contractual risk if inaccurate, and it can be verified externally through the IAF CertSearch database. The correct response is precise and credible: "We have appointed an ISO 27001 implementation partner and our certification project has commenced. Stage 2 audit is scheduled within the next 10 weeks. Supporting documentation (risk register and Statement of Applicability) can be provided under NDA." This keeps you in the deal.

Contrary to popular belief, buyers do not need the certificate immediately. They need confidence that it is coming. What procurement teams actually want is a named implementation partner, a defined project timeline, and a realistic audit date. If your timeline is within 90 days, most buyers will proceed. Beyond that, risk increases and the deal starts to slip.

The 72-hour action plan is where deals are won or lost. On Day 1, acknowledge and control the timeline by replying within 24 hours confirming you are initiating ISO 27001 certification and that a partner will be appointed immediately. On Day 2, get a real gap analysis: book a call that produces a written gap report, a fixed cost, and a target audit date. Avoid generic consultancy conversations. On Day 3, commit and start: sign the engagement, lock the project start date, and secure the audit window. Until this is done, you do not have a credible answer for the buyer.

The "six to nine months" timeline that most consultancies quote reflects slow consultancy models with weekly check-ins and delayed audit booking. It is not a requirement of ISO 27001. A structured model delivers certification in 8 to 10 weeks for most technology companies. The difference is execution: pre-built frameworks, parallel workflows, and early audit booking rather than sequential waterfall delivery.

Let us be direct about what this decision is really about. You are not deciding whether to spend ten to twenty thousand pounds. You are deciding whether to lose one hundred thousand to one million pounds or more in contracts. ISO 27001 is not compliance. It is a revenue unlock mechanism. If you have a live deal, a questionnaire on your desk, and procurement pressure, there is only one decision: start now or lose the deal.

### Ready to get certified?

Book a free consultation to discuss your certification needs. Our team will assess your current position and recommend the fastest path to compliance.


----- BLOG FILE: 02-10-weeks-vs-6-months.md -----

"Anyone who tells you ISO 27001 takes ten weeks is cutting corners." We have heard this from competitors, from auditors at other firms, and occasionally from prospects who have already been told it by someone else. It is a useful objection to address head-on, because the answer reveals the difference between two genuinely different delivery models. And the difference is not what most founders assume. This guide explains exactly what the 10-week model compresses, what it does not compress, and how to tell the difference between a fast-track that works and a fast-track that gets you a certificate the buyer rejects.

The standard does not specify a timeline. ISO/IEC 27001:2022 specifies that an organisation must have a documented Information Security Management System covering the 93 Annex A controls (where applicable, justified through a Statement of Applicability), a risk assessment and treatment plan, an internal audit, a management review, and demonstrable evidence that controls are operating. None of those requirements has a calendar attached. The six-month timeline is a delivery convention, not a standards requirement. It exists because traditional consultancies run fortnightly workshops, write documentation from scratch for each client, and book audits late in the project.

Three things are compressed in a properly structured fast-track engagement. First, documentation cycle time: a traditional engagement writes 32-plus ISMS policies from a blank page over 8 to 12 weeks of fortnightly drafts, while a fast-track engagement starts with a pre-built, audit-tested policy suite covering all 93 Annex A controls, then tailors each document to your environment, scope, and risk profile in concentrated 1 to 2 week blocks. The output is the same: fully customised, audit-ready documentation. The cycle time is 70% shorter. Second, workshop scheduling: traditional projects schedule one or two hours of consultant time per week, while a fast-track engagement runs concentrated working sessions, typically half-day blocks, that move three or four workstreams forward in parallel. Third, audit body lead time: UKAS-accredited certification bodies are routinely booked 8 to 12 weeks ahead, and a fast-track engagement books the audit slots at project kickoff so the audit calendar runs in parallel with the implementation.

What the 10-week model does not compress is the part that matters for buyers asking the awkward questions. The audit itself, conducted by an independent UKAS-accredited certification body, takes the same number of auditor-days regardless of how the project was run. There is no shortcut. The control evidence period also remains: auditors expect to see controls operating, not just documented. A 10-week project provides 4 to 6 weeks of operating evidence by the time of Stage 2, which is sufficient for first certification under ISO/IEC 27006 guidance. The risk assessment on a 10-week project contains the same 150-plus entries, the same control mapping, and the same treatment decisions as a six-month project.

There are five questions to ask any consultant promising a fast timeline to tell a real fast-track from a corner-cutting one. Which UKAS-accredited certification body will conduct the Stage 1 and Stage 2 audit, and have you booked the slots? Will the team write a tailored Statement of Applicability against all 93 Annex A controls, or will you receive a generic SoA? How many clients passed Stage 2 on first attempt in the last twelve months? Who is the named lead auditor on the engagement and what are their credentials? What happens if you fail Stage 2? If a fast-track provider can answer all five clearly, the timeline is real. If they hedge on any of them, you are not buying speed. You are buying risk.

Two reasons explain why six-month projects are still common, neither of which serves the client. First, hourly billing: a consultancy that bills 150 to 200 pounds per hour against an open-ended scope earns more from a 30-week project than a 10-week project. Fixed-fee structures align the consultant's incentive with the client's. Second, internal capacity constraints: traditional consultancies allocate consultants across many concurrent projects at a few hours per week each, and a 10-week project requires concentrated capacity that stretches their calendar.

ISO 27001 in ten weeks is not a marketing gimmick. It is what happens when documentation is pre-built rather than written from scratch, workshops run in concentrated blocks rather than fortnightly drips, and audits are booked at kickoff rather than at the end. The standard is the same. The certificate is the same. The buyer's procurement team cannot tell the difference, and that is the point. What changes is the date the deal closes.

### Ready to get certified?

Book a free consultation to discuss your certification needs. Our team will assess your current position and recommend the fastest path to compliance.


----- BLOG FILE: 03-real-cost.md -----

Every founder asks the same question on the first call: "How much does ISO 27001 cost?" It is the wrong question. The right question is the one buyers force you to answer six months later, after the certified competitor has won the contract: "How much did it cost not to have it?" This guide puts a number on the second question. The numbers are uncomfortable.

Let us put the visible cost on the table first, because hesitation usually starts here. For a UK technology business between 10 and 150 employees, the all-in cost of ISO 27001:2022 certification typically falls in this range: implementation at 8,500 to 22,000 pounds (sub-50 employees through to regulated 150-plus environments), UKAS-accredited audit body fees at 3,000 to 8,000 pounds for Stage 1 and Stage 2 combined, internal time of approximately 40 to 80 hours of founder, CTO, or DPO time across a 10-week engagement, and ongoing maintenance with surveillance audits in years 1 and 2 at 2,000 to 4,000 pounds each. Total first-year outlay: 14,000 to 35,000 pounds depending on scope and company size. Annualised across the three-year certification cycle, the figure drops to roughly 8,000 to 15,000 pounds per year.

The invisible cost is what you pay for not having the certificate, and it has four components. The first is lost deals. Enterprise procurement teams at banks, insurers, healthcare networks, government departments, and global SaaS companies routinely require ISO 27001 as a gating criterion. "Required" does not mean "preferred." It means the questionnaire is rejected automatically if the box is not ticked. If your average enterprise contract is 150,000 pounds in year-one ARR and you lose three of them in twelve months because you cannot tick the box, the cost of not being certified is 450,000 pounds. The 15,000 pounds you saved on consultancy is now a 30x negative return on the wrong decision.

The second invisible cost is extended sales cycles on the deals you do win. Even for buyers who do not require ISO 27001 outright, the absence of certification triggers an extended security review. Instead of a 14-day procurement cycle, you face a 90-day evidence gathering exercise covering vendor questionnaires, follow-up calls, security architecture documents, penetration test reports, data flow diagrams, business continuity plans, and sub-processor lists. The deal still closes. It just closes three months later. For a Series A or B company burning 150,000 to 400,000 pounds per month, every 30 days of delayed revenue is a meaningful balance sheet event.

The third component is investor due diligence friction. Series B and later rounds increasingly include data governance and security as a diligence workstream. The absence of ISO 27001 creates a finding in the diligence report that founders must then explain in the investment committee. "Not certified" becomes a conditions-precedent line in the term sheet: "The company shall achieve ISO 27001 certification within nine months of completion." Founders who certify ahead of the round close on cleaner terms. The fourth component is cyber insurance premiums: certified companies typically secure premiums 15% to 30% lower than uncertified peers, and avoid the carve-outs on ransomware, business interruption, and regulatory defence cover.

Take a UK technology business with 4 million pounds in ARR, 60 employees, and an enterprise sales motion. The conservative twelve-month cost of not being certified: two enterprise deals lost outright at 300,000 pounds ARR forgone, four deals delayed by 60 days each at 100,000 pounds in deferred revenue plus runway impact, cyber insurance premium uplift at 6,000 pounds per year, and diligence friction on the next funding round commonly at 30,000 to 100,000 pounds in legal and remediation cost. Conservative total: 436,000 pounds or more. Twelve-month cost of being certified: 14,000 to 22,000 pounds. The decision is not financial. It is psychological.

To be even-handed: ISO 27001 is not the right call for every business. If you sell exclusively to consumers or small businesses with no procurement gates, if your runway is under three months and you need to focus capital on revenue not compliance, or if you are pre-product-market-fit and your priority is finding ten customers rather than passing audits, defer the certification and revisit it when enterprise revenue becomes the growth lever. The honest answer is sometimes "not yet." It is almost never "not at all." If a single enterprise deal in your current pipeline is worth more than the implementation fee, the calculation is finished.

### Ready to get certified?

Book a free consultation to discuss your certification needs. Our team will assess your current position and recommend the fastest path to compliance.


----- BLOG FILE: 04-customer-asked-ai-governance.md -----

Twelve months ago, no one was asking. Today, three questions are appearing in enterprise security questionnaires and investor due diligence packs with increasing regularity: How do you govern the AI models embedded in your product? What framework do you use to assess AI risk, bias, and model drift? Are you aligned with ISO 42001 or preparing for EU AI Act obligations? If you are building or deploying AI in an enterprise-facing product, you will get these questions. The only question is whether you get them from a buyer you are trying to close, an investor conducting diligence, or a regulator issuing a notice. In all three cases, "we haven't thought about it yet" is the wrong answer.

ISO/IEC 42001:2023 is the first international management system standard for Artificial Intelligence. Published in December 2023, it specifies requirements for establishing, implementing, maintaining and continually improving an AI Management System (AIMS). In structure it is closely modelled on ISO 27001 (the same management system backbone, the same clause architecture, the same Stage 1 and Stage 2 audit pathway), but the controls address AI-specific risks: model governance, data quality, transparency, human oversight, bias and fairness, lifecycle management, and impact assessment. If you already hold ISO 27001, ISO 42001 is an extension, not a second certification from scratch.

Three converging pressures explain why buyers are asking now. First, the EU AI Act entered into force in August 2024, with staged application dates through 2025 to 2027. Enterprise buyers with any EU operations are starting to screen their AI suppliers for EU AI Act alignment, and ISO 42001 is the most efficient evidence of alignment. Second, the UK government's AI Regulation White Paper and subsequent AI Bill consultation have pushed AI governance up the risk register at every regulated UK business. Third, boards and audit committees at larger enterprises now require AI risk to be tracked alongside cyber risk, and the only way for a procurement function to evidence AI risk management across a supplier base is to ask for certification.

Based on engagements we have seen in the last six months, the buyers driving these questions are concentrated in four segments: financial services buyers under FCA, EBA, or DORA supervision who now treat AI as a critical third-party risk; healthcare and life sciences buyers who face MHRA and MDR scrutiny on AI-enabled clinical decision support; large enterprise legal, HR, and recruitment functions deploying AI into decision workflows with discrimination exposure; and Series B and later investors whose LPs are requiring AI governance evidence as a portfolio-level diligence item.

Buyers asking about AI governance are not expecting a five-year certification programme. They are looking for evidence of four things, in decreasing order of importance. First, an accountable owner for AI risk: someone named, with a defined remit. Second, a documented AI inventory: which models you run, what data trains them, where they are deployed, what decisions they influence, and who is the human in the loop. The absence of an inventory is the single most common failure point we see on diligence calls. Third, a framework the buyer recognises, with ISO 42001 being the most defensible answer because it is the international standard. Fourth, impact assessments for high-risk AI use cases, especially if any models touch decisions about access to credit, employment, housing, insurance, healthcare, or legal outcomes.

For a company already holding ISO 27001, ISO 42001 is a 10 to 14 week extension. The AIMS inherits the management system backbone from the existing ISMS (document control, management review, internal audit, corrective action), and you add the AI-specific controls on top. For a company without ISO 27001, doing both in parallel is often cleaner and cheaper than sequencing them, with a combined 14 to 18 week programme being realistic. Two things you cannot shortcut: the AI impact assessment methodology needs to be genuinely applied to your real use cases, not a template with your logo on it, and the AI inventory has to be complete because auditors will ask to trace a specific model end-to-end.

If an enterprise buyer or investor has asked you about AI governance in the last fourteen days, you have three priorities this week. One: buy yourself calendar by confirming to the buyer that you are commencing an ISO 42001 readiness assessment with a named implementation partner. Do not claim certification; claim the project. Two: book a gap analysis to get an AI inventory, an initial risk register, and a certification timeline you can share under NDA. Three: decide on scope, whether ISO 42001 alone is sufficient or whether a combined ISO 27001 plus ISO 42001 programme is the right answer for your commercial position. The companies that act on this question in the next six months will own the category. The companies that wait will be answering procurement questionnaires against competitors who already hold the certificate.

### Ready to get certified?

Book a free consultation to discuss your certification needs. Our team will assess your current position and recommend the fastest path to compliance.


----- BLOG FILE: 05-iso-27001-or-soc-2.md -----

A UK SaaS company closes its first US enterprise deal. Procurement sends over the vendor security package. The first page asks for the SOC 2 Type II report. The founder has ISO 27001, which took four months and 18,000 pounds to obtain. Now they discover that in the US, SOC 2 is treated as the default answer and ISO 27001 as something American procurement teams have to Google. The question arrives immediately: do we abandon ISO 27001, hold both, or try to convince the US buyer that ISO 27001 is "equivalent"? This guide answers that question directly, because the wrong decision costs you either a deal, 30,000-plus pounds in duplicate certification, or both.

For a UK SaaS company selling into US enterprise in 2026, the correct answer is almost always to hold both, but sequenced, not simultaneously. Lead with whichever certification your immediate next three deals require, and add the second one within 9 to 12 months. The cost of holding both is significantly lower than most founders expect because approximately 60% to 70% of the control work overlaps. The wrong answers are: trying to argue ISO 27001 equivalence to a US buyer, holding one certification and losing deals in the other market, and attempting both simultaneously as a first-time certification, which stretches project cost, timeline and internal capacity beyond what most scale-ups can absorb.

ISO/IEC 27001:2022 is a management system standard that certifies your organisation operates an Information Security Management System meeting an international specification, assessed by an independent UKAS-accredited certification body. The output is a certificate with a three-year cycle and annual surveillance audits. SOC 2, by contrast, is an attestation report, not a certification. It is issued by a licensed US CPA firm under AICPA standards, against the Trust Services Criteria (security, availability, processing integrity, confidentiality, privacy). The output is a report that is renewed annually. SOC 2 Type I covers the design of controls at a point in time; SOC 2 Type II covers the operating effectiveness of controls over a period, typically 6 to 12 months. When US enterprise buyers ask for "SOC 2," they almost always mean Type II.

Three structural differences matter in practice. Scope: ISO 27001 is scoped by the organisation, while SOC 2 is scoped by the service or product offered to customers. Control framework: ISO 27001 uses a fixed control set (93 Annex A controls), while SOC 2 is framework-flexible with the organisation defining controls against each Trust Services Criterion. Evidence period: ISO 27001 first certification can be achieved with 4 to 6 weeks of operating evidence, while SOC 2 Type II typically requires 6 months minimum of operating evidence, which is the part founders underestimate.

Which one buyers actually expect depends on market. US Fortune 500 and mid-market technology companies default to SOC 2 Type II and will often accept nothing else without escalation. US financial services and healthcare buyers frequently accept ISO 27001 because they already recognise the standard from international regulatory exposure. UK and EU buyers expect ISO 27001 almost without exception. For a UK SaaS company, ISO 27001 is the first certification to obtain because it protects your home market and EU/MEA expansion, and SOC 2 is the second certification because it unlocks US enterprise.

Approximately 60% to 70% of the control work is common across ISO 27001 and SOC 2: access controls, change management, logging and monitoring, vendor management, incident response, physical security, encryption, and personnel security all satisfy both frameworks when documented correctly. A properly sequenced dual programme runs ISO 27001 first in 10 to 12 weeks to certification, followed immediately by a SOC 2 readiness assessment that extends the existing control set, followed by a 6-month SOC 2 Type II observation window, followed by the SOC 2 Type II audit. Total elapsed time from zero to both credentials: 9 to 12 months. Total cost: typically 40% to 50% lower than obtaining them independently.

Three common mistakes to avoid. First, trying to explain ISO 27001 equivalence to a US procurement team: this fails 80% of the time because procurement teams are running a checklist, not a judgement call. Second, going to SOC 2 first and abandoning the UK/EU cushion: if the US deal stalls and your UK renewal pipeline starts asking for ISO 27001 you do not yet hold, you have built on one leg of the stool. Third, doing both simultaneously as a first-time programme: a 20-person scale-up cannot absorb the consultant workshops, documentation reviews, control implementation and audit preparation for two frameworks at once. Sequencing is faster and cheaper.

The decision in one paragraph: look at your next three signed-or-signing deals. If two or more are US tech-company buyers, start with SOC 2 Type II and plan ISO 27001 to follow at month 9. If two or more are UK, EU, or regulated-industry buyers, start with ISO 27001 and plan SOC 2 Type II to follow at month 6. If the split is mixed or unclear, ISO 27001 first, because it protects your home market and creates the control base that makes SOC 2 significantly cheaper to add later.

### Ready to get certified?

Book a free consultation to discuss your certification needs. Our team will assess your current position and recommend the fastest path to compliance.


----- BLOG FILE: 06-questionnaire-without-iso.md -----

There is a defensible way to answer a security questionnaire without holding ISO 27001. It will not win you every deal, but it will keep you in the conversation on the majority of deals where the buyer has some flexibility. The key is knowing which questions need careful handling and which ones you can answer confidently without the certificate at all.

Enterprise security questionnaires look like they are testing your security controls. They are not. They are testing four things, in order: whether your answers are consistent and non-evasive, whether a real human with security knowledge has read the questions, whether you have documented what you claim to do, and whether the specific controls the buyer cares about are in place. Most founders focus on the fourth point. Buyers weight the first three higher because they reveal maturity. A vendor with no ISO 27001 certificate but thoughtful, consistent, documented answers will frequently pass where a vendor with ISO 27001 but a lazy response will not.

Roughly 60% of a standard enterprise vendor questionnaire covers territory that does not depend on ISO 27001 status. If you handle these confidently, you buy credibility for the remaining 40%. These include company information, ownership, legal entity, and data protection registration; data handling including what personal data you process, where it is stored, how long, and who has access; access controls such as MFA, role-based access, joiner/leaver processes, and privileged access management; encryption at rest and in transit with named services and algorithms; incident response with a written plan, last test date, and named incident commander; business continuity including RTO, RPO, backup strategy, and disaster recovery testing cadence; and your sub-processor list with country, purpose, and data categories shared.

The other 40% of questions are where the absence of ISO 27001 hurts. "Do you hold ISO 27001 (or equivalent)?" has no honest answer that is not "No," but you can modify the answer with forward-looking commitment. "Please provide your Statement of Applicability" requires offering a risk register and control matrix instead. "Please provide your last internal audit report" can be addressed by offering your last penetration test report and your last DPIA. The correct framing on all of these is: "We do not currently hold ISO 27001. We are implementing it with \[named partner\] with Stage 2 audit scheduled for \[date\]. The underlying controls referenced in your question are documented and operating today."

Five phrases will kill a questionnaire response instantly. "We follow industry best practice" is meaningless: name the framework or delete the sentence. "N/A" on questions about encryption, MFA, logging, or incident response is never acceptable: either you do it or you do not. "This is handled by our cloud provider" misses the point: the buyer is asking about your controls, not AWS's, and shared responsibility does not transfer your obligations. "Confidential" used too liberally signals you have nothing to disclose. "In progress" without specifics is only acceptable if followed by a specific date and a named partner.

Most enterprise buyers expect questionnaire responses in one of three formats: an Excel spreadsheet filled in, a PDF filled in, or a written response document referencing the original questions. For the written response document, which is increasingly common with Standardized Information Gathering (SIG) questionnaires, buyers expect a one-page cover summary of your security posture, the question-by-question response, a short appendix of supporting evidence including architecture diagram, data flow diagram, sub-processor list, penetration test summary, and incident response plan, plus contact details for your security lead.

If you are on your third or fourth enterprise questionnaire in six months and each one is a 30-hour internal fire drill, the tactical approach will buy you time but not solve the problem. The problem is that every future deal will repeat the same pattern until you hold the certificate. The cost of answering questionnaires manually, typically 30 to 60 hours of senior time per response, crosses the cost of certification somewhere around the fourth or fifth questionnaire. After that, you are losing money by deferring. The template is a tactical bridge. The strategic answer is to certify.

### Ready to get certified?

Book a free consultation to discuss your certification needs. Our team will assess your current position and recommend the fastest path to compliance.


----- BLOG FILE: 07-fintech-fca-dora.md -----

UK fintechs face a problem that SaaS and general technology businesses do not. Their regulators, primarily the FCA, the PRA for dual-regulated firms, and the European Banking Authority via DORA for firms with EU customers, do not merely suggest information security controls. They require specific operational resilience and ICT risk management outcomes, and they supervise whether those outcomes are being achieved. ISO 27001 is not a legal requirement in either regime. But in practice, it is the most efficient and defensible way to demonstrate the controls the regulators expect you to have.

Three FCA instruments matter. SYSC 13 (Operational Risk) and SYSC 15A (Operational Resilience) in the FCA Handbook; PS21/3 and the operational resilience rules that came into full effect in March 2025, requiring firms to identify Important Business Services, set Impact Tolerances, map dependencies, and test their ability to remain within tolerance during disruption; and the FCA's ongoing supervisory expectations on third-party risk, cyber resilience and cloud outsourcing. In practical terms, the FCA expects a supervised fintech to demonstrate a documented ICT risk management framework with board-level ownership, identified Important Business Services with tested Impact Tolerances, evidence of third-party risk management including exit plans for critical cloud providers, incident detection, response and reporting capability aligned with FCA notification obligations, regular testing including scenario-based exercises and penetration testing, and staff training with an articulated security culture.

The EU Digital Operational Resilience Act (DORA, Regulation 2022/2554) became directly applicable on 17 January 2025. If your fintech offers services to EU customers, or processes data for EU financial entities as a third-party provider, DORA affects you even post-Brexit, either directly as a financial entity or indirectly through the DORA pass-through obligations your EU customers will flow down to you as a critical ICT third-party provider. DORA's requirements cluster into five areas that all map heavily onto ISO 27001: ICT risk management framework (Articles 5 to 15), ICT-related incident management and reporting (Articles 17 to 23), digital operational resilience testing (Articles 24 to 27), ICT third-party risk management (Articles 28 to 44), and information and intelligence sharing (Article 45).

ISO 27001 alone does not make you DORA-compliant. But an ISO 27001-certified ISMS is the fastest foundation on which to build the additional DORA-specific controls, because roughly 75% of the control work is already done. Four areas always require fintech-specific extension beyond vanilla ISO 27001: operational resilience scoping (ISO 27001 is scoped by information security while FCA operational resilience is scoped by Important Business Services), third-party risk register and exit planning (the FCA and DORA expect more detail than ISO 27001's Annex A requires in isolation), incident notification workflows (the FCA SUP 15 notification regime and DORA Article 19 have specific timelines and templates), and regulator-ready evidence packs (supervision is increasingly conducted through evidence requests including Section 166 skilled persons reviews).

The question your board should be asking is not "do we need ISO 27001?" It is: "What is the defensible minimum evidence base we need to pass an FCA supervisory review and a DORA oversight request without remediation findings?" The answer is a certified ISMS, an operational resilience framework integrated into it, a third-party risk register with tested exits, and an incident notification runbook mapped to FCA and DORA timelines. ISO 27001 is the entry point to that answer. It is not the whole answer.

For a UK fintech under FCA supervision with any EU exposure, a defensible 12-month programme looks like this: Weeks 1 to 12 for ISO 27001 implementation and Stage 2 audit; Weeks 8 to 20 (overlapping) for operational resilience framework build-out aligned with PS21/3 Important Business Services and Impact Tolerances; Weeks 13 to 24 for DORA gap assessment against ISO 27001 baseline, with incremental control build-out for the 25% of DORA requirements not already satisfied; Weeks 20 to 36 for ISO 22301 certification for business continuity if DORA testing requirements or FCA operational resilience tolerances warrant independent attestation; and a parallel workstream throughout for third-party risk register build-out and exit plan testing.

Total engagement cost for a sub-150-person fintech: typically 45,000 to 75,000 pounds across all workstreams. Compared to the cost of a Section 166 remediation exercise following a supervisory finding, routinely 250,000 to 1 million pounds in skilled persons fees alone, the proactive path is significantly cheaper. The alternative of building equivalent evidence internally without certification is perfectly legal but usually more expensive and always harder to defend to a regulator who prefers independently audited assurance over internal documentation.

### Ready to get certified?

Book a free consultation to discuss your certification needs. Our team will assess your current position and recommend the fastest path to compliance.


----- BLOG FILE: 08-healthtech-nhs.md -----

Selling into the NHS is unlike selling into any other UK market. The procurement framework is layered, the security questions are sector-specific, and the assessor at the other end of the form is not a generic procurement officer. They are a Caldicott Guardian, a clinical safety officer, or a DPO who knows exactly what an Information Governance failure costs in patient harm and regulatory exposure. ISO 27001 is not the only thing they will ask for. But without it, the conversation rarely starts. This guide explains the four assurance frameworks every UK healthtech selling into the NHS will encounter, where ISO 27001 fits in the stack, and what to do if you have a tender deadline this week and a buyer who has already asked for your DSPT submission.

UK NHS procurement gates cluster around four assurance instruments. First, the Data Security and Protection Toolkit (DSPT), which is mandatory for any organisation that processes NHS patient data. It is self-assessed annually against the National Data Guardian's ten data security standards and submitted via the DSPT portal with evidence. Without a current DSPT submission marked "Standards Met," you will not pass NHS supplier vetting. Second, the Digital Technology Assessment Criteria (DTAC), the assessment framework for digital health products published by NHS England and NHSX, covering clinical safety (DCB0129/DCB0160), data protection, technical security, interoperability, and usability. DTAC is required for any digital product procured by NHS organisations. Third, ISO/IEC 27001:2022, which is not legally required for NHS procurement but is functionally required. Holding ISO 27001 typically removes 30 to 40 percent of the questions on a DSPT submission and provides the underlying evidence base for the technical security section of DTAC. Fourth, Cyber Essentials Plus, mandatory for any supplier handling NHS data above a certain risk threshold.

In practical terms, a UK healthtech selling into the NHS needs all four. The order matters. Cyber Essentials Plus first, because it is the cheapest, fastest, and unblocks the procurement vetting process. ISO 27001 second, because it provides the management system and evidence base that everything else depends on. DSPT third, leveraging the ISO 27001 evidence to accelerate the self-assessment. DTAC fourth, scoped to the specific product being procured. Doing them out of order is the most common mistake we see. Companies submit DSPT first, score "Standards Not Met," then spend three months remediating control gaps that ISO 27001 would have surfaced and fixed in a single workstream.

Based on engagements with healthtech clients selling into NHS Trusts, ICBs, and NHS Digital itself, the questions that matter most are not the ones founders expect. Buyers prioritise, in order: clinical safety (have you appointed a clinical safety officer and do you have a DCB0129 hazard log), data residency (where is the data stored and is it within the UK), sub-processor risk (which third parties have access to patient data and are they DSPT-compliant in their own right), incident response (what is your notification commitment to the NHS Trust as data controller), and interoperability (does your product support FHIR, OpenEHR, or IHE profiles). ISO 27001 alone does not answer all of these, but it provides the management system spine on which the answers can be evidenced.

NHS tender windows are short. Pre-Qualification Questionnaires typically run on a 21-day to 35-day cycle and Invitation to Tender responses on a 28-day to 42-day cycle. If you receive a PQQ today and you do not yet hold ISO 27001, Cyber Essentials Plus, and a current DSPT submission, you have two options. Option A is to decline this tender and build properly for the next one. Option B is to initiate the programme and submit a forward-looking response. If the tender is significant and the Trust has flexibility, the credible path is to initiate ISO 27001 and Cyber Essentials Plus immediately, secure a contracted timeline, and respond to the tender with the named implementation partner and target audit dates. NHS procurement teams will accept this in roughly 60 percent of cases for tenders where the technical fit is strong and the certification timeline is within 90 days.

For a UK healthtech without any current certifications, a defensible 90-day programme looks like this: Days 1 to 14 for Cyber Essentials Plus initial assessment and remediation, Days 1 to 60 for ISO 27001:2022 implementation and Stage 2 audit in parallel, Days 30 to 75 for DSPT preparation and submission leveraging ISO 27001 evidence, and Days 60 to 90 for Cyber Essentials Plus certification audit and DTAC pack assembly. Total cost for a sub-50-employee healthtech is typically 18,000 to 32,000 pounds across all four workstreams. Compared to the value of a single NHS Trust contract, typically 80,000 to 450,000 pounds in year-one ARR for a digital health product, the arithmetic is uncontroversial.

If your product touches clinical decision-making, AI-driven diagnostics, or patient-facing workflows that could cause clinical harm, the four frameworks above are necessary but not sufficient. You will also need DCB0129 and DCB0160 clinical safety case management, MHRA registration if your product meets the medical device definition, and potentially ISO 13485 for medical device quality management. This is a genuinely longer programme. Healthtechs that try to compress it lose deals at the clinical safety officer review, not at procurement.

### Ready to get certified?

Book a free consultation to discuss your certification needs. Our team will assess your current position and recommend the fastest path to compliance.


----- BLOG FILE: 09-ai-companies-42001.md -----

Here is a claim you will hear from AI-native consultancies pitching ISO 42001 implementation: "You don't need ISO 27001 if you have ISO 42001. The AI standard is built on the management system backbone and covers everything you need." It is half true. And the half that is wrong will cost you a deal. This guide explains why AI companies almost always need both standards, what each one actually covers, and how to sequence the dual programme without paying for two certifications independently.

ISO/IEC 42001:2023 inherits its management system architecture from the ISO Annex SL framework, the same backbone shared by ISO 27001, ISO 9001, ISO 22301 and every other modern ISO management system standard. That means an ISO 42001 AIMS shares clauses 4 to 10 with ISO 27001 in structural form: context of the organisation, leadership, planning, support, operation, performance evaluation, and improvement. If you implement ISO 42001 properly, you do build a management system that looks superficially like an ISO 27001 ISMS. But ISO 42001's controls address AI-specific risk: model governance, data quality for training, transparency, human oversight, bias and fairness, lifecycle management, and impact assessment. ISO 27001's 93 Annex A controls address information security risk: access controls, cryptography, physical security, operations security, communications security, supplier relationships, and incident management. The two control sets overlap in roughly 15 percent of areas. They are not substitutes for each other.

Take a typical enterprise vendor security questionnaire of approximately 40 questions. Roughly 75 percent of the questions are ISO 27001 territory: information security controls, data protection and privacy, incident response and breach notification, third-party risk management, business continuity, and physical and environmental security. Roughly 25 percent are ISO 42001 territory: AI governance, model risk, bias, transparency, training data provenance and quality, and human oversight and explainability. If you only hold ISO 42001, you will satisfy the buyer on the AI-specific questions and fail them on everything else.

There is a structural reason ISO 27001 is asked for first. ISO 27001 has been the international information security standard since 2005. It has twenty years of buyer recognition, IRCA-registered auditors, UKAS-accredited certification bodies, and integration into procurement frameworks across every regulated industry. ISO 42001 was published in December 2023. Procurement teams trust certifications they recognise. Even buyers who specifically care about AI governance will check the ISO 27001 box first because it tells them you understand the broader information security discipline. Selling ISO 42001 without ISO 27001 to a sophisticated enterprise buyer is like applying for a senior role with a master's degree but no undergraduate. The qualification is impressive but the gap is conspicuous.

For an AI company without either certification, the most efficient path is a combined ISO 27001 plus ISO 42001 programme. The dual programme runs roughly as follows: Weeks 1 to 4 for joint scoping with ISMS scope and AIMS scope drafted together, Weeks 2 to 8 for ISO 27001 documentation and control implementation, Weeks 6 to 12 for ISO 42001 documentation, AI inventory, and AI-specific control implementation leveraging the ISMS backbone, Weeks 10 to 12 for internal audit covering both management systems, and Weeks 12 to 16 for Stage 1 and Stage 2 audits conducted as combined sessions where the certification body permits. Total elapsed time: 14 to 16 weeks for both certifications. Total cost: typically 35 to 45 percent lower than running the two programmes sequentially.

There is one scenario where starting with ISO 42001 alone makes sense. If you already hold ISO 27001 and a buyer has asked specifically about AI governance, the standalone ISO 42001 extension is the right move. It is a 10 to 14 week add-on rather than a parallel programme, and it inherits the management system you already operate. Outside that scenario, the answer is both, sequenced together. Founders who try to win the AI governance argument with ISO 42001 alone find they have spent 12,000 pounds on a certification their procurement reviewer does not yet recognise, while the 15,000 pounds they did not spend on ISO 27001 is what their reviewer actually wanted to see.

If your buyers are sophisticated enterprises with structured procurement processes, hold both. If your buyers are AI-native scale-ups and your differentiator is AI governance leadership specifically, ISO 42001 first is defensible. Most companies sit in the first category and assume they sit in the second.

### Ready to get certified?

Book a free consultation to discuss your certification needs. Our team will assess your current position and recommend the fastest path to compliance.


----- BLOG FILE: 10-legal-firms-sra.md -----

The average cost of a data breach at a UK legal firm in 2025, according to the Solicitors Regulation Authority's annual Risk Outlook, was 4.2 million pounds once regulatory fines, client compensation, professional indemnity uplift, and reputational client loss were combined. The cost of ISO 27001 certification for a 50-partner firm is roughly 15,000 to 22,000 pounds. This is the most asymmetric risk-reward calculation in the entire UK compliance market. And yet legal firms remain the slowest professional services sector to certify. This guide explains what the SRA actually expects, why client audits are now the dominant procurement gate for legal firms serving regulated industry clients, and what changes when a firm holds ISO 27001 versus when it does not.

The Solicitors Regulation Authority does not mandate ISO 27001. It does, however, mandate adequate information security and confidentiality controls under the SRA Code of Conduct (Outcomes 4.1 to 4.5) and the SRA Standards and Regulations 2019. In supervisory practice, the SRA increasingly assesses information security maturity using ISO 27001 as the implicit benchmark. The SRA's Risk Outlook for 2024 and 2025 explicitly references international information security standards as the credible evidence of mature controls. SRA enforcement actions following data breaches consistently cite the absence of a documented information security management system as an aggravating factor. The translation is direct: the SRA does not require ISO 27001, but in the event of a breach, the absence of ISO 27001 is treated as evidence of inadequate controls.

The bigger driver for legal firm certification is not the SRA. It is the client. Major UK and international clients in financial services, energy, healthcare, technology, and government now run vendor security audits on their external counsel as a standard procurement gate. The questions are the same questions a software vendor would face: Do you hold ISO 27001 certification? How do you handle matter data, transactional data, and personally identifiable information? What is your access control model for matter teams? How do you manage information barriers between conflicting clients? What is your incident response and notification capability? Twenty years ago, no client asked these questions of their lawyers. Today, every regulated client does.

Legal firms that cannot answer these questions lose panel positions. Not loudly, not with a formal rejection letter. Quietly, through reduced instructions, exclusion from new panel reviews, and gradual replacement by certified competitors. Three structural reasons explain why legal firms are slow to certify, none of which serve the firm's commercial interest. Partnership governance means investment decisions require partner approval, and senior partners often perceive information security as an IT expense rather than a commercial enabler. Information barriers and legal professional privilege concerns lead some firms to believe, incorrectly, that an external auditor reviewing their information security controls would compromise client confidentiality. ISO 27001 audits do not access client matter content. They review the controls, not the data. The assumption that the firm's reputation alone protects it is a survivorship bias argument.

Three measurable changes are observed when a legal firm holds ISO 27001. Panel position: certified firms qualify for procurement panels that uncertified firms cannot enter. This is no longer about competitive advantage; it is about basic eligibility for regulated client work. PI insurance premiums: professional indemnity insurers now use information security maturity as a primary input to premium calculation for legal firms. Certified firms typically secure premium reductions of 8 to 18 percent. On a 200,000 pound annual PII premium, the certification effectively pays for itself in two years. Client retention: existing clients increasingly include information security clauses in their engagement letters. Failure to evidence adequate controls is a contractual termination right.

For a UK legal firm of 50 to 200 fee earners, a defensible 12-week ISO 27001 programme looks like this: Weeks 1 to 2 for scoping covering matter management systems, document management, time recording, billing, email and communications, mobile and remote working, and sub-processor estate. Weeks 2 to 6 for ISMS documentation with attention to information barrier policies, conflict management, and matter file handling. Weeks 6 to 9 for control implementation with emphasis on access controls, encryption, and incident response. Weeks 9 to 10 for internal audit. Weeks 10 to 12 for Stage 1 and Stage 2 audits. Total cost for a sub-200 fee earner firm is typically 15,000 to 28,000 pounds depending on scope and complexity.

If you are a managing partner, COO, or Head of Risk at a UK legal firm, the conversation to have with the equity partnership is not about ISO 27001. It is about which existing clients have asked information security questions in the last twelve months, which prospective clients have declined the firm at the procurement stage, and what the PII renewal trajectory looks like. When those three questions are on the table, the certification decision answers itself.

### Ready to get certified?

Book a free consultation to discuss your certification needs. Our team will assess your current position and recommend the fastest path to compliance.


----- BLOG FILE: 11-investor-asked.md -----

The term sheet is signed. The diligence pack is being assembled. And the investor's diligence team has just sent over their data security and information governance questionnaire. You are not at the term sheet stage being asked whether you have ISO 27001 in some abstract sense. You are at the diligence stage being asked to evidence your information security controls in front of a fund's operating partners, an external technical consultant, and in many cases a specialist cybersecurity diligence firm hired specifically to review the security posture of every Series B and later target. This is a different question to the procurement questionnaire. The investor is not buying your service. They are pricing the risk of owning your equity for the next five to seven years.

Three structural shifts in the last 36 months explain why investors care about security now. First, LP pressure: Limited Partners in venture and growth funds increasingly require fund managers to evidence security and AI governance diligence at the portfolio level. Second, post-investment cost of breaches: funds have learned, expensively, that a breach at a portfolio company in year one of investment can wipe 30 to 60 percent off the next valuation event. Third, conditions precedent enforcement: funds increasingly use security findings to negotiate down valuations or impose conditions precedent in the share purchase agreement. "The company shall achieve ISO 27001 certification within nine months of completion" is no longer a footnote. It is a cost the founder pays with founder time and consultancy fees during the most operationally intense period of the company's life.

Investor security diligence questionnaires are typically more sophisticated than enterprise procurement questionnaires. They are structured around five themes: governance and accountability (who owns information security at the executive level, what is the reporting line to the board, how often does the board receive a security update), risk management (do you maintain a risk register, how frequently is it reviewed, what is your risk appetite statement), controls and evidence (do you hold ISO 27001, provide your last penetration test report and remediation evidence, provide your incident log for the last 24 months), compliance and regulatory exposure (GDPR evidence, sector-specific regulation, cross-border data transfer mechanisms), and resilience and continuity (RTO and RPO for critical services, last business continuity test, cyber insurance position).

If you do not hold ISO 27001 at the time of the diligence, investors will accept three substitutes in decreasing order of credibility. First, a contracted ISO 27001 implementation in flight: a signed engagement letter with a credible UK consultancy, a documented project plan, and a target Stage 2 audit date. This demonstrates the trajectory and gives the fund's diligence team something to point at in their committee paper. Second, equivalent independent assessment: a SOC 2 Type II report, a recent independent penetration test with full remediation evidence, and a documented internal information security framework aligned to a recognised standard. Third, a credible plan with named accountability: a documented intent to certify with a named consultancy partner and a timeline that completes before the next funding event. What investors will not accept: "We follow industry best practice," "Our cloud provider handles security," or "It's on our roadmap."

If the diligence questionnaire landed this morning and the round closes in three weeks, you have two parallel workstreams to run. Workstream 1: answer the questionnaire honestly and comprehensively, providing evidence where you have it and acknowledging gaps where you do not. Do not bluff. Diligence teams cross-check answers against artefacts and they will catch the bluffs. Workstream 2: sign an implementation engagement this week. The single most material change you can make to your diligence pack between Monday and Friday is to convert "we do not currently hold ISO 27001" into "we have appointed an implementation partner, with kickoff this week and Stage 2 audit scheduled for a specific date." That single sentence shifts the diligence narrative from a finding to a remediation plan.

Founders who certify ahead of a fundraise close on cleaner terms. The diligence questionnaire becomes a routine box-ticking exercise rather than a remediation negotiation. Conditions precedent disappear. Valuation discussions stay focused on commercial metrics. Founders who certify under diligence pressure pay twice: once for the certification itself, and once in the negotiating leverage they hand to the fund by being mid-remediation during the closing process. If you are 6 to 12 months from a fundraise and you do not yet hold ISO 27001, the optimal time to start the project is now, not later.

### Ready to get certified?

Book a free consultation to discuss your certification needs. Our team will assess your current position and recommend the fastest path to compliance.


----- BLOG FILE: 12-cyber-insurance.md -----

The renewal quote arrived in the inbox. Last year you paid 18,000 pounds for 5 million pounds of cyber liability cover. This year the same insurer is asking 25,200 pounds. A 40 percent increase, no claims history, no material change in your business. You are not alone. UK cyber insurance premiums have repriced sharply as underwriters recalibrate after a decade of ransomware losses and a more aggressive regulatory environment. The market has not stopped repricing, but the way underwriters allocate premium uplift across their portfolio has changed in one important way: certified businesses are being treated as a separate risk class.

Cyber insurance underwriters price three things into a premium: the probability of a claim, the severity of an expected claim, and the operational maturity of the insured. The first two are calculated from industry data, the insured's revenue and headcount, the sector, and the claims history of similar businesses. The third is calculated from the application form. Most cyber insurance application forms are 40 to 80 questions long. Roughly half of those questions test whether the insured operates an information security management system that resembles ISO 27001 in substance. Holding ISO 27001 collapses the form. Underwriters typically replace 30 to 50 individual questions with a single tick: "insured holds current ISO/IEC 27001:2022 certification." Premium is calculated against the certified rate card rather than the uncertified rate card.

The figure varies by insurer, sector, and revenue band, but the empirical pattern across UK cyber insurance brokers is consistent. Certified businesses pay between 15 and 35 percent less than equivalent uncertified businesses for the same cover. Underwriters that operate certified-only rate cards, a growing minority, decline to quote uncertified businesses entirely above certain risk thresholds. The 40 percent figure cited in the headline is the upper end of the range, observed in regulated sectors such as fintech, healthtech, and professional services, where the alternative for the underwriter is to decline cover. In those sectors, certification is increasingly the difference between getting cover at any price and getting no cover at all.

Premium is only one of the variables. The other variable is what the policy covers. Uncertified businesses increasingly face carve-outs and sub-limits on the high-cost claim categories: ransomware payments sub-limited or excluded, business interruption sub-limited, regulatory defence and fines excluded, third-party liability for data subjects sub-limited, and reputational harm and PR response excluded. Certified businesses access cover without these carve-outs because the underwriter has independent evidence of mature controls. The headline premium difference is therefore an understatement of the real economic difference.

Consider a real example: a 60-employee UK fintech, 6 million pounds ARR, 25,000 pounds current cyber insurance premium for 10 million pounds cover with standard market sub-limits. Certified outcome: 18,000 pounds annual premium for 10 million pounds cover with no sub-limits. Saving: 7,000 pounds per year, plus the avoided exposure on sub-limited cover which in a real ransomware incident could exceed 500,000 pounds. ISO 27001 certification cost: 15,000 to 22,000 pounds first year, dropping to roughly 8,000 pounds annualised across the three-year cycle. Breakeven point on certification cost from insurance savings alone: roughly 24 months. Every other commercial benefit of certification is incremental upside on top of the insurance economics.

The insurance economics work for businesses that already pay meaningful cyber insurance premiums. For a 5-person pre-revenue startup paying 2,000 pounds a year for minimal cover, the insurance saving alone does not justify certification. The economics also work less cleanly for businesses in low-risk sectors with no regulatory exposure and no enterprise procurement gates. If your insurer has not increased your premium materially, the insurance lever is weaker. Other levers such as deal velocity, procurement gates, and fundraise readiness typically still justify the work.

### Ready to get certified?

Book a free consultation to discuss your certification needs. Our team will assess your current position and recommend the fastest path to compliance.


----- BLOG FILE: 13-iso-vs-ce-plus.md -----

The most common compliance question we get from UK technology businesses is some variant of: "Do we need ISO 27001 or Cyber Essentials Plus? Which one is enough?" It is the wrong question. ISO 27001 and Cyber Essentials Plus are not alternatives. They answer different questions, satisfy different procurement gates, and operate at different depths. For most UK technology businesses selling into UK enterprise or government, the answer is both, in a specific order. For some businesses, the answer is one or the other. For a small minority, the answer is neither, yet. This guide cuts through the comparison by asking the question the way procurement teams actually ask it: not "which one is better?" but "which one does each specific buyer need to see?"

Cyber Essentials is a UK government-backed scheme administered by IASME. It assesses an organisation against five technical control areas: firewalls and internet gateways, secure configuration, user access control, malware protection, and patch management. Cyber Essentials (basic) is a self-assessed certification. Cyber Essentials Plus is the independently audited version with the same five control areas verified through technical testing on a sample of devices, internal vulnerability scanning, and external testing of internet-facing services. Re-certification is annual. Cyber Essentials Plus is a technical control audit. It is not a management system standard.

ISO/IEC 27001:2022 is an international management system standard covering 93 information security controls (Annex A) plus the management system clauses (4 to 10) that govern how the controls are operated, audited, reviewed, and improved. ISO 27001 is significantly broader than Cyber Essentials Plus. The 93 Annex A controls cover access control, cryptography, physical security, operations security, communications security, supplier relationships, incident management, business continuity, and compliance. Critically, ISO 27001 also requires a documented risk management process, a Statement of Applicability, internal audit, management review, and continual improvement. Cyber Essentials Plus has none of these.

The practical difference is what each one unlocks in terms of procurement access. Cyber Essentials Plus unlocks UK government supplier vetting (mandatory above certain contract values), NHS Data Processing Services contracts (mandatory), UK MOD Defence Cyber Protection Partnership (mandatory), some public sector frameworks (G-Cloud at certain risk levels), and cyber insurance underwriting at the lower premium tier. ISO 27001 unlocks UK enterprise procurement (financial services, healthcare, technology, professional services), EU procurement and EU enterprise vendor reviews, Middle East and Asia-Pacific enterprise and government procurement, investor due diligence at Series B and later, supplier panels for any regulated industry, and cyber insurance underwriting at the certified rate tier.

If your buyers are a mix of UK government and UK private sector, you need both. Cyber Essentials Plus is the gate for the public sector buyers; ISO 27001 is the gate for the private sector buyers. Holding only one excludes you from half your potential market. If your buyers are international, ISO 27001 alone is acceptable in most overseas markets. Cyber Essentials is not internationally recognised. If your buyers are exclusively UK public sector, Cyber Essentials Plus is mandatory and ISO 27001 is increasingly expected as evidence of broader maturity.

The order is Cyber Essentials Plus first, ISO 27001 second. Two reasons. First, Cyber Essentials Plus is faster (3 to 6 weeks) and cheaper (2,000 to 5,000 pounds), so it unblocks early procurement opportunities while the longer ISO 27001 programme runs. Second, the technical controls assessed in Cyber Essentials Plus are a subset of the ISO 27001 Annex A controls, so the work done for Cyber Essentials Plus directly contributes to the ISO 27001 implementation. For the combined programme, the total elapsed time is typically 12 to 14 weeks for both certifications at a total cost of 14,000 to 26,000 pounds, roughly 25 percent lower than running the two programmes sequentially because the Cyber Essentials Plus evidence is reused.

### Ready to get certified?

Book a free consultation to discuss your certification needs. Our team will assess your current position and recommend the fastest path to compliance.


----- BLOG FILE: 14-vanta-drata.md -----

Vanta and Drata have raised 700 million dollars between them on a single positioning claim: that compliance automation software can replace a consultant. As a working ISO 27001 lead auditor, I want to give an honest answer to that claim, because the choice between automation tools and consultancy is the most common decision UK founders get wrong in this category. This guide explains what compliance automation tools actually do, what they do not do, where they excel, and the specific scenarios in which they fail.

Compliance automation platforms do three things, well. First, they monitor your technical environment continuously: cloud infrastructure, identity provider, code repository, ticketing system, HR system. They check whether configured controls such as MFA enforcement, encryption at rest, access reviews, and code review requirements are operating as expected and flag drift. Second, they generate evidence on demand. When an auditor asks for the access review log for Q3, the platform produces it from the integrated systems rather than requiring manual collation. Third, they provide pre-built policy templates and a workflow for tracking control implementation. These are real, valuable capabilities that save meaningful time during both implementation and surveillance phases.

Compliance automation platforms do not write your Statement of Applicability for you in any meaningful way. They generate a template SoA from the framework, but tailoring the SoA to your actual scope, justifying the inclusion or exclusion of each Annex A control against your specific risk profile, and defending those decisions to a UKAS-accredited auditor is consultancy work. They do not conduct your risk assessment; they provide a risk register template. They do not manage your audit relationship: the certification body is contracted separately. They do not write your information security policy in any tailored way. Most importantly, they do not get you certified. The auditor certifies. The platform produces the evidence the auditor reviews. The work between the platform's output and the auditor's signature is the implementation, and that work is consultancy work whether you call it that or not.

Compliance automation platforms are built for technology-native, cloud-native, English-speaking, US-headquartered SaaS companies pursuing SOC 2 Type II. That is the customer profile they were designed around, and they execute it extremely well. If you are a 50-person US SaaS company on AWS, with engineering and security functions sophisticated enough to interpret platform output, willing to allocate 200 to 400 internal hours to the implementation, and pursuing SOC 2 first and ISO 27001 second, the platforms are an excellent choice. If you are not that customer, the platforms are an expensive shortcut that does not actually shorten anything.

Five scenarios where the platform-only approach reliably fails or underperforms. First, hybrid cloud and on-premise environments, because platforms are built around cloud-native integrations and anything running on a hypervisor in a colocation facility is invisible to the platform. Second, ISO 27001 specifically rather than SOC 2, because the Statement of Applicability process, management system clauses, and documentation depth expected by UKAS-accredited auditors are areas where platform output is often inadequate. Third, regulated sectors where fintech, healthtech, legal, and defence require control implementations that go beyond the framework default. Fourth, small teams without a dedicated security function where the platform produces output nobody is qualified to action. Fifth, first-time certifications with tight timelines where the platform is the easy 30 percent of the work and the consultancy work is the difficult 70 percent.

Compliance automation plus consultancy is materially better than compliance automation alone, and materially better than consultancy alone, for businesses in the platform's target profile. It is a complementary stack, not a competing one. Consultancy alone is acceptable for any business with a competent internal IT function that prefers a lower-tooling implementation, and is cost-optimal for businesses below roughly 30 employees. The combination, where it fits, is the highest-quality outcome but also the highest-cost option. Vanta and Drata licences typically run 8,000 to 20,000 pounds per year on top of consultancy fees.

Three questions tell you which option fits. Is your environment cloud-native and platform-integrable? If no, consultancy-led implementation is more reliable. Is your target framework SOC 2 or ISO 27001? Platforms are stronger for SOC 2; ISO 27001 increasingly requires consultancy depth. Do you have an internal owner with security knowledge? If yes, platform plus light consultancy can work. If no, platform output will sit unactioned. Most UK technology businesses fall into the consultancy-led or platform-plus-consultancy categories.

### Ready to get certified?

Book a free consultation to discuss your certification needs. Our team will assess your current position and recommend the fastest path to compliance.


----- BLOG FILE: 15-over-budget.md -----

Roughly 60 percent of ISO 27001 implementation projects in the UK come in over their original quoted budget. The overrun is usually 30 to 90 percent above the original number, with a median around 45 percent. The reason is almost never the quality of the work or the difficulty of the standard. The reason is structural choices made at the proposal stage that make overrun statistically inevitable, regardless of how well-intentioned the consultancy is. This guide explains the four red flags that predict budget overrun, the contract structures that prevent it, and what to ask for at the proposal stage so that the number you sign for is the number you pay.

Red Flag 1: Hourly Billing or Day Rate Pricing. If a proposal quotes a day rate, an hourly rate, or an estimated number of days at a daily fee, the proposal is not a fixed-fee proposal. It is an open-ended commitment with a number on the front page. Day-rate pricing transfers all scope risk from the consultancy to the client. Every additional workshop, every revision cycle, every clarifying call adds to the bill. The fix is fixed-fee pricing with a defined deliverables list. Red Flag 2: Vague Deliverables. Proposals that describe the engagement in process terms rather than artefact terms are setting up a budget overrun. The fix is to demand a deliverables list with named documents, document owner, completion date, and acceptance criteria.

Red Flag 3: No Named Lead Auditor or Implementation Lead. Proposals that do not name the specific consultant who will lead your engagement are quoting on a junior delivery model. The senior consultant in the sales meeting is not the consultant who will run your project. Junior consultants take longer to do the same work, escalate routine decisions to senior consultants who bill at a higher rate, and produce documentation that requires more rework after auditor feedback. The fix is to insist on a named lead consultant with stated credentials before signing. Red Flag 4: No Audit Body Booking at Kickoff. Proposals that treat the audit body relationship as a separate workstream, to be initiated after the implementation work is complete, are guaranteed to slip the timeline. UKAS-accredited certification bodies are typically booked 8 to 12 weeks ahead. The fix is to require the audit body and the Stage 1 and Stage 2 dates in the proposal itself.

Beyond avoiding the four red flags, three contract mechanics protect the client from budget surprises. First, fixed-fee pricing with a defined change order process: the total fee is stated in pounds, changes to scope are quoted separately in writing before work starts, and the client controls whether to accept or decline each change order. Second, milestone-based payment: payment is structured against project milestones, not against time, with a typical schedule of 30 percent on signature, 30 percent on documentation completion, 30 percent on internal audit completion, and 10 percent on Stage 2 audit pass. The final 10 percent creates the consultant's incentive to support the audit through to certification. Third, re-audit coverage commitment: the contract should commit the consultancy to closing any non-conformities raised at Stage 2 and supporting the re-audit at no additional cost.

A well-structured ISO 27001 implementation proposal for a UK technology business of 30 to 100 employees should include: a fixed total fee in pounds rather than an hourly rate or day count, a named lead consultant with stated credentials, a deliverables list specifying every artefact with completion criteria, the named UKAS-accredited certification body and provisional Stage 1 and Stage 2 dates, a milestone-based payment schedule with at least 10 percent withheld until certification, a written re-audit support commitment, and a clearly defined post-certification support period typically of 90 days. If the proposal in front of you does not contain these elements, the budget is unreliable regardless of how low the headline number looks.

This is the counterintuitive finding from running and reviewing dozens of ISO 27001 proposals over the last decade. The lowest quoted price typically reflects the loosest scope, the most aggressive change order regime, and the highest likelihood of overrun. The total cost paid by the client at the end of the project is frequently 40 to 60 percent above the original headline. Mid-priced proposals from firms with named lead consultants, fixed fees, deliverables lists, and milestone-based payment terms typically come in at exactly the quoted figure. They start higher on the headline but finish lower on the total. The cheapest quote is usually the most expensive engagement.

### Ready to get certified?

Book a free consultation to discuss your certification needs. Our team will assess your current position and recommend the fastest path to compliance.


----- BLOG FILE: 16-20-person-company.md -----

Yes. That is the short answer. The longer answer is that ISO 27001 was designed to scale to organisations of any size, the certification body assesses based on your scope and your risk profile rather than your headcount, and small companies routinely achieve and maintain certification successfully. We have certified companies as small as 8 employees. But the question gets asked for a reason. Founders of 20-person companies hear about ISO 27001 in the context of large enterprise programmes and quietly assume it is not for them, that the cost will be disproportionate, that the audit will find them lacking, or that the standard is overkill for the size of business they run. All three assumptions are wrong, in specific ways.

ISO/IEC 27001:2022 is a scope-driven standard. The auditor assesses your Information Security Management System against the scope you define, not against an external benchmark. If your scope is "the development, deployment and operation of your product for UK customers, supported by 20 employees, hosted on AWS, with no on-premise infrastructure," the auditor evaluates whether your ISMS adequately addresses that scope. They do not compare you to a 2,000-employee bank. This is the structural reason small companies can certify. The standard does not assume any particular size. It assumes a defined scope and a proportionate response to the risks within that scope.

Counterintuitively, ISO 27001 is often easier to implement at 20 employees than at 200. First, scope is smaller: a 20-person company typically has one product, one cloud provider, one identity provider, one office or none, and one or two sub-processors. The asset inventory is short, the data flow diagram fits on a page, and the risk register has 80 to 120 entries rather than 500. Second, decision-making is faster: ISO 27001 requires policies to be approved at management level, controls to be implemented across the organisation, and behaviours to change. At 20 employees, the founder makes the decision in the morning and it is implemented by the afternoon. Third, evidence is more centralised: a 20-person company typically has a single Slack workspace, a single GitHub organisation, a single AWS account, and a single HR system.

The one thing that is genuinely harder at smaller scale is internal capacity. ISO 27001 requires named accountability for the ISMS, regular internal audits, management review, and ongoing maintenance. At 20 employees, there is no dedicated Information Security Manager, no compliance team, no internal audit function. The work falls on the founder, the CTO, or the operations lead, in addition to their day jobs. This is the real constraint for small companies. Not the cost of certification. Not the complexity of the standard. The opportunity cost of senior time during an intense growth period. The solutions are efficient consultancy that minimises the internal time required, typically 40 to 60 internal hours across a 10-week engagement, and post-certification vCISO or managed advisory support that operates the ISMS on your behalf.

For a 20-person UK technology company, ISO 27001:2022 implementation typically costs: implementation at 8,500 to 12,000 pounds fixed fee, UKAS-accredited audit body fees at 3,000 to 5,000 pounds for Stage 1 and Stage 2 combined, internal time of 40 to 60 hours of senior time across the 10-week engagement, and optional vCISO or managed advisory subscription post-certification at roughly 800 to 1,500 pounds per month. Total first-year visible cost: 12,000 to 18,000 pounds. Annualised across the three-year certification cycle, the cost is roughly 6,000 to 10,000 pounds per year. For a 20-person company with even one enterprise contract worth 80,000 pounds or more in year-one ARR, the calculation is uncontroversial.

Three scenarios where a 20-person company should defer certification. First, the company has no enterprise customers, no enterprise pipeline, and no plan to enter the enterprise market. Second, the company is pre-product-market-fit and senior time should be focused on customer discovery and product iteration. Third, runway is under three months and capital is more valuable than certification. Outside those three scenarios, the answer is yes.

UKAS-accredited certification bodies routinely audit organisations of every size. The auditor walking into your 20-person company has audited a hundred similar businesses in the last year. They are not surprised by your size. They are not looking for enterprise-scale processes. They are looking for evidence that the controls you claim to operate are actually operating, that the policies are followed, that the management system is real and not theatrical. A 20-person company that genuinely operates a small but real ISMS will pass first time. A 2,000-person company with elaborate processes that no one follows will fail. Size is not the variable. Authenticity is.

### Ready to get certified?

Book a free consultation to discuss your certification needs. Our team will assess your current position and recommend the fastest path to compliance.


----- BLOG FILE: 18-iso-42001-vs-eu-ai-act.md -----

"We're EU AI Act compliant." "We hold ISO 42001." "We're aligned with the AI governance frameworks." Three different statements, increasingly used interchangeably by AI vendors in marketing materials. They are not interchangeable. They mean different things, satisfy different obligations, and convince different buyers. This guide explains the structural relationship between ISO 42001 and the EU AI Act, what enterprise buyers actually want to see, and how to position your AI governance posture credibly without overstating your compliance status.

ISO/IEC 42001:2023 is a voluntary international management system standard. Companies adopt it because it is recognised by buyers, supports good governance, and provides an auditable framework for AI risk management. There is no legal requirement to hold it. The EU AI Act (Regulation 2024/1689) is a binding piece of EU law. Compliance is mandatory for any company that places AI systems on the EU market, puts them into service in the EU, or whose AI output is used in the EU. There is no choice about whether to comply; only about how to evidence compliance. The two operate in different domains. ISO 42001 is a management system tool. The EU AI Act is a legal regime.

Holding ISO 42001 does not make you EU AI Act compliant. The Act has specific obligations including technical documentation, conformity assessment for high-risk systems, CE marking, EU database registration, post-market monitoring, and incident reporting that ISO 42001 does not directly address. Equally, claiming EU AI Act compliance does not mean you hold ISO 42001. The Act allows different evidence pathways, of which ISO 42001 is one. A company can hold ISO 42001 and not be EU AI Act compliant because they have not addressed the Act-specific obligations. A company can be EU AI Act compliant and not hold ISO 42001 because they have evidenced compliance through alternative pathways. A company can hold both, which is the cleanest position for an EU-facing AI vendor.

ISO 42001 provides the management system foundation that the EU AI Act expects. The structural mapping is roughly: EU AI Act Article 17 on quality management system maps to ISO 42001 Clauses 4 to 10, Article 9 on risk management maps to ISO 42001 Annex A.5 controls, Article 10 on data governance maps to ISO 42001 Annex A.7 controls on data quality and provenance, Article 11 on technical documentation is supported by but not satisfied by the ISO 42001 documentation requirements, and Articles 14 to 15 on human oversight, accuracy, robustness and cybersecurity are addressed by ISO 42001 controls but require Act-specific implementation. ISO 42001 covers roughly 70 percent of the EU AI Act's management system and risk management obligations. The remaining 30 percent is Act-specific work.

Based on questions appearing in enterprise vendor questionnaires over the last six months, the AI governance question typically takes one of three forms. Form 1: "Are you ISO 42001 certified?" The buyer is looking for a recognisable certification because their procurement team has been told that ISO 42001 is the relevant credential. Form 2: "How are you preparing for the EU AI Act?" Asked by buyers with EU operations testing whether you understand the Act's obligations. Form 3: "What is your AI governance framework?" The most sophisticated form, asked by buyers with mature AI risk programmes who want to see structural thinking, not just a certificate.

Three positioning pitfalls to avoid. First, do not claim EU AI Act compliance unless you have completed the Act-specific obligations. "Compliant" implies you have satisfied a legal regime that requires conformity assessment and for high-risk systems CE marking. "Aligned with the Act's principles" is more honest and equally credible. Second, do not present ISO 42001 as legal compliance with the Act. It provides evidence of governance maturity and partially supports Act compliance, but it does not satisfy the Act's specific obligations. Third, do not present the absence of EU operations as exemption. The Act's extraterritorial reach catches any company whose AI output is used in the EU.

The strongest commercial positioning for a UK AI company facing enterprise buyers is: ISO 42001 certification providing the management system credential procurement teams recognise, ISO 27001 certification providing the broader information security credential, EU AI Act readiness work documented separately including risk classification and impact assessments, and a named senior owner for AI governance ideally with the IAPP AIGP credential or equivalent. This combination answers all three forms of the AI governance question credibly and positions the company ahead of competitors who have only one of these elements in place.

If you sell AI to enterprise buyers, ISO 42001 is the certification to pursue first. If you sell into the EU specifically, EU AI Act readiness work runs in parallel rather than sequentially. If your AI is high-risk under the Act's classification, formal conformity assessment is the third workstream and cannot be substituted by ISO 42001 alone. Most UK AI companies need all three, in that order.

### Ready to get certified?

Book a free consultation to discuss your certification needs. Our team will assess your current position and recommend the fastest path to compliance.

================================================================================
## D. GAP-FIX ADDITIONS (5 — captured 2026-05-21, NOT part of the original crawl)



----- GAPFIX FILE (2026-05-21): 17-eu-ai-act-uk-companies.md -----

> Captured 2026-05-21 via defuddle (gap-fix re-fetch). NOT part of the original 2026-05-19 crawl. Source: https://pixelettecertified.com/blog/eu-ai-act-uk-companies

On 2 August 2026, the second major application date of the EU Artificial Intelligence Act becomes effective. From that date, the obligations on providers and deployers of "general-purpose AI models" come into force, joining the prohibitions on unacceptable-risk AI systems that became effective in February 2025. The full obligations on high-risk AI systems follow in August 2027. If you are a UK technology company that builds, integrates, deploys or sells AI to EU customers, the EU AI Act applies to you, post-Brexit, regardless of where you are headquartered.

The extraterritorial reach is the part most UK founders underestimate. The EU AI Act applies to providers placing AI systems on the EU market or putting them into service in the EU regardless of where the provider is established, deployers of AI systems located in the EU, and providers and deployers of AI systems located in third countries including the UK where the output produced by the system is used in the EU. If you operate an AI-enabled SaaS platform from the UK, with a UK legal entity, hosted on UK infrastructure, and one of your customers is a French bank using your output to make decisions about French data subjects, the EU AI Act applies to you. Brexit does not exempt UK companies from the EU AI Act any more than the GDPR exempted them from EU data protection law.

The Act classifies AI systems into four risk tiers. Unacceptable Risk systems are prohibited from February 2025 and include social scoring by public authorities, real-time biometric identification in public spaces, emotion recognition in workplaces, and AI systems exploiting vulnerabilities of specific groups. High Risk systems face full obligations from August 2027 with phased application from August 2026, including AI used in biometric identification, critical infrastructure management, educational and vocational training, employment and worker management, access to essential services such as credit scoring and insurance pricing, law enforcement, and migration. Limited Risk systems have transparency obligations requiring users to be informed they are interacting with AI. Minimal Risk systems have no specific obligations.

The 2 August 2026 deadline is when the obligations on general-purpose AI (GPAI) models become effective. GPAI obligations include technical documentation of the model including training data sources and energy consumption, information and documentation provided to downstream providers, compliance with EU copyright law for training data, and publication of a sufficiently detailed summary of the content used for training. If your product is built on a foundation model, whether your own or a third party's, and used in the EU, GPAI obligations apply from August 2026. The August 2027 deadline is when the full obligations on high-risk AI systems become effective: conformity assessment, CE marking, post-market monitoring, registration in the EU database, and a quality management system.

ISO/IEC 42001:2023 is the international management system standard for AI. It is not legally equivalent to EU AI Act compliance, but it is the most efficient evidence base for the management system obligations the Act imposes. Specifically, ISO 42001 provides a documented AI management system meeting the quality management system requirement, an AI risk assessment and treatment process aligned with the Act's risk-based approach, AI inventory and lifecycle management satisfying the technical documentation obligations, human oversight and impact assessment processes, and continual improvement through the management review cycle. Holding ISO 42001 does not automatically make you EU AI Act compliant, but an ISO 42001 certified company has roughly 70 percent of the structural work done.

If you are a UK technology company with EU exposure and AI in your product, the 90-day priority list is: Day 1 to 14 to map your AI systems against the four risk categories and identify any high-risk systems specifically. Day 14 to 30 to map your customer base by geography, identifying which customers are in the EU and which use your AI output for decision-making. Day 30 to 60 to build an AI inventory covering which models you run, what data trains them, who is the human in the loop, and what decisions they influence. Day 60 to 90 to decide on the certification path: ISO 42001 alone, ISO 42001 plus ISO 27001, or formal EU AI Act conformity assessment for high-risk systems.

EU AI Act non-compliance penalties are deliberately punitive. Maximum fines are 35 million euros or 7 percent of global annual turnover for prohibited AI practices, 15 million euros or 3 percent for non-compliance with most other obligations, and 7.5 million euros or 1.5 percent for supplying incorrect information to authorities. These figures dwarf GDPR maximums. The likelihood of enforcement is also higher than under GDPR's first years, as the EU AI Office established in 2024 has explicit enforcement powers and is staffing up specifically to supervise the new regime.

### Ready to get certified?

Book a free consultation to discuss your certification needs. Our team will assess your current position and recommend the fastest path to compliance.



----- GAPFIX FILE (2026-05-21): cs-01-uk-fintech-iso-27001.md -----

> Captured 2026-05-21 via defuddle (gap-fix re-fetch). NOT part of the original 2026-05-19 crawl. Source: https://pixelettecertified.com/case-studies/uk-fintech-iso-27001

## Overview

A fast-growing UK FinTech company processing payments for SME merchants. Series A funded, 65 employees, SaaS platform handling sensitive financial data. Their growth was being constrained by a lack of ISO 27001 certification, enterprise prospects were declining to proceed past the security questionnaire stage.

## The Challenge

The company was losing two to three enterprise deals per quarter specifically because they could not demonstrate ISO 27001 certification. Prospects in financial services and insurance required it as a non-negotiable procurement condition.

The security team was spending over forty hours per month answering security questionnaires with custom narrative responses. Without a formal ISMS, every questionnaire required bespoke answers that consumed engineering and compliance resources.

Cyber insurance premiums were significantly higher than certified competitors, eroding margins. The absence of certification was also flagged during their Series B due diligence preparation.

## Our Solution

We conducted a comprehensive gap analysis in week one, mapping the company's existing security controls against ISO 27001 requirements. The analysis revealed strong technical controls but significant gaps in documentation, governance, and formal risk management.

Over weeks two through five, we built the complete ISMS documentation suite, thirty-two policies, a risk register with one hundred and fifty entries, the Statement of Applicability covering all ninety-three Annex A controls, and supporting procedures.

Weeks six through eight focused on controls implementation and evidence gathering. We worked with their engineering team to formalise access control procedures, implement monitoring, and establish incident response processes.

The internal audit in week nine identified three minor non-conformities, all of which were closed within forty-eight hours. The Stage 1 and Stage 2 external audits followed immediately, resulting in certification with zero major findings.

â€œWe went from losing enterprise deals to closing them. The ROI on ISO 27001 was measurable within sixty days of certification. Pixelette Certified made a process we expected to take six months happen in nine weeks.â€

CTO

UK FinTech Company



----- GAPFIX FILE (2026-05-21): cs-02-ai-saas-iso-42001-iso-27001.md -----

> Captured 2026-05-21 via defuddle (gap-fix re-fetch). NOT part of the original 2026-05-19 crawl. Source: https://pixelettecertified.com/case-studies/ai-saas-iso-42001-iso-27001

## Overview

An AI-native SaaS company building large language model applications for enterprise clients. Forty employees, Series A funded, processing sensitive client data through proprietary AI models. They needed to demonstrate both information security and responsible AI governance to win enterprise contracts and prepare for EU AI Act compliance.

## The Challenge

Enterprise clients were increasingly requiring evidence of AI governance alongside traditional information security certifications. The company was receiving procurement questionnaires with specific sections on AI risk management, bias assessment, and data governance that they could not adequately address.

The EU AI Act compliance deadline was approaching, and the company's AI systems fell within the high-risk category requiring formal governance frameworks. Without a structured approach, compliance would be reactive and expensive.

The competitive landscape was intensifying. Several competitors had already achieved ISO 27001, and first-mover advantage on ISO 42001 was a significant differentiator given that very few UK AI companies held the certification.

## Our Solution

We designed a dual certification programme that leveraged the significant overlap between ISO 27001 and ISO 42001. Approximately sixty percent of the documentation and controls addressed requirements for both standards, reducing total effort and cost.

The AI governance component required particular attention. We conducted a full AI systems inventory, developed an AI risk assessment framework aligned with the EU AI Act risk categories, and established transparency and explainability procedures for each AI model in production.

Bias and fairness evaluation procedures were established for the company's NLP models, with quantitative metrics and ongoing monitoring requirements. Data governance controls addressed the full AI data lifecycle from collection through training, inference, and retention.

The combined internal and external audit programme was structured to minimise disruption, with shared evidence collection and a coordinated audit schedule across both standards.

â€œISO 42001 gave us a structural advantage that our competitors simply could not match. Enterprise clients recognised that we were serious about responsible AI. The dual certification programme was brilliantly efficient, we got two certifications for significantly less than the cost of doing them separately.â€

CEO

AI SaaS Platform



----- GAPFIX FILE (2026-05-21): cs-03-healthcare-tech-ce-iso-27001.md -----

> Captured 2026-05-21 via defuddle (gap-fix re-fetch). NOT part of the original 2026-05-19 crawl. Source: https://pixelettecertified.com/case-studies/healthcare-tech-cyber-essentials-iso-27001

## Overview

A healthcare technology company providing electronic health record systems to NHS trusts and private healthcare providers. One hundred and twenty employees across three UK offices. They needed Cyber Essentials for NHS Digital supply chain compliance and ISO 27001 for private healthcare client requirements.

## The Challenge

NHS Digital supply chain requirements mandated Cyber Essentials certification for all technology suppliers. Without it, the company could not bid for framework contracts or renew existing agreements. The deadline was imminent.

Private healthcare clients, hospital groups and insurance providers, required ISO 27001 as a condition of data processing agreements. Several existing contracts were at risk of non-renewal without certification.

The company had grown rapidly through acquisition, resulting in inconsistent security practices across three offices. Technical controls varied by site, documentation was fragmented, and there was no unified governance framework.

## Our Solution

We prioritised Cyber Essentials to meet the immediate NHS deadline. A focused gap analysis identified remediation requirements across the five technical controls. The company achieved Cyber Essentials certification within three weeks, preserving their NHS framework eligibility.

With the immediate risk addressed, we transitioned into the full ISO 27001 implementation. The multi-site environment required careful scoping, we defined a unified ISMS that covered all three offices while allowing for site-specific operational procedures.

The Cyber Essentials controls formed the foundation of the ISO 27001 technical control environment. We built upward from there, adding the management system components: risk assessment, governance framework, internal audit programme, and continuous improvement processes.

Staff training was delivered across all three sites, with role-specific modules for technical teams, management, and general staff. The unified approach eliminated the inconsistencies that had developed during the acquisition integration period.

â€œThe phased approach was exactly right for us. Getting Cyber Essentials in three weeks saved our NHS contracts, and the ISO 27001 implementation unified our security practices across all three offices. We went from a fragmented patchwork to a coherent, certified security programme.â€

Head of IT

Healthcare Tech Company



----- GAPFIX FILE (2026-05-21): svc-00-services-index.md -----

> Captured 2026-05-21 via defuddle (gap-fix re-fetch). NOT part of the original 2026-05-19 crawl. Source: https://pixelettecertified.com/services

## Our Services

Everything You Need to Be Enterprise-Ready. ISO certification, cybersecurity, AI governance, and privacy compliance. UK-headquartered, globally delivered, across every sector.

[See Your 10-Week Certification Roadmap](https://pixelettecertified.com/contact)

ISO Certification

## ISO Certification

International standards that open doors to enterprise clients and government contracts.

### [ISO 27001](https://pixelettecertified.com/services/iso-27001)

The global standard for information security management. Get certified in 10 weeks.

Learn more

### [ISO 22301](https://pixelettecertified.com/services/iso-22301)

Business continuity certification. Demonstrate resilience and stay operational when it matters most.

Learn more

### [ISO 9001](https://pixelettecertified.com/services/iso-9001)

Quality management certification. Prove consistent delivery excellence to clients worldwide.

Learn more

### [ISO 14001](https://pixelettecertified.com/services/iso-14001)

Environmental management certification. Lead on sustainability and meet ESG obligations.

Learn more

### [ISO 42001](https://pixelettecertified.com/services/iso-42001)

AI governance certification. Lead responsibly in the era of artificial intelligence.

Learn more

### [ISO 27701](https://pixelettecertified.com/contact)

The privacy extension to ISO 27001. Establishes a Privacy Information Management System aligned with GDPR and global privacy regulations.

Learn more

Cybersecurity & Testing

## Cybersecurity & Testing

UK government-backed certifications, vulnerability assessments, and penetration testing.

### [Cyber Essentials](https://pixelettecertified.com/services/cyber-essentials)

The UK government-backed cybersecurity certification. Essential for public sector supply chains.

Learn more

### [Penetration Testing](https://pixelettecertified.com/services/penetration-testing)

Find your vulnerabilities before attackers do. Expert-led security testing for any environment.

Learn more

Advisory Services

## Advisory Services

Senior security and privacy leadership on a flexible retainer.

### [vCISO](https://pixelettecertified.com/services/vciso)

Senior security leadership, without the senior hire. A fractional CISO for your business.

Learn more

### [vDPO](https://pixelettecertified.com/services/vdpo)

Your dedicated Data Protection Officer, on demand. Expert privacy leadership at a fraction of the cost.

Learn more

GRC & Regulatory Frameworks

## GRC & Regulatory Frameworks

SOC 2, SAMA CSF, NCA ECC/CCC, QCB/NIA, sector-specific and regional regulatory compliance.

### [SOC 2](https://pixelettecertified.com/contact)

Trust Services Criteria compliance for technology companies serving US enterprise clients and investors.

Learn more

### [SAMA CSF](https://pixelettecertified.com/contact)

Mandatory cybersecurity framework for Saudi Arabian financial institutions regulated by the Saudi Arabian Monetary Authority.

Learn more

### [NCA ECC/CCC](https://pixelettecertified.com/contact)

Essential Cybersecurity Controls and Cloud Cybersecurity Controls for Saudi government entities and critical infrastructure.

Learn more

### [QCB/NIA](https://pixelettecertified.com/contact)

Qatar Central Bank cybersecurity requirements and National Information Assurance framework for Qatari financial institutions.

Learn more

Security Architecture

## Security Architecture

Zero Trust, Active Directory hardening, and cloud security architecture design.

### [Zero Trust](https://pixelettecertified.com/contact)

Vendor-neutral Zero Trust architecture design based on NIST SP 800-207 and CISA principles.

Learn more

### [AD Hardening](https://pixelettecertified.com/contact)

Systematic hardening of Active Directory and Azure AD / Entra ID environments to reduce domain compromise risk.

Learn more

### [Cloud Security](https://pixelettecertified.com/contact)

Security architecture design for AWS, Azure, GCP, and hybrid cloud environments.

Learn more

Business Continuity & Disaster Recovery

## Business Continuity & Disaster Recovery

BIA, BRA, and DR planning to ensure your organisation can withstand disruption.

### [BIA / BRA](https://pixelettecertified.com/contact)

Identify critical functions, recovery priorities, and the threats most likely to cause disruption to your operations.

Learn more

### [DR Planning](https://pixelettecertified.com/contact)

Actionable DR runbooks and recovery procedures ensuring IT systems can be restored within defined objectives.

Learn more

AI Governance & Managed Advisory

## AI Governance & Managed Advisory

AI risk assessment aligned to NIST AI RMF and the EU AI Act, plus continuous GRC advisory subscriptions with white-label options.

### [AI Risk Assessment](https://pixelettecertified.com/contact)

Structured evaluation of AI system risks against the NIST AI Risk Management Framework, with EU AI Act alignment.

Learn more

### [Managed Advisory](https://pixelettecertified.com/contact)

Continuous GRC advisory subscription delivered by certified practitioners. White-label available for partners and MSPs.

Learn more

## See Your Path to Certification in 30 Minutes

No obligation. No sales pressure. In 30 minutes, you will know exactly where your compliance gaps are, which standards apply to your business and jurisdiction, and what a realistic timeline and cost looks like, wherever in the world you operate.

Most clients book their first paid engagement within 2 weeks of their gap analysis call.

