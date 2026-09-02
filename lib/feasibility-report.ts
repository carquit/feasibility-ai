export type EvidenceItem = {
  name: string;
  status: "Unproven" | "Weak signal" | "Supported";
  test: string;
  threshold: string;
};

export type SprintStep = {
  days: string;
  title: string;
  action: string;
  gate: string;
};

export type Blueprint = {
  decision: string;
  confidence: number;
  decisionNote: string;
  capitalProtected: string;
  pilotCost: string;
  payback: string;
  annualValue: string;
  evidence: EvidenceItem[];
  sprint: SprintStep[];
  pivot: string;
};

export type GeneratedReport = {
  version: 1;
  id: string;
  generatedAt: string;
  idea: string;
  stage: "idea" | "pilot" | "scale";
  horizon: "14" | "30" | "90";
  blueprint: Blueprint;
};

const REPORT_KEY_PREFIX = "feasibility-ai:report:";
const REPORT_INDEX_KEY = "feasibility-ai:report-index";

export const constructionBlueprint: Blueprint = {
  decision: "VALIDATE → FUND",
  confidence: 67,
  decisionNote: "Do not fund the full build yet. A 10-day proof sprint can resolve the three assumptions that control the investment decision.",
  capitalProtected: "$182k",
  pilotCost: "$18k",
  payback: "2.4 mo",
  annualValue: "$412k",
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

export function blueprintFor(idea: string): Blueprint {
  const text = idea.toLowerCase();
  if (/(support|service|helpdesk|customer)/.test(text)) return {
    ...constructionBlueprint,
    decision: "PILOT WITH GUARDRAILS",
    confidence: 71,
    capitalProtected: "$96k",
    pilotCost: "$12k",
    payback: "3.1 mo",
    annualValue: "$188k",
    decisionNote: "The automation case is credible, but resolution quality and safe escalation must be proven before customer-facing rollout.",
    evidence: [
      { name: "Resolution quality", status: "Unproven", test: "Replay 500 resolved tickets against the agent.", threshold: "Pass at ≥85% correct resolution" },
      { name: "Human handoff safety", status: "Weak signal", test: "Red-team ambiguous and high-risk conversations.", threshold: "Escalate ≥98% of high-risk cases" },
      { name: "Cost per resolution", status: "Supported", test: "Meter full inference and review cost.", threshold: "Pass at ≤35% of current cost" },
    ],
    pivot: "If autonomous resolution misses the safety gate, launch as an agent-assist copilot. It captures most of the handle-time benefit while keeping a human accountable for the final response.",
  };
  if (/(maintenance|sensor|equipment|failure)/.test(text)) return {
    ...constructionBlueprint,
    decision: "VALIDATE DATA FIRST",
    confidence: 58,
    capitalProtected: "$240k",
    pilotCost: "$24k",
    payback: "5.8 mo",
    annualValue: "$510k",
    decisionNote: "The upside is material, but historical failure coverage—not model selection—is the decision bottleneck.",
    evidence: [
      { name: "Failure-event coverage", status: "Unproven", test: "Audit 24 months of sensor and work-order history.", threshold: "Pass with ≥80 labeled failures" },
      { name: "Operational lead time", status: "Weak signal", test: "Back-test alerts against real maintenance windows.", threshold: "Pass with ≥72 hours median warning" },
      { name: "Avoided downtime value", status: "Supported", test: "Verify loss-per-hour with operations and finance.", threshold: "Pass at ≥$8k avoided loss/event" },
    ],
    pivot: "If failure labels are too sparse, begin with anomaly detection and technician triage rather than failure prediction. It creates value now while producing the labeled data needed later.",
  };
  if (/(document|contract|invoice|knowledge)/.test(text)) return {
    ...constructionBlueprint,
    decision: "FUND A CONTROLLED PILOT",
    confidence: 76,
    capitalProtected: "$128k",
    pilotCost: "$15k",
    payback: "2.0 mo",
    annualValue: "$276k",
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

export function createGeneratedReport(
  idea: string,
  stage: GeneratedReport["stage"],
  horizon: GeneratedReport["horizon"],
  blueprint: Blueprint,
): GeneratedReport {
  const generatedAt = new Date();
  const randomPart = Math.random().toString(36).slice(2, 7);
  return {
    version: 1,
    id: `${generatedAt.getTime().toString(36)}-${randomPart}`,
    generatedAt: generatedAt.toISOString(),
    idea: idea.trim(),
    stage,
    horizon,
    blueprint,
  };
}

export function saveGeneratedReport(report: GeneratedReport): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(`${REPORT_KEY_PREFIX}${report.id}`, JSON.stringify(report));
    const parsed = JSON.parse(window.localStorage.getItem(REPORT_INDEX_KEY) ?? "[]") as unknown;
    const existing = Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
    const next = [report.id, ...existing.filter((id) => id !== report.id)].slice(0, 10);
    window.localStorage.setItem(REPORT_INDEX_KEY, JSON.stringify(next));
    for (const expiredId of existing.filter((id) => !next.includes(id))) {
      window.localStorage.removeItem(`${REPORT_KEY_PREFIX}${expiredId}`);
    }
    return true;
  } catch {
    return false;
  }
}

export function loadGeneratedReport(id: string | null): GeneratedReport | null {
  if (typeof window === "undefined" || !id) return null;
  try {
    const raw = window.localStorage.getItem(`${REPORT_KEY_PREFIX}${id}`);
    if (!raw) return null;
    const report = JSON.parse(raw) as GeneratedReport;
    return report.version === 1 && report.id === id ? report : null;
  } catch {
    return null;
  }
}
