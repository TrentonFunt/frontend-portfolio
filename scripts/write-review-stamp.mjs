#!/usr/bin/env node
/**
 * Write a review stamp after pre-commit-review. Usage:
 *   node scripts/write-review-stamp.mjs --tier 1 --notes "checked a11y on terminal"
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { classifyBranchDiff } from "../.claude/hooks/classify-diff.mjs";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const tier = Number(args[args.indexOf("--tier") + 1] ?? 1);
const notesIdx = args.indexOf("--notes");
const notes = notesIdx >= 0 ? args[notesIdx + 1] : "";

const { fingerprint, changedLines, fileCount } = classifyBranchDiff();
const stamp = {
  tier,
  fingerprint,
  changedLines,
  fileCount,
  at: new Date().toISOString(),
  notes,
};

writeFileSync(join(repoRoot, ".claude/review-stamp.json"), JSON.stringify(stamp, null, 2) + "\n");
console.log(`Wrote review stamp tier=${tier} fingerprint=${fingerprint}`);
