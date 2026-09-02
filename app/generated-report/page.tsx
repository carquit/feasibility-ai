"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle2,
  CircleAlert,
  CircleDollarSign,
  FileCheck2,
  FlaskConical,
  Gauge,
  GitBranch,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Target,
  TriangleAlert,
} from "lucide-react";
import { loadGeneratedReport, type GeneratedReport } from "@/lib/feasibility-report";
import { PrintButton } from "../sample-report/print-button";

const riskControls = [
  { risk: "Incorrect or unsupported output", severity: "Critical", control: "Require source citations, confidence thresholds, and human approval", owner: "Product + domain lead" },
  { risk: "Sensitive data exposure", severity: "High", control: "Use access controls, encryption, retention limits, and audit logging", owner: "Security" },
  { risk: "Workflow rejection", severity: "High", control: "Test inside live work and measure adoption before broader rollout", owner: "Product research" },
  { risk: "Operating cost exceeds value", severity: "Medium", control: "Meter every run, route models by task, and enforce a cost ceiling", owner: "Engineering + finance" },
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

function MissingReport({ loading = false }: { loading?: boolean }) {
  return (
    <main className="report-page">
      <header className="report-header">
        <Link className="report-brand" href="/" aria-label="Feasibility.ai home"><Mark /><span>feasibility<span>.ai</span></span></Link>
        <div className="report-actions"><Link href="/"><ArrowLeft size={15} /> Back to analyzer</Link></div>
      </header>
      <div className="report-body">
        <section className="report-section report-final-decision">
          <div className="final-decision-copy"><span>{loading ? "PREPARING REPORT" : "REPORT NOT FOUND"}</span><h2>{loading ? "Loading your decision blueprint…" : "Generate a new report from the analyzer."}</h2><p>{loading ? "Your report is stored privately in this browser." : "This report may have been created in another browser or cleared from local storage."}</p></div>
          {!loading ? <div className="final-gates"><article><span>START</span><p><Link href="/">Return to Feasibility.ai</Link></p></article></div> : null}
        </section>
      </div>
    </main>
  );
}

export default function GeneratedReportPage() {
  const [report, setReport] = useState<GeneratedReport | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");
    const stored = loadGeneratedReport(id);
    window.queueMicrotask(() => {
      setReport(stored);
      setHydrated(true);
    });
    if (stored) document.title = `Feasibility Report — ${stored.idea.slice(0, 60)}`;
  }, []);

  const scorecard = useMemo(() => {
    const confidence = report?.blueprint.confidence ?? 0;
    const clamp = (value: number) => Math.max(35, Math.min(92, value));
    return [
      { label: "Business value", score: clamp(confidence + 13), note: "Modeled value warrants a bounded proof" },
      { label: "Workflow fit", score: clamp(confidence + 7), note: "Must be confirmed with intended users" },
      { label: "Technical feasibility", score: clamp(confidence), note: "Critical performance gates remain" },
      { label: "Data readiness", score: clamp(confidence - 8), note: "Source quality and coverage need verification" },
      { label: "Governance readiness", score: clamp(confidence - 11), note: "Human accountability is required" },
      { label: "Unit economics", score: clamp(confidence + 10), note: "Attractive if operating cost stays below gate" },
    ];
  }, [report]);

  if (!hydrated) return <MissingReport loading />;
  if (!report) return <MissingReport />;

  const { blueprint } = report;
  const stageLabel = report.stage === "idea" ? "Idea" : report.stage === "pilot" ? "Pilot" : "Scale";
  const generatedDate = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(new Date(report.generatedAt));
  const reportNumber = report.id.slice(-7).toUpperCase();
  const readiness = Math.round(scorecard.reduce((sum, item) => sum + item.score, 0) / scorecard.length);
  const decisionStatus = blueprint.decision.includes("FUND") || blueprint.decision.includes("PILOT") ? "CONDITIONAL GO" : "VALIDATE FIRST";
  const evidenceConsequence = "If this gate fails, narrow the scope, redesign the workflow, or stop this release path before further investment.";

  return (
    <main className="report-page">
      <header className="report-header">
        <Link className="report-brand" href="/" aria-label="Feasibility.ai home"><Mark /><span>feasibility<span>.ai</span></span></Link>
        <div className="report-header-label"><Sparkles size={13} /> Generated decision blueprint</div>
        <div className="report-actions"><Link href="/"><ArrowLeft size={15} /> Evaluate another idea</Link><PrintButton /></div>
      </header>

      <section className="report-hero">
        <div className="report-hero-grid">
          <div className="report-hero-copy">
            <div className="report-kicker"><span>PERSONALIZED PREVIEW</span><i /> DECISION BLUEPRINT {reportNumber}</div>
            <h1>{report.idea}</h1>
            <p>A decision-ready assessment of what should be proven before committing to the full product build.</p>
            <div className="report-meta"><span>Generated: {generatedDate}</span><span>Assessment stage: {stageLabel}</span><span>Decision horizon: {report.horizon} days</span></div>
          </div>
          <div className="report-verdict-card">
            <div className="verdict-top"><span>RECOMMENDATION</span><span className="report-status"><i /> {decisionStatus}</span></div>
            <strong>{blueprint.decision}</strong>
            <p>{blueprint.decisionNote}</p>
            <div className="confidence-ring" style={{ "--score": `${blueprint.confidence}%` } as CSSProperties}><div><strong>{blueprint.confidence}</strong><span>evidence<br />confidence</span></div></div>
          </div>
        </div>
      </section>

      <nav className="report-index" aria-label="Report sections">
        <a href="#decision">Decision</a><a href="#scorecard">Scorecard</a><a href="#assumptions">Deal-breakers</a><a href="#economics">Economics</a><a href="#sprint">Proof sprint</a><a href="#risks">Risk controls</a>
      </nav>

      <div className="report-body">
        <section className="report-section" id="decision">
          <div className="report-section-heading"><span>01</span><div><small>EXECUTIVE DECISION</small><h2>Buy evidence before building software.</h2></div></div>
          <div className="report-summary-grid">
            <article className="report-summary-lead">
              <span className="report-eyebrow">Decision rationale</span>
              <p className="report-lede">{blueprint.decisionNote} The next investment should resolve the assumptions below with observable evidence, agreed thresholds, and a clear stop condition.</p>
              <div className="decision-path">
                <div className="path-active"><FlaskConical /><span><small>NOW</small><strong>{blueprint.pilotCost} proof sprint</strong></span></div><ArrowRight /><div><FileCheck2 /><span><small>GATE</small><strong>{blueprint.evidence.length} tests resolved</strong></span></div><ArrowRight /><div><CircleDollarSign /><span><small>THEN</small><strong>Fund, pivot, or stop</strong></span></div>
              </div>
            </article>
            <div className="report-highlights">
              <article><span>Capital protected</span><strong>{blueprint.capitalProtected}</strong><small>Spend held behind evidence gates</small></article>
              <article><span>Proof investment</span><strong>{blueprint.pilotCost}</strong><small>10-day, decision-bounded sprint</small></article>
              <article><span>Modeled annual value</span><strong>{blueprint.annualValue}</strong><small>Illustrative before validation</small></article>
              <article><span>Expected payback</span><strong>{blueprint.payback}</strong><small>If release gates pass</small></article>
            </div>
          </div>
          <div className="report-callout"><CircleAlert /><div><strong>What would change this recommendation?</strong><p>Any critical evidence gate below missing its threshold should trigger a narrower pivot, another bounded test, or a stop decision.</p></div></div>
        </section>

        <section className="report-section report-section--tint" id="scorecard">
          <div className="report-section-heading"><span>02</span><div><small>DECISION SCORECARD</small><h2>Promising signal. Incomplete proof.</h2></div></div>
          <div className="scorecard-layout">
            <div className="overall-score"><Gauge /><span>OVERALL READINESS</span><strong>{readiness}<small>/100</small></strong><p>Ready for validation—not an unrestricted build.</p></div>
            <div className="score-list">{scorecard.map((item) => <article key={item.label}><div className="score-label"><strong>{item.label}</strong><span>{item.score}</span></div><div className="score-track"><i style={{ width: `${item.score}%` }} /></div><small>{item.note}</small></article>)}</div>
          </div>
          <p className="report-method-note"><BarChart3 /> Scores express current evidence strength from the entered description—not a prediction of market success.</p>
        </section>

        <section className="report-section" id="assumptions">
          <div className="report-section-heading"><span>03</span><div><small>ASSUMPTION LEDGER</small><h2>The claims that control the investment.</h2></div></div>
          <div className="assumption-stack">{blueprint.evidence.map((item, index) => {
            const tone = item.status === "Unproven" ? "red" : item.status === "Weak signal" ? "amber" : "green";
            const evidence = item.status === "Unproven" ? "The project description does not yet provide verified evidence for this claim." : item.status === "Weak signal" ? "The description suggests this may be achievable, but no decision-grade test result is recorded." : "The description indicates a credible basis, subject to verification during the proof sprint.";
            return <article className={`assumption-card assumption-card--${tone}`} key={item.name}>
              <div className="assumption-head"><span className="assumption-rank">0{index + 1}</span><div><small>{index === 0 ? "Critical" : "High"} decision impact</small><h3>{item.name}</h3></div><span className="assumption-status">{item.status.toUpperCase()}</span></div>
              <div className="assumption-grid"><div><span>Current evidence</span><p>{evidence}</p></div><div><span>Lowest-cost test</span><p>{item.test}</p></div><div><span>Pass / fail gate</span><strong><Target /> {item.threshold}</strong></div><div><span>If the gate fails</span><p>{evidenceConsequence}</p></div></div>
            </article>;
          })}</div>
        </section>

        <section className="report-section report-section--dark" id="economics">
          <div className="report-section-heading"><span>04</span><div><small>BUSINESS CASE</small><h2>Validate the value before scaling the cost.</h2></div></div>
          <div className="economics-hero">
            <div><span>MODELED ANNUAL VALUE</span><strong>{blueprint.annualValue}</strong><small>Directional, before verification</small></div>
            <div className="economics-arrow"><ArrowRight /></div>
            <div><span>PROOF INVESTMENT</span><strong>{blueprint.pilotCost}</strong><small>Bounded validation budget</small></div>
            <div className="economics-arrow"><ArrowRight /></div>
            <div className="economics-net"><span>CAPITAL PROTECTED</span><strong>{blueprint.capitalProtected}</strong><small>Held until evidence gates pass</small></div>
          </div>
          <div className="scenario-grid">
            <article><span>CONSERVATIVE</span><strong>Re-test</strong><p>One or more critical gates remain unresolved; spend only on the missing evidence.</p><small>Do not scale yet</small></article>
            <article className="scenario-base"><span>BASE CASE</span><strong>{blueprint.payback}</strong><p>Expected payback if the workflow, quality, adoption, and cost thresholds pass.</p><small>Conditional investment case</small></article>
            <article><span>UPSIDE</span><strong>Expand</strong><p>Broaden scope only after the initial workflow produces repeatable, measured value.</p><small>Evidence-led growth</small></article>
          </div>
          <div className="economics-assumptions"><TriangleAlert /><p><strong>Model dependence:</strong> These values are illustrative estimates created from the project description. Replace them with verified volume, labor, error, operating-cost, and adoption data during the proof sprint.</p></div>
        </section>

        <section className="report-section" id="sprint">
          <div className="report-section-heading"><span>05</span><div><small>10-DAY PROOF SPRINT</small><h2>A bounded path from uncertainty to decision.</h2></div></div>
          <div className="sprint-timeline">{blueprint.sprint.map((step, index) => <article key={step.days}><div className="sprint-marker"><span>{index + 1}</span><i /></div><div className="sprint-days">{step.days}</div><div className="sprint-copy"><small>{index === 0 ? "Product + domain expert" : index === 1 ? "Technical lead" : index === 2 ? "Research lead" : "Executive sponsor"}</small><h3>{step.title}</h3><p>{step.action}</p></div><div className="sprint-gate"><CheckCircle2 /><span><small>EXIT GATE</small><strong>{step.gate}</strong></span></div></article>)}</div>
          <div className="sprint-decision"><GitBranch /><div><span>DECISION-CHANGING PIVOT</span><p>{blueprint.pivot}</p></div></div>
        </section>

        <section className="report-section report-section--tint" id="risks">
          <div className="report-section-heading"><span>06</span><div><small>RISK &amp; GOVERNANCE</small><h2>Controls required before customer use.</h2></div></div>
          <div className="risk-table" role="table" aria-label="Risk controls">
            <div className="risk-row risk-row--head" role="row"><span>Risk</span><span>Severity</span><span>Required control</span><span>Owner</span></div>
            {riskControls.map((item) => <div className="risk-row" role="row" key={item.risk}><strong>{item.risk}</strong><span><i className={`severity severity--${item.severity.toLowerCase()}`} />{item.severity}</span><p>{item.control}</p><small>{item.owner}</small></div>)}
          </div>
          <div className="control-strip"><ShieldCheck /><div><strong>Non-negotiable release rule</strong><p>The system may recommend and cite; a qualified human remains accountable for material decisions.</p></div></div>
        </section>

        <section className="report-section report-final-decision">
          <div className="final-decision-copy"><span>FINAL DECISION MEMO</span><h2>{blueprint.decision}.</h2><p>Authorize a bounded {blueprint.pilotCost} validation sprint. Hold broader product funding until the quality, workflow, and unit-economics gates are independently verified.</p><div className="final-checks"><span><Check /> Budget is bounded</span><span><Check /> Evidence gates are measurable</span><span><Check /> Pivot path is defined</span></div></div>
          <div className="final-gates"><article><span>FUND</span><p>All critical gates pass.</p></article><article><span>PIVOT</span><p>Value holds, but quality or workflow misses.</p></article><article><span>STOP</span><p>Economics fail or controls remain unresolved.</p></article></div>
        </section>

        <section className="report-disclaimer">
          <LockKeyhole /><div><strong>About this generated preview</strong><p>This report was generated locally in your browser from the description and context you entered. It uses an illustrative rule-based preview—not verified research or live AI analysis. A production Feasibility.ai report would use a secure reasoning service, cite sources, record assumptions, show calculation details, track evidence provenance, and clearly separate verified facts from modeled estimates.</p></div>
        </section>
      </div>

      <footer className="report-footer"><Link className="report-brand" href="/"><Mark /><span>feasibility<span>.ai</span></span></Link><p>Evidence-to-decision intelligence for ambitious AI projects.</p><Link href="/">Evaluate another opportunity <ArrowRight /></Link></footer>
    </main>
  );
}
