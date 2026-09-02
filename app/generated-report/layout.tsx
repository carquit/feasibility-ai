import type { Metadata } from "next";
import "../sample-report/report.css";

export const metadata: Metadata = {
  title: "Generated AI Feasibility Report — Feasibility.ai",
  description: "A personalized, print-ready Feasibility.ai decision blueprint generated from the project description entered in the analyzer.",
};

export default function GeneratedReportLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
