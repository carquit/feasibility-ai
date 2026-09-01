import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sample AI Feasibility Report — Feasibility.ai",
  description: "Explore an illustrative Feasibility.ai decision blueprint with executive recommendation, evidence scorecard, proof sprint, economics, and risk controls.",
};

export default function SampleReportLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
