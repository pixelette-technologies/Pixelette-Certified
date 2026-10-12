import { Resend } from "resend";

/*
 * One Resend client, created on first use rather than at module load. The
 * Resend constructor throws when RESEND_API_KEY is absent, and a module-level
 * `new Resend()` therefore failed `next build` while it collected page data for
 * every route that imported one, whether or not an email was ever sent.
 */
let client: Resend | null = null;

export function getResend(): Resend {
  client ??= new Resend(process.env.RESEND_API_KEY);
  return client;
}
