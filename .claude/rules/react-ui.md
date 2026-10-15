---
paths:
  - "src/**/*.tsx"
  - "src/styles/**"
---

# React UI conventions

- Functional components; hooks for state. Match existing Framer Motion patterns (`FadeInSection`, `TiltCard`).
- Tailwind v4 + tokens in `src/styles/globals.css`; avoid inline styles unless dynamic (motion).
- Respect `prefers-reduced-motion` — follow `Terminal` / layout patterns.
- shadcn primitives live in `src/components/ui/`; extend via `className` + `cn()` from `src/lib/utils.ts`.
- Terminal output must stay accessible (ARIA live regions in `Terminal.tsx`).
