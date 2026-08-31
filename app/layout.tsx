import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Feasibility.ai — AI Decision Intelligence",
  description: "Turn an ambitious AI idea into a clear, evidence-backed decision across technical viability, cost, risk, timing, and ROI.",
  keywords: ["AI feasibility", "AI project assessment", "AI decision intelligence", "AI ROI", "AI strategy"],
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
