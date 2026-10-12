# Pixelette Site Agent — Complete Build & Replication Spec

**Isolated in-codebase agent.** Each website owns a full copy of the assistant inside its own repository. There is no shared npm package and no central agent service for answers. Hand this file to any other Pixelette website repository; an agent reading only this document should locate every reference file, understand answering and KB build, and replicate the assistant **without searching for paths**.

| | |
|---|---|
| **Reference repository** | `PixeletteTechnologies` (this repo) |
| **Reference site** | https://pixelettetech.com |
| **Visitor-facing name on Technologies** | **Pix T** |
| **Product** | Site agent (each company chooses the name visitors see) |
| **Replication model** | Copy files into the target repo; adapt site-specific content; rebuild KB from **that** site |
| **Core design** | No language model. Answers are published sentences from **that website’s** pages, selected in the browser. |

Paths below are relative to the **reference repository root** unless noted. On a new site, keep the same relative layout unless that site’s framework forces a different `app/` root.

---

## 0. How to use this document from another project

1. Copy this file into the target website repo as `PIX-AGENT-BUILD.md` (or open it in that chat).
2. Copy the files listed in the File Inventory (section 3) into the target repo, using the exact paths listed.
3. Do **not** copy Technologies’ `pix-kb.json` answers as if they were Marketing/Certified/Holdings facts. Rebuild the KB from **that site’s** `page.tsx` (or equivalent) content.
4. Replace Technologies-specific strings: company facts, claims, allowlist prefixes, topic routes, off-topic reply, starters, agent name, contact email, lead `source` string.
5. Wire mount + server actions on the target site (section 9).
6. Run `pix:build` → `pix:check` → `pix:test` (or the site’s equivalents) before shipping.

### The four company sites

From `src/content/nav.ts` (`groupEntities`). Do not invent different domains.

| Company | Website | Scope the assistant may talk about |
|---|---|---|
| Pixelette Technologies | https://pixelettetech.com | Software engineering, AI and automation, blockchain |
| Pixelette Marketing | https://pixelettemarketing.com | Demand, pipeline, conversion, growth |
| Pixelette Certified | https://pixelettecertified.com | Governance, assurance, privacy, compliance readiness |
| Pixelette Holdings | https://pixeletteholdings.com | Group ventures, partnerships, strategic relationships |

**Rule:** each site agent answers only from **that site’s published copy**. Technologies’ KB must never be reused as another company’s knowledge file.

---

## 1. What the product is

### Design in one paragraph

A visitor asks a question in a chat panel on a company website. The brain runs **inside that page** (code shipped with that site). It searches a JSON knowledge file built from that site’s pages. It replies with a published sentence plus a link, or it says it does not know and offers to take an enquiry. There is **no LLM call** on the visitor question path. Name, work email, and discovery answers are the only personal data that leave the browser; they go to **that website’s** server.

### Two paths

**Question (stays on the page)**

1. Visitor types in the chat box.
2. `respond()` runs in the browser (synchronous, pure).
3. It applies rules → claim guards → publishable facts → KB retrieval → topic routes.
4. It returns text + optional `path` / `sourceLabel`, or an honest “I don’t know”.

**Lead (leaves the browser)**

1. Chat asks for name, then work email, then discovery questions.
2. Browser calls that site’s server actions (`startAssistantChat`, `submitAssistantEnquiry`).
3. Server validates, rate-limits, scores (on completed enquiry), stores, and emails.
4. The browser never holds API keys or database credentials.

### What is deliberately not on the visitor path

These exist in the reference repo as a model control plane. **No provider is connected** for production answering. Do **not** port them for a first replication:

| Path | Role |
|---|---|
| `src/lib/pix/gateway.ts` | LLM gateway (unused by widget) |
| `src/lib/pix/provider.ts` | Provider interface; `UnconfiguredProvider` unless mock |
| `src/lib/pix/limits.ts` | Token/budget limits |
| `src/lib/pix/session.ts` | Session helpers for API path |
| `src/lib/pix/config.ts` | Env-based LLM config |
| `src/app/api/pix/route.ts` | `POST /api/pix` (widget does **not** call this) |
| `scripts/test-pix-t.cjs` | Tests the unused gateway path |

