---
name: verify-work
description: Run the repo definition-of-done checks and report READY or NOT READY.
disable-model-invocation: true
---

# verify-work

1. Run `npm run check` (build + lint).
2. If the change touches UI, run `npm run dev` and smoke-test CLI (`help`, `projects`) and GUI home scroll.
3. Record verdict:

```
VERIFY: READY | NOT READY
Checks: build, lint, [manual browser if UI]
Notes: <what was exercised or NOT EXERCISED — why>
```
