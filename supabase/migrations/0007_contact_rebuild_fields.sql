-- Contact form fields for the 25 September 2026 rebuild (specification §33).
--
-- The form now asks three structured questions: what the organisation is
-- working towards, where the requirement applies, and what prompted it. It adds
-- an optional role and drops phone, organisation size and deadline.
--
-- REQUIRES 0005. Apply 0005, 0006 and then this migration, in order, before the
-- code that writes these columns is deployed.
--
-- ADDITIVE AND BACKWARD COMPATIBLE:
--   * Two new nullable columns.
--   * The enquiry_reason and jurisdiction CHECK constraints are REPLACED with
--     constraints that accept both the old slugs and the new ones, so rows
--     written by earlier form versions remain valid and the previous route can
--     still insert.
--   * Nothing is dropped. phone, organisation_size, deadline and
--     no_fixed_deadline stay; new rows simply leave them null or default.

alter table public.contact_submissions
  add column if not exists requirement_trigger text
    check (requirement_trigger in (
      'customer-procurement', 'regulatory-obligation', 'certification-audit',
      'investor-due-diligence', 'internal-governance', 'other')),
  add column if not exists job_role text;

-- The inline CHECKs added in 0005 received Postgres's default names.
alter table public.contact_submissions
  drop constraint if exists contact_submissions_enquiry_reason_check,
  drop constraint if exists contact_submissions_jurisdiction_check;

alter table public.contact_submissions
  add constraint contact_submissions_enquiry_reason_check
    check (enquiry_reason in (
      -- current (§33)
      'iso-27001', 'ai-governance', 'soc-2', 'cyber-assurance', 'privacy',
      'vciso-grc', 'cyber-essentials', 'business-continuity', 'gcc-regulatory',
      'other', 'not-sure',
      -- legacy (0005), retained so existing rows stay valid
      'tender-requirement', 'security-questionnaire', 'iso-certification',
      'vciso', 'privacy-vdpo', 'maintain-certification')),
  add constraint contact_submissions_jurisdiction_check
    check (jurisdiction in (
      -- current (§33)
      'uk', 'us', 'saudi-arabia', 'uae', 'qatar', 'other',
      -- legacy (0005)
      'eu', 'gcc', 'multi-region'));

create index if not exists contact_submissions_requirement_trigger_idx
  on public.contact_submissions(requirement_trigger)
  where requirement_trigger is not null;

comment on column public.contact_submissions.requirement_trigger is
  'Stable slug from REQUIREMENT_TRIGGERS in src/lib/contact/constants.ts ("What has prompted the requirement?").';
comment on column public.contact_submissions.job_role is
  'Optional role or job title given by the enquirer.';
comment on column public.contact_submissions.message is
  'Free text. Since 0007 this carries the enquirer''s description of the requirement.';
