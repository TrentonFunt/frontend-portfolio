# Postmortem: <incident title>

Blameless. Names appear as roles, not as causes. Triggered by: any Critical audit finding, any customer-visible outage, any money or PII defect that reached an environment beyond a developer laptop, any guard or CI gate found passing while measuring nothing. An audit Critical is an incident that was caught late.

| | |
|---|---|
| **Date of incident / date detected** | <YYYY-MM-DD> / <YYYY-MM-DD> |
| **Duration exposed** | <e.g. "latent since 2026-06-29, 81 days"> |
| **Severity** | Critical / High |
| **Repos** | <list> |
| **Owner of this document** | <role> |
| **Status** | Draft → Reviewed → Actions filed |

## Summary (three sentences)
What happened, what the impact was, how it was found.

## Timeline
| When | What |
|---|---|
| <ts> | <event, with commit / PR / log reference> |

## Root cause
The condition that, had it been absent, would have prevented the incident. Distinguish the **defect** (the wrong line) from the **process gap** (why nothing caught it). Name the stage in Part G where it was missed: intake / spec / design / contract / config / implement / verify / review / release.

## Contributing factors
Things that made it worse or slower to detect: missing test, mocked boundary, stale doc, guard false positive that trained people to bypass, and so on.

## What went well
Detection, response, or a control that limited the damage.

## Action items
Each becomes an issue with an owner and a date. At least one must be a **regression test that fails on revert**, and at least one must be a **structural fix** (hook, CI gate, architecture test, generated contract) so the class cannot recur, not just this instance.

| Action | Type (test / structural / doc) | Owner | Issue | Due |
|---|---|---|---|---|

## Lessons for the standard
If this incident shows a gap in `AGENT_WORKFLOW_STANDARD.md`, name the section and propose the sentence. A postmortem that changes nothing upstream is a report, not a lesson.
