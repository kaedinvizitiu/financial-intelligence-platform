import { agents } from "@/lib/agent-definitions";

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-8 sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="flex flex-col gap-5 border-b border-violet-300/15 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Command deck · local mode</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl">
              Financial Tracker
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-violet-100/65">
              The foundation is online. Market data, Supabase, Ollama, and paper
              execution remain disconnected until their gated phases.
            </p>
          </div>
          <div className="status-chip" role="status">
            <span className="status-dot" aria-hidden="true" />
            Paper-only safety mode
          </div>
        </header>

        <section aria-labelledby="agents-heading">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="eyebrow">Crew manifest</p>
              <h2
                id="agents-heading"
                className="mt-2 text-2xl font-medium text-white"
              >
                Three-agent workspace
              </h2>
            </div>
            <p className="hidden font-mono text-xs uppercase tracking-[0.22em] text-violet-200/45 sm:block">
              Phase 03 / scaffold
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {agents.map((agent, index) => (
              <article className="agent-card" key={agent.name}>
                <div className="flex items-start justify-between gap-4">
                  <span className="agent-index">0{index + 1}</span>
                  <span className="text-xs text-violet-200/50">Standby</span>
                </div>
                <h3 className="mt-10 text-xl font-medium text-white">
                  {agent.name}
                </h3>
                <p className="mt-2 text-sm text-violet-100/55">{agent.role}</p>
                <p className="mt-8 border-t border-violet-300/10 pt-4 font-mono text-xs uppercase tracking-[0.16em] text-fuchsia-200/70">
                  {agent.status}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="grid gap-4 sm:grid-cols-3"
          aria-label="System status"
        >
          <div className="metric-card">
            <span>API</span>
            <strong>Local</strong>
          </div>
          <div className="metric-card">
            <span>Database</span>
            <strong>Not connected</strong>
          </div>
          <div className="metric-card">
            <span>Live trading</span>
            <strong>Disabled</strong>
          </div>
        </section>
      </div>
    </main>
  );
}
