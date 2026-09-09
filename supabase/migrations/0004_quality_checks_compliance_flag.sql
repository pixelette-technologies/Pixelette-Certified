-- Add compliance-verdict columns to quality_checks.
--
-- The Verified Website Replacement brief (8 September 2026) bans a set of
-- accreditation and performance claims outright. Alice's post-conversation
-- quality judge now returns a COMPLIANCE verdict alongside its commercial
-- SCORE, because a conversation can be commercially excellent and still contain
-- a claim that must never have been made. Storing the two separately keeps the
-- compliance signal from being averaged away by a good sales score.
--
-- Additive and idempotent: the previous version of qualityCheck.ts writes
-- neither column and continues to insert successfully against this schema.
alter table public.quality_checks
  add column if not exists compliance_passed boolean,
  add column if not exists compliance_breaches text;

-- Partial index: the only query that matters is "show me the failures", and
-- failures are expected to be rare, so indexing the whole column would be waste.
create index if not exists idx_quality_checks_compliance_failed
  on public.quality_checks(created_at desc)
  where compliance_passed = false;

comment on column public.quality_checks.compliance_passed is
  'False when the judge found a banned claim (accreditation, performance statistic, completion time, case study, withdrawn service, or a credential attached to a named individual). Null for rows written before this check existed, which is NOT the same as passing.';
comment on column public.quality_checks.compliance_breaches is
  'Verbatim offending sentences quoted by the judge, separated by " | ". Null when the conversation was clean.';
