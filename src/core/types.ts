// src/core/types.ts

export interface RunConfig {
  projectRoot: string;
  includeGlobs: string[];
  excludeGlobs: string[];
  minSimilarity: number;
  maxRisk: "low" | "med" | "high";
  mode: "advisor" | "sandbox";
}

export interface FileRecord {
  fileId: string;
  path: string;
  // You will add exports/imports arrays later once the indexer runs
}
