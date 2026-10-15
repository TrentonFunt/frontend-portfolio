---
paths:
  - "src/**"
  - "vite.config.ts"
---

# Engineering principles (local)

- **KISS:** One command table in `commands.ts`; project data in `projects.ts` — don't scatter copy.
- **DRY:** Shared terminal strings in `terminal-constants.ts`.
- **Surgical changes:** No unrelated refactors in feature PRs.
- **Types:** TypeScript strict; no `any` without a one-line why.
- **Dependencies:** npm + `package-lock.json` only; pin thoughtfully when adding packages.
