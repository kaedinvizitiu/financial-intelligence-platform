# Project status

Last updated: 2026-11-13

## Current state

- The public GitHub repository is connected at
  `https://github.com/kaedinvizitiu/financial-intelligence-platform`.
- `main` tracks `origin/main`; the first project-foundation commit has been
  pushed.
- The local server-only Supabase credential is stored in the ignored local
  environment file; no privileged credential is committed or exposed to the
  browser.
- A Free Supabase organization and project now exist for Financial Tracker at
  `vtacthvtjcyrqfdexvkx` in `us-east-1`; the server-only secret remains outside
  chat and is stored in the ignored local environment file.
- The Supabase CLI is installed as a project dev dependency, initialized, and
  linked to hosted project `vtacthvtjcyrqfdexvkx`.
- The Phase 4 migration is applied. Local Python code successfully wrote a
  harmless `phase4-connectivity-check` record through the server-only client.
- The remote Supabase migration history is reconciled with the checked-in
  migration; local and remote version `20261112160000` now match.
- Unused temporary CLI tokens were revoked. The active browser-authenticated
  CLI token remains in Supabase and is not stored in the repository.
- Phase 5 data-model migration `20261113090000` is applied to Supabase and
  generated TypeScript database types are checked in.
- Phase 5 now models paper portfolios, strategies, research missions, sources,
  normalized facts, agent runs, reports, signals, approvals, paper orders,
  fills, positions, and append-only events with provenance, freshness, and
  versioning fields.
- The deterministic simulated AMD mission replay completed against Supabase:
  evidence was recorded, the report returned `INSUFFICIENT_DATA`, the signal
  was `NO_ACTION`, and zero paper orders were created.
- `pnpm agents:replay` is idempotent for the fixture; immutable events are
  inserted with duplicate-ignore semantics so replay never updates audit
  history.
- Phase 6 dashboard shell is implemented with Quantum Violet tokens,
  conventional navigation, a responsive layout, paper-mode guardrails, and a
  shared-state dashboard/2D ship-view toggle.
- Product discovery is sufficiently complete to create the repository and
  scaffold, while several implementation choices remain intentionally open.
- Root project guidance and durable context documents now exist locally.
- Phase 3 was merged into `main` through pull request #1: a minimal Quantum
  Violet Next.js dashboard, local FastAPI health service, safe worker CLI,
  shared commands, tests, and production build.
- `pnpm agents:daily` is deliberately a no-side-effect scaffold command. It
  fetches no data and creates no orders.

## Active phase

Phase 7: One vertical slice.

## Next action

Connect the visible dashboard to one manual end-of-day mission flow so a user
can inspect evidence, the structured report, score, and paper decision.

## Verification

- `pnpm lint`: passed
- `pnpm typecheck`: passed
- `pnpm test`: passed (2 TypeScript and 4 Python tests)
- `pnpm build`: passed
- `pnpm dev`: dashboard returned HTTP 200 and API `/health` returned `status=ok`
- Desktop and 390 px responsive layouts inspected; no horizontal overflow
- Phase 5 replay: completed simulated AMD mission; `NO_ACTION`; zero paper
  orders
- Phase 5 checks: 6 Python tests passed, Ruff passed, mypy passed, and remote
  Supabase records were verified through the protected server-side path
- `pnpm agents:replay`: passed on a repeat run with no order creation
- Phase 6 web checks: lint, typecheck, tests, and production build passed
- Phase 6 visual check: dashboard and ship views rendered with responsive
  navigation and shared mission-state content

## Near-term questions to resolve by experiment

- Which small quantized Ollama model provides acceptable report quality, speed,
  and memory use on the user's M2 Mac with 8 GB unified memory
- Exact local model and context size after benchmarking
- Exact free news and options-chain providers
- Exact daily run time and macOS scheduling behavior
- Final live broker choice and every live-trading threshold (much later)

## Current blockers

None. Ollama is the selected default local-model runtime, but installing it is
not required before the first deterministic vertical slice.

## Deferred reminders

- Do not configure macOS automation yet. After the GitHub repository, local app
  scaffold, Supabase foundation, and working `pnpm agents:daily` command are
  complete, remind the user to configure it.
- At that point, use `pmset` to wake the Mac shortly before the run, `launchd`
  to schedule the command, and `caffeinate` to keep the Mac awake during it.
- Implement missed-run recovery and verify that the automation cannot start a
  duplicate daily run.
