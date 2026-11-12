# Three-agent architecture

## Shared mission model

A research mission can target:

- one stock;
- one ETF;
- a basket of securities;
- a sector or theme;
- the overall market;
- a strategy.

Each mission records its target type, symbols/universe, objective, benchmark,
time horizon, trigger, data cutoff, and status.

## Agent 1: Research

Responsibilities:

- collect permitted source material;
- retain raw evidence where licensing allows;
- normalize facts, metrics, and timestamps;
- distinguish filing/report periods from publication/availability dates;
- detect new or changed evidence;
- identify missing, stale, and conflicting data;
- write source provenance and ingestion events.

Initial source categories:

1. SEC filings and XBRL financial statements
2. Historical price and volume
3. Earnings results
4. Earnings transcripts
5. ETF holdings
6. Macroeconomic data
7. News

Agent 1 should use deterministic collection and parsing first. Model-assisted
extraction must be cached and traceable to source text.

## Agent 2: Analysis

Agent 2 reads the smallest relevant evidence set and creates a decision packet:

- executive summary;
- fundamental analysis;
- price/technical condition;
- market and sector regime;
- catalysts and risks;
- bull and bear cases;
- contradictory evidence;
- data freshness and quality;
- score from -100 to +100;
- confidence and its basis;
- intended time horizon;
- thesis invalidation conditions;
- recommended action;
- source citations.

Allowed outcomes include `INSUFFICIENT_DATA`, `CONFLICTING_EVIDENCE`, and
`NO_ACTION`. Agent 2 must not fabricate a trade merely because a run occurred.

## Agent 3: Portfolio

Agent 3 interprets Agent 2's packet, but deterministic code owns:

- eligibility;
- cash and buying power;
- position sizing;
- concentration and exposure;
- maximum known loss;
- data-freshness gates;
- duplicate-order protection;
- transaction-cost modeling;
- approvals;
- kill switch;
- paper execution and ledger updates.

Initial asset policy:

- long stocks and ETFs;
- no short stock positions;
- paper long calls and puts;
- paper defined-risk option strategies;
- no naked option writing.

## Trigger types

All triggers create the same mission object and enter the same idempotent queue:

- manual;
- scheduled daily;
- filing/earnings event;
- price/volatility event;
- strategy test.

They will be implemented incrementally in that order rather than as separate
agent systems.

## Observability

The UI must show for every agent:

- current mission;
- state and progress;
- current action;
- sources in use;
- recent outputs;
- errors and retry status;
- decision confidence;
- approval or safety blocks.
