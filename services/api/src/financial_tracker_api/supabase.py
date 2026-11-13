"""Small server-only Supabase REST client for local agent operations."""

import os
from collections.abc import Mapping
from dataclasses import dataclass

import httpx


@dataclass(frozen=True)
class SupabaseConfig:
    """Server-side settings loaded from the local environment."""

    url: str
    secret_key: str

    @classmethod
    def from_environment(cls) -> "SupabaseConfig":
        url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL", "").rstrip("/")
        secret_key = os.environ.get("SUPABASE_SECRET_KEY", "")
        if not url or not secret_key:
            raise RuntimeError(
                "Supabase is not configured; set NEXT_PUBLIC_SUPABASE_URL and "
                "SUPABASE_SECRET_KEY in an ignored local environment file."
            )
        return cls(url=url, secret_key=secret_key)


def create_runtime_test_record(label: str) -> dict[str, object]:
    """Insert and return a harmless server-side connectivity record."""
    config = SupabaseConfig.from_environment()
    response = httpx.post(
        f"{config.url}/rest/v1/runtime_test_records",
        headers={
            "apikey": config.secret_key,
            "Authorization": f"Bearer {config.secret_key}",
            "Content-Type": "application/json",
            "Prefer": "return=representation",
        },
        json={"label": label},
        timeout=10,
    )
    response.raise_for_status()
    records = response.json()
    if not isinstance(records, list) or not records or not isinstance(records[0], dict):
        raise RuntimeError("Supabase returned an unexpected test-record response.")
    return records[0]


def upsert_rows(table: str, rows: list[dict[str, object]]) -> None:
    """Upsert server-owned rows through the protected Data API."""
    if not rows:
        return
    config = SupabaseConfig.from_environment()
    response = httpx.post(
        f"{config.url}/rest/v1/{table}",
        headers={
            "apikey": config.secret_key,
            "Authorization": f"Bearer {config.secret_key}",
            "Content-Type": "application/json",
            "Prefer": "resolution=merge-duplicates,return=minimal",
        },
        json=rows,
        timeout=10,
    )
    response.raise_for_status()


def insert_rows(table: str, rows: list[dict[str, object]]) -> None:
    """Insert server-owned rows, ignoring deterministic replay duplicates."""
    if not rows:
        return
    config = SupabaseConfig.from_environment()
    response = httpx.post(
        f"{config.url}/rest/v1/{table}",
        headers={
            "apikey": config.secret_key,
            "Authorization": f"Bearer {config.secret_key}",
            "Content-Type": "application/json",
            "Prefer": "resolution=ignore-duplicates,return=minimal",
        },
        json=rows,
        timeout=10,
    )
    response.raise_for_status()


def read_rows(table: str, params: Mapping[str, str]) -> list[dict[str, object]]:
    """Read server-owned rows through the protected Data API."""
    config = SupabaseConfig.from_environment()
    response = httpx.get(
        f"{config.url}/rest/v1/{table}",
        headers={
            "apikey": config.secret_key,
            "Authorization": f"Bearer {config.secret_key}",
        },
        params=dict(params),
        timeout=10,
    )
    response.raise_for_status()
    records = response.json()
    if not isinstance(records, list) or not all(
        isinstance(row, dict) for row in records
    ):
        raise RuntimeError(f"Supabase returned unexpected rows for {table}.")
    return records
