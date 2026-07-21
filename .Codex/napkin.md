# Napkin Runbook

## Curation Rules
- Re-prioritize on every read.
- Keep recurring, high-value notes only.
- Max 10 items per category.
- Each item includes date + "Do instead".

## Execution & Validation (Highest Priority)
1. **[2026-07-21] Canonical definitions generate every adapter**
   Do instead: edit `src/icons/*.ts`, run `npm run generate`, and never hand-edit generated React, Vue, Svelte, catalog, or CSS files.

2. **[2026-07-21] Verify the distributable and gallery together**
   Do instead: run `npm run check` before pushing; it covers types, lint, tests, the package build, and the Pages build.

## Domain Behavior Guardrails
1. **[2026-07-21] Motion must explain the action**
   Do instead: follow `.agents/skills/motion-icon-builder/SKILL.md` and move one physically meaningful part with a quiet, reversible gesture.

2. **[2026-07-21] Drafts require explicit human selection**
   Do instead: present three distinct directions, iterate in DialKit, and run `icon:finalize` only after the user locks one option.
