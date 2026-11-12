#!/bin/sh

set -eu

VENV_PYTHON="services/api/.venv/bin/python"
PYTHON_BIN=""

is_supported_python() {
  "$1" -c 'import sys; raise SystemExit(0 if sys.version_info >= (3, 11) else 1)'
}

if [ -x "$VENV_PYTHON" ] && is_supported_python "$VENV_PYTHON"; then
  PYTHON_BIN="$VENV_PYTHON"
else
  for candidate in python3.13 python3.12 python3.11 python3; do
    if command -v "$candidate" >/dev/null 2>&1 && is_supported_python "$candidate"; then
      PYTHON_BIN="$candidate"
      break
    fi
  done

  if [ -z "$PYTHON_BIN" ]; then
    echo "Python 3.11 or newer is required. Install it, then rerun pnpm python:setup." >&2
    exit 1
  fi

  "$PYTHON_BIN" -m venv services/api/.venv
  PYTHON_BIN="$VENV_PYTHON"
fi

"$PYTHON_BIN" -m pip install --upgrade pip
"$PYTHON_BIN" -m pip install -e 'services/api[dev]'