Confirmed: `src/components/SiteAssistant.tsx` has **no** fetch to `/api/pix`. It calls `respond()` locally.

---

## 2. Architecture

```
┌──────────────────────────────────────────────────────────────────────────┐
│  Browser (Next.js client)                                                │
│                                                                          │
│  AssistantBoundary                                                       │
│    └─ SiteAssistant                                                      │
│         ├─ PixSignal (launcher UI)                                       │
│         ├─ respond(message, pixContext)     ◄── pure brain               │
│         │     ├─ rules.ts                                                │
│         │     ├─ retrieve.ts  ──reads──► pix-kb.json (bundled)           │
│         │     └─ enquiry.ts (name/email/discovery checks)                │
│         ├─ startAssistantChat(name, email)  ──server action──┐           │
│         └─ submitAssistantEnquiry(draft)    ──server action──┤           │
└──────────────────────────────────────────────────────────────┼───────────┘
                                                               │
┌──────────────────────────────────────────────────────────────▼───────────┐
│  Server (Next.js)                                                        │
│                                                                          │
│  layout.tsx → pixContext() from server-context.ts                        │
│                 reads claims.ts + company.ts (server-only)               │
│                 passes reduced PixContext into SiteAssistant             │
│                                                                          │
│  contact/actions.ts                                                      │
│    → action-limits.ts                                                    │
│    → lead-score.ts (completed enquiry only)                              │
│    → enquiries.ts → Supabase + email                                     │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│  Build time (Node scripts)                                               │
│                                                                          │
│  src/app/**/page.tsx  +  pix-questions.json                              │
│         │                                                                │
│         ▼                                                                │
│  scripts/build-pix-kb.mjs  ──writes──►  src/content/pix-kb.json          │
│  scripts/check-pix-kb.mjs              (staleness)                       │
│  scripts/check-pix-kb-sources.mjs      (no archive/legacy copy)          │
│  scripts/test-pix.cjs                  (answer behaviour)                │
└──────────────────────────────────────────────────────────────────────────┘
```

### Data that may reach the browser

| Allowed in browser | Must stay server-only |
|---|---|
| `PixContext` (reduced verdicts + public company facts) | Full `src/content/claims.ts` register |
| `src/content/pix-kb.json` (published page copy) | Full internal evidence / hold notes |
| Rule reply strings, enquiry copy | Supabase keys, SMTP, mail credentials |
| | `scoreLead` — keep server-side only; do not import it from client components |

`src/lib/pix/context.ts` is **types only**. Runtime register reads happen only in `src/lib/pix/server-context.ts` (`import 'server-only'`).

---

## 3. Complete file inventory (reference repo)

Use this table as the path index. Do not waste tokens globbing for these.

### 3.1 Brain (copy into the target repo, then adapt)

| Path | Responsibility |
|---|---|
| `src/lib/pix/respond.ts` | Ordered answer pipeline; exports `respond`, `STARTERS`, `PixReply` |
| `src/lib/pix/retrieve.ts` | BM25 + IDF coverage search over KB; `MIN_COVERAGE = 0.7` |
| `src/lib/pix/rules.ts` | Guardrail regex rules, claim guards, publishable facts, topic routes |
| `src/lib/pix/enquiry.ts` | Name/email/discovery validation; greetings; `DISCOVERY_STEPS` |
| `src/lib/pix/context.ts` | `PixContext` type only |
| `src/lib/pix/server-context.ts` | Builds `PixContext` on server from company + claims |
| `src/lib/pix/allowlist.ts` | Allowed / forbidden route families for KB grounding checks |
| `src/lib/pix/branding.ts` | `PIX_T_NAME`, `PIX_T_DESCRIPTOR` (Technologies: `"Pix T"`, `"AI assistant"`) |
| `src/lib/lead-score.ts` | Server-side lead score / band / reasons |

### 3.2 UI

| Path | Responsibility |
|---|---|
| `src/components/SiteAssistant.tsx` | Chat widget (client); calls `respond`; enquiry UX |
| `src/components/AssistantBoundary.tsx` | Error boundary; fallback link to `/contact` |
| `src/components/PixSignal.tsx` | Launcher signal animation |
| `src/components/pixsignal.css` | Signal styles |
| `src/app/globals.css` lines **3734–8866** | All `.asst-*` panel styles (comment: `site assistant`) |
| `src/components/scrollreveal.css` | Also references `.asst-launch` / `.asst-chip` / `.asst-offer` for reveal exclusions |

