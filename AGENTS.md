# Repository guidance

Before any work in this repository, read and follow
`.agents/skills/napkin/SKILL.md`, then read and curate `.Codex/napkin.md`.

When designing, changing, reviewing, or finalizing an icon, read and follow
`.agents/skills/motion-icon-builder/SKILL.md`.

- Treat `src/icons/*.ts` as canonical.
- Never hand-edit `src/generated/`, `src/svelte/generated/`, `registry/icons/`,
  or `public/r/`; run `npm run generate`.
- Keep framework adapters behaviorally equivalent.
- Keep the public Pages entry gallery-only; authoring belongs in `builder.html`.
- Run `npm run check` before pushing.
