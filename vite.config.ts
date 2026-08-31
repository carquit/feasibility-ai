import vinext from "vinext";
import { defineConfig } from "vite";
// This production configuration is intentionally independent of ChatGPT
// Sites/Cloudflare files. That keeps GitHub-to-Hostinger deployments reliable
// even when hidden folders are omitted by an upload.
export default defineConfig({
  plugins: [vinext()],
  server: {
    host: "0.0.0.0",
  },
});
