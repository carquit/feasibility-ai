import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle2,
  CircleAlert,
  CircleDollarSign,
  Clock3,
  FileCheck2,
  FlaskConical,
  Gauge,
  GitBranch,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Target,
  TriangleAlert,
  X,
} from "lucide-react";
import { PrintButton } from "./print-button";
import "./report.css";

const scorecard = [
  { label: "Business value", score: 84, note: "Clear labor and rework savings" },
  { label: "Workflow fit", score: 78, note: "Fits an existing review step" },
  { label: "Technical feasibility", score: 69, note: "Strong retrieval; accuracy unproven" },
  { label: "Data readiness", score: 61, note: "Plan archive exists; labels need work" },
  { label: "Governance readiness", score: 58, note: "Human accountability is required" },
  { label: "Unit economics", score: 82, note: "Attractive if cost stays below gate" },
];

const assumptions = [
  {
    rank: "01",
    title: "Permit accuracy at production scale",
    status: "UNPROVEN",
    tone: "red",
    impact: "Critical",
    evidence: "Small prototype examples show promise, but no blind benchmark exists across jurisdictions and drawing quality tiers.",
    test: "Run a blind benchmark against 100 previously reviewed plan sets using a human-verified answer key.",
    gate: "≥92% issue recall and ≤5% false-alarm rate",
    consequence: "Stop automated permit preparation; pivot to reviewer-assist mode.",
  },
  {
    rank: "02",
    title: "Reviewer workflow adoption",
    status: "WEAK SIGNAL",
    tone: "amber",
    impact: "High",
    evidence: "Reviewers report heavy administrative burden, but stated interest has not been tested inside live work.",
    test: "Have eight reviewers complete matched plan reviews with and without the copilot.",
    gate: "At least 5 of 8 save ≥30 minutes with no quality loss",
    consequence: "Redesign the workflow before funding product development.",
  },
  {
    rank: "03",
    title: "Production unit economics",
    status: "SUPPORTED",
    tone: "green",
    impact: "High",
    evidence: "Current model, retrieval, and review-cost estimates support the business case at expected volume.",
    test: "Meter inference, retrieval, human review, and exception-handling cost during the benchmark.",
    gate: "≤$18 per completed plan review",
    consequence: "Use a smaller model, cache repeated rules, or narrow document scope.",
  },
];

const sprint = [
  { days: "DAY 1–2", title: "Build the evidence set", owner: "Product + code expert", action: "Anonymize 100 plan sets, stratify by jurisdiction and complexity, and establish a human-reviewed answer key.", gate: "Coverage ≥95%" },
  { days: "DAY 3–5", title: "Run the blind benchmark", owner: "ML lead", action: "Measure recall, false alarms, citation accuracy, latency, intervention rate, and cost per review.", gate: "Recall ≥92%" },
  { days: "DAY 6–7", title: "Test the buyer workflow", owner: "Research lead", action: "Observe eight reviewers using the prototype on matched work and document friction, trust, and time saved.", gate: "5/8 save ≥30 min" },
  { days: "DAY 8–9", title: "Stress-test the controls", owner: "Security + legal", action: "Test access boundaries, sensitive data handling, audit logging, and mandatory human approval.", gate: "No critical control gaps" },
  { days: "DAY 10", title: "Issue the decision memo", owner: "Executive sponsor", action: "Reconcile evidence, confirm economics, and approve fund, pivot, or stop against pre-agreed gates.", gate: "All 3 gates resolved" },
];

const risks = [
  { risk: "Incorrect or missed code issue", severity: "Critical", control: "Citation-required output, confidence threshold, and mandatory reviewer approval", owner: "Product + legal" },
  { risk: "Jurisdiction rules become stale", severity: "High", control: "Versioned code library, freshness checks, and visible effective dates", owner: "Content operations" },
  { risk: "Sensitive plan data exposure", severity: "High", control: "Tenant isolation, encryption, retention policy, and access audit trail", owner: "Security" },
  { risk: "Automation bias", severity: "High", control: "Show evidence and uncertainty; prohibit silent auto-approval", owner: "Product" },
  { risk: "Cost grows at complex-plan scale", severity: "Medium", control: "Usage metering, model routing, caching, and maximum review budget", owner: "Engineering" },
];

function Mark() {
  return (
    <svg aria-hidden="true" className="report-logo-mark" viewBox="0 0 48 48" fill="none">
      <rect x="2" y="2" width="44" height="44" rx="13" fill="currentColor" />
      <path d="M13 12.5h22.5l-5.8 6H20v5.8h8.1l-5.7 5.8H20v7.4h-7V12.5Z" fill="white" />
      <path d="m30.5 23 5.5 4.3-5.5 4.3" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" opacity=".82" />
    </svg>
  );
}

