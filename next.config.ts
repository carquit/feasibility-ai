import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Feasibility.ai is currently a fully client-side experience. Exporting it
  // as static HTML avoids Hostinger's unreliable Node process handoff while
  // preserving the interactive analyzer and print-ready sample report.
  output: "export",
};

export default nextConfig;
