# Financial, data, and credential safety

This system is an educational research and simulation project. It must not
represent generated analysis as guaranteed financial advice.

## Trading-state defaults

- `paper_trading = true`
- `live_trading = false`
- `allow_short_stock = false`
- `allow_naked_options = false`
- `allow_paid_ai = false`

Live trading requires a separately reviewed specification and explicit user
authorization. Adding broker credentials alone must not activate it.

## Deterministic gates

No model may bypass:

- stale or missing data rejection;
- position and exposure limits;
- maximum known loss;
- cash/buying-power checks;
- allowed instrument/strategy rules;
- duplicate and idempotency checks;
- approval policy;
- daily/portfolio loss limits;
- kill switch.

Failure, timeout, disagreement, or malformed output defaults to no trade.

## Paper options

Paper options are part of the planned first product, after the equity paper
engine. They require modeling and validation of:

- contract multiplier;
- bid/ask spread and liquidity;
- implied volatility and Greeks;
- expiration;
- exercise and assignment;
- strategy legs as an atomic unit;
- transaction costs;
- maximum loss;
- portfolio exposure.

Initial strategies are long calls, long puts, and defined-risk structures. Do
not add naked option writing.

## Backtest integrity

- Use point-in-time data based on when information became available.
- Make decisions at one time and simulate fills only at a later available price.
- Include spreads, commissions, slippage, liquidity, and option multipliers.
- Test for look-ahead, survivorship, fixture, and normalization leakage.
- Use walk-forward and sealed out-of-sample evaluation.
- Compare results with SPY and other relevant passive benchmarks.
- Preserve rejected strategies and failed runs; do not report only winners.

## Secrets and data separation

- Commit `.env.example`, never `.env` or real credentials.
- Frontend code may receive only browser-safe publishable credentials.
- Supabase service credentials and broker credentials remain server-side.
- Public demo data must be separate from private operational data.
- Never place a secret in chat, a commit, a screenshot, a URL, or a command-line
  argument when a secure environment reference is available.

## Cost controls

- No paid API is enabled by default.
- Adding a key does not imply permission to spend.
- Prefer explicit allow flags and provider quotas.
- Stop and ask before enabling a service that can create a new charge.
