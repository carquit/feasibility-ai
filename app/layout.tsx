import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Feasibility.ai — Prove What Should Be Built",
  description: "Turn an AI idea into a decision blueprint with critical assumptions, measurable kill criteria, a 10-day proof sprint, unit economics, and a fund, pivot, or stop recommendation.",
  keywords: ["AI feasibility", "AI proof of concept", "AI project assessment", "AI decision intelligence", "AI ROI", "AI validation sprint"],
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><meta name="codex-preview" content="development" /></head><body>{children}</body></html>;
}
