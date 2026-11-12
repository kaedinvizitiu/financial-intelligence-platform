# Financial Tracker project instructions

## Purpose

Build a customizable financial-intelligence application that helps Kaedin learn
AI, software engineering, databases, and financial analysis. The private app
uses three primary agents and a game-like local dashboard. A sanitized public
portfolio demonstration may be created later.

## Start every substantial task

1. Read `docs/STATUS.md`.
2. Read only the project documents relevant to the prompt.
3. Follow the active phase and completion gates in `docs/ROADMAP.md`.
4. Preserve existing user work and unrelated changes.

Do not load every document by default. Route context as follows:

- Product scope or planning: `docs/PROJECT_CONTEXT.md`
- Agent behavior or workflows: `docs/AGENT_ARCHITECTURE.md`
- Financial, trading, or credential safety: `docs/SAFETY.md`
- UI, motion, themes, or game world: `docs/DESIGN_SYSTEM.md`
- Libraries or copied patterns: `docs/OPEN_SOURCE.md`
- Durable choices and unresolved questions: `docs/DECISIONS.md`

## Non-negotiable product boundaries

- Keep exactly three primary product agents: Research, Analysis, and Portfolio.
- The runtime must work independently of Codex. Codex is a development and
  on-demand control/audit surface, not a required always-on runtime.
- Default to no paid external AI or data services. Do not enable an API or
  service that can create charges without explicit user approval.
- Start with paper trading. Live trading stays disabled until the user
  explicitly authorizes a separate implementation phase.
- Never support short stock positions.
- Paper options are in scope, but never naked option writing. Start with
  long calls, long puts, and defined-risk strategies.
- Keep LLMs out of hard risk enforcement and order sizing. Deterministic code
  owns limits, approvals, validation, kill switches, and execution.
- Store source provenance, timestamps, agent runs, decisions, rejected actions,
  and simulated fills in an auditable history.
- Never commit secrets or expose privileged Supabase/broker credentials to the
  frontend.

## Initial product direction

- Working name: Financial Tracker.
- Initial universe: MSFT, AMZN, NVDA, AMD, VUG, and QQQ; SPY is the benchmark.
- Initial cadence: end-of-day, with intraday support reserved for later.
- UI direction: Quantum Violet digital trading spaceship with both an
  interactive 2D/isometric view and a conventional dashboard view.
- Preserve an extension point for a future 3D spaceship. Ask the user about 3D
  near the end of the primary build rather than adding it early.
- Include an optional learning mode that explains architecture, calculations,
  data flow, and why decisions were accepted or rejected.

## Engineering and cost rules

- Prefer simple, inspectable components and one tested vertical slice before
  expanding breadth.
- Cache normalized data and model outputs; do not repeatedly process unchanged
  sources.
- Use Ollama as the default local model provider for Agent 2 while keeping the
  provider interface replaceable. Select the exact small quantized model by
  benchmark on the user's M2 Mac with 8 GB unified memory.
- Prefer mature, active open-source projects with more than 1,000 GitHub stars
  when they genuinely fit. Verify license, maintenance, security, and fit at
  selection time. Record decisions in `docs/OPEN_SOURCE.md`.
- Do not copy an entire framework when a dependency or a small adapted pattern
  is sufficient.
- Do not use Ponytail mode unless the user explicitly re-enables it.

## Completion requirements

- Run the smallest relevant tests, type checks, and builds available for the
  changed area.
- Explain outcomes in plain language and note any meaningful limitation.
- Update `docs/STATUS.md` after meaningful project progress.
- Update `docs/DECISIONS.md` only when a durable decision changes.
- Update other documentation only when its subject actually changed.