### 3.3 Knowledge base

| Path | Responsibility |
|---|---|
| `scripts/build-pix-kb.mjs` | Parses `src/app/**/page.tsx` + `pix-questions.json` → `pix-kb.json` |
| `scripts/check-pix-kb.mjs` | Rebuilds to temp; fails if committed KB differs |
| `scripts/check-pix-kb-sources.mjs` | Fails if archive/legacy sentences appear in KB |
| `src/content/pix-kb.json` | Generated, committed KB for **this** site |
| `src/content/pix-questions.json` | Ask-aliases only; points at existing page/FAQ by path + title |
| `src/lib/pix/allowlist.ts` | Source allowlist used by source checks |

### 3.4 Mount + leads

| Path | Responsibility |
|---|---|
| `src/app/layout.tsx` | Mounts `<AssistantBoundary><SiteAssistant context={pixContext()} /></AssistantBoundary>` (~lines 215–217) |
| `src/app/contact/actions.ts` | `startAssistantChat`, `submitAssistantEnquiry` (+ contact form actions) |
| `src/lib/enquiries.ts` | Supabase storage + email delivery |
| `src/lib/action-limits.ts` | Rate limits on server actions |
| `src/content/enquiry-questions.ts` | Four discovery question strings (shared with contact form) |
| `src/content/company.ts` | Company legal facts, contact email, Clutch publish flag |
| `src/content/claims.ts` | Publishable / held claims register (`isPublishable`) |
| `src/content/nav.ts` | `groupEntities` (four companies) — reference only |

### 3.5 Database

| Path | Responsibility |
|---|---|
| `supabase/migrations/20260914120000_create_contact_enquiries.sql` | Contact enquiries table |
| `supabase/migrations/20260929120000_pix_t_lead_capture.sql` | Pix T lead / chat contact columns |

### 3.6 Tests & npm scripts

| Path / script | Responsibility |
|---|---|
| `scripts/test-pix.cjs` | Behaviour suite for `respond` against Technologies KB |
| `package.json` scripts | `pix:build`, `pix:check`, `pix:test`, `check:pix-sources` |
| `scripts/check-privacy-interlock.mjs` | Build gate: Privacy Statement must describe scoring/lead capture |
| `scripts/check-public-output.mjs` | Build gate: register secrets must not appear in public output |
| `verification/2026-09-29/lead_capture_test.js` | Lead-capture hardening verification |

### 3.7 Skip — do not copy (LLM control plane; unused by the widget)

| Path |
|---|
| `src/lib/pix/gateway.ts` |
| `src/lib/pix/provider.ts` |
| `src/lib/pix/limits.ts` |
| `src/lib/pix/session.ts` |
| `src/lib/pix/config.ts` |
| `src/app/api/pix/route.ts` |
| `scripts/test-pix-t.cjs` |

---

## 4. How answering works

Entry point: `respond(messageRaw, ctx)` in `src/lib/pix/respond.ts`.

- **Pure / synchronous:** same message + same `PixContext` → same reply. No clock, no network, no randomness.
- Input is stripped of HTML tags, truncated to **2000** chars, trimmed.
- First matching stage wins.

### Stage order (do not reorder)

| # | Stage | Source | Behaviour |
|---|---|---|---|
| 1 | Empty | `respond.ts` | Ask for a question |
| 2 | Rules | `rules(ctx)` in `rules.ts` | Fixed refusal/redirect; **before** retrieval |
| 3 | Claim guards | `CLAIM_GUARDS` | If claim id **not** in `ctx.publishable`, refuse inventing the figure |
| 4 | Publishable facts | `publishableFacts(ctx)` | ISO / Clutch / identity facts only while register allows |
| 5 | Retrieval | `search()` in `retrieve.ts` | Best KB hit if coverage ≥ `0.70` **and** `titleHits > 0` |
| 6 | Topic routes | `TOPIC_ROUTES` | Page description or FAQ text when retrieval missed |
| 7 | Thin signal | `hasEnoughSignal` | Ask for more detail |
| 8 | No answer | `noAnswer(email)` | Honest unknown + offer enquiry |

