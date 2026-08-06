-- Contact form submissions with consent audit trail
-- One row per contact-form enquiry. Stores the enquiry plus a record of the
-- consent that was given (statement wording, policy version, timestamp) so we
-- can demonstrate consent under UK GDPR Article 7(1).
--
-- Deliberately does NOT store the visitor's IP address (privacy-minimising).
-- RLS is enabled with no policies, so only the service role key can read/write.

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- Enquiry fields
  name text not null,
  email text not null,
  company text,
  phone text,
  country text,
  service text,
  message text not null,

  -- Consent audit trail
  consent_given boolean not null,
  consent_text text not null,
  privacy_policy_version text not null,
  consent_timestamp timestamptz not null,

  -- Provenance / anti-abuse metadata
  source text not null default 'contact_form',
  user_agent text,
  turnstile_verified boolean not null default false
);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions(created_at desc);
create index if not exists contact_submissions_email_idx
  on public.contact_submissions(email);

comment on table public.contact_submissions is
  'Contact-form enquiries with a consent audit trail (UK GDPR Art. 7(1)). No IP stored.';
comment on column public.contact_submissions.consent_text is
  'Verbatim consent statement the visitor agreed to at submission time.';
comment on column public.contact_submissions.privacy_policy_version is
  'Effective date of the Privacy Policy in force when consent was given.';
comment on column public.contact_submissions.consent_timestamp is
  'Server timestamp at which consent was recorded.';

-- ============================================================================
-- Row Level Security: enabled, no policies. Only the service role key (used by
-- the /api/contact route) can access this table. The publishable/anon key
-- cannot read or write it. Consistent with the leads/conversations tables.
-- ============================================================================
alter table public.contact_submissions enable row level security;
