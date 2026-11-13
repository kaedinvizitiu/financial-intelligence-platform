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

## Interactive-world research

These projects were reviewed as inspiration for the future living spaceship
view. They are references, not adopted dependencies or code to copy blindly.

- [Command Mesh](https://github.com/Deemer15/command-mesh): MIT-licensed,
  forked from Lot Map. Its strongest pattern is an append-only event stream
  rendered as an animated operations grid; independent writers append events,
  while the dashboard redraws roughly every 800 ms. Adapt the event-to-motion
  idea to the three financial agents and Supabase events.
- [The Roving Office](https://github.com/atlassian-labs/roving-office):
  Apache-2.0, with explicit asset/trademark caveats. Its strongest pattern is
  making the room itself the status board: agents walk to stations, work,
  pause, and leave visible artifacts. Use the state-machine idea, not its
  artwork or branding.
- [AI Office](https://github.com/Gaurav2693/ai-office): an interactive
  Three.js diorama with animated agents, screens, and environment details. Use
  it as a reference for the later 3D extension; do not make 3D a prerequisite
  for the first usable ship.
- [Agent Town](https://github.com/rafapetter/agent-town): a procedural Canvas
  2D renderer with themed environments and requestAnimationFrame behavior.
  Its space-station and rocket-launch themes are useful references for a
  lighter 2D/isometric implementation with lower runtime cost.
- [Overscan UI](https://github.com/overscan-ui/overscan): MIT-licensed sci-fi
  instrument components. Its strongest product lesson is that animated
  readouts should visibly say when data is stale, missing, disputed, or
  unrepresentable instead of inventing visual certainty.

No interactive-world dependency is selected yet. Before implementation, recheck
current licenses, asset rights, maintenance, browser performance, and fit with
the existing Next.js app.

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
- [Three.js](https://github.com/mrdoob/three.js) — MIT licensed; selected at
  `0.187.0` for the procedural WebGL/WebGPU-capable ship scene. It is mature
  and broadly maintained, but scene complexity and GPU usage must be kept
  bounded for the user's M2 Mac with 8 GB unified memory.
- [React Three Fiber](https://github.com/pmndrs/react-three-fiber) — MIT
  licensed; selected at `9.8.2` because its v9 line pairs with React 19 and
  gives the ship interactive React components without a separate scene state
  system.
- [Drei](https://github.com/pmndrs/drei) — MIT licensed; selected at `10.7.9`
  for maintained helpers such as orbit controls, labels, stars, and lines.
  Keep imports narrow and remove helpers that do not earn their runtime cost.

Versions are locked in `pnpm-lock.yaml` or the current Python environment and
bounded in the project manifests. Recheck licenses, maintenance, and release
notes before major upgrades.
