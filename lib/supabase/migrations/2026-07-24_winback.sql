-- Winback email sequence (2026-07-24).
--
-- Three tables:
--   winback_templates  admin-edited copies of the sequence emails. One row per
--                      step (1..4). If no row exists for a step, the code
--                      fallback template is shown in the admin UI but the step
--                      does NOT send (a step only sends when a row exists AND
--                      enabled = true). So nothing sends until an admin
--                      explicitly saves + enables a step.
--   winback_sends      one row per (case, step) actually emailed. The unique
--                      constraint is the idempotency guard: re-running the cron
--                      can never double-send a step to the same case.
--   email_optouts      unsubscribe list, keyed by lowercased email. Checked by
--                      the winback engine before every send. CAN-SPAM.
--
-- Safe to re-run (idempotent): all statements use IF NOT EXISTS / ON CONFLICT.
-- RLS is enabled with no policies: only the service-role key (crons, admin
-- API routes) can touch these tables.
--
-- Applied: 2026-07-24 via Supabase Management API.

create table if not exists winback_templates (
  step integer primary key,
  delay_days integer not null,
  subject text not null,
  body_html text not null,
  enabled boolean not null default false,
  updated_at timestamptz not null default now()
);

create table if not exists winback_sends (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases(id) on delete cascade,
  step integer not null,
  email text not null,
  sent_at timestamptz not null default now(),
  unique (case_id, step)
);

create index if not exists winback_sends_email_idx on winback_sends (email);

create table if not exists email_optouts (
  email text primary key,
  created_at timestamptz not null default now(),
  source text
);

alter table winback_templates enable row level security;
alter table winback_sends enable row level security;
alter table email_optouts enable row level security;
