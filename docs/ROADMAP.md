# Financial Tracker roadmap

The phases are intentionally ordered. Do not skip a completion gate merely to
make the application look more complete.

## Phase 1: Discovery and durable context

- [x] Establish the three-agent concept.
- [x] Establish the initial universe, cadence, UI direction, and safety intent.
- [x] Create repository-level guidance and project documentation.
- [ ] Resolve the remaining local-model choices through a small Ollama
      experiment rather than assumption. Defer macOS automation configuration
      until the prerequisites recorded in Phase 12 are complete.

Completion gate: the confirmed decisions and unresolved choices are clearly
separated in `docs/DECISIONS.md`.

## Phase 2: GitHub foundation

- [ ] Create a public GitHub repository through the user's signed-in browser.
- [ ] Connect the local Git repository to the remote.
- [ ] Add README, license decision, `.gitignore`, and environment examples.
- [ ] Make and push the first commit.

Completion gate: the remote repository contains no secret or private data.

## Phase 3: Local workspace scaffold

- [ ] Create the Next.js/TypeScript dashboard workspace.
- [ ] Create the Python API and worker workspace.
- [ ] Establish lint, type-check, test, and build commands.
- [ ] Provide one root development command.

Planned command interface:

- `pnpm dev`
- `pnpm start`
- `pnpm agents:daily`
- `pnpm mission -- --target AMD`
- `pnpm agents:status`
- `pnpm agents:scheduler:install`

Completion gate: the empty dashboard, API, and worker start locally and pass
their baseline checks.

## Phase 4: Supabase foundation

- [ ] Select or create the Supabase project through the user's signed-in
      browser.
- [ ] Store only appropriate credentials in ignored local environment files.
- [ ] Create versioned migrations and generated types.
- [ ] Implement access policies and private/public data separation.

Completion gate: local code can read and write a harmless test record without
exposing a privileged credential to the browser.

## Phase 5: Data model and audit trail

- [ ] Model research missions, sources, normalized facts, agent runs, reports,
      signals, approvals, paper orders, fills, positions, and events.
- [ ] Add timestamps, provenance, versioning, and data-freshness fields.
- [ ] Make trading history append-only or equivalently auditable.

Completion gate: one fake mission can be replayed from evidence through a paper
decision.

## Phase 6: Dashboard shell and design system

- [ ] Implement the Quantum Violet tokens and typography.
- [ ] Implement conventional dashboard navigation.
- [ ] Implement the first 2D/isometric spaceship shell.
- [ ] Add accessibility, reduced-motion behavior, and theme customization
      foundations.

Completion gate: both navigation modes reach the same placeholder information
without duplicating business logic.

## Phase 7: One vertical slice

- [ ] Run one manual end-of-day mission for one target.
- [ ] Store evidence, a structured report, a score, and a paper decision.
- [ ] Display the complete trace in the UI.

Completion gate: a user can follow every result back to its source and see why a
paper action was accepted or rejected.

## Phase 8: Research Agent

- [ ] SEC filings and XBRL
- [ ] Historical price and volume
- [ ] Earnings results
- [ ] Earnings transcripts
- [ ] ETF holdings
- [ ] Macroeconomic data
- [ ] Licensed/permitted news sources
- [ ] Point-in-time data validation and caching

Completion gate: stale, missing, conflicting, and changed data are distinguished
and surfaced rather than silently treated as valid.

## Phase 9: Analysis Agent

- [ ] Fundamental, technical, market/sector, catalyst, and risk sections
- [ ] Bull case, bear case, and contradictory evidence
- [ ] Score from -100 to +100 and confidence
- [ ] Time horizon and thesis invalidation conditions
- [ ] Citations and data-quality disclosure
- [ ] `INSUFFICIENT_DATA`, `CONFLICTING_EVIDENCE`, and `NO_ACTION` outcomes

Completion gate: deterministic calculations are independently tested and the
report never invents unavailable evidence.

## Phase 10: Portfolio Agent and equity paper trading

- [ ] Deterministic position sizing and exposure controls
- [ ] Automatic qualifying paper stock/ETF trades
- [ ] Cash, duplicate-order, data-freshness, loss, and kill-switch controls
- [ ] Transaction costs, spread, slippage, and benchmark tracking
- [ ] No short stock positions

Completion gate: failure and ambiguity result in no trade, and every accepted or
rejected action is auditable.

## Phase 11: Paper options

- [ ] Options chain ingestion and data-quality checks
- [ ] Contract multipliers, bid/ask spread, liquidity, expiration, Greeks,
      implied volatility, exercise, assignment, and transaction costs
- [ ] Long calls, long puts, and defined-risk strategies
- [ ] No naked option writing
- [ ] Automatic paper execution only within deterministic maximum-loss limits

Completion gate: paper option positions cannot exceed known maximum-loss and
portfolio-risk limits, and expiry/assignment behavior is tested.

## Phase 12: Scheduling and triggers

- [ ] After the initial repository, app scaffold, Supabase setup, and working
      daily agent command are complete, remind the user to configure macOS
      automation. Do not configure it before those prerequisites are met.
- [ ] Use `pmset` to wake the Mac shortly before the daily run.
- [ ] Use `launchd` to schedule the daily agent command.
- [ ] Wrap the run with `caffeinate` so the Mac remains awake until completion.
- [ ] Manual missions
- [ ] Scheduled end-of-day missions
- [ ] SEC filing and earnings triggers
- [ ] Price and volatility triggers
- [ ] Strategy-testing missions
- [ ] macOS background worker, catch-up behavior, and notifications

Completion gate: triggers are idempotent, missed runs can safely catch up, and
the wake/schedule/keep-awake setup has been tested without duplicating a run.

## Phase 13: Validation and performance

- [ ] Point-in-time and look-ahead leakage tests
- [ ] Walk-forward and sealed out-of-sample evaluation
- [ ] Realistic costs and liquidity
- [ ] Benchmark, drawdown, calibration, and risk-adjusted metrics
- [ ] Paper/live code-path parity where practical

Completion gate: results pass predefined validation thresholds rather than
being promoted because they look impressive.

## Phase 14: Customization and learning mode

- [ ] Colors, themes, agent names, appearances, room arrangement, widgets,
      data sources, strategies, risk limits, and animation intensity
- [ ] In-app and macOS notifications; urgent email notifications
- [ ] Explanations of architecture, data flow, calculations, and decisions

Completion gate: customization cannot bypass financial or credential safety.

## Phase 15: Small MCP connection

- [ ] Read-only system, run, report, portfolio, and performance tools
- [ ] Explicitly approved mission, pause, and resume tools
- [ ] Minimal tool metadata and disabled-by-default risky actions

Completion gate: Codex can inspect the app without exposing secrets or making a
trade, and write actions require deliberate approval.

## Phase 16: Public portfolio demonstration

- [ ] Public repository and documentation
- [ ] Screenshots/video
- [ ] Optional sanitized simulated demo mode
- [ ] Verify separation from private operational data

Completion gate: an unauthenticated visitor cannot discover any private record
or credential.

## Phase 17: Deployment and live-trading decision

- [ ] Decide whether any always-on component is justified.
- [ ] Define objective paper-performance and operational gates.
- [ ] Select a supported broker integration only after validation.
- [ ] Keep all live trading disabled until separately authorized.
- [ ] If live trading is authorized, begin with explicit caps, visible kill
      switches, and approval rules.
- [ ] Ask the user whether to design and implement the future 3D spaceship.

Completion gate: live operation requires a separate reviewed specification and
explicit user approval; it is not implied by completing the paper system.
