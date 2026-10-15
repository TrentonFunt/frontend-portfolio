---
status: proposed | accepted | superseded by ADR-<n>
date: <YYYY-MM-DD>
decision-makers: <names>
consulted: <names or repos whose contract this touches>
informed: <names>
---

# ADR-<n>: <decision in one line>

Required when a change alters a trust boundary, a money state machine, a shared type, a cross-repo contract, or a dependency in the security path (Part G, stage 2). Optional otherwise.

## Context and problem statement
Two to five sentences. What forces the decision now. Link the spec or issue.

## Decision drivers
- <driver, e.g. "must stay idempotent under retry">
- <driver>

## Considered options
1. <option>
2. <option>
3. <option>

## Decision
Chosen: **<option>**, because <one sentence>.

## Consequences
- Good: <...>
- Bad / accepted risk: <...>
- Blast radius (A11): what else consumes the thing being changed, and which repos/PRs must move with it.

## Confirmation
How compliance with this decision is checked mechanically: the architecture test, contract check, or hook that fails if someone departs from it. A decision with no check is a preference.
