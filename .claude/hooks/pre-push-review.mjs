#!/usr/bin/env node
import { appendFileSync, existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { classifyBranchDiff } from "./classify-diff.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "../..");
const stampPath = join(repoRoot, ".claude/review-stamp.json");
const skipLog = join(repoRoot, ".claude/advisory-skips.log");

function loadConfig() {
  return JSON.parse(readFileSync(join(repoRoot, ".claude/repo.json"), "utf8"));
}

function loadStamp() {
  if (!existsSync(stampPath)) return null;
  try {
    return JSON.parse(readFileSync(stampPath, "utf8"));
  } catch {
    return null;
  }
}

function stampCovers(stamp, fingerprint, tier) {
  if (!stamp) return false;
  if (stamp.fingerprint !== fingerprint) return false;
  if (tier === 0) return true;
  if (tier === 1) return stamp.tier === 1 || stamp.tier === 2;
  return stamp.tier === 2;
}

const { tier, fingerprint, changedLines, fileCount, floorHit } = classifyBranchDiff();
const cfg = loadConfig();
const profile = cfg.profile ?? "light";

if (tier === 0) {
  process.exit(0);
}

const stamp = loadStamp();
if (stampCovers(stamp, fingerprint, tier)) {
  process.exit(0);
}

const msg = `Review stamp missing or stale for tier ${tier} diff (fingerprint ${fingerprint}, ${changedLines} lines, ${fileCount} files${floorHit ? ", floor path hit" : ""}). Run pre-commit-review before push.\n`;

if (profile === "strict") {
  process.stderr.write(msg);
  process.exit(1);
}

const line = `${new Date().toISOString()} review-stamp tier=${tier} fp=${fingerprint}\n`;
appendFileSync(skipLog, line);
process.stderr.write(`⚠ ${msg}`);
process.exit(0);
