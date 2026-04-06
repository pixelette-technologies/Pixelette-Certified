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

// Browser client — safe for React components, respects RLS
export const supabaseBrowser: SupabaseClient = createClient(
  requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
  requireEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY")
);

// Server client factory — bypasses RLS, API routes only
export function getSupabaseServer(): SupabaseClient {
  return createClient(
    requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requireEnv("SUPABASE_SERVICE_ROLE_KEY")
  );
}
