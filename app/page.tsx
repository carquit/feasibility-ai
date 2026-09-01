"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight, ArrowUpRight, Check, CircleDollarSign, Clock3, FileCheck2,
  FlaskConical, Gauge, GitBranch, LockKeyhole, Menu, ScanLine,
  ShieldCheck, Sparkles, Target, TriangleAlert, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const sampleIdeas = ["AI support agent", "Predictive maintenance", "Document intelligence"];
const defaultIdea = "An AI copilot that reviews construction plans, flags code issues, and prepares permit-ready documentation.";

type EvidenceItem = { name: string; status: "Unproven" | "Weak signal" | "Supported"; test: string; threshold: string };
type SprintStep = { days: string; title: string; action: string; gate: string };
type Blueprint = {
  decision: string; confidence: number; decisionNote: string; capitalProtected: string;
  pilotCost: string; payback: string; annualValue: string; evidence: EvidenceItem[];
  sprint: SprintStep[]; pivot: string;
};

const constructionBlueprint: Blueprint = {
  decision: "VALIDATE → FUND",
  confidence: 67,
  decisionNote: "Do not fund the full build yet. A 10-day proof sprint can resolve the three assumptions that control the investment decision.",
  capitalProtected: "$182k", pilotCost: "$18k", payback: "2.4 mo", annualValue: "$412k",
  evidence: [
    { name: "Permit accuracy at production scale", status: "Unproven", test: "Blind benchmark against 100 previously reviewed plan sets.", threshold: "Pass at ≥92% issue recall and ≤5% false alarms" },
    { name: "Reviewer workflow adoption", status: "Weak signal", test: "Eight code reviewers complete a live review with the copilot.", threshold: "Pass if 5 of 8 save ≥30 minutes per plan" },
    { name: "Production unit economics", status: "Supported", test: "Meter model, retrieval, review, and exception-handling cost.", threshold: "Pass at ≤$18 per completed plan review" },
  ],
  sprint: [
    { days: "DAY 1–2", title: "Build the evidence set", action: "Anonymize 100 plan sets and establish a human-reviewed answer key.", gate: "Coverage ≥95%" },
    { days: "DAY 3–5", title: "Run the blind benchmark", action: "Measure recall, false alarms, latency, and reviewer intervention.", gate: "Recall ≥92%" },
    { days: "DAY 6–7", title: "Test the buyer workflow", action: "Observe eight reviewers using the prototype on active work.", gate: "5/8 save ≥30 min" },
    { days: "DAY 8–10", title: "Price the operating model", action: "Calculate cost per review and issue a fund, pivot, or stop memo.", gate: "Cost ≤$18/plan" },
  ],
  pivot: "If accuracy misses the gate, narrow the product from automated permit preparation to human-in-the-loop code review. That reduces liability, lowers the required accuracy threshold, and preserves most of the time savings.",
};

function blueprintFor(idea: string): Blueprint {
  const text = idea.toLowerCase();
  if (/(support|service|helpdesk|customer)/.test(text)) return {
    ...constructionBlueprint, decision: "PILOT WITH GUARDRAILS", confidence: 71,
    capitalProtected: "$96k", pilotCost: "$12k", payback: "3.1 mo", annualValue: "$188k",
    decisionNote: "The automation case is credible, but resolution quality and safe escalation must be proven before customer-facing rollout.",
    evidence: [
      { name: "Resolution quality", status: "Unproven", test: "Replay 500 resolved tickets against the agent.", threshold: "Pass at ≥85% correct resolution" },
      { name: "Human handoff safety", status: "Weak signal", test: "Red-team ambiguous and high-risk conversations.", threshold: "Escalate ≥98% of high-risk cases" },
      { name: "Cost per resolution", status: "Supported", test: "Meter full inference and review cost.", threshold: "Pass at ≤35% of current cost" },
    ],
    pivot: "If autonomous resolution misses the safety gate, launch as an agent-assist copilot. It captures most of the handle-time benefit while keeping a human accountable for the final response.",
  };
  if (/(maintenance|sensor|equipment|failure)/.test(text)) return {
    ...constructionBlueprint, decision: "VALIDATE DATA FIRST", confidence: 58,
    capitalProtected: "$240k", pilotCost: "$24k", payback: "5.8 mo", annualValue: "$510k",
    decisionNote: "The upside is material, but historical failure coverage—not model selection—is the decision bottleneck.",
    evidence: [
      { name: "Failure-event coverage", status: "Unproven", test: "Audit 24 months of sensor and work-order history.", threshold: "Pass with ≥80 labeled failures" },
      { name: "Operational lead time", status: "Weak signal", test: "Back-test alerts against real maintenance windows.", threshold: "Pass with ≥72 hours median warning" },
      { name: "Avoided downtime value", status: "Supported", test: "Verify loss-per-hour with operations and finance.", threshold: "Pass at ≥$8k avoided loss/event" },
    ],
    pivot: "If failure labels are too sparse, begin with anomaly detection and technician triage rather than failure prediction. It creates value now while producing the labeled data needed later.",
  };
  if (/(document|contract|invoice|knowledge)/.test(text)) return {
    ...constructionBlueprint, decision: "FUND A CONTROLLED PILOT", confidence: 76,
    capitalProtected: "$128k", pilotCost: "$15k", payback: "2.0 mo", annualValue: "$276k",
    decisionNote: "The workflow and economics are strong. Fund a bounded pilot with citation accuracy and exception handling as release gates.",
    evidence: [
      { name: "Citation accuracy", status: "Weak signal", test: "Benchmark 300 questions against source documents.", threshold: "Pass at ≥97% supported answers" },
      { name: "Document coverage", status: "Supported", test: "Sample every major template and scan quality tier.", threshold: "Pass at ≥90% usable extraction" },
      { name: "Reviewer time saved", status: "Supported", test: "Time 12 users on matched document tasks.", threshold: "Pass at ≥40% median reduction" },
    ],
    pivot: "If answer generation misses the citation gate, ship verified retrieval and evidence highlighting first. Users still save search time without trusting an unsupported answer.",
  };
  return constructionBlueprint;
}

