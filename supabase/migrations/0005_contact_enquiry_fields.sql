-- Extend contact_submissions for the redesigned enquiry form.
--
-- PURELY ADDITIVE, and that property is what makes "migrate first, deploy
-- second" safe. Every new column is nullable or defaulted, so the PREVIOUS
-- version of /api/contact continues to insert successfully against this schema.
--
-- That matters more than it looks. The insert in the route is best-effort: a
-- failure is logged and the request continues so the enquiry still reaches the
-- team by email. Deploying code before this migration would therefore produce a
-- SILENT data-loss window - emails going out, nothing recorded, and nobody
-- noticing until someone queries the table.
--
-- Legacy columns are kept and kept populated rather than renamed:
--   name     still written as first_name || ' ' || last_name, so the not-null
--            constraint holds and existing reporting keeps working.
--   message  still the free-text body; it now carries "What have you been asked
--            to prove?".
--   service  now carries the enquiry-reason label.
--   country  deprecated in favour of jurisdiction. Left null on new rows.

alter table public.contact_submissions
  -- Identity
  add column if not exists first_name text,
  add column if not exists last_name text,

  -- Qualification
  add column if not exists enquiry_reason text
    check (enquiry_reason in (
      'tender-requirement', 'security-questionnaire', 'iso-certification',
      'soc-2', 'ai-governance', 'vciso', 'privacy-vdpo',
      'maintain-certification', 'other')),
  add column if not exists organisation_size text
    check (organisation_size in ('1-25', '26-100', '101-500', '501-2000', '2000-plus')),
  add column if not exists jurisdiction text
    check (jurisdiction in ('uk', 'eu', 'us', 'gcc', 'multi-region', 'other')),
  add column if not exists deadline date,
  add column if not exists no_fixed_deadline boolean not null default false,

  -- Marketing consent, recorded SEPARATELY from the privacy consent above.
  -- Bundling the two is what the brief's "kept separate" requirement exists to
  -- prevent, and separate columns are what make that auditable.
  add column if not exists marketing_opt_in boolean not null default false,
  add column if not exists marketing_consent_text text,
  add column if not exists marketing_consent_timestamp timestamptz,

  -- Optional uploaded requirement document, held in a private Storage bucket.
  add column if not exists attachment_bucket text,
  add column if not exists attachment_path text,
  add column if not exists attachment_filename text,
  add column if not exists attachment_mime text,
  add column if not exists attachment_size_bytes integer,
  add column if not exists attachment_sha256 text;

-- A deadline and "no fixed deadline" are mutually exclusive.
-- Postgres has no "add constraint if not exists", so this is guarded to keep
-- the migration re-runnable.
do $$
begin
  alter table public.contact_submissions
    add constraint contact_submissions_deadline_ck
    check (deadline is null or no_fixed_deadline = false);
exception
  when duplicate_object then null;
end $$;

create index if not exists contact_submissions_enquiry_reason_idx
  on public.contact_submissions(enquiry_reason)
  where enquiry_reason is not null;

create index if not exists contact_submissions_deadline_idx
  on public.contact_submissions(deadline)
  where deadline is not null;

-- Partial index supporting the 24-month attachment purge: find the rows that
-- still own an object without scanning every enquiry ever received.
create index if not exists contact_submissions_attachment_idx
  on public.contact_submissions(created_at)
  where attachment_path is not null;

comment on column public.contact_submissions.name is
  'Legacy full name. Still populated as first_name || '' '' || last_name so the not-null constraint and existing reporting continue to hold.';
comment on column public.contact_submissions.message is
  'Free text. Since 0005 this carries "What have you been asked to prove?".';
comment on column public.contact_submissions.service is
  'Enquiry reason LABEL, human-readable. The stable slug is in enquiry_reason.';
comment on column public.contact_submissions.country is
  'DEPRECATED since 0005. Superseded by jurisdiction. Null on new rows.';
comment on column public.contact_submissions.enquiry_reason is
  'Stable slug from ENQUIRY_REASONS in src/lib/contact/constants.ts. Changing a slug there requires a migration; changing its display label does not.';
comment on column public.contact_submissions.deadline is
  'Requested deadline. Null when the enquirer has no fixed deadline.';
comment on column public.contact_submissions.marketing_consent_text is
  'Verbatim marketing opt-in statement. Null when marketing_opt_in is false: storing the wording for a consent that was not given would misrepresent the record.';
comment on column public.contact_submissions.attachment_path is
  'Object key inside the private attachments bucket. Retained for 24 months in line with CONSENT_NOTICE, then purged with the row.';
comment on column public.contact_submissions.attachment_sha256 is
  'Content hash of the stored file. Lets a duplicate or altered submission be identified without re-downloading the object.';