export default function SampleReport() {
  return (
    <main className="report-page">
      <header className="report-header">
        <a className="report-brand" href="/" aria-label="Feasibility.ai home"><Mark /><span>feasibility<span>.ai</span></span></a>
        <div className="report-header-label"><Sparkles size={13} /> Sample decision blueprint</div>
        <div className="report-actions"><a href="/"><ArrowLeft size={15} /> Back to website</a><PrintButton /></div>
      </header>

      <section className="report-hero">
        <div className="report-hero-grid">
          <div className="report-hero-copy">
            <div className="report-kicker"><span>ILLUSTRATIVE OUTPUT</span><i /> DECISION BLUEPRINT 001</div>
            <h1>AI copilot for construction-plan review and permit preparation</h1>
            <p>A decision-ready assessment of what must be proven before committing to the full product build.</p>
            <div className="report-meta"><span>Prepared for: Illustrative client</span><span>Assessment stage: Pre-pilot</span><span>Decision horizon: 30 days</span></div>
          </div>
          <div className="report-verdict-card">
            <div className="verdict-top"><span>RECOMMENDATION</span><span className="report-status"><i /> CONDITIONAL GO</span></div>
            <strong>VALIDATE <ArrowRight /> FUND</strong>
            <p>Do not fund the full build yet. A 10-day proof sprint can resolve the three assumptions that control the investment decision.</p>
            <div className="confidence-ring" style={{ "--score": "67%" } as React.CSSProperties}><div><strong>67</strong><span>evidence<br />confidence</span></div></div>
          </div>
        </div>
      </section>

      <nav className="report-index" aria-label="Report sections">
        <a href="#decision">Decision</a><a href="#scorecard">Scorecard</a><a href="#assumptions">Deal-breakers</a><a href="#economics">Economics</a><a href="#sprint">Proof sprint</a><a href="#risks">Risk controls</a>
      </nav>

      <div className="report-body">
        <section className="report-section" id="decision">
          <div className="report-section-heading"><span>01</span><div><small>EXECUTIVE DECISION</small><h2>Fund evidence now—not software yet.</h2></div></div>
          <div className="report-summary-grid">
            <article className="report-summary-lead">
              <span className="report-eyebrow">Decision rationale</span>
              <p className="report-lede">The concept targets an expensive, repeated workflow and has a credible path to value. The investment case is attractive, but production accuracy and reviewer adoption remain decision-critical unknowns. The next dollar should purchase evidence against those unknowns.</p>
              <div className="decision-path">
                <div className="path-active"><FlaskConical /><span><small>NOW</small><strong>$18k proof sprint</strong></span></div><ArrowRight /><div><FileCheck2 /><span><small>GATE</small><strong>3 tests passed</strong></span></div><ArrowRight /><div><CircleDollarSign /><span><small>THEN</small><strong>Fund controlled pilot</strong></span></div>
              </div>
            </article>
            <div className="report-highlights">
              <article><span>Capital protected</span><strong>$182k</strong><small>Full-build spend held behind evidence gates</small></article>
              <article><span>Proof investment</span><strong>$18k</strong><small>10-day, decision-bounded sprint</small></article>
              <article><span>Modeled annual value</span><strong>$412k</strong><small>Before risk adjustment</small></article>
              <article><span>Expected payback</span><strong>2.4 mo</strong><small>If all release gates pass</small></article>
            </div>
          </div>
          <div className="report-callout"><CircleAlert /><div><strong>What would change this recommendation?</strong><p>Accuracy below 92%, adoption below five of eight reviewers, or operating cost above $18 per review would trigger a pivot or stop decision.</p></div></div>
        </section>

        <section className="report-section report-section--tint" id="scorecard">
          <div className="report-section-heading"><span>02</span><div><small>DECISION SCORECARD</small><h2>Strong value. Incomplete proof.</h2></div></div>
          <div className="scorecard-layout">
            <div className="overall-score"><Gauge /><span>OVERALL READINESS</span><strong>72<small>/100</small></strong><p>Promising enough to validate. Not proven enough to scale.</p></div>
            <div className="score-list">{scorecard.map((item) => <article key={item.label}><div className="score-label"><strong>{item.label}</strong><span>{item.score}</span></div><div className="score-track"><i style={{ width: `${item.score}%` }} /></div><small>{item.note}</small></article>)}</div>
          </div>
          <p className="report-method-note"><BarChart3 /> Scores express current evidence strength against the stated decision—not a prediction of market success.</p>
        </section>

        <section className="report-section" id="assumptions">
          <div className="report-section-heading"><span>03</span><div><small>ASSUMPTION LEDGER</small><h2>The three claims that control the investment.</h2></div></div>
          <div className="assumption-stack">{assumptions.map((item) => <article className={`assumption-card assumption-card--${item.tone}`} key={item.rank}>
            <div className="assumption-head"><span className="assumption-rank">{item.rank}</span><div><small>{item.impact} decision impact</small><h3>{item.title}</h3></div><span className="assumption-status">{item.status}</span></div>
            <div className="assumption-grid"><div><span>Current evidence</span><p>{item.evidence}</p></div><div><span>Lowest-cost test</span><p>{item.test}</p></div><div><span>Pass / fail gate</span><strong><Target /> {item.gate}</strong></div><div><span>If the gate fails</span><p>{item.consequence}</p></div></div>
          </article>)}</div>
        </section>

        <section className="report-section report-section--dark" id="economics">
          <div className="report-section-heading"><span>04</span><div><small>BUSINESS CASE</small><h2>The economics work—if the workflow does.</h2></div></div>
          <div className="economics-hero">
            <div><span>MODELED ANNUAL GROSS BENEFIT</span><strong>$412,000</strong><small>Labor capacity + avoided rework</small></div>
            <div className="economics-arrow"><ArrowRight /></div>
            <div><span>ESTIMATED ANNUAL RUN COST</span><strong>$127,000</strong><small>Inference + review + operations</small></div>
            <div className="economics-arrow"><ArrowRight /></div>
            <div className="economics-net"><span>MODELED ANNUAL NET VALUE</span><strong>$285,000</strong><small>Before tax; steady-state estimate</small></div>
          </div>
          <div className="scenario-grid">
            <article><span>CONSERVATIVE</span><strong>$96k</strong><p>60% of expected volume, 25% time savings, higher exception handling.</p><small>Payback: 7.1 months</small></article>
            <article className="scenario-base"><span>BASE CASE</span><strong>$285k</strong><p>70% adoption, 30+ minutes saved, and ≤$18 production cost.</p><small>Payback: 2.4 months</small></article>
            <article><span>UPSIDE</span><strong>$468k</strong><p>Broader workflow coverage, fewer revisions, and strong reuse across jurisdictions.</p><small>Payback: 1.6 months</small></article>
          </div>
          <div className="economics-assumptions"><TriangleAlert /><p><strong>Model dependence:</strong> 70% active adoption, 8,000 eligible annual reviews, a $72 loaded hourly labor rate, and no autonomous approval. Replace these assumptions with verified client data during the proof sprint.</p></div>
        </section>

        <section className="report-section" id="sprint">
          <div className="report-section-heading"><span>05</span><div><small>10-DAY PROOF SPRINT</small><h2>A bounded path from uncertainty to decision.</h2></div></div>
          <div className="sprint-timeline">{sprint.map((step, index) => <article key={step.days}><div className="sprint-marker"><span>{index + 1}</span><i /></div><div className="sprint-days">{step.days}</div><div className="sprint-copy"><small>{step.owner}</small><h3>{step.title}</h3><p>{step.action}</p></div><div className="sprint-gate"><CheckCircle2 /><span><small>EXIT GATE</small><strong>{step.gate}</strong></span></div></article>)}</div>
          <div className="sprint-decision"><GitBranch /><div><span>DECISION-CHANGING PIVOT</span><p>If accuracy misses the gate, narrow the product from automated permit preparation to human-in-the-loop code review. That reduces liability, lowers the required accuracy threshold, and preserves most of the time savings.</p></div></div>
        </section>

        <section className="report-section report-section--tint" id="risks">
          <div className="report-section-heading"><span>06</span><div><small>RISK &amp; GOVERNANCE</small><h2>Controls required before customer use.</h2></div></div>
          <div className="risk-table" role="table" aria-label="Risk controls">
            <div className="risk-row risk-row--head" role="row"><span>Risk</span><span>Severity</span><span>Required control</span><span>Owner</span></div>
            {risks.map((item) => <div className="risk-row" role="row" key={item.risk}><strong>{item.risk}</strong><span><i className={`severity severity--${item.severity.toLowerCase()}`} />{item.severity}</span><p>{item.control}</p><small>{item.owner}</small></div>)}
          </div>
          <div className="control-strip"><ShieldCheck /><div><strong>Non-negotiable release rule</strong><p>The system may recommend and cite; a qualified human remains accountable for the final permit decision.</p></div></div>
        </section>

        <section className="report-section report-final-decision">
          <div className="final-decision-copy"><span>FINAL DECISION MEMO</span><h2>Authorize the proof sprint.</h2><p>Release $18,000 for a 10-day validation sprint. Hold the remaining product budget until the accuracy, workflow, and unit-economics gates are independently verified.</p><div className="final-checks"><span><Check /> Budget is bounded</span><span><Check /> Evidence gates are measurable</span><span><Check /> Pivot path is defined</span></div></div>
          <div className="final-gates"><article><span>FUND</span><p>All three gates pass.</p></article><article><span>PIVOT</span><p>Value holds, but accuracy or workflow misses.</p></article><article><span>STOP</span><p>Economics fail or controls remain unresolved.</p></article></div>
        </section>

        <section className="report-disclaimer">
          <LockKeyhole /><div><strong>About this sample</strong><p>This is an illustrative preview of a future Feasibility.ai deliverable. The company, evidence, interviews, benchmarks, and financial assumptions are fictional. A production report would identify sources, record user-supplied assumptions, show calculation details, track evidence provenance, and clearly separate verified facts from modeled estimates.</p></div>
        </section>
      </div>

      <footer className="report-footer"><a className="report-brand" href="/"><Mark /><span>feasibility<span>.ai</span></span></a><p>Evidence-to-decision intelligence for ambitious AI projects.</p><a href="/">Evaluate another opportunity <ArrowRight /></a></footer>
    </main>
  );
}
