"""Command-line interface for local agent operations."""

import argparse
import json
from collections.abc import Sequence

from financial_tracker_api.worker import daily_cycle_status, service_status


def build_parser() -> argparse.ArgumentParser:
    """Create the command parser."""
    parser = argparse.ArgumentParser(prog="financial-tracker")
    parser.add_argument("command", choices=("daily", "status"))
    return parser


def main(argv: Sequence[str] | None = None) -> int:
    """Run a safe local worker command."""
    args = build_parser().parse_args(argv)
    payload = daily_cycle_status() if args.command == "daily" else service_status()
    print(json.dumps(payload, indent=2, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
