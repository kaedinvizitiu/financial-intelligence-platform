"""FastAPI entry point for the local Financial Tracker service."""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from financial_tracker_api.missions import get_mission_trace
from financial_tracker_api.supabase import create_runtime_test_record

app = FastAPI(
    title="Financial Tracker API",
    description="Local API for the three-agent financial research workflow.",
    version="0.1.0",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/health", tags=["system"])
def health() -> dict[str, str]:
    """Report whether the local API process is ready."""
    return {"status": "ok", "service": "financial-tracker-api"}


@app.post("/supabase/test-record", tags=["system"])
def supabase_test_record() -> dict[str, object]:
    """Write one harmless record using the server-only Supabase secret."""
    return create_runtime_test_record("phase4-connectivity-check")


@app.get("/missions/{mission_key}", tags=["missions"])
def mission_trace(mission_key: str) -> dict[str, object]:
    """Return one safe, read-only evidence-to-decision mission trace."""
    trace = get_mission_trace(mission_key)
    if trace is None:
        raise HTTPException(status_code=404, detail="Mission not found.")
    return trace
