# HANDOFF — frontend-portfolio

**Branch:** `dev` (integration) — ship to production via PR **`dev` → `main`**  
**Next step:** Merge open PRs into `dev`, then open release PR to `main`.

## In flight
- Fullstack Engineer branding + CV sync on `dev`.
- Workflow standard v1.19 (hooks, CI, CLAUDE layer).

## Git workflow (from 2026-10-15)
- Feature work → PR into **`dev`**.
- Release → PR **`dev` → `main`** only.
- Never push directly to **`main`**.

## Pointers
- Live site: README demo link (Vercel).
- Role copy: `src/lib/portfolio-content.ts`.
- Branch constants: `.claude/repo.json`.

## Recent decisions
- **2026-10-15:** Integration branch **`dev`**, protected **`main`**.
- **2026-10-15:** Site positioned as **Fullstack Engineer** portfolio (not frontend-only).
