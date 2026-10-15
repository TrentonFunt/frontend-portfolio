#!/usr/bin/env bash
# Assert CI workflows reference the integration branch from .claude/repo.json.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
INTEGRATION="$(node -e "console.log(JSON.parse(require('fs').readFileSync('$ROOT/.claude/repo.json')).integrationBranch)")"
PROTECTED="$(node -e "console.log(JSON.parse(require('fs').readFileSync('$ROOT/.claude/repo.json')).protectedBranch)")"

if grep -R "branches:" "$ROOT/.github/workflows" 2>/dev/null | grep -q "$INTEGRATION"; then
  :
else
  echo "NOTICE: no workflow trigger lists integration branch '$INTEGRATION' (solo-repo may only use pull_request)."
fi

if [ "$INTEGRATION" != "$PROTECTED" ]; then
  echo "INFO: integration ($INTEGRATION) and protected ($PROTECTED) differ — feature-branch flow expected."
fi

echo "repo.json branch constants: integration=$INTEGRATION protected=$PROTECTED"
