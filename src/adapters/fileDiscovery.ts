/*
Purpose:
    Discover target source files using include/exclude globs.

Responsibilities:
    Resolve includeGlobs / excludeGlobs against projectRoot.
    Return ordered, de-duplicated list of file paths.

Consumes → Produces:
    Consumes: RunConfig
    Produces: FileRecord[] (with fileId, path only at this stage)

Acceptance Criteria:
    Ignores node_modules, dist, and configured excludes.
    Deterministic order (stable across runs).
    Missing directories handled gracefully with a warning.

Testing Notes:
    Fixtures with nested folders, duplicate matches, and excluded paths.
*/

// src/adapters/fs/fileDiscovery.ts

// 1) Imports you are likely to need
import path from "node:path";
// You'll pick a glob library, e.g. 'fast-glob' or 'glob'
import fg from "fast-glob"; // or your chosen lib

import fs from "fs";

import { ScanError } from "../core/errors.js";

// These should come from your shared types module
import { RunConfig, FileRecord } from "../core/types.js"; // adjust path as needed

import micromatch from "micromatch";

// 2) Main function this module exposes
export async function discoverFiles(config: RunConfig): Promise<FileRecord[]> {
  // 1. Normalize/resolve the project root
  const root = normalizeRoot(config.projectRoot);

  // 2. Resolve include globs relative to the root
  const includedPaths = await resolveIncludes(root, config.includeGlobs);

  // 3. Apply exclude globs (and any default excludes like node_modules)
  const filteredPaths = applyExcludes(includedPaths, config.excludeGlobs);

  // 4. Dedupe and sort for deterministic ordering
  const sortedPaths = dedupeAndSort(filteredPaths);

  // 5. Map paths to FileRecord objects
  const fileRecords = sortedPaths.map((p) => toFileRecord(root, p));

  // (Optionally: log counts / warnings here or bubble them up)
  return fileRecords;
}

// 3) Helper function stubs (you implement the logic)

// Turn the projectRoot from config into an absolute, normalized path
function normalizeRoot(projectRoot: string): string {
  // TODO: use path.resolve, maybe check existence, etc.
  const resolved = path.resolve(projectRoot);

  if (!fs.existsSync(resolved)) {
    throw new ScanError("config", `Project root does not exist: ${resolved}`);
  }

  const stats = fs.statSync(resolved);
  if (!stats.isDirectory()) {
    throw new ScanError("config", `Project root is not a directory: ${resolved}`);
  }

  return resolved;
}

// Use your glob library to expand include patterns into file paths
async function resolveIncludes(root: string, includeGlobs: string[]): Promise<string[]> {
  // TODO: join root + patterns, call fg/glob, collect paths
  const allMatches: string[] = [];

  for (const pattern of includeGlobs) {
    if (!pattern) continue;

    const results = await fg(pattern, { cwd: root, absolute: false, onlyFiles: true })
    allMatches.push(...results)
  };
  return allMatches;
}

// Remove any paths that match exclude globs or default ignore patterns
function applyExcludes(candidatePaths: string[], excludeGlobs: string[]): string[] {
  // TODO: filter out excluded paths (could reuse glob matching or a minimatch lib)
  if (!excludeGlobs.length) return candidatePaths;

  const filtered: string[] = [];
  for (const candidatePath of candidatePaths) {
    let isExcluded = false;
    for (const pattern of excludeGlobs) {
      if (micromatch.isMatch(candidatePath, pattern)) {
        isExcluded = true;
        break;
      }
    };
    if (!isExcluded) filtered.push(candidatePath);
  };
  return filtered;
}

// Remove duplicates and sort for stable ordering
function dedupeAndSort(paths: string[]): string[] {
  // TODO: dedupe via Set, then sort
  const newPaths = [...new Set(paths)];
  newPaths.sort()
  return newPaths;
}

// Convert a file path into a FileRecord with a stable fileId
function toFileRecord(root: string, filePath: string): FileRecord {
  // TODO: make fileId relative to root, fill path field
  // e.g., fileId = path.relative(root, filePath).replace(/\\/g, "/");
  const relative = filePath.replace(/\\/g, "/");
  const absolute = path.join(root, relative).replace(/\\/g, "/");

  return {
    fileId: relative,
    path: absolute,
    // you can add empty imports/exports arrays here for now if your type requires them
  };
}
