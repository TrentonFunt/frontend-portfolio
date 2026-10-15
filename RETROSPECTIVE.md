# RETROSPECTIVE — friction log (A6)

Record guard/process pain here with a decision: **fixed / simplified / accepted / open**.

## Seeded lessons (from workflow standard)
- **L2** — Push-to-main guards must resolve current branch, not only match `main` in the command string.
- **L3** — Guards ship with fire/no-fire tests (`guard.test.mjs`, drift tests).
- **L5** — Never chain `commit && push`; hooks may block after commit ran.
- **L8** — Prefer the smallest guard that catches real mistakes; this repo stays Light profile until stakes rise.

## Entries
| Date | Friction | Decision |
|---|---|---|
| 2026-10-15 | Bootstrap | **open** — confirm pre-push advisory ledger behavior feels right for solo workflow |
