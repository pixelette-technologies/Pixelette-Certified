# Insights page: implementation record

Redesign of the Insights index, 6 October 2026. Editorial categories, article bodies and article URLs are unchanged. The page is an archive with a hierarchy, not a marketing blog.

- **Commits:** `edbfa77` (the page) and `378b955` (PNG favicon and wordmarks) on `main`
- **Status:** implemented and pushed. Deployment still gated by the prerequisites in [[Strategic-Rebuild-Implementation-2026-09-25#Before this can go live]].

The index stays at `/blog`. Category filters are `/blog?category=uk-compliance` and the same pattern for the other four. Older `/blog/category/...` addresses redirect there.

---

## Page

| | |
|---|---|
| 01 | Breadcrumb, Insights, one-sentence introduction, category line, search |
| 02 | Featured insight, with one diagram |
| 03 | Latest: the next two articles by publication date |
| 04 | Browse insights: eight articles, two columns |
| 05 | Load more insights |
| 06 | Keep up with what changes |

Featured is the Saudi Arabia and Qatar overview (`featured: true` on that article). Latest excludes it. Browse is the rest, from the same list. Archive lines are new `summary` fields of 18 to 22 words. Standfirsts and article bodies are untouched.

The diagram names the instruments in that article: Saudi Arabia (NCA, SAMA, PDPL) and Qatar (NCSA, QCB, PDPPL). Other articles stay typographic. A `visual` key can attach a later diagram without adding a picture to every card.

Search matches title, summary, standfirst, description, category and jurisdiction. Load more is a link to `?more=1`. Search results and the expanded archive are `noindex`. Each article remains in the sitemap.

## Footer

Reviewed and left. The visible footer is already one description, link columns, social links, privacy choices and the legal line. The group band stays hidden, with its longer company descriptions still in the markup. See [[Compression-Pass-2026-10-06]].

## Same-day mark

`378b955` replaces `favicon.svg` with `favicon.png` and updates both wordmark SVGs. Layout, the web manifest and Alice use the PNG. Whether the drawn wordmark still carries the old tagline is a visual check, not closed here. Go-live item 7 in the 25 September note stands until that check.

## Related

- [[Strategic-Rebuild-Implementation-2026-09-25]]
- [[Compression-Pass-2026-10-06]]
- [[Website-Replacement-Implementation-2026-09-09]]
- [[International-Positioning-2026-10-06]]
