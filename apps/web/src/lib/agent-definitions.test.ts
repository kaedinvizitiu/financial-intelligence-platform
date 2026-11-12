import { describe, expect, it } from "vitest";

import { agents, safetyMode } from "./agent-definitions";

describe("agent definitions", () => {
  it("keeps exactly three primary agents", () => {
    expect(agents).toHaveLength(3);
  });

  it("starts in paper-only mode", () => {
    expect(safetyMode).toBe("paper-only");
    expect(agents.at(-1)?.status).toBe("Trading disabled");
  });
});
