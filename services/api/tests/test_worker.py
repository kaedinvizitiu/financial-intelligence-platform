from financial_tracker_api.cli import main
from financial_tracker_api.replay import build_amd_fixture
from financial_tracker_api.worker import daily_cycle_status, service_status


def test_daily_cycle_is_safe_scaffold() -> None:
    payload = daily_cycle_status()

    assert payload["status"] == "scaffold_ready"
    assert payload["mode"] == "paper_only"
    assert "No market data fetched" in payload["message"]


def test_service_status_disables_risky_features() -> None:
    payload = service_status()

    assert payload["live_trading"] == "disabled"
    assert payload["paid_ai"] == "disabled"


def test_cli_status() -> None:
    assert main(["status"]) == 0


def test_amd_fixture_is_simulated_and_fail_closed() -> None:
    fixture = build_amd_fixture()

    assert fixture["research_missions"][0]["is_simulated"] is True
    assert fixture["signals"][0]["action"] == "NO_ACTION"
    assert "paper_orders" not in fixture
