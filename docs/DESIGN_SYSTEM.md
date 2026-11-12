# Design system direction

This is a starting direction, not a finalized screen specification.

## Experience concept

Financial Tracker is a Quantum Violet digital trading spaceship. The user can
navigate an interactive 2D/isometric ship or switch to a conventional dashboard.
Both views operate on the same routes and data.

Proposed locations:

- Data Observatory: Research Agent
- Strategy Core: Analysis Agent
- Exchange Bridge: Portfolio Agent
- Captain's Console: approvals, overrides, and kill switch
- Archive Bay: reports and evidence
- Simulation Deck: backtests and paper portfolio
- Engineering Bay: data sources, agent configuration, and system health

Agent concept:

- one robot;
- one holographic intelligence;
- one humanoid crew member.

Their personalities should be memorable but their financial output remains
professional. Names, appearance, and personality controls are future settings.

## Quantum Violet palette

- Background: `#07060D`
- Primary surface: `#11101A`
- Elevated surface: `#181526`
- Violet: `#A78BFA`
- Magenta: `#EC4899`
- Cyan: `#38BDF8`
- Positive: `#34D399`
- Warning: `#F59E0B`
- Negative: `#EF4444`
- Main text: `#F2EEFF`
- Muted text: `#A39AB8`

These tokens will be checked for readable contrast before implementation.

## Typography

- Headings: Space Grotesk
- Body and interface: Inter
- Financial figures, identifiers, and code: JetBrains Mono

## Motion

Start balanced:

- agent movement and state changes;
- glowing active stations;
- chart transitions;
- subtle particles and ambient effects;
- visible waiting, success, warning, and error states.

Provide reduced-motion behavior. Preserve cinematic and 3D extension points but
do not make them requirements for the functional product. At the end of the
primary build, ask the user whether to begin the 3D spaceship phase.

## Future customization

- palette and theme;
- agent names, appearance, and personalities;
- room arrangement;
- dashboard widgets;
- data sources;
- analysis strategies;
- risk limits within enforced safety ceilings;
- animation intensity.
