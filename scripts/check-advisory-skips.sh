#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
node - "$ROOT" <<'NODE'
const fs = require("fs");
const path = require("path");
const root = process.argv[2];
const log = path.join(root, ".claude/advisory-skips.log");
const cfg = JSON.parse(fs.readFileSync(path.join(root, ".claude/repo.json"), "utf8"));
const maxDays = cfg.advisorySkipMaxAgeDays ?? 14;

if (!fs.existsSync(log)) process.exit(0);
const lines = fs.readFileSync(log, "utf8").split("\n").filter((l) => l.trim());
if (lines.length === 0) process.exit(0);

console.log("::warning::advisory-skips.log has pending review-stamp skips — run pre-commit-review and clear the ledger.");

const m = lines[0].match(/^(\d{4}-\d{2}-\d{2}T[\d:.]+Z)/);
if (!m) process.exit(0);
const oldest = Date.parse(m[1]);
const ageDays = Math.floor((Date.now() - oldest) / 86400000);
if (ageDays >= maxDays) {
  console.error(`FAIL: oldest advisory skip is ${ageDays}d old (cap ${maxDays}d). Clear via pre-commit-review.`);
  process.exit(1);
}
NODE
