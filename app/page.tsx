"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight, ArrowUpRight, Check, CircleDollarSign,
  Clock3, Code2, Gauge, Menu, Network, ScanLine, ShieldCheck,
  Sparkles, Target, X, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

const sampleIdeas = ["AI support agent", "Predictive maintenance", "Document intelligence"];
const factors = [
  { label: "Technical viability", key: "technical" },
  { label: "Data readiness", key: "data" },
  { label: "Time to value", key: "time" },
  { label: "Market signal", key: "market" },
] as const;
type Scores = Record<(typeof factors)[number]["key"], number>;
const defaultIdea = "An AI copilot that reviews construction plans, flags code issues, and prepares permit-ready documentation.";

function LogoMark({ small = false }: { small?: boolean }) {
  return (
    <svg aria-hidden="true" className={small ? "logo-mark logo-mark--small" : "logo-mark"} viewBox="0 0 48 48" fill="none">
      <rect x="2" y="2" width="44" height="44" rx="13" fill="currentColor" />
      <path d="M13 12.5h22.5l-5.8 6H20v5.8h8.1l-5.7 5.8H20v7.4h-7V12.5Z" fill="white" />
      <path d="m30.5 23 5.5 4.3-5.5 4.3" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" opacity=".82" />
    </svg>
  );
}

function Brand() {
  return <a className="brand" href="#top" aria-label="Feasibility.ai home"><LogoMark /><span>feasibility<span>.ai</span></span></a>;
}

