-- Add visitor rating columns to quality_checks table
alter table public.quality_checks
  add column if not exists visitor_rating text check (visitor_rating in ('helpful', 'not_helpful')),
  add column if not exists visitor_rated_at timestamptz;

create index if not exists idx_quality_checks_visitor_rating
  on public.quality_checks(visitor_rating)
  where visitor_rating is not null;

comment on column public.quality_checks.visitor_rating is 'Visitor-submitted rating: helpful or not_helpful. Null if visitor did not rate.';
comment on column public.quality_checks.visitor_rated_at is 'Timestamp when the visitor submitted their rating.';
