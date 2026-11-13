from fastapi.testclient import TestClient

from financial_tracker_api.main import app


def test_supabase_test_record_uses_server_client(monkeypatch) -> None:
    monkeypatch.setattr(
        "financial_tracker_api.main.create_runtime_test_record",
        lambda label: {"id": "test-id", "label": label},
    )

    response = TestClient(app).post("/supabase/test-record")

    assert response.status_code == 200
    assert response.json() == {"id": "test-id", "label": "phase4-connectivity-check"}


def test_health_endpoint() -> None:
    response = TestClient(app).get("/health")

    assert response.status_code == 200
    assert response.json() == {
        "status": "ok",
        "service": "financial-tracker-api",
    }


def test_mission_trace_returns_safe_read_model(monkeypatch) -> None:
    monkeypatch.setattr(
        "financial_tracker_api.main.get_mission_trace",
        lambda mission_key: {"mission": {"mission_key": mission_key}, "signals": []},
    )

    response = TestClient(app).get("/missions/fixture-amd-2026-11-12")

    assert response.status_code == 200
    assert response.json()["mission"]["mission_key"] == "fixture-amd-2026-11-12"
