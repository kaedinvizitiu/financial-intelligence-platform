"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { agents } from "@/lib/agent-definitions";

const ShipScene = dynamic(() => import("@/components/ShipScene"), { ssr: false });

type ViewMode = "dashboard" | "ship";
type Focus = "command" | "research" | "analysis" | "portfolio" | "archive" | "simulation";
type MissionTrace = {
  mission: { mission_key: string; status: string; is_simulated: boolean };
  sources: Array<{ title: string; provider: string; freshness_status: string }>;
  normalized_facts: Array<{ fact_key: string; value_text: string | null }>;
  agent_runs: Array<{ agent_type: string; status: string; model_provider: string | null }>;
  reports: Array<{ outcome: string; score: number | null; confidence: number | null; executive_summary: string }>;
  signals: Array<{ action: string; rationale: string | null }>;
  approvals: Array<{ status: string; approval_type: string; reason: string | null }>;
  paper_orders: Array<{ id: string }>;
  events: Array<{ event_type: string; occurred_at: string }>;
};

const missionKey = "fixture-amd-2026-11-12";
const navItems: Array<{ label: string; icon: string; focus: Focus }> = [
  { label: "Command", icon: "⌂", focus: "command" },
  { label: "Observatory", icon: "◉", focus: "research" },
  { label: "Strategy Core", icon: "◇", focus: "analysis" },
  { label: "Exchange Bridge", icon: "↗", focus: "portfolio" },
  { label: "Archive Bay", icon: "▤", focus: "archive" },
  { label: "Simulation Deck", icon: "⌁", focus: "simulation" },
];

