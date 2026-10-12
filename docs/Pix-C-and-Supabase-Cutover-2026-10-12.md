# Pix C and Supabase cutover: implementation record

Alice (LLM chat) is replaced by **Pix C**, the in-codebase site assistant. Production Supabase is the new org **PIXELETTE**, project **Pixelette Certified** (`ykhctxgdtujepqimkeus`, region `eu-west-2`).

- **Status:** implemented and verified locally (contact form + Pix C lead paths). Deployment still gated by the remaining items in [[Strategic-Rebuild-Implementation-2026-09-25#Before this can go live]], plus Vercel env pointed at the new project.
- **Spec:** [[PIX-AGENT-BUILD]]

---

## What changed

### Assistant

- No LLM on the question path. Answers come from `respond()` + this site’s `src/content/pix-kb.json` only (`MIN_COVERAGE = 0.7`).
- UI: `SiteAssistant`, `AssistantBoundary`, `PixSignal` (Certified petrol / teal).
- Chat is React state only (no cookie / localStorage / sessionStorage).
- Lead capture: name and email → `assistant_contacts`; completed enquiry → `contact_enquiries` with server-side `scoreLead`.
- Scripts: `pix:build`, `pix:check`, `check:pix-sources`, `pix:test` (wired into `build` / `verify`).

### Alice removed

- Deleted Alice UI, `/api/chat`, Alice cron and test routes, and `src/lib/alice/*`.
- Deleted unused Alice migrations: `0001_clara_schema`, `0002_quality_checks_visitor_rating`, `0004_quality_checks_compliance_flag`.

### Supabase (new project)

Applied manually via MCP to `ykhctxgdtujepqimkeus` (not auto on Vercel deploy):

| Migration | Purpose |
|---|---|
| `0003`–`0007` | `contact_submissions` + attachment bucket |
| `20260914120000_create_contact_enquiries` | `contact_enquiries` (insert-only `service_role`) |
| `20260929120000_pix_t_lead_capture` | lead columns + `assistant_contacts` |
| `harden_contact_submissions_grants` | revoke `anon` / `authenticated` on `contact_submissions` |

Local `.env` uses `NEXT_PUBLIC_SUPABASE_URL=https://ykhctxgdtujepqimkeus.supabase.co` and the project service role key (never committed). `.env.example` documents the URL and placeholders only.

### What each path stores

| Surface | Destination |
|---|---|
| `/contact` → `POST /api/contact` | `contact_submissions` (+ optional `contact-attachments`) |
| Pix C identity | `assistant_contacts` |
| Pix C enquiry | `contact_enquiries` (with `lead_*`) |

Local verification: contact form (with Turnstile disabled or real keys), Pix C identity-only, and Pix C full enquiry all wrote rows as expected.

---

## Before production

1. Set Vercel env to the new project URL and service role key (plus Resend, Turnstile, `CRON_SECRET` as required).
2. Re-enable Turnstile in production (`CONTACT_TURNSTILE_ENABLED=true` with real Cloudflare keys). Local testing may leave it false.
3. Remaining go-live items in [[Strategic-Rebuild-Implementation-2026-09-25#Before this can go live]] (legal entity, privacy review, etc.) are unchanged by this cutover.

## Related

- [[Strategic-Rebuild-Implementation-2026-09-25]]
- [[Website-Replacement-Implementation-2026-09-09]]
- [[PIX-AGENT-BUILD]]
