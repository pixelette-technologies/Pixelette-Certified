# Group Footer and Privacy Choices — Implementation Record

Rebuild of the site footer to the Pixelette Technologies structure, and the addition of a working analytics consent control. 18 September 2026.

- **Commits:** `f9274d5` (footer, dialog, policy corrections), `d41347d` (build fix) on `main`
- **Branch:** `feat/group-footer-privacy-choices` (fast-forwarded into `main`, pushed)
- **Status:** implemented, built and verified. Deployment still gated by the prerequisites in [[Website-Replacement-Implementation-2026-09-09#Before this can go live]].

The request was to copy the Technologies footer. The consent half turned out to be the larger piece of work, because copying their dialog copy onto this site would have published a false statement: theirs says no analytics run on their website, and two were running on every page of this one with no way to refuse them.

---

## The footer

Structure follows [pixelettetech.com](https://pixelettetech.com) top to bottom: a brand column, Services and Company columns, the "Part of Pixelette Group" band with this company marked "You are here", and a legal identity line. Measurements and type scale are carried across as ratios; every colour is this site's own `--color-footer-*` token. Both sites already use Outfit, Newsreader and IBM Plex Mono, so the type matches without adding a font.

Group company descriptions are **verbatim** from the Technologies footer, so every sister site describes every company the same way. The intro is their sentence with the company swapped and the engineering clause inverted ("Technologies engineers it, and we help you govern, evidence and prepare it for independent assessment").

Deliberate differences, each for a reason:

| Theirs | Here | Why |
|---|---|---|
| ISO certificate ledger in the brand column | Social icons in that slot | This company holds no certifications of its own, and the 8 September brief bans implying otherwise. A ledger is not something to fill with a placeholder. |
| Company column links Terms, Modern slavery, Accessibility | Omitted | No such pages exist. A footer link to a 404 is worse than its absence. Each joins the column when its page does. |
| VAT number in the legal line | Omitted | No VAT number is recorded for this entity anywhere in the repo, and it is not a fact to guess. |

**Dropped from the old footer**, because the Technologies footer has no equivalent: the email / phone / address block, the "Free 30-Minute Compliance Diagnostic" card, and the copyright line. Contact details still live on `/contact`. Note that dropping the block also removed the phone number from every page — see [[#Open questions]].

The legal line reads from `SITE_CONFIG`, so it still publishes the unconfirmed entity and company number. That remains go-live blocker 2, unchanged by this work.

---

## Privacy choices, and why the copy is not theirs

Their model, mirrored here: one website-analytics switch, stored in `localStorage`, **on until the visitor turns it off**. Their key is `pt-analytics`; ours is `pc-analytics` in [privacy.ts](src/lib/privacy.ts).

The difference is that theirs is inert. A build flag records that no analytics exist on their site, so their dialog says so and the switch only stores a preference for later. Here, [layout.tsx](src/app/layout.tsx) loaded Google Analytics 4 and Ahrefs Web Analytics unconditionally in `<head>` on every page. Copying their wording would have been a lie in two directions at once: that nothing was running, and that the visitor had a choice.

So the switch was made real before the copy was written. [Analytics.tsx](src/components/privacy/Analytics.tsx) now owns both scripts:

- **On:** injects both, and configures gtag with `allow_google_signals: false` and `allow_ad_personalization_signals: false`.
- **Off:** neither script is ever injected, and any `_ga` / `_ga_*` cookies left from an earlier visit are deleted.
- **Switching off mid-visit:** sets `window["ga-disable-<id>"]`, clears the cookies, then reloads. The reload is for Ahrefs, which has no documented way to stop a script already running. Without it the dialog's "applies straight away" would not be true.

Every factual claim in the dialog was checked against vendor documentation before it was written:

| Statement in the dialog | Source |
|---|---|
| Google Analytics sets first-party cookies | `[GA4] Cookie usage on websites` — `_ga` (2 years, distinguishes users), `_ga_<container-id>` (2 years, session state) |
| Ahrefs Web Analytics does not use cookies | Ahrefs: "We do not use cookies, collect any personal data, or store any personally identifiable information by default". Their comparison table: "Zero cookies" |
| Google's advertising features are switched off | Google tag privacy guide: "To turn off all advertising features with the Google tag for Google Analytics, set `allow_google_signals` to `false`" |
| The choice applies straight away | `ga-disable-<id>` "turns off the Google tag from sending data" and blocks cookie-setting; the reload covers Ahrefs |

**Not carried across:** their "No analytics are currently running on this website" line. It is true of their site and false of this one.

One incidental improvement over theirs: their dialog title inherits the footer's mono uppercase `h2` styling, so it renders as `PRIVACY CHOICES` in small capitals. Ours sets the panel heading explicitly. Their footer link colour rule (`.site-footer a`) also reaches inside the white panel; ours is scoped to the link columns for that reason.

---

## Policy corrections

The dialog links to `/cookie-policy`, so the linked page could not stay as it was. Reading it against the code found it describing a different website:

| It said | Reality |
|---|---|
| A `cookie_consent` cookie, 12 months | No consent mechanism existed, so no such cookie |
| `__next_*` "framework session and routing" cookies | Next.js sets none by default; this app has no middleware and never writes a cookie |
| Vercel Analytics, `va_*` | Not installed — `@vercel/analytics` is not a dependency |
| Nothing about Ahrefs | Loading on every page |
| GA4 data "anonymised" | GA4 assigns a per-browser identifier. Pseudonymous, not anonymous |
| Nothing about local storage | `alice_session_id` persists, and now `pc-analytics` |

Both tables in section 2 were rewritten, section 3 now describes the actual control, and section 4 reframed from "third-party cookies" (GA4's are first-party) to advertising. The privacy policy's analytics lines were corrected to name the real vendors and drop "anonymised". Both pages redated 18 September 2026.

---

## The build fix (`d41347d`)

Found while chasing a reported build error, and **pre-existing** — nothing to do with the footer. Five modules constructed their API client at module load:

- `supabaseBrowser` in [supabase.ts](src/lib/alice/supabase.ts) — created eagerly, and **imported by nothing**
- Four `new Resend(process.env.RESEND_API_KEY)` in `notifications.ts`, `weeklyReport.ts`, and the contact and newsletter routes
- The chat route's `new Anthropic({...})`

Each constructor throws when its key is absent, and `next build` loads every route module to collect page data. So `npm run build` failed on any machine or CI job without the full secret set — first at `/api/alice/rating`, then `/api/newsletter`. The unused Supabase client is deleted; the Resend clients share one lazy `getResend()` in [resend.ts](src/lib/resend.ts); the Anthropic client is created on first request. Behaviour with keys set is unchanged.

**This is why CI stayed green while the build was broken.** `.github/workflows/verify.yml` runs `npm run verify` — lint, legacy tokens, claims, `tsc --noEmit`. None of those load a route module. A build is not covered anywhere in CI, and the failure would first have appeared on Vercel.

---

## Gotcha worth remembering

Turbopack served a stale compiled stylesheet for the whole of this work: the new footer markup rendered, entirely unstyled, while `globals.css` compiled cleanly on its own. Editing the file, restarting the dev server and killing the PostCSS worker all failed to shift it — the emitted chunk kept its old name and byte count. Deleting `.next/dev` fixed it immediately. Worth suspecting whenever CSS edits appear to do nothing and the served chunk hash does not change. See also the standing rule about not building while a dev server runs.

---

## Verification

- `npm run verify` — lint, legacy tokens, claims, `tsc --noEmit`: 0 errors
- `npm run build` — completes, all routes built
- Footer screenshotted against the live Technologies footer at 1440px and 390px; group band, legal line and mobile stacking match
- Dialog opened, both toggle states exercised

Not done: no cross-browser pass, and `<dialog>` behaviour was only checked in Chromium.

---

## Open questions

1. **The privacy policy states chat messages "are not stored on our servers". They are.** `/api/chat` writes to a Supabase `conversations` table and `/api/chat/history` reads them back. Left unedited deliberately: a correct sentence needs a retention period and a processor disclosure (Anthropic, Supabase), which are decisions, not facts in the repo. **This is the most material item on this page.**
2. **Analytics default to on.** That mirrors Technologies and is a clear improvement on no choice at all, but whether an opt-out is sufficient here is a question for legal, not a coding decision.
3. **The phone number `+44 20 7946 0958` in `SITE_CONFIG` appears to sit in Ofcom's reserved drama range** (020 7946 0xxx). No longer in the footer, still on `/contact`. Worth confirming before anyone dials it.
4. Terms, Modern slavery and Accessibility pages, if the group wants footer parity with Technologies.

---

## Related

- [[Website-Replacement-Implementation-2026-09-09]] — the 8 September brief this sits under. Its evidence rule is why the certificate ledger was dropped, and its blocker 2 still governs the legal line.
- [[Crawl-Report-Issues-Verification]] — #6 and #13 (company registration display) remain open and are visible in this footer.
