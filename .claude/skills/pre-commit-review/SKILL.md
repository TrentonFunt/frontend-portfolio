---
name: pre-commit-review
description: Tiered self/adversarial review before push; writes a review stamp. User must invoke — never auto-stamp.
disable-model-invocation: true
---

# pre-commit-review

1. Run `node .claude/hooks/stage.mjs` — note tier and fingerprint.
2. **Tier 0:** no stamp needed.
3. **Tier 1:** self-review checklist — correctness, a11y for terminal changes, spec/PR intent; run A7 comment triage on touched comments.
4. **Tier 2 (floor paths or large diff):** separate reviewer or adversarial pass with three lenses (A4).
5. On APPROVE: `node scripts/write-review-stamp.mjs --tier <0|1|2> --notes "<what you checked>"`
6. If clearing advisory skips, empty resolved lines from `.claude/advisory-skips.log` in the same commit.

Stamp format is consumed by `.claude/hooks/pre-push-review.mjs`.
