"""Read-only mission trace assembly for the local dashboard."""

from typing import Any

from financial_tracker_api.supabase import read_rows


def get_mission_trace(mission_key: str) -> dict[str, Any] | None:
    """Assemble one mission and its auditable evidence-to-decision trace."""
    missions = read_rows(
        "research_missions",
        {"mission_key": f"eq.{mission_key}", "select": "*"},
    )
    if not missions:
        return None
    mission = missions[0]
    mission_id = str(mission["id"])
    related = {
        "sources": read_rows(
            "sources", {"mission_id": f"eq.{mission_id}", "select": "*"}
        ),
        "normalized_facts": read_rows(
            "normalized_facts", {"mission_id": f"eq.{mission_id}", "select": "*"}
        ),
        "agent_runs": read_rows(
            "agent_runs", {"mission_id": f"eq.{mission_id}", "select": "*"}
        ),
        "reports": read_rows(
            "reports", {"mission_id": f"eq.{mission_id}", "select": "*"}
        ),
        "signals": read_rows(
            "signals", {"mission_id": f"eq.{mission_id}", "select": "*"}
        ),
        "approvals": read_rows(
            "approvals", {"mission_id": f"eq.{mission_id}", "select": "*"}
        ),
        "paper_orders": read_rows(
            "paper_orders", {"mission_id": f"eq.{mission_id}", "select": "*"}
        ),
        "events": read_rows(
            "events", {"mission_id": f"eq.{mission_id}", "select": "*"}
        ),
    }
    return {"mission": mission, **related}
