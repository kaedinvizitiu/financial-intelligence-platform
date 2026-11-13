-- Phase 4 foundation: a server-only smoke-test table.
-- RLS is enabled with no public policies; only the server-side service role
-- can use it through the Data API.

create table if not exists public.runtime_test_records (
  id uuid primary key default gen_random_uuid(),
  label text not null check (char_length(label) between 1 and 120),
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.runtime_test_records enable row level security;

revoke all on table public.runtime_test_records from anon, authenticated;
grant select, insert on table public.runtime_test_records to service_role;

comment on table public.runtime_test_records is
  'Harmless Phase 4 connectivity record; replace with the audited domain model in Phase 5.';
