-- Match the belt-and-braces posture used by contact_enquiries / assistant_contacts.
-- RLS with no policies already denies row access; revoking privileges removes the grants too.
revoke all on table public.contact_submissions from public;
revoke all on table public.contact_submissions from anon;
revoke all on table public.contact_submissions from authenticated;

-- Contact route inserts; cron purge selects / updates / deletes attachment metadata.
-- service_role keeps full table access (BYPASSRLS).
grant select, insert, update, delete on table public.contact_submissions to service_role;
