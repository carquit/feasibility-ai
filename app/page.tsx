"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight, ArrowUpRight, Check, CheckCircle2, CircleDollarSign, Clock3, FileCheck2,
  FlaskConical, Gauge, GitBranch, LockKeyhole, Menu, ScanLine,
  ShieldCheck, Sparkles, Target, TriangleAlert, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  blueprintFor,
  constructionBlueprint,
  createGeneratedReport,
  saveGeneratedReport,
} from "@/lib/feasibility-report";

const sampleIdeas = ["AI support agent", "Predictive maintenance", "Document intelligence"];
const defaultIdea = "";

function LogoMark({ small = false }: { small?: boolean }) {
  return <svg aria-hidden="true" className={small ? "logo-mark logo-mark--small" : "logo-mark"} viewBox="0 0 48 48" fill="none"><rect x="2" y="2" width="44" height="44" rx="13" fill="currentColor" /><path d="M13 12.5h22.5l-5.8 6H20v5.8h8.1l-5.7 5.8H20v7.4h-7V12.5Z" fill="white" /><path d="m30.5 23 5.5 4.3-5.5 4.3" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" opacity=".82" /></svg>;
}
function Brand() { return <a className="brand" href="#top" aria-label="Feasibility.ai home"><LogoMark /><span>feasibility<span>.ai</span></span></a> }

