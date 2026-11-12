# Open-source evaluation registry

Prefer projects with more than 1,000 GitHub stars when they fit, but stars are
only a discovery filter. Verify the current license, maintenance, security, API
stability, and suitability immediately before adoption.

## UI candidates

- [shadcn/ui](https://github.com/shadcn-ui/ui): customizable accessible UI
  components; recommended candidate.
- [Magic UI](https://github.com/magicuidesign/magicui): selective futuristic
  effects; recommended candidate, not a reason to animate everything.
- [Recharts](https://github.com/recharts/recharts): dashboard and performance
  charts; recommended candidate.
- [TradingView Lightweight Charts](https://github.com/tradingview/lightweight-charts):
  financial price charts; recommended candidate.

## Platform and workflow candidates

- [Supabase](https://github.com/supabase/supabase): selected database platform.
- [LangGraph](https://github.com/langchain-ai/langgraph): orchestration reference
  or dependency only if the workflow complexity justifies it.
- [Ollama](https://github.com/ollama/ollama): selected default local-model
  runtime for Agent 2. The exact small quantized model remains subject to a
  quality, speed, and memory benchmark on the user's M2 Mac with 8 GB.

## Financial-data and agent references

- [EdgarTools](https://github.com/dgunning/edgartools): SEC filings and XBRL;
  strong candidate.
- [yfinance](https://github.com/ranaroussi/yfinance): research/prototype market
  data only; unofficial and subject to source terms and schema changes.
- [TradingAgents](https://github.com/TauricResearch/TradingAgents): study agent
  role boundaries; do not copy the full architecture by default.
- [FinRobot](https://github.com/AI4Finance-Foundation/FinRobot): study report,
  provenance, and verification patterns.
- [ai-hedge-fund](https://github.com/virattt/ai-hedge-fund): study point-in-time
  data, deterministic risk, paper ledger, and backtest/paper parity patterns.

## Selection record format

When a dependency is actually selected, record:

- repository and pinned version;
- evaluation date;
- current license;
- star/activity threshold check;
- exact purpose;
- alternatives considered;
- security or maintenance risks;
- upgrade/removal plan.

Do not adopt AGPL, Commons Clause, abandoned, or unclear-license code without an
explicit license review and user decision.

## Selected foundations

Evaluated 2026-11-12 through the GitHub API. Each selected repository is MIT
licensed, actively maintained, and substantially exceeds the 1,000-star
discovery threshold.

- [Next.js](https://github.com/vercel/next.js) — 143,496 stars; selected at
  `16.4.6` for the TypeScript dashboard. Risk: frequent framework changes, so
  follow the installed version's bundled documentation and keep upgrades
  isolated.
- [FastAPI](https://github.com/fastapi/fastapi) — 104,671 stars; selected at
  `0.162.5` for the local typed API. Only the small framework and Uvicorn server
  are required; the cloud-oriented standard bundle is intentionally avoided.
- [concurrently](https://github.com/open-cli-tools/concurrently) — 7,868 stars;
  selected at `9.2.5` to run the dashboard and API from one root command. It is
  development-only and can be removed if the workspace later adopts a task
  runner.
- [Vitest](https://github.com/vitest-dev/vitest) — 17,377 stars; selected at
  `4.1.12` for fast TypeScript unit tests. It remains development-only.

Versions are locked in `pnpm-lock.yaml` or the current Python environment and
bounded in the project manifests. Recheck licenses, maintenance, and release
notes before major upgrades.
