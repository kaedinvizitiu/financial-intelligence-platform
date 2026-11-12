"""Safe scaffold operations for the future agent worker."""

from datetime import UTC, datetime


def daily_cycle_status() -> dict[str, str]:
    """Return a no-side-effect placeholder for the future daily cycle."""
    return {
        "status": "scaffold_ready",
        "mode": "paper_only",
        "message": "No market data fetched and no orders created.",
        "timestamp": datetime.now(UTC).isoformat(),
    }


def service_status() -> dict[str, str]:
    """Return the current worker configuration."""
    return {
        "status": "ready",
        "agents": "research,analysis,portfolio",
        "live_trading": "disabled",
        "paid_ai": "disabled",
    }
