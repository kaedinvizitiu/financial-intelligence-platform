# Financial Tracker project context

## Vision

Financial Tracker is a portfolio-grade financial-intelligence system and a
learning project. It should demonstrate finance, AI-agent workflows, Python,
Next.js, databases, APIs, Git/GitHub, testing, and risk-aware automation.

The private operating application will run locally at first and use Supabase as
its shared cloud database. GitHub will version the code and documentation. Codex
will build, modify, test, and optionally inspect the application through a small
MCP connection, but the application must continue running without Codex open.

## Product loop

1. A research mission targets a stock, ETF, basket, sector, market, or strategy.
2. The Research Agent collects and normalizes relevant point-in-time evidence.
3. The Analysis Agent turns that evidence into a cited, structured report and a
   score from -100 to +100.
4. The Portfolio Agent applies deterministic portfolio and risk rules.
5. Qualifying paper trades may execute automatically and are written to an
   append-only audit history.
6. The dashboard shows what every agent is doing and why.

## Initial universe and cadence

- Companies: Microsoft, Amazon, Nvidia, and AMD
- ETFs: VUG and QQQ
- Benchmark: SPY
- Initial cadence: end-of-day
- Future cadence: event-driven and intraday after the daily system is validated

The universe is an engineering starting point, not a permanent strategy or an
investment recommendation.

## Runtime and cost objective

The user does not want recurring out-of-pocket costs beyond the existing $20
monthly ChatGPT subscription. The architecture must therefore:

- default paid AI APIs to off;
- use deterministic Python wherever possible;
- use Ollama as the default local model provider while keeping it replaceable;
- use free data tiers initially;
- fail closed rather than silently creating paid usage;
- allow Codex-assisted reviews only when the user requests them.

An M2 Mac with 8 GB unified memory is the initial local machine. Ollama is the
planned default local runtime for Agent 2. The exact small quantized model and
context size will be selected by a quality, speed, and memory benchmark before
it becomes a required installation.

## Public portfolio presentation

The real operating application and its data remain private. The public-facing
portfolio may include:

- a public source repository;
- architecture and learning documentation;
- screenshots and video;
- a later demo mode with simulated or sanitized records.

It must not expose private Supabase rows, credentials, balances, approvals,
broker information, or personal strategies.
