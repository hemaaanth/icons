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

3. **[2026-07-21] Commit Paseo project setup for repeatable worktrees**
   Do instead: keep `paseo.json` in Git, install with `npm ci`, auto-start the local Builder terminal, and open `/icons/builder.html` with Paseo browser tools when icon work begins.

## Domain Behavior Guardrails
1. **[2026-07-21] Originality and craft outrank catalog size**
   Do instead: start icon work from meaning and 3–5 independent references, prefer original geometry, require adversarial review, and ship nothing merely competent.

2. **[2026-07-21] Motion must explain the action in exactly 300ms**
   Do instead: use one primary physical event, settle the complete choreography within 300ms including delays, and preserve a quiet, reversible gesture.

3. **[2026-07-21] Static and animated geometry require optical review**
   Do instead: correct visual-mass alignment, negative space, apparent stroke weight, and edge clearance at 13, 16, 20, 24, and 32px before finalization.

4. **[2026-07-21] Drafts require quality-gated human selection**
   Do instead: present at most three directions that independently pass, iterate with Interface Craft and DialKit, and finalize only after adversarial PASS plus user lock.

5. **[2026-07-21] The public gallery is not an authoring surface**
   Do instead: keep GitHub Pages gallery-only and expose the DialKit builder solely through the local `builder.html` development entry.

## User Directives
1. **[2026-07-21] Keep each Paseo worktree focused on one icon**
   Do instead: load the motion icon skill at session start, ask whether to add or improve one icon when no specific task is supplied, and move any second icon to a new worktree/session.

2. **[2026-07-21] Keep the public gallery extremely quiet**
   Do instead: follow the hem.so layout language, honor only the system theme, omit icon descriptions and labels, and reveal copy actions without obscuring or muting the animated preview.
