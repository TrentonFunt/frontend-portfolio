# Spec: <short title>

| | |
|---|---|
| **Issue** | #<n> |
| **Risk labels** | `auth` / `money` / `contract` / `config` (one or more; `normal` work does not need this file) |
| **Repo(s)** | <repo>, <sibling repo if the contract changes> |
| **Author / date** | <name>, <YYYY-MM-DD> |
| **Status** | Draft → Ready → Implemented → Verified |

## 1. Problem
Two to five sentences. What is wrong or missing today, for whom, and what it costs. Link the incident, audit finding ID, or customer report that prompted it.

## 2. Non-goals
What this change deliberately does not do. Anything an implementer might reasonably assume is in scope but is not.

## 2b. Decisions resolved (from the grilling session — Part G stage 1)
One line per decision the grilling put to a human. Facts the repo could answer are not decisions and do not belong here. CI fails a labelled PR whose spec leaves this table empty.

| # | Decision | Chosen | Rejected alternative(s) | Decided by |
|---|---|---|---|---|
| D-1 | <the fork, as a question> | <answer> | <what "no" would have meant> | <name>, <YYYY-MM-DD> |

## 3. Acceptance criteria (3–8, WHEN/SHALL form)
Each line is testable and names its test.

| # | Criterion | Test that proves it |
|---|---|---|
| AC-1 | WHEN <condition> THE SYSTEM SHALL <observable behaviour> | `<TestClass.Method>` / `<file.test.ts "name">` |
| AC-2 | WHEN <condition that must be refused> THE SYSTEM SHALL <refuse, with what response> | negative case, required |

## 4. Security requirements (STRIDE-lite, one row per endpoint or trust boundary touched)
Ten minutes, not a workshop. Every row becomes a test; unmitigated rows become their own issue.

| Threat (S/T/R/I/D/E) | Requirement | ASVS 5.0 ref | Test |
|---|---|---|---|
| E — caller acts on an object they do not own | Deny by default; ownership check via the shared primitive, not inline | V8 | `<...>_OtherTenant_Returns403` |
| T — untrusted input crosses a service boundary | Validate/escape before it reaches an immutable record | V5 | `<...>` |
| D — unauthenticated abuse of this endpoint | Rate limit + lockout policy named | V6 | `<...>` |
| I — data in logs / errors | No PII or secret material in log lines or error bodies | V7 | `<...>` |

Fail-open check: for every new default or fallback, state what happens when the dependency is down. "Returns ok" is a finding, not a default.

## 5. Contract changes
- OpenAPI diff: <link to the PR's generated `openapi/*.json` diff> or "none".
- Breaking? If yes: ADR link, versioning plan, consumer repos and their PRs.
- Consumers that must regenerate types: <repo list>.

## 6. Config / infrastructure changes
- New or renamed env vars (schema file updated, `.env.example` updated, compose `${VAR:?}`): <list> or "none".
- Migrations (append-only; money/PII tables need adversarial review): <list> or "none".
- Routing / Traefik / CI changes: <list> or "none".

## 7. Verification (commands + expected output)
What a reviewer runs to see the behaviour, not just the tests.
```
<command>            # expect: <observable result>
<command>            # expect: <observable refusal>
```
Idempotency / failure drill for anything stateful: send twice, kill midway, replay. State the expected end state.

## 8. Rollback
How to undo if it ships wrong. If it cannot be undone (migration, external message, money moved), say so and what the mitigation is.

## 9. Exercised (filled in at completion)
Screenshot / curl transcript / drill output path, or `NOT EXERCISED — <why>`. A PR that cannot fill this line is not done (A5).
