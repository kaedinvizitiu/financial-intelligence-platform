"use client";

import { useState } from "react";
import { agents } from "@/lib/agent-definitions";

type ViewMode = "dashboard" | "ship";

const navItems = ["Command", "Observatory", "Strategy Core", "Exchange Bridge", "Archive Bay", "Simulation Deck"];

export default function Home() {
  const [view, setView] = useState<ViewMode>("dashboard");
  return (
    <main className="app-shell">
      <aside className="sidebar" aria-label="Primary navigation">
        <div className="brand-lockup"><div className="brand-mark" aria-hidden="true"><span /><span /><span /></div><div><p className="brand-name">Financial Tracker</p><p className="brand-subtitle">Quantum Violet OS</p></div></div>
        <div className="sidebar-section-label">Ship systems</div>
        <nav className="nav-list">{navItems.map((item, index) => <button className={`nav-item ${index === 0 ? "active" : ""}`} key={item} type="button"><span className="nav-icon" aria-hidden="true">{["⌂", "◉", "◇", "↗", "▤", "⌁"][index]}</span><span>{item}</span>{index === 0 && <span className="nav-pip" aria-hidden="true" />}</button>)}</nav>
        <div className="sidebar-footer"><div className="system-status"><span className="status-dot" aria-hidden="true" /><div><span className="system-status-label">System status</span><strong>All local systems ready</strong></div></div><button className="settings-link" type="button">⚙ Settings</button></div>
      </aside>
      <section className="workspace">
        <header className="topbar"><div><p className="eyebrow">Captain&apos;s console / paper environment</p><h1>Good evening, Kaedin</h1></div><div className="topbar-actions"><div className="mode-switch" role="group" aria-label="View mode"><button className={view === "dashboard" ? "selected" : ""} onClick={() => setView("dashboard")} type="button">Dashboard</button><button className={view === "ship" ? "selected" : ""} onClick={() => setView("ship")} type="button">Ship view</button></div><div className="avatar" aria-label="Kaedin profile">K</div></div></header>
        <div className="workspace-content">{view === "dashboard" ? <DashboardView /> : <ShipView />}</div>
      </section>
    </main>
  );
}

function DashboardView() {
  return <>
    <section className="hero-grid" aria-label="Portfolio overview"><div className="hero-card"><div className="hero-card-heading"><div><p className="eyebrow">Learning paper portfolio</p><h2>Mission control</h2></div><span className="live-badge"><span className="status-dot" /> Paper only</span></div><div className="hero-metrics"><div><span className="metric-label">Portfolio value</span><strong className="hero-value">$100,000.00</strong><span className="metric-change positive-text">+$0.00 <small>today</small></span></div><div className="hero-chart" aria-label="Portfolio value is flat because this is a new paper portfolio"><svg viewBox="0 0 360 100" role="img" aria-hidden="true"><defs><linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#a78bfa" stopOpacity=".26" /><stop offset="1" stopColor="#a78bfa" stopOpacity="0" /></linearGradient></defs><path d="M0 73 C35 72 42 76 78 70 S126 73 160 64 S207 67 244 55 S300 61 360 47 L360 100 L0 100Z" fill="url(#chart-fill)" /><path d="M0 73 C35 72 42 76 78 70 S126 73 160 64 S207 67 244 55 S300 61 360 47" fill="none" stroke="#a78bfa" strokeWidth="2.5" /></svg><div className="chart-axis"><span>Nov 08</span><span>Nov 12</span></div></div></div></div><div className="status-panel"><p className="eyebrow">Current cycle</p><div className="cycle-icon">◌</div><h3>AMD mission replay</h3><p>Completed with a fail-closed decision.</p><div className="cycle-result"><span>Decision</span><strong>NO ACTION</strong></div><button className="text-button" type="button">Open mission trace <span>→</span></button></div></section>
    <section className="section-block" aria-labelledby="crew-title"><div className="section-heading"><div><p className="eyebrow">Crew manifest</p><h2 id="crew-title">Agent stations</h2></div><span className="section-note">3 primary agents / local runtime</span></div><div className="agent-grid">{agents.map((agent, index) => <article className="station-card" key={agent.name}><div className={`agent-orb orb-${index + 1}`} aria-hidden="true"><span>{index + 1}</span></div><div className="station-copy"><div className="station-topline"><h3>{agent.name}</h3><span className="standby">Standby</span></div><p>{agent.role}</p><span className="station-status">{agent.status}</span></div></article>)}</div></section>
    <section className="section-block trace-block" aria-labelledby="trace-title"><div className="section-heading"><div><p className="eyebrow">Evidence to decision</p><h2 id="trace-title">Latest mission trace</h2></div><span className="trace-id">fixture-amd-2026-11-12</span></div><div className="trace-card"><div className="trace-line" aria-hidden="true" /><TraceStep number="01" label="Research Agent" detail="2 normalized facts recorded" status="Complete" /><TraceStep number="02" label="Analysis Agent" detail="Report scored +18 / confidence 62%" status="Insufficient data" warning /><TraceStep number="03" label="Portfolio Agent" detail="No order created; safety rules held" status="No action" /></div></section>
    <section className="bottom-grid"><div className="facts-card"><div className="section-heading compact"><div><p className="eyebrow">AMD / simulated evidence</p><h2>Signal inputs</h2></div><span className="freshness"><span className="status-dot" /> Fresh</span></div><div className="facts-list"><Fact label="Revenue trend" value="Positive" tone="positive-text" /><Fact label="Valuation visibility" value="Insufficient" tone="warning-text" /><Fact label="Data freshness" value="Fresh" tone="cyan-text" /></div></div><div className="guardrail-card"><p className="eyebrow">Safety guardrail</p><div className="guardrail-title"><span className="shield-icon">✓</span><h2>Paper mode is active</h2></div><p>Live trading is disabled. Deterministic rules own approvals, limits, and execution.</p><div className="guardrail-footer"><span>Live broker</span><strong>Not connected</strong></div></div></section>
  </>;
}

function Fact({ label, value, tone }: { label: string; value: string; tone: string }) { return <div className="fact-row"><span>{label}</span><strong className={tone}>{value}</strong></div>; }
function TraceStep({ number, label, detail, status, warning = false }: { number: string; label: string; detail: string; status: string; warning?: boolean }) { return <div className="trace-step"><span className="trace-number">{number}</span><div className={`trace-check ${warning ? "warning" : ""}`}>{warning ? "!" : "✓"}</div><div className="trace-copy"><strong>{label}</strong><span>{detail}</span></div><span className={`trace-status ${warning ? "warning-text" : ""}`}>{status}</span></div>; }
function ShipView() { return <div className="ship-view" aria-label="2D ship view"><div className="ship-copy"><p className="eyebrow">Simulation deck / isometric preview</p><h2>Mission control, in orbit.</h2><p>The ship view and dashboard use the same mission state. Select a station to explore it as the world grows.</p><div className="ship-legend"><span><i className="legend-dot violet" />Command</span><span><i className="legend-dot cyan" />Research</span><span><i className="legend-dot pink" />Analysis</span></div></div><div className="ship-diagram" aria-hidden="true"><div className="ship-core"><span>FT</span></div><div className="ship-ring ring-one" /><div className="ship-ring ring-two" /><div className="ship-node node-one">◉<small>OBSERVATORY</small></div><div className="ship-node node-two">◇<small>STRATEGY CORE</small></div><div className="ship-node node-three">↗<small>EXCHANGE BRIDGE</small></div></div></div>; }