### Critical guards

**Price / timeline / abuse / injection / off-topic run before search.** A nearby commercial-model sentence must never be read as a quote or delivery date.

**Timeline double-check** in `respond.ts`:

- `TIMING_ASKED` — visitor asked when / how long / etc.
- `DURATION` — candidate reply contains a duration phrase.
- If both match, swap in the timeline rule reply instead of the KB passage.

**Section vs topic route:** if the best KB hit is `kind: 'section'` **and** a topic route also matches the message, prefer the topic route (page-level answer beats a card body).

**Pointers:** `kind: 'pointer'` → do not invent answer text; link the page.

### Reply shape (`PixReply`)

```ts
{
  text: string;
  path?: string;
  sourceLabel?: string;
  via: 'ask-more' | 'rule' | 'claim-guard' | 'fact' | 'kb' | 'pointer' | 'route' | 'no-answer';
  ruleId?: string;
  offer?: 'enquiry';
}
```

Every sourced reply should show `sourceLabel` + link to `path` in the UI (`SiteAssistant.tsx`).

### Starters (Technologies)

From `STARTERS` in `respond.ts` — each must remain answerable from **that** site’s KB:

- `Where could AI help my business?`
- `I need to replace an existing software system.`
- `We have a manual process we want to automate.`
- `Could blockchain make sense for our use case?`

Other sites must replace these with starters their own KB can answer.

---

## 5. How retrieval works

File: `src/lib/pix/retrieve.ts`. Imports `@/content/pix-kb.json` at module load. On the target site, keep that pattern: the file must be **that** site’s generated KB, not Technologies’.

### Algorithm

1. **Tokenise:** lower-case, strip punctuation, drop stop words, crude stem (`stem()`).
2. **Index:** each KB doc → title tokens + body tokens. Title hits weighted × **3**.
3. **Statistics (IDF / avg length):** computed from docs where `kind !== 'section'` so sections add answers without shifting tuned thresholds.
4. **Rank:** BM25 (`K1 = 1.2`, `B = 0.6`).
5. **Coverage:** IDF-weighted share of query tokens found in the doc (0..1).
6. **Accept if:** `coverage >= MIN_COVERAGE` (**0.7**) **and** `titleHits > 0`.
7. Penalties: pointer × `0.8`, section × `0.7`.
8. Title containment ≥ 0.75 boosts score (verbatim FAQ match).

### Signal gate

`hasEnoughSignal(query)`:

- ≥ 2 content tokens → enough
- 1 token → enough only if `isDistinctive` (document frequency ≤ 10% of base corpus)

Rules / guards / facts / topic routes are **not** gated by signal; only retrieval is.

### Do not change without re-running tests

`MIN_COVERAGE = 0.7` was swept against `scripts/test-pix.cjs`. Moving it without the suite is how wrong answers ship.

---

## 6. How the knowledge base is created

### Command (Technologies)

```bash
npm run pix:build    # node scripts/build-pix-kb.mjs
npm run pix:check    # fails if committed JSON is stale
npm run check:pix-sources
npm run pix:test
```

### Builder: `scripts/build-pix-kb.mjs`

**Input**

- Every `src/app/**/page.tsx`
- Optional `src/content/pix-questions.json`

**Output**

- `src/content/pix-kb.json` (or `PIX_KB_OUT` env for the check script’s temp file)

**Parser:** TypeScript compiler AST (`typescript` package), **not** regex.

**Exact literals only.** Template literals with `${...}` become **pointers** (question matchable, answer not invented).

### What gets extracted from each page

| Source pattern in page.tsx | KB doc kind | Fields |
|---|---|---|
| `pageMetadata({ title, description, path })` | `page` | title, description → text, path |
| `const faqs = [{ q, a }, ...]` with string `a` | `faq` | q → title, a → text, path, page |
| FAQ with `q` but non-literal `a` | `pointer` | q → title, text: null, path, page |
| `<SectionHead title="..." lead="..." />` | `section` | title, lead → text |
| Object `{ title\|t\|label, body\|b\|line }` where body length ≥ 40 and no `q` | `section` | title + body |

