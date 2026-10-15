# Workflow standard in this repo

Canonical standard: [eanvest-ltd/eanvest-workflow-standard](https://github.com/eanvest-ltd/eanvest-workflow-standard) (`AGENT_WORKFLOW_STANDARD.md` + `VERSION`).

This portfolio adopts **small-team / Light** profile:

- `.claude/STANDARD_VERSION` — pinned sync version
- `.claude/hooks/check-standard-drift.sh` — compares against published `VERSION` in CI
- `docs/templates/` — Part G spec / ADR / postmortem templates (copied from the standard repo; do not fork headings)

To refresh after a standard bump: re-read Part B of the standard, update local guardrails, then bump `.claude/STANDARD_VERSION` to match.
