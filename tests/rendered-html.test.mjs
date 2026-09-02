import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("emits the Hostinger homepage and linked sample report", async () => {
  const home = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
  const report = await readFile(
    new URL("../dist/sample-report.html", import.meta.url),
    "utf8",
  );

  assert.match(home, /Feasibility\.ai/i);
  assert.match(home, /href=["']\/sample-report\.html["']/i);
  assert.match(report, /Sample AI Feasibility Report/i);
  assert.match(report, /AI copilot for construction-plan review/i);
});
