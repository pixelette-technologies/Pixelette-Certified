@AGENTS.md

## Pix C: site assistant

Pix C is the isolated in-codebase site assistant for pixelettecertified.com. It answers from published page copy only (no LLM on the question path). Spec: `docs/PIX-AGENT-BUILD.md`. Persistent agent rule: `.cursor/rules/pix-c-assistant.mdc`.

### Architecture

- Brain: `src/lib/pix/` (`respond`, `retrieve`, `rules`, `enquiry`)
- UI: `SiteAssistant`, `AssistantBoundary`, `PixSignal` + `assistant.css` / `pixsignal.css` (Certified petrol/teal)
- KB: `scripts/build-pix-kb.mjs` → `src/content/pix-kb.json` (this site only)
- Leads: `src/app/contact/actions.ts` → `src/lib/enquiries.ts` (server-side `scoreLead` only)
- Mount: root `layout.tsx` with `pixContext()`

### Coding standards

- TypeScript with strict typing
- No emoji, no exclamation marks in any user-facing text
- UK English spelling throughout
- Certified brand colours (petrol / teal), not Technologies purple
- Never expose API keys to the frontend
- Never log secrets or API keys
- Conversation is React state only (no cookie / localStorage / sessionStorage for chat)

### Scope

Governance, assurance, privacy and compliance readiness. Fail closed on claims. Never reuse Technologies’ `pix-kb.json`.

### Scripts

`npm run pix:build` → `pix:check` → `check:pix-sources` → `pix:test`

### Supabase

Org **PIXELETTE**, project **Pixelette Certified** (`ykhctxgdtujepqimkeus`, `eu-west-2`). Contact + Pix C migrations applied. Point Vercel at this project’s URL and service role key. Alice’s old schema is retired with the Alice code. Vault: `docs/Pix-C-and-Supabase-Cutover-2026-10-12.md`.
