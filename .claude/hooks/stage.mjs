#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { classifyBranchDiff } from "./classify-diff.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "../..");
const stampPath = join(repoRoot, ".claude/review-stamp.json");

function stampCurrent(fingerprint) {
  if (!existsSync(stampPath)) return false;
  try {
    const stamp = JSON.parse(readFileSync(stampPath, "utf8"));
    return stamp.fingerprint === fingerprint;
  } catch {
    return false;
  }
}

function main() {
  const stopMode = process.argv.includes("--stop");
  const { tier, fingerprint, changedLines, fileCount } = classifyBranchDiff();

  let stage = 5;
  let next = "keep going — implement on your feature branch";
  if (tier >= 1 && !stampCurrent(fingerprint)) {
    stage = 7;
    next = `/pre-commit-review — tier ${tier}, ${changedLines} lines across ${fileCount} files, no stamp for ${fingerprint}`;
  }

  const line = `stage: ${stage} ${stage === 7 ? "Review" : "Implement"} · tier: ${tier} · next: ${next}`;

  if (stopMode) {
    process.stdout.write(
      JSON.stringify({
        hookSpecificOutput: { additionalContext: line },
      })
    );
  } else {
    process.stdout.write(`${line}\n`);
  }
}

main();
