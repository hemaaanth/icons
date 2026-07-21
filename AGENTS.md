# Repository guidance

Before any work in this repository, read and follow
`.agents/skills/napkin/SKILL.md`, then read and curate `.Codex/napkin.md`, then
read and follow `.agents/skills/motion-icon-builder/SKILL.md`.

At the start of a new agent session, if the user has not already named one
specific icon task, ask exactly: "What do you want to do today: add a new icon
or improve an existing icon?"

Each worktree and agent session may work on exactly one icon. Once that icon is
chosen, keep all implementation, review, and refinement scoped to it. If the
user asks to start a second icon, stop and ask them to open a new Paseo
worktree/session for it.

- Treat `src/icons/*.ts` as canonical.
- Never hand-edit `src/generated/`, `src/svelte/generated/`, `registry/icons/`,
  or `public/r/`; run `npm run generate`.
- Keep framework adapters behaviorally equivalent.
- Keep the public Pages entry gallery-only; authoring belongs in `builder.html`.
- Run `npm run check` before pushing.
