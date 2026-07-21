# Repository guidance

When designing, changing, reviewing, or finalizing an icon, read and follow
`.agents/skills/motion-icon-builder/SKILL.md`.

- Treat `src/icons/*.ts` as canonical.
- Never hand-edit `src/generated/` or `src/svelte/generated/`; run `npm run generate`.
- Keep framework adapters behaviorally equivalent.
- Run `npm run check` before pushing.