function LogoMark({ small = false }: { small?: boolean }) {
  return <svg aria-hidden="true" className={small ? "logo-mark logo-mark--small" : "logo-mark"} viewBox="0 0 48 48" fill="none"><rect x="2" y="2" width="44" height="44" rx="13" fill="currentColor" /><path d="M13 12.5h22.5l-5.8 6H20v5.8h8.1l-5.7 5.8H20v7.4h-7V12.5Z" fill="white" /><path d="m30.5 23 5.5 4.3-5.5 4.3" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" opacity=".82" /></svg>;
}
function Brand() { return <a className="brand" href="#top" aria-label="Feasibility.ai home"><LogoMark /><span>feasibility<span>.ai</span></span></a> }

function EvidenceList({ items }: { items: EvidenceItem[] }) {
  return <div className="evidence-list">{items.map((item, index) => <article className="evidence-item" key={item.name}><div className="evidence-index">0{index + 1}</div><div className="evidence-copy"><div className="evidence-title"><strong>{item.name}</strong><span className={`status status--${item.status.toLowerCase().replace(" ", "-")}`}>{item.status}</span></div><p>{item.test}</p><small><Target size={12} /> {item.threshold}</small></div></article>)}</div>;
}

function Analyzer() {
  const [idea, setIdea] = useState(defaultIdea);
  const [analyzing, setAnalyzing] = useState(false);
  const [blueprint, setBlueprint] = useState(constructionBlueprint);
  const [runs, setRuns] = useState(0);
  const analyze = () => {
    if (!idea.trim() || analyzing) return;
    setAnalyzing(true);
    window.setTimeout(() => { setBlueprint(blueprintFor(idea)); setRuns((value) => value + 1); setAnalyzing(false) }, 1050);
  };
  return <div className="analyzer-shell" id="demo">
    <div className={`scanner ${analyzing ? "scanner--active" : ""}`} aria-hidden="true" />
    <div className="analyzer-head"><div><span className="eyebrow"><ScanLine size={13} /> Feasibility Decision Blueprint</span><h2>Find what could kill the project—before it does.</h2></div><div className="analyzer-status"><span>Idea</span><i /><span>Assumptions</span><i /><strong>Proof plan</strong><span className="live-pill"><b /> Ready</span></div></div>
    <div className="analyzer-grid">
      <div className="analyzer-input-panel"><div className="panel-label"><span>01</span> Define the investment</div><label className="input-label" htmlFor="idea">What are you considering building?</label><Textarea id="idea" value={idea} onChange={(event) => setIdea(event.target.value)} className="idea-input" aria-describedby="idea-help" />
        <div className="context-grid" aria-label="Project context"><label>Stage<select defaultValue="pilot"><option value="idea">Idea</option><option value="pilot">Pilot</option><option value="scale">Scale</option></select></label><label>Decision horizon<select defaultValue="30"><option value="14">14 days</option><option value="30">30 days</option><option value="90">90 days</option></select></label></div>
        <div className="sample-row" id="idea-help"><span>Try:</span>{sampleIdeas.map((sample) => <button key={sample} type="button" onClick={() => setIdea(sample)}>{sample}</button>)}</div>
        <Button className="run-button" size="lg" onClick={analyze} disabled={analyzing || !idea.trim()}>{analyzing ? <><span className="spinner" /> Building proof plan…</> : <>Generate decision blueprint <ArrowRight size={18} /></>}</Button><p className="microcopy"><ShieldCheck size={13} /> Preview experience · Your idea stays yours</p>
      </div>
      <div className={`analyzer-output-panel ${analyzing ? "output--loading" : ""}`} aria-live="polite"><div className="panel-label"><span>02</span> Decision brief <small>{runs ? "Updated just now" : "Illustrative output"}</small></div>
        <div className="decision-banner"><div className="decision-topline"><span>RECOMMENDATION</span><span>{blueprint.confidence}% evidence confidence</span></div><strong>{analyzing ? "MAPPING CRITICAL ASSUMPTIONS…" : blueprint.decision}</strong><p>{analyzing ? "Identifying decision-critical assumptions, measurable gates, and the lowest-cost path to proof." : blueprint.decisionNote}</p><div className="decision-metrics"><div><span>Capital protected</span><strong>{blueprint.capitalProtected}</strong></div><div><span>Proof sprint</span><strong>10 days</strong></div><div><span>Pilot budget</span><strong>{blueprint.pilotCost}</strong></div></div></div>
        <Tabs defaultValue="evidence" className="blueprint-tabs"><TabsList variant="line" aria-label="Decision blueprint views"><TabsTrigger value="evidence">Deal-breakers</TabsTrigger><TabsTrigger value="sprint">Proof sprint</TabsTrigger><TabsTrigger value="economics">Business case</TabsTrigger></TabsList>
          <TabsContent value="evidence"><EvidenceList items={blueprint.evidence} /></TabsContent>
          <TabsContent value="sprint"><div className="sprint-list">{blueprint.sprint.map((step) => <article key={step.days}><span>{step.days}</span><div><strong>{step.title}</strong><p>{step.action}</p><small><Check size={12} /> {step.gate}</small></div></article>)}</div></TabsContent>
          <TabsContent value="economics"><div className="economics-grid"><article><span>Modeled annual value</span><strong>{blueprint.annualValue}</strong><small>Time saved + avoided rework</small></article><article><span>Expected payback</span><strong>{blueprint.payback}</strong><small>After controlled pilot</small></article><article className="economics-wide"><GitBranch size={17} /><div><span>Decision-changing pivot</span><p>{blueprint.pivot}</p></div></article></div></TabsContent>
        </Tabs>
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
    <header className={scrolled ? "site-header site-header--scrolled" : "site-header"}><nav className="nav-shell" aria-label="Primary navigation"><Brand /><div className={menuOpen ? "nav-links nav-links--open" : "nav-links"}><a href="#product" onClick={() => setMenuOpen(false)}>Product</a><a href="#method" onClick={() => setMenuOpen(false)}>How it works</a><a href="/sample-report" onClick={() => setMenuOpen(false)}>Sample report</a><a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a><a href="#demo" className="mobile-demo" onClick={() => setMenuOpen(false)}>Try the blueprint</a></div><Button asChild className="nav-cta"><a href="#demo">Build a proof plan <ArrowUpRight size={16} /></a></Button><button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button></nav></header>
    <section className="hero section-shell"><div className="hero-copy"><div className="hero-meta reveal"><div className="hero-coordinate">EVIDENCE-TO-DECISION INTELLIGENCE</div><div className="symposium-tag"><Sparkles size={14} /> Feasibility Decision Blueprint</div></div><h1 className="reveal reveal-delay-1">Don’t ask if it can be built.<br /><em>Prove it should be.</em></h1><p className="hero-lede reveal reveal-delay-2">Feasibility.ai finds the assumptions that can kill an AI project, turns them into measurable tests, and gives your team a fund, pivot, or stop decision—before the expensive work begins.</p><div className="trust-line reveal reveal-delay-3"><span><Check size={14} /> Decision-critical assumptions</span><span><Check size={14} /> Measurable pass/fail gates</span><span><Check size={14} /> 10-day proof sprint</span></div></div><div className="hero-demo reveal reveal-delay-2"><div className="workspace-caption"><span>Interactive product preview</span><small>A score is an opinion. A proof plan is an asset.</small></div><Analyzer /></div></section>
    <section className="sample-report-band"><div className="section-shell"><div><FileCheck2 /><span><small>SEE THE COMPLETE DELIVERABLE</small><strong>From a quick signal to an executive-ready decision report.</strong></span></div><a href="/sample-report">Explore the sample report <ArrowUpRight /></a></div></section>
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
    <footer className="footer section-shell"><Brand /><p>Evidence-to-decision intelligence for ambitious AI projects.</p><div><a href="#product">Product</a><a href="#method">Method</a><a href="/sample-report">Sample report</a><a href="#pricing">Pricing</a></div><small>© {year} Feasibility.ai</small></footer>
  </main>;
}
