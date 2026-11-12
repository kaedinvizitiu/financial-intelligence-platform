# Financial Intelligence Platform

A local-first learning project for financial research, AI-agent workflows,
paper trading, databases, and full-stack development.

The product is planned around three auditable agents:

1. **Research Agent** collects and normalizes point-in-time evidence.
2. **Analysis Agent** uses deterministic calculations and local Ollama-assisted
   synthesis to produce a structured, cited report.
3. **Portfolio Agent** applies deterministic risk rules and records a paper
   trade or `NO_ACTION` decision.

Supabase will hold operational state and the audit trail. GitHub holds source
code, migrations, and documentation; it is not used to store private portfolio
records. The operating dashboard will run locally first.

## Current status

The project now has a minimal Next.js dashboard, local FastAPI service, safe
agent-worker placeholder, and shared development commands. Market data,
Supabase, Ollama inference, and trading remain intentionally disconnected. See
[`docs/STATUS.md`](docs/STATUS.md) for the current handoff and
[`docs/ROADMAP.md`](docs/ROADMAP.md) for the gated build sequence.

## Initial scope

- Initial universe: MSFT, AMZN, NVDA, AMD, VUG, and QQQ
- Benchmark: SPY
- Initial cadence: end-of-day
- Paper trading only during development
- Paper options limited to long or defined-risk positions
- No short stock positions and no naked option writing
- Quantum Violet dashboard with conventional and game-like navigation

## Safety and cost defaults

- Live trading is disabled until a separately reviewed and explicitly
  authorized phase.
- LLM output never owns position sizing, approvals, or hard risk limits.
- Paid AI and paid data providers are disabled by default.
- Secrets and private financial data must never be committed.

See [`docs/SAFETY.md`](docs/SAFETY.md) for the complete boundaries.

## Local development

Prerequisites are Node.js 20.9 or newer, pnpm, and Python 3.11 or newer.

```text
pnpm install
pnpm python:setup
pnpm dev
```

The dashboard runs at `http://localhost:3000` and the local API runs at
`http://127.0.0.1:8000`. Additional commands:

```text
pnpm agents:daily
pnpm agents:status
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

`pnpm agents:daily` is currently a no-side-effect readiness check. It fetches
no market data and creates no orders.

## Documentation

- [`AGENTS.md`](AGENTS.md): durable instructions for Codex and contributors
- [`docs/PROJECT_CONTEXT.md`](docs/PROJECT_CONTEXT.md): product vision
- [`docs/AGENT_ARCHITECTURE.md`](docs/AGENT_ARCHITECTURE.md): agent workflow
- [`docs/ROADMAP.md`](docs/ROADMAP.md): ordered phases and completion gates
- [`docs/DECISIONS.md`](docs/DECISIONS.md): confirmed and open decisions
- [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md): UI direction
- [`docs/OPEN_SOURCE.md`](docs/OPEN_SOURCE.md): dependency evaluation ledger

## Disclaimer

This repository is an educational software project, not financial advice. Any
future live-trading capability requires separate validation, specification, and
explicit authorization.

## License

No open-source license has been selected yet. Until that decision is made, the
repository is publicly viewable but no permission to copy, modify, or
redistribute the code is granted.
