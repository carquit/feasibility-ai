import path from "node:path";
import { fileURLToPath } from "node:url";
import { startProdServer } from "vinext/server/prod-server";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const port = Number.parseInt(process.env.PORT ?? "3000", 10);

if (!Number.isInteger(port) || port < 1 || port > 65_535) {
  throw new Error(`Invalid PORT value: ${process.env.PORT}`);
}

await startProdServer({
  host: "0.0.0.0",
  outDir: path.join(projectRoot, "dist"),
  port,
});
