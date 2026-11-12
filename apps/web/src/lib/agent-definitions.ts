export const agents = [
  {
    name: "Research Agent",
    role: "Evidence collection",
    status: "Scaffold ready",
  },
  {
    name: "Analysis Agent",
    role: "Cited reports and signals",
    status: "Ollama planned",
  },
  {
    name: "Portfolio Agent",
    role: "Risk and paper decisions",
    status: "Trading disabled",
  },
] as const;

export const safetyMode = "paper-only" as const;
