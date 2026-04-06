@AGENTS.md

## Clara: AI Accreditation Advisor

Clara is an AI-powered chatbot embedded on pixelettecertified.com. She acts as an expert accreditation consultant, elite salesperson, and lead qualification engine in a single conversation. She is powered by the Anthropic Claude API.

### Architecture

Clara lives inside this Next.js project to keep deployment simple and avoid CORS issues.

- Backend: API routes under src/app/api/chat and related endpoints
- Frontend: React components under src/components/clara
- Logic: helpers, prompts, and integrations under src/lib/clara
- Database: Supabase (added in a later phase)
- Notifications: Resend for admin emails, Slack webhooks, Google Sheets

### Coding Standards for Clara

- TypeScript with strict typing
- No emoji, no exclamation marks in any user-facing text
- UK English spelling throughout
- Use the existing Pixelette brand colours (navy, gold, teal)
- Font: Plus Jakarta Sans where applicable
- Short, punchy response discipline (default 2-4 sentences)
- Never expose API keys to the frontend
- Never log secrets or API keys

### Clara Personality

Warm, confident, expert, persuasive, calm. Never robotic, scripted, or pushy. Adapts technical depth to match the visitor. Explains in plain English by default. Always moves conversations toward the free 30-minute gap analysis call at pixelettecertified.com/contact.

### Key Data Sources

Clara's knowledge base comes from pixelettecertified.com. Published pricing, case studies, and team credentials are embedded in her system prompt. See src/lib/clara/systemPrompt.ts (to be implemented) for the full prompt.

### Current Development Phase

Setup phase. Installing dependencies, creating folder structure, adding environment variables. No functional code yet.