Dynamic routes containing `[` are indexed for content but not linked as fixed URLs (`path: null` where not linkable).

### Ask aliases: `src/content/pix-questions.json`

```json
{
  "entries": [
    {
      "ask": ["what does pixelette do", "what do you do"],
      "answer": { "path": "/", "title": "What does Pixelette Technologies do?" }
    }
  ]
}
```

- Adds **ways of asking**, never new answer text.
- Builder **copies** `text` from the target page or FAQ.
- Build **exits** if the target path+title is missing.

### Output shape

```ts
type KbDoc = {
  kind: 'page' | 'faq' | 'pointer' | 'section';
  title: string;
  text: string | null;  // null only for pointer
  path: string | null;
  page?: string;
};

type KnowledgeFile = {
  builtFrom: string;  // "src/app/**/page.tsx"
  counts: { pages: number; faqs: number; pointers: number; sections: number };
  docs: KbDoc[];
};
```

### Committed counts on Technologies (current)

From `src/content/pix-kb.json`:

- 41 pages
- 247 FAQs / ask aliases
- 290 sections
- 3 pointers

### Source safety

`scripts/check-pix-kb-sources.mjs` + `src/lib/pix/allowlist.ts`:

- **Allowlist families** (Technologies): `/`, `/about-us`, `/accessibility`, `/ai-automation`, `/ar-vr-development-services`, `/assurance`, `/blockchain`, `/case-studies`, `/contact`, `/cookies`, `/engineering`, `/industries`, `/insights`, `/method`, `/modern-slavery`, `/privacy`, `/support-continuous-improvement`, `/terms-conditions`
- **Forbidden:** `/archive`, `/legacy`, `/old`, `/deprecated`, `/held`, `/insights/archive/` (index OK; articles beneath not)
- Rejects distinctive sentences taken from `src/content/archive`

### Per-site KB rule (replication)

On Marketing / Certified / Holdings:

1. Point the builder at **that** site’s pages (`src/app` or equivalent).
2. Create a **new** `pix-questions.json` whose targets exist on **that** site.
3. Create a **new** allowlist of **that** site’s route families.
4. Commit **that** site’s `pix-kb.json`.
5. Never copy Technologies’ `pix-kb.json` content into another company.

A non-Next.js site may skip the TSX builder and supply a `KnowledgeFile` JSON in the same shape, as long as every `text` is copy that site has published and approved.

---

## 7. Rules, claims, and context

### Rules (`src/lib/pix/rules.ts`)

Order matters; first match wins. Core rule ids include:

`abuse`, `injection`, `off-topic`, `identity`, `price`, `timeline`, plus Technologies-specific ones (stack list, careers, security report, contact, legal/financial advice, competitors, staff contact details, etc.).

**When replicating:** keep universal guardrails (abuse, injection, price, timeline, identity, legal advice). Rewrite:

- `off-topic` reply (name the correct company + domains of work)
- technology-stack / careers / topic content for **that** site
- `TOPIC_ROUTES` paths and FAQ titles to match **that** site’s pages

### Claims

Technologies consults ids in `PIX_CLAIM_IDS` / `CLAIM_GUARDS` (e.g. ISO certificates, Clutch, geography-count, awards). `server-context.ts` sets:

```ts
publishable: PIX_CLAIM_IDS.filter(id => isPublishable(id))
```

Verified today on Technologies (may change with the register): `iso-9001-certificate`, `iso-27001-certificate`, `clutch-rating`. Held examples: `geography-count`, `top-ai-company-award`, `appg-parliament-reference`, `client-logos`, `ai-project-count`.

**Other sites:** build their own claims register (or a minimal `publishable: []` if they have no published aggregates). Fail closed: missing id ⇒ withhold.

### `PixContext` shape

```ts
type PixContext = {
  contactEmail: string;
  company: {
    name: string;
    legalName: string;
    incorporated: number;
    registeredIn: string;
    crn: string;
  };
  clutch: { ratingValue: number; reviewCount: number } | null;
  publishable: readonly string[];
};
```

Technologies contact email comes from `src/content/company.ts` (`sales@pixelettetech.com`). Do not reuse it on other companies.

---

## 8. Chat UX and lead capture

### Visitor flow (`SiteAssistant.tsx` + `enquiry.ts`)