function Analyzer() {
  const [idea, setIdea] = useState(defaultIdea);
  const [analyzing, setAnalyzing] = useState(false);
  const [score, setScore] = useState(84);
  const [scores, setScores] = useState<Scores>({ technical: 91, data: 72, time: 88, market: 83 });
  const [runs, setRuns] = useState(0);
  const verdict = score >= 82 ? "Strong go" : score >= 68 ? "Promising" : "Validate first";
  const nextMove = score >= 82
    ? "Advance to a focused validation sprint and confirm the highest-risk data assumption."
    : score >= 68
      ? "Validate the weakest signal with a small, measurable prototype before committing budget."
      : "Pause the build and resolve the critical technical and data dependencies first.";

  const analyze = () => {
    if (!idea.trim() || analyzing) return;
    setAnalyzing(true);
    window.setTimeout(() => {
      const text = idea.toLowerCase();
      const specificity = Math.min(12, Math.floor(idea.trim().length / 18));
      const technical = Math.min(96, 74 + specificity + (text.includes("ai") ? 5 : 0));
      const data = Math.min(93, 66 + specificity + (/(data|document|customer|sensor)/.test(text) ? 7 : 0));
      const time = Math.min(94, 76 + Math.floor(specificity / 2) + (/(copilot|agent|automation)/.test(text) ? 5 : 0));
      const market = Math.min(95, 73 + specificity + (/(customer|business|support|construction)/.test(text) ? 5 : 0));
      const next = { technical, data, time, market };
      setScores(next);
      setScore(Math.round((technical + data + time + market) / 4));
      setRuns((value) => value + 1);
      setAnalyzing(false);
    }, 1150);
  };

  return (
    <div className="analyzer-shell" id="demo">
      <div className={`scanner ${analyzing ? "scanner--active" : ""}`} aria-hidden="true" />
      <div className="analyzer-head">
        <div><span className="eyebrow"><ScanLine size={13} /> Executive feasibility assessment</span><h2>Evaluate the opportunity.</h2></div>
        <div className="analyzer-status"><span>Define</span><i /><span>Evaluate</span><i /><strong>Decide</strong><span className="live-pill"><b /> Ready</span></div>
      </div>
      <div className="analyzer-grid">
        <div className="analyzer-input-panel">
          <div className="panel-label"><span>01</span> Describe the opportunity</div>
          <label className="input-label" htmlFor="idea">What do you want to build?</label>
          <Textarea id="idea" value={idea} onChange={(event) => setIdea(event.target.value)} className="idea-input" aria-describedby="idea-help" />
          <div className="sample-row" id="idea-help"><span>Try:</span>{sampleIdeas.map((sample) => <button key={sample} type="button" onClick={() => setIdea(sample)}>{sample}</button>)}</div>
          <Button className="run-button" size="lg" onClick={analyze} disabled={analyzing || !idea.trim()}>{analyzing ? <><span className="spinner" /> Mapping constraints…</> : <>Run feasibility analysis <ArrowRight size={18} /></>}</Button>
          <p className="microcopy"><ShieldCheck size={13} /> Private by design. Your idea stays yours.</p>
        </div>
        <div className="analyzer-output-panel" aria-live="polite">
          <div className="panel-label"><span>02</span> Decision intelligence <small>{runs ? "Updated just now" : "Illustrative result"}</small></div>
          <div className="analysis-result">
            <div className="score-wrap" style={{ "--score": score } as React.CSSProperties}>
              <div className="score-ring"><div><strong>{analyzing ? "··" : score}</strong><span>/100</span></div></div>
              <div><span className="result-kicker">Feasibility score</span><strong className="verdict">{analyzing ? "Analyzing signals" : verdict}</strong><small>{runs ? "Fresh analysis complete" : "Assessment ready"}</small></div>
            </div>
            <div className="factor-list">{factors.map((factor) => <div className="factor" key={factor.key}><div><span>{factor.label}</span><strong>{analyzing ? "—" : `${scores[factor.key]}%`}</strong></div><Progress value={analyzing ? 22 : scores[factor.key]} /></div>)}</div>
          </div>
          <div className="next-move"><div><Check size={15} /><span>Recommended next move</span></div><p>{analyzing ? "Reviewing dependencies and identifying the highest-leverage validation step…" : nextMove}</p></div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 18); onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  const year = useMemo(() => new Date().getFullYear(), []);
  return (
    <main id="top">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <header className={scrolled ? "site-header site-header--scrolled" : "site-header"}>
        <nav className="nav-shell" aria-label="Primary navigation">
          <Brand />
          <div className={menuOpen ? "nav-links nav-links--open" : "nav-links"}><a href="#platform" onClick={() => setMenuOpen(false)}>Platform</a><a href="#method" onClick={() => setMenuOpen(false)}>How it works</a><a href="#use-cases" onClick={() => setMenuOpen(false)}>Use cases</a><a href="#demo" className="mobile-demo" onClick={() => setMenuOpen(false)}>Try the demo</a></div>
          <Button asChild className="nav-cta"><a href="#demo">Analyze an idea <ArrowUpRight size={16} /></a></Button>
          <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
        </nav>
      </header>

      <section className="hero section-shell">
        <div className="hero-copy">
          <div className="hero-meta reveal"><div className="hero-coordinate" aria-hidden="true">AI DECISION INTELLIGENCE</div><div className="symposium-tag"><Sparkles size={14} /> Live symposium preview</div></div>
          <h1 className="reveal reveal-delay-1">Validate your AI idea<br /><em>before you build it.</em></h1>
          <p className="hero-lede reveal reveal-delay-2">Describe the opportunity. Get an immediate, evidence-led view of feasibility—and the clearest next move before your team commits budget and momentum.</p>
          <div className="trust-line reveal reveal-delay-3"><span><Check size={14} /> Executive-ready readout</span><span><Check size={14} /> Private by design</span></div>
        </div>
        <div className="hero-demo reveal reveal-delay-2"><div className="workspace-caption"><span>Live decision workspace</span><small>Start with your idea below</small></div><Analyzer /></div>
      </section>

      <div className="ticker" aria-label="Feasibility dimensions"><div className="ticker-track">{["Technical viability", "Data readiness", "Market signal", "Economic model", "Risk profile", "Build · Pause · Pivot"].map((item, index) => <span key={`${item}-${index}`}><i />{item}</span>)}</div></div>

      <section className="signal-section section-shell" id="platform">
        <div className="section-intro"><span className="section-number">01 · Decision signal</span><h2>From ambition<br /><em>to evidence.</em></h2><p>Feasibility.ai translates complexity into a decision your leadership team can understand—and act on.</p></div>
        <div className="stat-grid"><article className="stat-card stat-card--hero"><span>Decision confidence</span><strong>84<sup>%</sup></strong><div className="spark-chart"><i /><i /><i /><i /><i /><i /><i /></div><small>Based on 12 project signals</small></article><article className="stat-card"><Clock3 /><span>Time to insight</span><strong>&lt; 2 min</strong><small>From idea to action plan</small></article><article className="stat-card"><Target /><span>Blind spots surfaced</span><strong>12+</strong><small>Across technology, data, risk & market</small></article></div>
      </section>

      <section className="method-section" id="method"><div className="section-shell">
        <div className="section-intro section-intro--light"><span className="section-number">02 · The method</span><h2>One assessment.<br /><em>A clearer path forward.</em></h2></div>
        <div className="method-grid"><article><span>01</span><div className="method-icon"><Sparkles /></div><h3>Describe the vision</h3><p>Tell us what you want to build in plain language. No lengthy intake. No consultant-speak.</p></article><article><span>02</span><div className="method-icon"><Network /></div><h3>Map the constraints</h3><p>Our reasoning engine tests your idea across data, architecture, delivery, economics, and risk.</p></article><article><span>03</span><div className="method-icon"><Gauge /></div><h3>Get the decision</h3><p>Receive a clear score, critical assumptions, and the smartest next experiment to run.</p></article></div>
      </div></section>

      <section className="mosaic-section section-shell" id="use-cases">
        <div className="section-intro"><span className="section-number">03 · Before the build</span><h2>Built for<br /><em>high-stakes decisions.</em></h2></div>
        <div className="mosaic-grid">
          <article className="mosaic-card mosaic-card--wide"><div><Code2 /><span>PRODUCT TEAMS</span></div><h3>Choose the right AI bet.</h3><p>Compare ambitious concepts before they compete for the same roadmap, talent, and budget.</p><div className="mini-roadmap"><span className="active">Discover</span><i /><span className="active">Validate</span><i /><span>Prototype</span><i /><span>Scale</span></div></article>
          <article className="mosaic-card mosaic-card--signal"><div><Zap /><span>FOUNDERS</span></div><h3>Find the sharpest wedge.</h3><p>Stress-test the promise before the pitch deck hardens into a plan.</p><div className="pulse-orbit"><i /><b /></div></article>
          <article className="mosaic-card"><div><CircleDollarSign /><span>INVESTORS</span></div><h3>See beyond the story.</h3><p>Expose technical debt, data dependencies, and the real path to defensibility.</p><div className="risk-row"><span>LOW RISK</span><div><i /><i /><i /><i /><i /></div></div></article>
          <article className="mosaic-card mosaic-card--accent"><div><ShieldCheck /><span>ENTERPRISE</span></div><h3>De-risk transformation.</h3><p>Turn AI ambition into an executable, governed pilot your organization can trust.</p><a href="#demo">Run an assessment <ArrowUpRight /></a></article>
        </div>
      </section>

      <section className="final-cta section-shell"><div className="cta-panel"><div className="cta-orbit"><LogoMark small /></div><span className="section-number">Your next move, made clear</span><h2>Move forward<br /><em>with confidence.</em></h2><p>Bring the ambition. Feasibility.ai will bring the evidence.</p><Button asChild size="lg" className="primary-cta"><a href="#demo">Evaluate an idea <ArrowRight size={18} /></a></Button></div></section>
      <footer className="footer section-shell"><Brand /><p>Decision intelligence for ambitious AI ideas.</p><div><a href="#platform">Platform</a><a href="#method">Method</a><a href="#demo">Demo</a></div><small>© {year} Feasibility.ai</small></footer>
    </main>
  );
}
