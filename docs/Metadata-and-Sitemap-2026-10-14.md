# Metadata and sitemap: implementation record

Indexing and share-metadata pass after the revamp, 14 October 2026. Sitemap `lastmod` and page Open Graph/Twitter wiring brought into line with the live route set. The obsolete default share image (old trust stats and sales copy) was removed; meta tags still point at the same path so a replacement drops in without further code changes.

- **Commit:** `1f14364` on `revamp/ui` (pushed)
- **Status:** implemented and pushed. Deployment and Search Console submit remain ops steps. Go-live prerequisites in [[Strategic-Rebuild-Implementation-2026-09-25#Before this can go live]] are unchanged, including legal entity confirmation.

No public pricing was introduced. Claims policy on the share image is preserved by removing the banned figures from the asset rather than leaving them live in crawler-visible OG tags.

---

## What changed

| | |
|---|---|
| Sitemap | `SITE_LAST_MODIFIED` set to 2026-10-14. Route coverage already derived from services, markets and insights; left as the single source |
| Open Graph / Twitter | `OG_IMAGE` in `SITE_CONFIG` companions (`src/lib/constants.ts`). Root layout plus every page that overrides `openGraph` / `twitter` re-declares the same asset so child metadata cannot drop the image |
| Share asset | `public/images/og/default.png` deleted. Folder kept with `.gitkeep`. Path remains `/images/og/default.png` |
| Address | Registered office standardised on **77 Fulham Palace Road, London W6 8JA** in `SITE_CONFIG`, structured `registeredOffice` for Organization JSON-LD, About FAQ, company context, `llms.txt` and `llms-full.txt` |
| LinkedIn | Public company URL (member-view query removed) |
| Canonicals | Privacy and cookie policies use `SITE_CONFIG.url` |
| `llms-full.txt` | International market route added |
| Organization schema | Address and `sameAs` taken from `SITE_CONFIG`; image URL from `OG_IMAGE` |

## Left for later

1. Drop a new 1200×630 PNG at `public/images/og/default.png` when ready.
2. After deploy: confirm Google Search Console ownership, submit `https://pixelettecertified.com/sitemap.xml`, request indexing for key URLs if needed.
3. Legal entity and company number still need written confirmation before treating schema/footer identity as final.

## Left unchanged

Robots rules (`allow /`, `disallow /api/`, sitemap pointer). Redirect table for withdrawn URLs. Insight article bodies and category query canonicals. Pix C question path and claims gate.

## Related

- [[Strategic-Rebuild-Implementation-2026-09-25]]
- [[International-Positioning-2026-10-06]]
- [[Insights-Page-2026-10-06]]
- [[Pix-C-and-Supabase-Cutover-2026-10-12]]