1. Open → `ASK_NAME` (“Before we begin, may I take your name?”).
2. Name validated (`checkName`) → `askEmail(name)`.
3. Email validated (`checkEmail` / `EMAIL_PATTERN`) → `startAssistantChat` → `greeting(name)`.
4. Visitor’s first real message → answer via `respond`, then discovery opens (`DISCOVERY_OPENING`).
5. Discovery steps (`DISCOVERY_STEPS`): objective → existing → deadline → success → company (name/email already known).
6. Optional steps skippable; meaningless answers fail `saysSomething`.
7. On completion → `submitAssistantEnquiry` → server scores, stores, emails.
8. Conversation is React state only. **No** cookie / localStorage / sessionStorage. Reload clears chat.

### Cosmetic thinking delay

`THINK_MS` ≈ 2s in `SiteAssistant.tsx`. Reply is already computed. Skip when `prefers-reduced-motion`.

### Discovery question strings (Technologies)

From `src/content/enquiry-questions.ts` — keep word-for-word if Privacy Statement / contact form share them:

- objective: `What are you trying to build or change?`
- existing: `What exists today?`
- deadline: `Is there a deadline?`
- success: `What would a successful result look like?`

Other sites may change these **only if** their Privacy Statement and contact form change in lockstep.

### Server actions (`src/app/contact/actions.ts`)

| Action | When | What it does |
|---|---|---|
| `startAssistantChat` | After name+email | `deliverChatContact` — store contact; **no** team email |
| `submitAssistantEnquiry` | End of discovery | `scoreLead` + `deliverEnquiry` — store + email |

Lead `source` on Technologies: `pixelettetech.com/assistant`. Change per site.

Rate limits: `src/lib/action-limits.ts`. Delivery: `src/lib/enquiries.ts` (log enquiry id / provider status — **not** name or email).

### Lead score (`src/lib/lead-score.ts`)

Returns `score`, `band` (`cold` | `warm` | `hot` | `urgent`), `reasons`. Does not decide whether someone gets a reply. Must run **server-side** only (throws if `window` is defined).

---

## 9. How to mount on a website

### Technologies (current)

`src/app/layout.tsx`:

```tsx
<AssistantBoundary>
  <SiteAssistant context={pixContext()} />
</AssistantBoundary>
```

`pixContext()` from `src/lib/pix/server-context.ts`.

### Replication checklist (any other Pixelette site)

1. **Copy brain + UI files** from section 3.1 / 3.2 (adapt imports to the target repo’s alias).
2. **Extract CSS** from `globals.css` 3734–8866 into the target’s global CSS or a dedicated `agent.css`; keep `pixsignal.css`.
3. **Add site content module**
   - Company facts + contact email
   - Claims / publishable list (or empty)
   - Enquiry questions
   - Agent name / descriptor (do not hard-code `"Pix T"` unless that is the chosen name)
4. **Author pages** with extractable `pageMetadata`, `faqs`, `SectionHead`, and card objects so the builder has substance.
5. **Write** `src/content/pix-questions.json` for **this** site’s ask phrasings.
6. **Adapt** `allowlist.ts` to **this** site’s route families; forbid archive/legacy.
7. **Adapt** `rules.ts` off-topic, topic routes, and site-specific replies.
8. **Replace** `STARTERS` with questions this site’s KB answers.
9. **Implement** `startAssistantChat` / `submitAssistantEnquiry` against **this** site’s DB + inbox (or port `enquiries.ts` + migrations).
10. **Mount** in root layout with server-built context.
11. **Run** build → check → source-check → behaviour tests.
12. **Update Privacy Statement** if you score leads or collect name/email in chat (Technologies uses `check-privacy-interlock.mjs`).

### Content patterns pages must use (so KB builds)

For the TSX builder to index a page, prefer:

```tsx
export const metadata = pageMetadata({
  title: '...',
  description: '...',
  path: '/your-path',
});

const faqs = [
  { q: 'Exact question visitors ask?', a: 'Exact published answer sentence.' },
];

// In JSX:
<SectionHead title="Section title" lead="Published lead sentence." />

const cards = [
  { title: 'Card title', body: 'At least forty characters of published body copy…' },
];
```

