# Project status

Last updated: 2026-11-12

## Current state

- The public GitHub repository is connected at
  `https://github.com/kaedinvizitiu/financial-intelligence-platform`.
- `main` tracks `origin/main`; the first project-foundation commit has been
  pushed.
- The user has an existing Supabase account, but no project credential has been
  copied into this workspace.
- Product discovery is sufficiently complete to create the repository and
  scaffold, while several implementation choices remain intentionally open.
- Root project guidance and durable context documents now exist locally.

## Active phase

Phase 3: Local workspace scaffold.

## Next action

Create the minimal Next.js/TypeScript dashboard and Python API/worker workspace,
then establish lint, type-check, test, build, and one root development command.

## Near-term questions to resolve by experiment

- Which small quantized Ollama model provides acceptable report quality, speed,
  and memory use on the user's M2 Mac with 8 GB unified memory
- Exact local model and context size after benchmarking
- Exact free news and options-chain providers
- Exact daily run time and macOS scheduling behavior
- Final live broker choice and every live-trading threshold (much later)

## Current blockers

None. Ollama is the selected default local-model runtime, but installing it is
not required before repository setup or the first deterministic vertical slice.

## Deferred reminders

- Do not configure macOS automation yet. After the GitHub repository, local app
  scaffold, Supabase foundation, and working `pnpm agents:daily` command are
  complete, remind the user to configure it.
- At that point, use `pmset` to wake the Mac shortly before the run, `launchd`
  to schedule the command, and `caffeinate` to keep the Mac awake during it.
- Implement missed-run recovery and verify that the automation cannot start a
  duplicate daily run.
