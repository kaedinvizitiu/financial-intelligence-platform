"""FastAPI entry point for the local Financial Tracker service."""

from fastapi import FastAPI

from financial_tracker_api.supabase import create_runtime_test_record

app = FastAPI(
    title="Financial Tracker API",
    description="Local API for the three-agent financial research workflow.",
    version="0.1.0",
)


@app.get("/health", tags=["system"])
def health() -> dict[str, str]:
    """Report whether the local API process is ready."""
    return {"status": "ok", "service": "financial-tracker-api"}


@app.post("/supabase/test-record", tags=["system"])
def supabase_test_record() -> dict[str, object]:
    """Write one harmless record using the server-only Supabase secret."""
    return create_runtime_test_record("phase4-connectivity-check")
