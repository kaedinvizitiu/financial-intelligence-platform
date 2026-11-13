-- Phase 5: auditable research-to-paper-decision data model.
-- Operational tables are service-role only for now. The browser will receive
-- narrowly scoped read access only after the dashboard query surface exists.

create extension if not exists pgcrypto;

create schema if not exists private;

create table if not exists public.portfolios (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  mode text not null default 'paper' check (mode in ('paper', 'live')),
  base_currency text not null default 'USD' check (char_length(base_currency) = 3),
  strategy_version text not null default 'baseline-v1',
  is_default boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (name, mode)
);

create unique index if not exists portfolios_one_default_per_mode
  on public.portfolios (mode) where is_default;

create table if not exists public.strategies (
  id uuid primary key default gen_random_uuid(),
  portfolio_id uuid not null references public.portfolios(id),
  name text not null,
  version integer not null check (version > 0),
  description text not null,
  configuration jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  unique (portfolio_id, name, version)
);

create table if not exists public.research_missions (
  id uuid primary key default gen_random_uuid(),
  portfolio_id uuid references public.portfolios(id),
  mission_key text not null unique,
  target_type text not null check (target_type in ('symbol', 'etf', 'basket', 'sector', 'market', 'strategy')),
  symbols text[] not null default '{}',
  objective text not null,
  benchmark text,
  time_horizon text,
  trigger_type text not null check (trigger_type in ('manual', 'scheduled', 'filing', 'price', 'strategy_test')),
  data_cutoff_at timestamptz not null,
  status text not null default 'created' check (status in ('created', 'running', 'completed', 'failed', 'cancelled')),
  is_simulated boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.sources (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references public.research_missions(id),
  source_type text not null,
  provider text not null,
  url text,
  title text,
  published_at timestamptz,
  retrieved_at timestamptz not null,
  available_at timestamptz not null,
  content_hash text not null,
  relevant_excerpt text,
  licensing_status text not null default 'unknown' check (licensing_status in ('permitted', 'restricted', 'unknown')),
  freshness_status text not null default 'fresh' check (freshness_status in ('fresh', 'stale', 'missing', 'conflicting')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  unique (mission_id, content_hash)
);

create table if not exists public.normalized_facts (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references public.research_missions(id),
  source_id uuid not null references public.sources(id),
  symbol text,
  fact_type text not null,
  fact_key text not null,
  value_numeric numeric,
  value_text text,
  value_json jsonb,
  unit text,
  period_start date,
  period_end date,
  as_of_at timestamptz,
  available_at timestamptz not null,
  quality_status text not null default 'valid' check (quality_status in ('valid', 'stale', 'missing', 'conflicting', 'rejected')),
  confidence numeric check (confidence is null or confidence between 0 and 1),
  created_at timestamptz not null default timezone('utc', now()),
  check (value_numeric is not null or value_text is not null or value_json is not null)
);

create table if not exists public.agent_runs (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references public.research_missions(id),
  agent_type text not null check (agent_type in ('research', 'analysis', 'portfolio')),
  run_key text not null unique,
  status text not null check (status in ('queued', 'running', 'completed', 'failed', 'cancelled')),
  input_hash text,
  output_hash text,
  model_provider text,
  model_name text,
  started_at timestamptz,
  finished_at timestamptz,
  error_code text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references public.research_missions(id),
  agent_run_id uuid not null references public.agent_runs(id),
  report_version integer not null check (report_version > 0),
  outcome text not null check (outcome in ('ACTIONABLE', 'INSUFFICIENT_DATA', 'CONFLICTING_EVIDENCE', 'NO_ACTION')),
  score numeric not null check (score between -100 and 100),
  confidence numeric not null check (confidence between 0 and 1),
  executive_summary text not null,
  sections jsonb not null default '{}'::jsonb,
  citations jsonb not null default '[]'::jsonb,
  time_horizon text,
  invalidation_conditions text[] not null default '{}',
  created_at timestamptz not null default timezone('utc', now()),
  unique (mission_id, report_version)
);

create table if not exists public.signals (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references public.research_missions(id),
  report_id uuid not null references public.reports(id),
  symbol text not null,
  action text not null check (action in ('BUY', 'SELL', 'HOLD', 'NO_ACTION', 'REJECTED')),
  score numeric not null check (score between -100 and 100),
  confidence numeric not null check (confidence between 0 and 1),
  rationale text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.approvals (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references public.research_missions(id),
  signal_id uuid references public.signals(id),
  approval_type text not null check (approval_type in ('automatic', 'manual', 'blocked')),
  status text not null check (status in ('not_required', 'pending', 'approved', 'rejected')),
  requested_at timestamptz not null default timezone('utc', now()),
  decided_at timestamptz,
  decided_by text,
  reason text not null,
  metadata jsonb not null default '{}'::jsonb
);

create table if not exists public.paper_orders (
  id uuid primary key default gen_random_uuid(),
  portfolio_id uuid not null references public.portfolios(id),
  mission_id uuid not null references public.research_missions(id),
  signal_id uuid references public.signals(id),
  client_order_id text not null unique,
  symbol text not null,
  asset_type text not null check (asset_type in ('stock', 'etf', 'option')),
  side text not null check (side in ('buy', 'sell')),
  quantity numeric not null check (quantity > 0),
  order_type text not null check (order_type in ('market', 'limit')),
  limit_price numeric check (limit_price is null or limit_price > 0),
  status text not null check (status in ('accepted', 'rejected', 'cancelled', 'filled')),
  risk_check_status text not null check (risk_check_status in ('passed', 'failed')),
  rejection_reason text,
  maximum_known_loss numeric check (maximum_known_loss is null or maximum_known_loss >= 0),
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.fills (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.paper_orders(id),
  fill_key text not null unique,
  filled_at timestamptz not null,
  quantity numeric not null check (quantity > 0),
  price numeric not null check (price > 0),
  fees numeric not null default 0 check (fees >= 0),
  slippage numeric not null default 0 check (slippage >= 0),
  source text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.positions (
  id uuid primary key default gen_random_uuid(),
  portfolio_id uuid not null references public.portfolios(id),
  symbol text not null,
  asset_type text not null check (asset_type in ('stock', 'etf', 'option')),
  quantity numeric not null,
  average_cost numeric not null check (average_cost >= 0),
  realized_pnl numeric not null default 0,
  opened_at timestamptz,
  updated_at timestamptz not null default timezone('utc', now()),
  unique (portfolio_id, symbol, asset_type)
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid references public.research_missions(id),
  portfolio_id uuid references public.portfolios(id),
  event_type text not null,
  occurred_at timestamptz not null,
  entity_type text not null,
  entity_id uuid,
  payload jsonb not null default '{}'::jsonb,
  previous_event_hash text,
  event_hash text not null unique,
  created_at timestamptz not null default timezone('utc', now())
);

create or replace function private.prevent_append_only_mutation()
returns trigger
language plpgsql
as $$
begin
  raise exception 'append-only table % cannot be updated or deleted', TG_TABLE_NAME;
end;
$$;

drop trigger if exists paper_orders_append_only on public.paper_orders;
create trigger paper_orders_append_only
before update or delete on public.paper_orders
for each row execute function private.prevent_append_only_mutation();

drop trigger if exists fills_append_only on public.fills;
create trigger fills_append_only
before update or delete on public.fills
for each row execute function private.prevent_append_only_mutation();

drop trigger if exists events_append_only on public.events;
create trigger events_append_only
before update or delete on public.events
for each row execute function private.prevent_append_only_mutation();

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'portfolios', 'strategies', 'research_missions', 'sources', 'normalized_facts',
    'agent_runs', 'reports', 'signals', 'approvals', 'paper_orders', 'fills',
    'positions', 'events'
  ] loop
    execute format('alter table public.%I enable row level security', table_name);
    execute format('revoke all on table public.%I from anon, authenticated', table_name);
    execute format('grant all on table public.%I to service_role', table_name);
  end loop;
end $$;
