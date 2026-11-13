# Durable decisions and open questions

## Confirmed

- Working name: Financial Tracker.
- The private operating app and sanitized public portfolio presentation are
  separate surfaces.
- Three primary agents: Research, Analysis, and Portfolio.
- Initial universe: MSFT, AMZN, NVDA, AMD, VUG, and QQQ.
- Benchmark: SPY.
- Initial cadence: end-of-day; intraday comes later.
- Initial sources: SEC/XBRL, price and volume, earnings results, earnings
  transcripts, ETF holdings, macroeconomic data, and news.
- Analysis output includes a -100 to +100 score, confidence, cited evidence,
  time horizon, risks, catalysts, bull/bear cases, contradictory evidence, data
  quality, and thesis invalidation conditions.
- No short stock positions.
- Qualifying paper stock and ETF trades do not need manual approval.
- Options are supported during paper trading. Paper options may execute without
  manual approval after hard risk checks.
- No naked option writing. Begin with long calls, long puts, and defined-risk
  strategies.
- If live trading is later approved, small qualifying stock/ETF trades may be
  autonomous, larger trades require approval, and live options initially
  require approval.
- UI: Quantum Violet digital trading spaceship plus a conventional dashboard.
- Start with a polished 2D/isometric world and preserve room for a later 3D
  spaceship.
- When implementing the full ship UI, research polished open-source
  spaceship/isometric dashboard examples first, verify their licenses and
  maintenance, and build a visually strong, meaningfully interactive result
  suitable for demonstration.
- Agent visual concept: one robot, one holographic intelligence, and one
  humanoid.
- Agent personalities are memorable but professional and later customizable.
- All requested customization categories remain in the long-term scope.
- Include learning mode.
- Notifications: in-app and macOS; email for urgent events.
- Use free news/data sources initially unless spending is later justified and
  explicitly approved.
- A small MCP connection is desirable.
- The repository is public, but an open-source license will not be granted
  until the user deliberately selects one.
- Do not use Ponytail mode unless explicitly re-enabled.

## Provisional recommendations

- Use deterministic Python for collection, financial calculation, validation,
  and risk.
- Use Ollama as Agent 2's default local model runtime and benchmark small
  quantized models before selecting the exact model and context size.
- Keep AI providers replaceable and paid API support disabled by default.
- Run a macOS background worker for daily jobs; add cloud execution only if its
  cost and reliability are justified.
- Use a public code repository, private operational data, public screenshots and
  video, and possibly a later simulated demo mode.

## Not yet decided

- Exact Ollama model, context size, and whether benchmarked report quality is
  sufficient for each Agent 2 task
- Exact free news API/provider and licensing terms
- Exact market/options data provider
- Daily schedule time and missed-run behavior
- Agent names
- Exact definitions of small and large live trades
- Paper-to-live validation thresholds
- Live broker provider
- Deployment host, if any
- Open-source license, if any
- Final 3D spaceship design
