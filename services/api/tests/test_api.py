from fastapi.testclient import TestClient

from financial_tracker_api.main import app


def test_health_endpoint() -> None:
    response = TestClient(app).get("/health")

    assert response.status_code == 200
    assert response.json() == {
        "status": "ok",
        "service": "financial-tracker-api",
    }