export default function Home() {
  const [view, setView] = useState<ViewMode>("dashboard");
  const [focus, setFocus] = useState<Focus>("command");
  const [trace, setTrace] = useState<MissionTrace | null>(null);
  const [traceError, setTraceError] = useState(false);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/missions/${missionKey}`)
      .then((response) => { if (!response.ok) throw new Error("Mission request failed"); return response.json() as Promise<MissionTrace>; })
      .then(setTrace)
      .catch(() => setTraceError(true));
  }, []);

  function selectFocus(nextFocus: Focus, switchToDashboard = false) {
    setFocus(nextFocus);
    if (switchToDashboard) setView("dashboard");
  }

  return <main className="app-shell">
    <aside className="sidebar" aria-label="Primary navigation">
      <div className="brand-lockup"><div className="brand-mark" aria-hidden="true"><span /><span /><span /></div><div><p className="brand-name">Financial Tracker</p><p className="brand-subtitle">Quantum Violet OS</p></div></div>
      <div className="sidebar-section-label">Ship systems</div>
      <nav className="nav-list">{navItems.map((item) => <button className={`nav-item ${focus === item.focus ? "active" : ""}`} key={item.label} onClick={() => selectFocus(item.focus, view === "dashboard")} type="button"><span className="nav-icon" aria-hidden="true">{item.icon}</span><span>{item.label}</span>{focus === item.focus && <span className="nav-pip" aria-hidden="true" />}</button>)}</nav>
      <div className="sidebar-footer"><div className="system-status"><span className="status-dot" aria-hidden="true" /><div><span className="system-status-label">System status</span><strong>All local systems ready</strong></div></div><button className="settings-link" type="button">⚙ Settings</button></div>
    </aside>
    <section className="workspace">
      <header className="topbar"><div><p className="eyebrow">Captain&apos;s console / paper environment</p><h1>Good evening, Kaedin</h1></div><div className="topbar-actions"><div className="mode-switch" role="group" aria-label="View mode"><button className={view === "dashboard" ? "selected" : ""} onClick={() => setView("dashboard")} type="button">Dashboard</button><button className={view === "ship" ? "selected" : ""} onClick={() => setView("ship")} type="button">Ship view</button></div><div className="avatar" aria-label="Kaedin profile">K</div></div></header>
      <div className="workspace-content">{view === "dashboard" ? <DashboardView trace={trace} traceError={traceError} focus={focus} onFocus={selectFocus} /> : <ShipView trace={trace} focus={focus} onFocus={selectFocus} />}</div>
    </section>
  </main>;
}

function DashboardView({ trace, traceError, focus, onFocus }: { trace: MissionTrace | null; traceError: boolean; focus: Focus; onFocus: (focus: Focus) => void }) {
  const report = trace?.reports[0];
  const signal = trace?.signals[0];
  const decision = signal?.action ?? "NO_ACTION";
  const connectedLabel = trace ? "Supabase connected" : traceError ? "Using local preview" : "Loading mission";
  return <>
    <section className="hero-grid" aria-label="Portfolio overview"><div className="hero-card"><div className="hero-card-heading"><div><p className="eyebrow">Learning paper portfolio</p><h2>Mission control</h2></div><span className="live-badge"><span className="status-dot" /> Paper only</span></div><div className="hero-metrics"><div><span className="metric-label">Portfolio value</span><strong className="hero-value">$100,000.00</strong><span className="metric-change positive-text">+$0.00 <small>today</small></span></div><div className="hero-chart" aria-label="Portfolio value is flat because this is a new paper portfolio"><svg viewBox="0 0 360 100" role="img" aria-hidden="true"><defs><linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#a78bfa" stopOpacity=".26" /><stop offset="1" stopColor="#a78bfa" stopOpacity="0" /></linearGradient></defs><path d="M0 73 C35 72 42 76 78 70 S126 73 160 64 S207 67 244 55 S300 61 360 47 L360 100 L0 100Z" fill="url(#chart-fill)" /><path d="M0 73 C35 72 42 76 78 70 S126 73 160 64 S207 67 244 55 S300 61 360 47" fill="none" stroke="#a78bfa" strokeWidth="2.5" /></svg><div className="chart-axis"><span>Nov 08</span><span>Nov 12</span></div></div></div></div><div className="status-panel"><p className="eyebrow">{connectedLabel}</p><div className="cycle-icon">◌</div><h3>AMD mission replay</h3><p>{report?.outcome ?? "Completed with a fail-closed decision."}</p><div className="cycle-result"><span>Decision</span><strong>{decision.replace("_", " ")}</strong></div><button className="text-button" onClick={() => onFocus("archive")} type="button">Open mission trace <span>→</span></button></div></section>
    <section className="section-block" aria-labelledby="crew-title"><div className="section-heading"><div><p className="eyebrow">Crew manifest</p><h2 id="crew-title">Agent stations</h2></div><span className="section-note">3 primary agents / local runtime</span></div><div className="agent-grid">{agents.map((agent, index) => <button className={`station-card station-button ${index === 0 ? "" : ""}`} key={agent.name} onClick={() => onFocus(index === 0 ? "research" : index === 1 ? "analysis" : "portfolio")} type="button"><div className={`agent-orb orb-${index + 1}`} aria-hidden="true"><span>{index + 1}</span></div><div className="station-copy"><div className="station-topline"><h3>{agent.name}</h3><span className="standby">Standby</span></div><p>{agent.role}</p><span className="station-status">{agent.status}</span></div></button>)}</div></section>
    <section className="section-block trace-block" aria-labelledby="trace-title"><div className="section-heading"><div><p className="eyebrow">Evidence to decision</p><h2 id="trace-title">Latest mission trace</h2></div><span className="trace-id">{trace?.mission.mission_key ?? missionKey}</span></div><div className="trace-card"><div className="trace-line" aria-hidden="true" /><TraceStep number="01" label="Research Agent" detail={`${trace?.normalized_facts.length ?? 2} normalized facts recorded`} status="Complete" onClick={() => onFocus("research")} /><TraceStep number="02" label="Analysis Agent" detail={`Report scored ${report?.score ?? "+18"} / confidence ${report?.confidence ? `${Math.round(report.confidence * 100)}%` : "62%"}`} status="Insufficient data" warning onClick={() => onFocus("analysis")} /><TraceStep number="03" label="Portfolio Agent" detail={`No order created; ${trace?.paper_orders.length ?? 0} paper orders`} status="No action" onClick={() => onFocus("portfolio")} /></div></section>
    <section className="bottom-grid"><div className="facts-card"><div className="section-heading compact"><div><p className="eyebrow">AMD / simulated evidence</p><h2>Signal inputs</h2></div><span className="freshness"><span className="status-dot" /> Fresh</span></div><div className="facts-list"><Fact label="Revenue trend" value={trace?.normalized_facts.find((fact) => fact.fact_key === "revenue_trend")?.value_text ?? "Positive"} tone="positive-text" /><Fact label="Valuation visibility" value={trace?.normalized_facts.find((fact) => fact.fact_key === "valuation_visibility")?.value_text ?? "Insufficient"} tone="warning-text" /><Fact label="Paper orders" value={trace ? String(trace.paper_orders.length) : "Loading"} tone="cyan-text" /></div></div><div className="guardrail-card"><p className="eyebrow">Safety guardrail</p><div className="guardrail-title"><span className="shield-icon">✓</span><h2>Paper mode is active</h2></div><p>Live trading is disabled. Deterministic rules own approvals, limits, and execution.</p><div className="guardrail-footer"><span>Live broker</span><strong>Not connected</strong></div></div></section>
    {focus !== "command" && <MissionDetail focus={focus} trace={trace} />}
  </>;
}

function MissionDetail({ focus, trace }: { focus: Focus; trace: MissionTrace | null }) {
  const report = trace?.reports[0];
  const signal = trace?.signals[0];
  const title = focus === "research" ? "Observatory: evidence" : focus === "analysis" ? "Strategy Core: report" : focus === "portfolio" ? "Exchange Bridge: paper decision" : "Archive Bay: mission record";
  return <section className="mission-detail" aria-live="polite"><div><p className="eyebrow">Interactive station detail</p><h2>{title}</h2></div><div className="detail-grid"><div><span className="detail-label">Mission</span><strong>{trace?.mission.mission_key ?? missionKey}</strong></div><div><span className="detail-label">Outcome</span><strong className="warning-text">{report?.outcome ?? "INSUFFICIENT_DATA"}</strong></div><div><span className="detail-label">Signal</span><strong className="positive-text">{signal?.action ?? "NO_ACTION"}</strong></div><div><span className="detail-label">Source</span><strong>{trace?.sources[0]?.provider ?? "Fixture evidence"}</strong></div><div><span className="detail-label">Agent runs</span><strong>{trace?.agent_runs.length ?? 0} completed</strong></div><div><span className="detail-label">Approval</span><strong>{trace?.approvals[0]?.status ?? "not_required"}</strong></div><div><span className="detail-label">Audit events</span><strong>{trace?.events.length ?? 0} recorded</strong></div><div><span className="detail-label">Paper orders</span><strong>{trace?.paper_orders.length ?? 0} created</strong></div></div><p className="detail-summary">{report?.executive_summary ?? signal?.rationale ?? "The simulated evidence is incomplete, so the system fails closed and creates no paper order."}</p></section>;
}

function Fact({ label, value, tone }: { label: string; value: string; tone: string }) { return <div className="fact-row"><span>{label}</span><strong className={tone}>{value}</strong></div>; }
function TraceStep({ number, label, detail, status, warning = false, onClick }: { number: string; label: string; detail: string; status: string; warning?: boolean; onClick: () => void }) { return <button className="trace-step trace-button" onClick={onClick} type="button"><span className="trace-number">{number}</span><div className={`trace-check ${warning ? "warning" : ""}`}>{warning ? "!" : "✓"}</div><div className="trace-copy"><strong>{label}</strong><span>{detail}</span></div><span className={`trace-status ${warning ? "warning-text" : ""}`}>{status}</span></button>; }
function ShipView({ trace, focus, onFocus }: { trace: MissionTrace | null; focus: Focus; onFocus: (focus: Focus) => void }) { return <div className="ship-view" aria-label="3D ship view"><div className="ship-copy"><p className="eyebrow">Simulation deck / interactive 3D ship</p><h2>Mission control, in orbit.</h2><p>The ship is the primary navigation surface. Orbit the command deck, select a crew station, and inspect what the agents are doing without leaving the ship.</p><div className="ship-legend"><span><i className="legend-dot violet" />Command</span><span><i className="legend-dot cyan" />Research</span><span><i className="legend-dot pink" />Analysis</span></div></div><ShipScene onFocus={onFocus} /><ShipInfoPanel focus={focus} trace={trace} onClose={() => onFocus("command")} /></div>; }

function ShipInfoPanel({ focus, trace, onClose }: { focus: Focus; trace: MissionTrace | null; onClose: () => void }) {
  const report = trace?.reports[0];
  const signal = trace?.signals[0];
  const titles: Record<Focus, string> = { command: "Captain's console", research: "Data Observatory", analysis: "Strategy Core", portfolio: "Exchange Bridge", archive: "Archive Bay", simulation: "Simulation Deck" };
  const descriptions: Record<Focus, string> = {
    command: "The ship is ready. Select a station or crew member to inspect the current mission.",
    research: `${trace?.normalized_facts.length ?? 0} normalized facts are attached to this mission, from ${trace?.sources[0]?.provider ?? "the evidence fixture"}.`,
    analysis: `${report?.outcome ?? "Waiting for report"}. Score ${report?.score ?? "—"}; confidence ${report?.confidence ? `${Math.round(report.confidence * 100)}%` : "—"}.`,
    portfolio: `Portfolio decision: ${signal?.action ?? "NO_ACTION"}. ${trace?.paper_orders.length ?? 0} paper orders created.`,
    archive: `${trace?.events.length ?? 0} immutable audit events and ${trace?.approvals.length ?? 0} approval record are attached to this mission.`,
    simulation: "Paper-only simulation deck. No live broker is connected and no real order can be placed.",
  };
  return <aside className={`ship-info-panel ${focus === "command" ? "command-panel" : ""}`} aria-live="polite"><div className="ship-info-heading"><div><p className="eyebrow">In-world telemetry</p><h3>{titles[focus]}</h3></div>{focus !== "command" && <button className="panel-close" onClick={onClose} type="button" aria-label="Close station panel">×</button>}</div><p className="ship-info-copy">{descriptions[focus]}</p><div className="ship-info-readout"><span>MISSION</span><strong>{trace?.mission.mission_key ?? missionKey}</strong></div><div className="ship-info-readout"><span>STATE</span><strong className={focus === "portfolio" ? "positive-text" : "cyan-text"}>{trace?.mission.status ?? "loading"}</strong></div></aside>;
}