function Analyzer() {
  const [idea, setIdea] = useState(defaultIdea);
  const [stage, setStage] = useState<"idea" | "pilot" | "scale">("pilot");
  const [horizon, setHorizon] = useState<"14" | "30" | "90">("30");
  const [analyzing, setAnalyzing] = useState(false);
  const [blueprint, setBlueprint] = useState(constructionBlueprint);
  const [runs, setRuns] = useState(0);
  const [reportHref, setReportHref] = useState<string | null>(null);
  const analyze = () => {
    if (!idea.trim() || analyzing) return;
    setAnalyzing(true);
    setReportHref(null);
    window.setTimeout(() => {
      const nextBlueprint = blueprintFor(idea);
      const report = createGeneratedReport(idea, stage, horizon, nextBlueprint);
      setBlueprint(nextBlueprint);
      setRuns((value) => value + 1);
      if (saveGeneratedReport(report)) {
        setReportHref(`/generated-report.html?id=${encodeURIComponent(report.id)}`);
      }
      setAnalyzing(false);
    }, 1050);
  };
  return <div className="analyzer-shell" id="demo">
    <div className={`scanner ${analyzing ? "scanner--active" : ""}`} aria-hidden="true" />
    <div className="analyzer-head">
      <div><span className="eyebrow"><ScanLine size={13} /> Interactive product preview</span><h2>Describe the opportunity. Get the decision.</h2><p>Turn one paragraph into a clear recommendation, the assumptions that matter, and a practical path to proof.</p></div>
      <div className="analyzer-deliverable"><FileCheck2 /><span><strong>Complete decision report</strong><small>Personalized · Print-ready · Private</small></span></div>
    </div>
    <div className="analyzer-grid">
      <div className="analyzer-input-panel"><div className="panel-label"><span>01</span> Describe the opportunity</div><div className="input-heading"><h3>What are you considering building?</h3><p>Include the intended user, the job they need done, and where AI creates value.</p></div><Textarea id="idea" value={idea} onChange={(event) => setIdea(event.target.value)} className="idea-input" aria-describedby="idea-help" placeholder="Example: An AI copilot that reviews construction plans, flags code issues, and prepares permit-ready documentation." />
        <div className="sample-row" id="idea-help"><span>Load an example:</span>{sampleIdeas.map((sample) => <button key={sample} type="button" onClick={() => setIdea(sample)}>{sample}</button>)}</div>
        <div className="context-grid" aria-label="Project context"><label>Stage<select value={stage} onChange={(event) => setStage(event.target.value as "idea" | "pilot" | "scale")}><option value="idea">Idea</option><option value="pilot">Pilot</option><option value="scale">Scale</option></select></label><label>Decision horizon<select value={horizon} onChange={(event) => setHorizon(event.target.value as "14" | "30" | "90")}><option value="14">14 days</option><option value="30">30 days</option><option value="90">90 days</option></select></label></div>
        <Button className="run-button" size="lg" onClick={analyze} disabled={analyzing || !idea.trim()}>{analyzing ? <><span className="spinner" /> Building your report…</> : <>Generate my preview report <ArrowRight size={18} /></>}</Button>
        <p className="microcopy"><ShieldCheck size={13} /> No signup · Generated in this browser · Your idea stays private</p>
      </div>
      <div className="analyzer-output-panel" aria-live="polite"><div className="panel-label"><span>02</span> Your decision report <small>{runs && !analyzing ? "Ready" : "What you receive"}</small></div>
        {!runs && !analyzing ? <div className="output-promise">
          <div className="output-promise-intro"><span>THE ANSWER YOU RECEIVE</span><h3>Should we fund, validate, pivot, or stop?</h3><p>Not another generic score. You receive an executive-ready report that explains the decision and exactly what must be proven next.</p></div>
          <div className="deliverable-grid">
            <article><Target /><div><strong>Recommendation</strong><p>A clear fund, validate, pivot, or stop decision.</p></div></article>
            <article><TriangleAlert /><div><strong>Top deal-breakers</strong><p>The three assumptions that control the investment.</p></div></article>
            <article><FlaskConical /><div><strong>Proof sprint</strong><p>Tests, thresholds, owners, and a 10-day plan.</p></div></article>
            <article><CircleDollarSign /><div><strong>Business case</strong><p>Modeled value, protected capital, and payback.</p></div></article>
          </div>
          <div className="report-format"><FileCheck2 /><div><strong>A complete report—not just an on-screen score</strong><span>Executive decision · Scorecard · Assumption ledger · Economics · Risk controls</span></div><ArrowRight /></div>
        </div> : null}

        {analyzing ? <div className="analysis-progress"><div className="analysis-orb"><span className="spinner" /></div><span>BUILDING YOUR DECISION BLUEPRINT</span><h3>Turning your idea into measurable evidence gates…</h3><p>We’re mapping the investment, ranking the critical assumptions, and creating the lowest-cost path to a decision.</p><div className="analysis-steps"><span><CheckCircle2 /> Opportunity mapped</span><span><span className="step-pulse" /> Assumptions ranked</span><span><span className="step-dot" /> Report assembled</span></div></div> : null}

        {runs && !analyzing ? <div className="result-state">
          <div className="result-ready"><CheckCircle2 /><div><strong>Your decision blueprint is ready</strong><span>Personalized from your description and project context</span></div></div>
          <div className="decision-banner"><div className="decision-topline"><span>RECOMMENDATION</span><span>{blueprint.confidence}% evidence confidence</span></div><strong>{blueprint.decision}</strong><p>{blueprint.decisionNote}</p><div className="decision-metrics"><div><span>Capital protected</span><strong>{blueprint.capitalProtected}</strong></div><div><span>Proof sprint</span><strong>10 days</strong></div><div><span>Pilot budget</span><strong>{blueprint.pilotCost}</strong></div></div></div>
          <div className="result-evidence"><div><span>TOP DECISION BLOCKER</span><strong>{blueprint.evidence[0].name}</strong><p>{blueprint.evidence[0].test}</p></div><div className="result-gate"><Target /><span><small>PASS / FAIL GATE</small><strong>{blueprint.evidence[0].threshold}</strong></span></div></div>
          <div className="result-includes"><span><Check /> {blueprint.evidence.length} ranked assumptions</span><span><Check /> Economics + payback</span><span><Check /> Pivot path</span><span><Check /> Print / save PDF</span></div>
          {reportHref ? <Button asChild className="generated-report-link"><a href={reportHref}><FileCheck2 size={17} /> View the complete decision report <ArrowUpRight size={16} /></a></Button> : null}
        </div> : null}
      </div>
    </div>
  </div>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 18); onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll) }, []);
  const year = useMemo(() => new Date().getFullYear(), []);
  return <main id="top">
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <header className={scrolled ? "site-header site-header--scrolled" : "site-header"}><nav className="nav-shell" aria-label="Primary navigation"><Brand /><div className={menuOpen ? "nav-links nav-links--open" : "nav-links"}><a href="#product" onClick={() => setMenuOpen(false)}>Product</a><a href="#method" onClick={() => setMenuOpen(false)}>How it works</a><a href="/sample-report.html" onClick={() => setMenuOpen(false)}>Sample report</a><a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a><a href="#demo" className="mobile-demo" onClick={() => setMenuOpen(false)}>Try the blueprint</a></div><Button asChild className="nav-cta"><a href="#demo">Build a proof plan <ArrowUpRight size={16} /></a></Button><button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button></nav></header>
    <section className="hero section-shell"><div className="hero-copy"><div className="hero-meta reveal"><div className="hero-coordinate">EVIDENCE-TO-DECISION INTELLIGENCE</div><div className="symposium-tag"><Sparkles size={14} /> Feasibility Decision Blueprint</div></div><h1 className="reveal reveal-delay-1">Don’t ask if it can be built.<br /><em>Prove it should be.</em></h1><p className="hero-lede reveal reveal-delay-2">Feasibility.ai finds the assumptions that can kill an AI project, turns them into measurable tests, and gives your team a fund, pivot, or stop decision—before the expensive work begins.</p><div className="trust-line reveal reveal-delay-3"><span><Check size={14} /> Decision-critical assumptions</span><span><Check size={14} /> Measurable pass/fail gates</span><span><Check size={14} /> 10-day proof sprint</span></div></div><div className="hero-demo reveal reveal-delay-2"><div className="workspace-caption"><span>Interactive product preview</span><small>A score is an opinion. A proof plan is an asset.</small></div><Analyzer /></div></section>
    <section className="sample-report-band"><div className="section-shell"><div><FileCheck2 /><span><small>SEE THE COMPLETE DELIVERABLE</small><strong>From a quick signal to an executive-ready decision report.</strong></span></div><a href="/sample-report.html">Explore the sample report <ArrowUpRight /></a></div></section>
    <div className="ticker" aria-label="Blueprint outputs"><div className="ticker-track">{["Critical assumptions", "Kill criteria", "Proof sprint", "Unit economics", "Decision pivot", "Fund · Pivot · Stop"].map((item) => <span key={item}><i />{item}</span>)}</div></div>
    <section className="signal-section section-shell" id="product"><div className="section-intro"><span className="section-number">01 · The product</span><h2>The product is not<br /><em>the score. It’s the proof.</em></h2><p>Most idea validators tell you how they feel about a project. Feasibility.ai tells you exactly what must be true, how to test it, and when to walk away.</p></div><div className="value-grid">
      <article className="value-card value-card--lead"><div><TriangleAlert /><span>ASSUMPTION LEDGER</span></div><h3>See the three things that control the decision.</h3><p>Every claim is ranked by impact and evidence strength, so teams stop debating what matters and start testing it.</p><div className="ledger-preview"><span><i className="risk-high" /> Accuracy at scale <b>UNPROVEN</b></span><span><i className="risk-medium" /> Buyer adoption <b>WEAK SIGNAL</b></span><span><i className="risk-low" /> Unit economics <b>SUPPORTED</b></span></div></article>
      <article className="value-card"><div><FlaskConical /><span>PROOF SPRINT</span></div><h3>A testable plan—not generic advice.</h3><p>Get the experiment, sample, owner, budget, and pass/fail threshold for every critical assumption.</p><div className="mini-gate"><span>10 DAYS</span><i /><strong>3 GATES</strong></div></article>
      <article className="value-card"><div><GitBranch /><span>DECISION PIVOT</span></div><h3>Know the smallest change that flips the verdict.</h3><p>If the original idea fails, see the narrower product, safer workflow, or stronger wedge that preserves the upside.</p><a href="#demo">See it in the demo <ArrowUpRight /></a></article>
    </div></section>
    <section className="method-section" id="method"><div className="section-shell"><div className="section-intro section-intro--light"><span className="section-number">02 · The evidence loop</span><h2>From interesting idea<br /><em>to investment decision.</em></h2></div><div className="method-grid"><article><span>01</span><div className="method-icon"><ScanLine /></div><h3>Extract the assumptions</h3><p>Map the technical, data, adoption, economic, and governance claims buried inside the idea.</p></article><article><span>02</span><div className="method-icon"><Target /></div><h3>Define the kill criteria</h3><p>Convert each critical claim into a measurable gate with a threshold the team agrees to in advance.</p></article><article><span>03</span><div className="method-icon"><FileCheck2 /></div><h3>Issue the decision memo</h3><p>Combine the evidence into a fund, pivot, or stop recommendation with economics and next actions.</p></article></div></div></section>
    <section className="proof-section section-shell"><div className="proof-quote"><span>THE COMPETITIVE ADVANTAGE</span><blockquote>Feasibility.ai does not pretend AI can predict success from a paragraph. It makes uncertainty measurable—and gives teams a disciplined way to buy evidence before they buy software.</blockquote></div><div className="proof-metrics"><article><Clock3 /><strong>10 days</strong><span>Typical proof sprint</span></article><article><CircleDollarSign /><strong>Before budget</strong><span>Decision timing</span></article><article><Gauge /><strong>Pass / fail</strong><span>Every critical gate</span></article></div></section>
    <section className="pricing-section" id="pricing"><div className="section-shell"><div className="section-intro"><span className="section-number">03 · Commercial model</span><h2>Free signal.<br /><em>Paid proof.</em></h2><p>The quick read earns attention. The decision blueprint, proof sprint, and evidence workspace are what customers pay to keep.</p></div><div className="pricing-grid">
      <article><span className="price-name">Quick Signal</span><strong>Free</strong><p>A fast read on likely feasibility and the single biggest unknown.</p><ul><li><Check /> Directional recommendation</li><li><Check /> One critical assumption</li><li><Check /> One next test</li></ul><Button asChild variant="outline"><a href="#demo">Try the preview</a></Button></article>
      <article className="price-featured"><span className="popular">BEST FIRST DECISION</span><span className="price-name">Decision Blueprint</span><strong>$49 <small>/ project</small></strong><p>The complete decision brief for one idea, ready to share with a team or investor.</p><ul><li><Check /> Ranked assumption ledger</li><li><Check /> 10-day proof sprint</li><li><Check /> Unit economics + pivot path</li><li><Check /> Executive decision memo</li></ul><Button asChild><a href="#demo">Build a blueprint</a></Button></article>
      <article><span className="price-name">Team Workspace</span><strong>$249 <small>/ month</small></strong><p>An operating system for teams evaluating multiple AI investments.</p><ul><li><Check /> Unlimited active decisions</li><li><Check /> Evidence tracking + owners</li><li><Check /> Portfolio comparison</li><li><Check /> Governance-ready history</li></ul><Button asChild variant="outline"><a href="mailto:hello@feasibility.ai">Talk to us</a></Button></article>
    </div></div></section>
    <section className="final-cta section-shell"><div className="cta-panel"><div className="cta-orbit"><LogoMark small /></div><span className="section-number">Make uncertainty actionable</span><h2>Buy evidence<br /><em>before software.</em></h2><p>Turn the next ambitious idea into a decision your team can defend.</p><Button asChild size="lg" className="primary-cta"><a href="#demo">Generate a decision blueprint <ArrowRight size={18} /></a></Button><div className="cta-proof"><LockKeyhole size={13} /> Private by design · Exportable decision brief</div></div></section>
    <footer className="footer section-shell"><Brand /><p>Evidence-to-decision intelligence for ambitious AI projects.</p><div><a href="#product">Product</a><a href="#method">Method</a><a href="/sample-report.html">Sample report</a><a href="#pricing">Pricing</a></div><small>© {year} Feasibility.ai</small></footer>
  </main>;
}
