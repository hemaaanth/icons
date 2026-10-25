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

3. **[2026-10-15] bb replaced Paseo as the agent harness**
   Do instead: rely on the tracked `.bb-env-setup.sh` for `npm ci`, run the builder in a bb terminal, open `/icons/builder.html` in the bb browser panel, and take feedback as Pinpoint pins. Vite binds `127.0.0.1`; `localhost` alone once resolved to IPv6 only.

4. **[2026-10-15] Headless Chromium reports `(hover: hover)` as false**
   Do instead: to test hover rules headlessly, launch with `--blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4`; `Emulation.setEmulatedMedia` cannot fake `hover`.

5. **[2026-10-23] Judge motion from rendered frames, not a rubric**
   Do instead: render every 30ms of open, close, and a mid-hover interrupt at 13, 16, and 240px before showing anything; ask "does this read as the action?" first. The user rejected a rubric-optimized book as "garbage".

6. **[2026-10-23] bb-browser frame capture needs its own clock**
   Do instead: rAF never fires in the background bb-browser window, so freeze with `getAnimations({subtree:true})`, `pause()`, and `currentTime` after a forced style flush. Do not give capture cells `.mi-trigger`; its not-hover rule pins `--mi-progress` to 0 over `.mi-play`.

7. **[2026-10-23] Draft classes collide with shipped icon CSS in the builder**
   Do instead: the catalog rail loads every shipped icon's CSS, so a draft must not reuse a shipped icon's part class names (e.g. `.mi-book-open-cover`) or it inherits their `d` values.

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

6. **[2026-10-15] Shipped icons can still be single-source copies**
   Do instead: when refining, diff the rest geometry against `node_modules/lucide-static/icons/` first; book-open shipped as Lucide's exact path data with a breathing morph.
7. **[2026-10-15] Stacked outline layers double strokes at 13–16px**
   Do instead: before building any reveal (page turn, lid, sheet over sheet), check every frame for two near-parallel strokes under ~2 units apart; easing only moves the doubling, it never removes it. A linear `d` morph moves all points in lockstep, so a corner cannot lead without keyframes. A part swinging edge-on (a book cover) only reads if it passes edge-on fast; keep that window under ~40ms and let its spine collapse only after it crosses. At 13px, two parallel strokes about 3 units apart read as a "D" or a door; make such a cue either clearly separate or narrow enough to merge into one solid bar.
8. **[2026-10-23] A rotation must be a transitioned angle, not a `d` morph**
   Do instead: register an `@property` `<angle>` at document level, transition it, and build a trig `matrix()` inside `@supports (transform: scale(cos(0deg)))` with a plain fallback; a straight `d` reverse of a hinge creeps and doubles. Put opening timing on open-state rules and closing timing on rest-state rules for an asymmetric close. Drive every part that must stay in step with the rotation (a spine, a shadow) from the same transitioned angle, not its own time-based transition; Chrome shortens an interrupted reverse, so time-based parts fall out of sync. A part that must use state selectors (a `d` path, a slide) must copy the shared `--mi-progress` rules in `scripts/generate.ts` selector for selector, reset included; otherwise a hovered `.mi-trigger` wrapper or a disabled button splits the icon.

9. **[2026-10-15] Never clip or hide the static mark during motion**
   Do instead: keep every resting part whole in every frame; add the moving part as an extra path that is hidden at rest and coincides with a static part at 0% and 100%, so it appears and vanishes without a seam. The user called clipped mid-turn frames "broken".

## User Directives
1. **[2026-07-21] Keep each bb thread and worktree focused on one icon**
   Do instead: load the motion icon skill at session start, ask whether to add or improve one icon when no specific task is supplied, and move any second icon to a new bb thread.

2. **[2026-07-21] Keep the public gallery extremely quiet**
   Do instead: follow the hem.so layout language, honor only the system theme, omit icon descriptions and labels, and reveal copy actions without obscuring or muting the animated preview.
