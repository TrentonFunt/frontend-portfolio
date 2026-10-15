# frontend-portfolio — agent & developer instructions

CLI-themed React portfolio (Vite 7, TypeScript strict, Tailwind v4, Framer Motion). Deployed on Vercel; no server secrets or PII in this repo.

## Process Profile: Light (set 2026-10-15, bootstrap)
- **Commit gate:** hooks block absolutes only; review stamp is **advisory** at push (logged to `.claude/advisory-skips.log`).
- **Adversarial review:** A4-Floor paths only (`.claude/hooks/**`, `.github/workflows/**`, `scripts/**`). Everything else: self-review + green `npm run check`.
- **Tier:** small-team (CI + pre-push fast gate + path-scoped rules).

## Absolutes (hook- or CI-enforced)
| Rule | Enforcement |
|---|---|
| No secrets in git | gitleaks in CI; guard on write |
| npm only (lockfile canonical) | guard PreToolUse |
| No direct push to `main` | guard PreToolUse |
| No `commit && push` chains | guard PreToolUse |
| No `.env` / build artefacts in commits | guard PreToolUse |
| Build + lint green before merge | CI + pre-push |

## Commands
| Command | Purpose |
|---|---|
| `npm run dev` | Vite dev server (5173) |
| `npm run build` | `tsc -b` + production build |
| `npm run lint` | ESLint |
| `npm run check` | build + lint (definition of done minimum) |
| `npm run preview` | Preview production build |

One-time hooks install: `git config core.hooksPath .githooks`

## How to work here
- Answer before implementing; reuse patterns in `src/components` and `src/lib`.
- Terminal commands live in `src/lib/commands.ts`; project data in `src/lib/projects.ts`.
- Prefer surgical diffs; no drive-by refactors.
- End sessions by updating `HANDOFF.md` (≤150 lines, pointers not ledgers).
- Workflow standard version: `.claude/STANDARD_VERSION` (synced to [eanvest-workflow-standard](https://github.com/eanvest-ltd/eanvest-workflow-standard)).

## Definition of done (A5, scaled to this repo)
1. `npm run check` green. 2. New behavior manually exercised in browser (CLI + GUI paths). 3. PR lists `Exercised:` and `Impact:` (see `.github/pull_request_template.md`). 4. `HANDOFF.md` updated if state changed.

## Docs map
| File | Role |
|---|---|
| `HANDOFF.md` | Current branch, next step, blockers |
| `RETROSPECTIVE.md` | Friction log (A6) |
| `docs/templates/` | Spec / ADR / postmortem (Part G) |
| `docs/WORKFLOW.md` | Pointer to org workflow standard |

## Architecture (invariants)
```
src/
  components/   UI + Terminal
  routes/       Home, Project, NotFound
  lib/          commands, projects, constants
  styles/       globals.css tokens
```
- React Router 7; shadcn-style UI under `components/ui`.
- Backtick toggles CLI ↔ GUI (`SiteLayout` / terminal).
- Do not break keyboard terminal UX or `prefers-reduced-motion` handling.

## Git flow
- Feature branch → PR to `main` (solo repo: integration = protected = `main`).
- Never push directly to `main`; never commit secrets.

## Rule → enforcement (Part G stage 9)
| Rule | Enforcement |
|---|---|
| No secrets | gitleaks + guard |
| npm only | guard |
| Protected branch | guard |
| Review before push | pre-push-review (advisory) + skills |
| HANDOFF size | `scripts/check-handoff-length.sh` in CI |
| Standard drift | `.claude/hooks/check-standard-drift.sh` in CI |

## Layer index
- `.claude/rules/` — path-scoped conventions
- `.claude/skills/` — verify-work, pre-commit-review, glossary, next
- `.claude/hooks/` — guard, stage prompter, drift check
- `.githooks/pre-push` — fast local gate

## Evolve, don't accrete
Friction → `RETROSPECTIVE.md` with fix / simplify / accept / open. Guards that block legitimate work are defects (A6).
