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
