-- Clara database schema - initial migration
-- Creates leads, conversations, quality_checks, and questions_log tables
-- All tables have Row Level Security enabled. Service role bypasses RLS.

-- ============================================================================
-- Table: leads
-- One row per lead (unique visitor who provided at least basic contact info)
-- ============================================================================
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- Captured contact fields
  name text,
  email text,
  phone text,
  company text,
  website text,
  industry text,
  country text,
  team_size text,

  -- Certification context
  existing_certifications text,
  certification_interest text,
  urgency text,
  tender_pressure text,
  preferred_contact text,

  -- Lead intelligence
  score integer not null default 0,
  classification text not null default 'cold'
    check (classification in ('cold', 'warm', 'hot', 'urgent')),
  summary text,

  -- Sales team workflow
  status text not null default 'new'
    check (status in (
      'new', 'in_progress', 'contacted', 'qualified',
      'proposal_sent', 'gap_analysis_booked',
      'closed_won', 'closed_lost', 'on_hold', 'duplicate'
    )),
  notes text,

  -- Language and session tracking
  language text default 'en',
  session_id text,
  is_duplicate boolean not null default false,
  duplicate_of uuid references public.leads(id) on delete set null
);

create index if not exists leads_email_idx on public.leads(email);
create index if not exists leads_created_at_idx on public.leads(created_at desc);
create index if not exists leads_classification_idx on public.leads(classification);
create index if not exists leads_status_idx on public.leads(status);
create index if not exists leads_session_id_idx on public.leads(session_id);

-- ============================================================================
-- Table: conversations
-- One row per conversation. Messages stored as JSONB array.
-- ============================================================================
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete cascade,
  session_id text not null,

  started_at timestamptz not null default now(),
  ended_at timestamptz,
  last_message_at timestamptz not null default now(),

  messages jsonb not null default '[]'::jsonb,
  message_count integer not null default 0,

  language text default 'en',
  page_url text,
  user_agent text,
  ip_hash text
);

create index if not exists conversations_lead_id_idx on public.conversations(lead_id);
create index if not exists conversations_session_id_idx on public.conversations(session_id);
create index if not exists conversations_started_at_idx on public.conversations(started_at desc);
create index if not exists conversations_last_message_at_idx on public.conversations(last_message_at desc);

-- ============================================================================
-- Table: quality_checks
-- One row per ended conversation with Clara's self-assessed quality rating
-- ============================================================================
create table if not exists public.quality_checks (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  created_at timestamptz not null default now(),

  rating integer not null check (rating between 1 and 10),
  notes text,
  issues_detected text[]
);

create index if not exists quality_checks_conversation_id_idx on public.quality_checks(conversation_id);
create index if not exists quality_checks_created_at_idx on public.quality_checks(created_at desc);
create index if not exists quality_checks_rating_idx on public.quality_checks(rating);

-- ============================================================================
-- Table: questions_log
-- Anonymised log of questions visitors asked, for weekly review
-- ============================================================================
create table if not exists public.questions_log (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references public.conversations(id) on delete set null,
  created_at timestamptz not null default now(),

  question text not null,
  topic text,
  language text default 'en'
);

create index if not exists questions_log_created_at_idx on public.questions_log(created_at desc);
create index if not exists questions_log_topic_idx on public.questions_log(topic);

-- ============================================================================
-- Updated_at trigger for leads table
-- ============================================================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
  before update on public.leads
  for each row
  execute function public.set_updated_at();

-- ============================================================================
-- Row Level Security
-- All tables: RLS enabled, no public policies.
-- Service role bypasses RLS automatically, so Clara's backend can read/write.
-- Browser client (publishable key) cannot access these tables without policies.
-- This is deliberate: all Clara data is server-only.
-- ============================================================================
alter table public.leads enable row level security;
alter table public.conversations enable row level security;
alter table public.quality_checks enable row level security;
alter table public.questions_log enable row level security;

-- No policies are created. Without policies, RLS blocks all access from the
-- publishable/anon key. Only the service role key can read or write these tables.
