// tests/testFileDiscovery.ts
import * as path from "node:path";
import { fileURLToPath } from "node:url";

import { discoverFiles } from "../src/adapters/fileDiscovery.js";
import type { RunConfig } from "../src/core/types.js";

// Recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const testProgramConfig: RunConfig = {
    // __dirname here is .../refactora/tests
    // so this becomes .../refactora/tests/testProgram
    projectRoot: "tests/testProgram",
    includeGlobs: ["**/*.ts"],
    excludeGlobs: [
      "**/node_modules/**",
      "**/*.test.ts",
      "**/*.spec.ts",
      "**/*.d.ts",
    ],
    minSimilarity: 0.5,
    maxRisk: "low",
    mode: "advisor",
  };

  console.log("Running discoverFiles with config:");
  console.dir(testProgramConfig, { depth: null });

  try {
    const result = await discoverFiles(testProgramConfig);
    console.log("\n=== discoverFiles result ===");
    console.dir(result, { depth: null });
  } catch (err) {
    console.error("\n❌ discoverFiles threw an error:");
    console.dir(err, { depth: null });
  }
}

main().catch((err) => {
  console.error("\n❌ Top-level error in testFileDiscovery:");
  console.dir(err, { depth: null });
});
