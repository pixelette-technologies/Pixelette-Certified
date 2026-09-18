// Supabase client and database helpers - conversation storage and lead management
//
// WARNING: getSupabaseServer() uses the service role key and bypasses Row Level Security.
// It must NEVER be imported or used from client components — only from API routes.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

// Server client factory — bypasses RLS, API routes only.
//
// Clients are created on call, never at module load. An eagerly created
// client (the unused `supabaseBrowser` that used to live here) throws on
// import whenever the env vars are absent, which fails `next build` while it
// collects page data for every API route that imports this file.
export function getSupabaseServer(): SupabaseClient {
  return createClient(
    requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requireEnv("SUPABASE_SERVICE_ROLE_KEY")
  );
}
