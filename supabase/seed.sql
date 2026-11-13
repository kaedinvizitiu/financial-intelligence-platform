-- Deterministic, simulated AMD replay fixture for local development only.
-- It never represents a live recommendation or places a broker order.

insert into public.portfolios (id, name, mode, base_currency, strategy_version, is_default)
values ('00000000-0000-0000-0000-000000000001', 'Learning Paper Portfolio', 'paper', 'USD', 'baseline-v1', true)
on conflict (id) do nothing;

insert into public.strategies (id, portfolio_id, name, version, description, configuration)
values (
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000001',
  'Baseline end-of-day learning strategy',
  1,
  'Simulated strategy used to validate the evidence-to-decision audit trail.',
  '{"paper_only": true, "allow_short_stock": false, "allow_naked_options": false}'::jsonb
)
on conflict (id) do nothing;

insert into public.research_missions (
  id, portfolio_id, mission_key, target_type, symbols, objective, benchmark,
  time_horizon, trigger_type, data_cutoff_at, status, is_simulated
)
values (
  '00000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000001',
  'fixture-amd-2026-11-12',
  'symbol',
  array['AMD'],
  'Practice replay of an end-of-day evidence-to-paper-decision workflow.',
  'SPY',
  'medium_term',
  'strategy_test',
  '2026-11-12T21:00:00Z',
  'completed',
  true
)
on conflict (id) do nothing;

insert into public.sources (
  id, mission_id, source_type, provider, url, title, published_at, retrieved_at,
  available_at, content_hash, relevant_excerpt, licensing_status, freshness_status
)
values (
  '00000000-0000-0000-0000-000000000004',
  '00000000-0000-0000-0000-000000000003',
  'fixture',
  'Financial Tracker test fixture',
  'https://example.invalid/financial-tracker/fixtures/amd',
  'Simulated AMD evidence snapshot',
  '2026-11-12T20:00:00Z',
  '2026-11-12T21:05:00Z',
  '2026-11-12T20:00:00Z',
  'fixture-amd-evidence-v1',
  'Simulated evidence: AMD revenue growth is positive, but the fixture marks valuation uncertainty as unresolved.',
  'permitted',
  'fresh'
)
on conflict (id) do nothing;

insert into public.normalized_facts (
  id, mission_id, source_id, symbol, fact_type, fact_key, value_text,
  available_at, quality_status, confidence
)
values
(
  '00000000-0000-0000-0000-000000000005',
  '00000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000004',
  'AMD', 'fundamental', 'revenue_trend', 'positive in simulated fixture',
  '2026-11-12T20:00:00Z', 'valid', 0.80
),
(
  '00000000-0000-0000-0000-000000000006',
  '00000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000004',
  'AMD', 'risk', 'valuation_visibility', 'insufficient simulated evidence',
  '2026-11-12T20:00:00Z', 'missing', 0.95
)
on conflict (id) do nothing;

insert into public.agent_runs (
  id, mission_id, agent_type, run_key, status, input_hash, output_hash,
  model_provider, model_name, started_at, finished_at
)
values
(
  '00000000-0000-0000-0000-000000000007',
  '00000000-0000-0000-0000-000000000003',
  'research', 'fixture-amd-research-v1', 'completed',
  'fixture-amd-evidence-v1', 'fixture-amd-facts-v1',
  'deterministic', 'fixture-parser', '2026-11-12T21:06:00Z', '2026-11-12T21:07:00Z'
),
(
  '00000000-0000-0000-0000-000000000008',
  '00000000-0000-0000-0000-000000000003',
  'analysis', 'fixture-amd-analysis-v1', 'completed',
  'fixture-amd-facts-v1', 'fixture-amd-report-v1',
  'deterministic', 'fixture-analyzer', '2026-11-12T21:08:00Z', '2026-11-12T21:09:00Z'
)
on conflict (id) do nothing;

insert into public.reports (
  id, mission_id, agent_run_id, report_version, outcome, score, confidence,
  executive_summary, sections, citations, time_horizon, invalidation_conditions
)
values (
  '00000000-0000-0000-0000-000000000009',
  '00000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000008',
  1, 'INSUFFICIENT_DATA', 18, 0.62,
  'The simulated evidence is directionally positive but incomplete; no paper action is justified.',
  '{"fundamentals":"positive trend in fixture","risk":"valuation evidence missing","decision":"fail closed"}'::jsonb,
  '[{"source_id":"00000000-0000-0000-0000-000000000004","claim":"Simulated fixture only"}]'::jsonb,
  'medium_term',
  array['valuation evidence becomes contradictory', 'data freshness falls below policy threshold']
)
on conflict (id) do nothing;

insert into public.signals (
  id, mission_id, report_id, symbol, action, score, confidence, rationale
)
values (
  '00000000-0000-0000-0000-000000000010',
  '00000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000009',
  'AMD', 'NO_ACTION', 18, 0.62,
  'No paper order: the fixture intentionally contains insufficient valuation evidence.'
)
on conflict (id) do nothing;

insert into public.approvals (
  id, mission_id, signal_id, approval_type, status, reason
)
values (
  '00000000-0000-0000-0000-000000000011',
  '00000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000010',
  'automatic', 'not_required', 'NO_ACTION is fail-closed and creates no order.'
)
on conflict (id) do nothing;

insert into public.events (
  id, mission_id, portfolio_id, event_type, occurred_at, entity_type,
  entity_id, payload, previous_event_hash, event_hash
)
values
(
  '00000000-0000-0000-0000-000000000012',
  '00000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000001',
  'mission.completed', '2026-11-12T21:10:00Z', 'research_mission',
  '00000000-0000-0000-0000-000000000003',
  '{"simulated":true,"result":"NO_ACTION","reason":"INSUFFICIENT_DATA"}'::jsonb,
  null, 'fixture-amd-event-v1'
)
on conflict (id) do nothing;
