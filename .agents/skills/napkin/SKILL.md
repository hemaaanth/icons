---
name: napkin
description: |
  Maintain this repository's `.Codex/napkin.md` as a continuously curated
  runbook. This skill is always active: read and curate the napkin before any
  work, retain only recurring high-value guidance, and keep every rule actionable.
---

# Napkin

Maintain `.Codex/napkin.md` as a compact repository runbook, not a session log.
This skill is always active, with no trigger required.

## At the start of every session

1. Read `.Codex/napkin.md` before doing repository work.
2. Re-prioritize entries by importance.
3. Merge duplicates and remove stale or one-off notes.
4. Confirm every entry includes a date and an explicit `Do instead:` action.
5. Keep at most ten entries in each category.

If the file is missing, create it with this structure:

```markdown
# Napkin Runbook

## Curation Rules
- Re-prioritize on every read.
- Keep recurring, high-value notes only.
- Max 10 items per category.
- Each item includes date + "Do instead".

## Execution & Validation (Highest Priority)
1. **[YYYY-MM-DD] Short rule**
   Do instead: concrete repeatable action.

## Shell & Command Reliability
1. **[YYYY-MM-DD] Short rule**
   Do instead: concrete repeatable action.

## Domain Behavior Guardrails
1. **[YYYY-MM-DD] Short rule**
   Do instead: concrete repeatable action.

## User Directives
1. **[YYYY-MM-DD] Directive**
   Do instead: exactly follow this preference.
```

Adapt the categories to the repository while preserving their priority order.

## What belongs in the napkin

- Frequent repository or toolchain gotchas.
- User directives that should shape repeated work.
- Non-obvious tactics that reliably improve execution.

Do not add chronological updates, one-off facts, verbose postmortems, or a
mistake without a reusable corrective action. Curate the napkin continuously
when new recurring guidance emerges.
