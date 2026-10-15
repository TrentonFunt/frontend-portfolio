#!/usr/bin/env bash
# A8 — HANDOFF.md hard cap (~150 lines).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FILE="$ROOT/HANDOFF.md"
MAX=150

if [ ! -f "$FILE" ]; then
  echo "FAIL: HANDOFF.md missing"
  exit 1
fi

lines=$(wc -l < "$FILE" | tr -d ' ')
if [ "$lines" -gt "$MAX" ]; then
  echo "FAIL: HANDOFF.md is $lines lines (cap $MAX). Move status to issues; keep HANDOFF as pointers only."
  exit 1
fi

echo "HANDOFF.md line count OK ($lines / $MAX)"
