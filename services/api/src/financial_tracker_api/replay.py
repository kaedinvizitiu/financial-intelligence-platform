"""Deterministic simulated AMD mission used as a Phase 5 regression fixture."""

from typing import Any

from financial_tracker_api.supabase import insert_rows, upsert_rows

FIXTURE_IDS = {
    "portfolio": "00000000-0000-0000-0000-000000000001",
    "strategy": "00000000-0000-0000-0000-000000000002",
    "mission": "00000000-0000-0000-0000-000000000003",
    "source": "00000000-0000-0000-0000-000000000004",
    "fact_revenue": "00000000-0000-0000-0000-000000000005",
    "fact_risk": "00000000-0000-0000-0000-000000000006",
    "research_run": "00000000-0000-0000-0000-000000000007",
    "analysis_run": "00000000-0000-0000-0000-000000000008",
    "report": "00000000-0000-0000-0000-000000000009",
    "signal": "00000000-0000-0000-0000-000000000010",
    "approval": "00000000-0000-0000-0000-000000000011",
    "event": "00000000-0000-0000-0000-000000000012",
}


def build_amd_fixture() -> dict[str, list[dict[str, Any]]]:
    """Return the full deterministic evidence-to-decision fixture."""
    return {
        "portfolios": [
            {
                "id": FIXTURE_IDS["portfolio"],
                "name": "Learning Paper Portfolio",
                "mode": "paper",
                "base_currency": "USD",
                "strategy_version": "baseline-v1",
                "is_default": True,
            }
        ],
        "strategies": [
            {
                "id": FIXTURE_IDS["strategy"],
                "portfolio_id": FIXTURE_IDS["portfolio"],
                "name": "Baseline end-of-day learning strategy",
                "version": 1,
                "description": (
                    "Simulated strategy used to validate the evidence-to-decision "
                    "audit trail."
                ),
                "configuration": {
                    "paper_only": True,
                    "allow_short_stock": False,
                    "allow_naked_options": False,
                },
            }
        ],
        "research_missions": [
            {
                "id": FIXTURE_IDS["mission"],
                "portfolio_id": FIXTURE_IDS["portfolio"],
                "mission_key": "fixture-amd-2026-11-12",
                "target_type": "symbol",
                "symbols": ["AMD"],
                "objective": (
                    "Practice replay of an end-of-day evidence-to-paper-decision "
                    "workflow."
                ),
                "benchmark": "SPY",
                "time_horizon": "medium_term",
                "trigger_type": "strategy_test",
                "data_cutoff_at": "2026-11-12T21:00:00Z",
                "status": "completed",
                "is_simulated": True,
            }
        ],
        "sources": [
            {
                "id": FIXTURE_IDS["source"],
                "mission_id": FIXTURE_IDS["mission"],
                "source_type": "fixture",
                "provider": "Financial Tracker test fixture",
                "url": "https://example.invalid/financial-tracker/fixtures/amd",
                "title": "Simulated AMD evidence snapshot",
                "published_at": "2026-11-12T20:00:00Z",
                "retrieved_at": "2026-11-12T21:05:00Z",
                "available_at": "2026-11-12T20:00:00Z",
                "content_hash": "fixture-amd-evidence-v1",
                "relevant_excerpt": (
                    "Simulated evidence: AMD revenue growth is positive, but the "
                    "fixture "
                    "marks valuation uncertainty as unresolved."
                ),
                "licensing_status": "permitted",
                "freshness_status": "fresh",
            }
        ],
        "normalized_facts": [
            {
                "id": FIXTURE_IDS["fact_revenue"],
                "mission_id": FIXTURE_IDS["mission"],
                "source_id": FIXTURE_IDS["source"],
                "symbol": "AMD",
                "fact_type": "fundamental",
                "fact_key": "revenue_trend",
                "value_text": "positive in simulated fixture",
                "available_at": "2026-11-12T20:00:00Z",
                "quality_status": "valid",
                "confidence": 0.8,
            },
            {
                "id": FIXTURE_IDS["fact_risk"],
                "mission_id": FIXTURE_IDS["mission"],
                "source_id": FIXTURE_IDS["source"],
                "symbol": "AMD",
                "fact_type": "risk",
                "fact_key": "valuation_visibility",
                "value_text": "insufficient simulated evidence",
                "available_at": "2026-11-12T20:00:00Z",
                "quality_status": "missing",
                "confidence": 0.95,
            },
        ],
        "agent_runs": [
            {
                "id": FIXTURE_IDS["research_run"],
                "mission_id": FIXTURE_IDS["mission"],
                "agent_type": "research",
                "run_key": "fixture-amd-research-v1",
                "status": "completed",
                "input_hash": "fixture-amd-evidence-v1",
                "output_hash": "fixture-amd-facts-v1",
                "model_provider": "deterministic",
                "model_name": "fixture-parser",
                "started_at": "2026-11-12T21:06:00Z",
                "finished_at": "2026-11-12T21:07:00Z",
            },
            {
                "id": FIXTURE_IDS["analysis_run"],
                "mission_id": FIXTURE_IDS["mission"],
                "agent_type": "analysis",
                "run_key": "fixture-amd-analysis-v1",
                "status": "completed",
                "input_hash": "fixture-amd-facts-v1",
                "output_hash": "fixture-amd-report-v1",
                "model_provider": "deterministic",
                "model_name": "fixture-analyzer",
                "started_at": "2026-11-12T21:08:00Z",
                "finished_at": "2026-11-12T21:09:00Z",
            },
        ],
        "reports": [
            {
                "id": FIXTURE_IDS["report"],
                "mission_id": FIXTURE_IDS["mission"],
                "agent_run_id": FIXTURE_IDS["analysis_run"],
                "report_version": 1,
                "outcome": "INSUFFICIENT_DATA",
                "score": 18,
                "confidence": 0.62,
                "executive_summary": (
                    "The simulated evidence is directionally positive but incomplete; "
                    "no paper action is justified."
                ),
                "sections": {
                    "fundamentals": "positive trend in fixture",
                    "risk": "valuation evidence missing",
                    "decision": "fail closed",
                },
                "citations": [
                    {
                        "source_id": FIXTURE_IDS["source"],
                        "claim": "Simulated fixture only",
                    }
                ],
                "time_horizon": "medium_term",
                "invalidation_conditions": [
                    "valuation evidence becomes contradictory",
                    "data freshness falls below policy threshold",
                ],
            }
        ],
        "signals": [
            {
                "id": FIXTURE_IDS["signal"],
                "mission_id": FIXTURE_IDS["mission"],
                "report_id": FIXTURE_IDS["report"],
                "symbol": "AMD",
                "action": "NO_ACTION",
                "score": 18,
                "confidence": 0.62,
                "rationale": (
                    "No paper order: the fixture intentionally contains insufficient "
                    "valuation evidence."
                ),
            }
        ],
        "approvals": [
            {
                "id": FIXTURE_IDS["approval"],
                "mission_id": FIXTURE_IDS["mission"],
                "signal_id": FIXTURE_IDS["signal"],
                "approval_type": "automatic",
                "status": "not_required",
                "reason": "NO_ACTION is fail-closed and creates no order.",
            }
        ],
        "events": [
            {
                "id": FIXTURE_IDS["event"],
                "mission_id": FIXTURE_IDS["mission"],
                "portfolio_id": FIXTURE_IDS["portfolio"],
                "event_type": "mission.completed",
                "occurred_at": "2026-11-12T21:10:00Z",
                "entity_type": "research_mission",
                "entity_id": FIXTURE_IDS["mission"],
                "payload": {
                    "simulated": True,
                    "result": "NO_ACTION",
                    "reason": "INSUFFICIENT_DATA",
                },
                "event_hash": "fixture-amd-event-v1",
            }
        ],
    }


def run_amd_fixture() -> dict[str, object]:
    """Upsert the fixture and return a safe summary without order creation."""
    fixture = build_amd_fixture()
    inserted: dict[str, int] = {}
    for table, rows in fixture.items():
        if table == "events":
            insert_rows(table, rows)
        else:
            upsert_rows(table, rows)
        inserted[table] = len(rows)
    return {
        "status": "completed",
        "mission_key": "fixture-amd-2026-11-12",
        "symbol": "AMD",
        "simulated": True,
        "decision": "NO_ACTION",
        "orders_created": 0,
        "tables_written": inserted,
    }
