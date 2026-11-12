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