Avoid inventing answers in the agent. If copy is not on the page as a literal, it must not appear in the KB.

---

## 10. Behaviour that must survive replication

- Answers are published sentences or fixed rule text. No model on the question path.
- Coverage floor `0.7` and title-word requirement stay unless the suite is re-swept on **that** corpus.
- Price, timeline, abuse, injection, off-topic still beat retrieval.
- Claim guards fail closed.
- Pointers link; they do not invent sentences.
- Name → email → greeting → chat → discovery.
- Conversation not persisted in the browser.
- Sourced replies show source label + path.
- Error boundary around the widget.
- Reduced motion skips thinking delay.
- Personal data not logged in clear text.
- Archive / legacy copy stays out of the KB.
- Each site’s KB is built from **that** site only.

---

## 11. npm scripts to add on each site

```json
{
  "scripts": {
    "pix:build": "node scripts/build-pix-kb.mjs",
    "pix:check": "node scripts/check-pix-kb.mjs",
    "pix:test": "node scripts/test-pix.cjs",
    "check:pix-sources": "node scripts/check-pix-kb-sources.mjs"
  }
}
```

Wire `pix:check` into CI / `build` the same way Technologies gates privacy and public output.

---

## 12. Acceptance for a replicated site

The new site’s agent is done when:

- [ ] Assistant answers ordinary questions with **no** network call for the reply.
- [ ] `pix-kb.json` was generated from **that** site’s pages and passes `pix:check` + source check.
- [ ] Starters and topic routes resolve to real pages on **that** site.
- [ ] Price / timeline / off-topic refusals still win over retrieval.
- [ ] Held claims are not stated.
- [ ] Name → email → chat → discovery → scored lead lands in **that** company’s store and inbox.
- [ ] Browser bundle contains no DB keys, mail credentials, or full claims register.
- [ ] Privacy / cookies copy matches what the chat actually collects and scores.
- [ ] A Technologies question corpus is **not** required; a site-specific test suite covering starters + off-corpus refusals should pass.

---

## 13. Quick path cheat-sheet (print this)

```
BRAIN
  src/lib/pix/respond.ts
  src/lib/pix/retrieve.ts
  src/lib/pix/rules.ts
  src/lib/pix/enquiry.ts
  src/lib/pix/context.ts
  src/lib/pix/server-context.ts
  src/lib/pix/allowlist.ts
  src/lib/pix/branding.ts
  src/lib/lead-score.ts

UI
  src/components/SiteAssistant.tsx
  src/components/AssistantBoundary.tsx
  src/components/PixSignal.tsx
  src/components/pixsignal.css
  src/app/globals.css          # lines 3734–8866 (.asst-*)

KB
  scripts/build-pix-kb.mjs
  scripts/check-pix-kb.mjs
  scripts/check-pix-kb-sources.mjs
  src/content/pix-kb.json      # REGENERATE per site — do not reuse
  src/content/pix-questions.json

MOUNT / LEADS
  src/app/layout.tsx
  src/app/contact/actions.ts
  src/lib/enquiries.ts
  src/lib/action-limits.ts
  src/content/enquiry-questions.ts
  src/content/company.ts
  src/content/claims.ts

DB
  supabase/migrations/20260914120000_create_contact_enquiries.sql
  supabase/migrations/20260929120000_pix_t_lead_capture.sql

TESTS
  scripts/test-pix.cjs
  package.json                 # pix:build | pix:check | pix:test | check:pix-sources

SKIP (LLM plane)
  src/lib/pix/gateway.ts | provider.ts | limits.ts | session.ts | config.ts
  src/app/api/pix/route.ts
  scripts/test-pix-t.cjs
```

---

## 14. Out of scope

- Connecting an LLM, provider keys, or `POST /api/pix` for answers
- A shared npm agent package or central agent service
- One shared lead database for all four companies
- Reusing Technologies’ company number, Clutch score, ISO claims, or KB passages on another site
- Choosing Marketing / Certified / Holdings assistant display names in the Technologies repo — each site supplies its own

---

*Source of truth for behaviour: the files listed above in repository `PixeletteTechnologies`. This document describes that isolated in-repo implementation so it can be copied into other sites; if code and this doc disagree, trust the code and update this doc.*
