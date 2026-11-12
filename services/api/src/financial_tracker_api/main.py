"""FastAPI entry point for the local Financial Tracker service."""

from fastapi import FastAPI

app = FastAPI(
    title="Financial Tracker API",
    description="Local API for the three-agent financial research workflow.",
    version="0.1.0",
)


@app.get("/health", tags=["system"])
def health() -> dict[str, str]:
    """Report whether the local API process is ready."""
    return {"status": "ok", "service": "financial-tracker-api"}
