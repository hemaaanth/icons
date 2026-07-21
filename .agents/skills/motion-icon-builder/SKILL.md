---
name: motion-icon-builder
description: Design, compare, tune, refine, and finalize one meaningful microanimated icon in this repository. Use when asked to add an icon, animate an icon, propose motion directions, respond to icon feedback, tune motion with DialKit, lock a chosen direction, or promote a draft into the framework-neutral catalog.
---

# Motion Icon Builder

Build one icon through an explicit human review loop. Keep the resting Lucide
geometry canonical and make motion communicate the control's action.

## Workflow

1. Inspect the existing catalog and choose the matching Lucide slug. Do not
   duplicate an export or invent new resting geometry without explaining why.
2. Run `npm run icon:new -- <slug>`. Edit only `drafts/<slug>.mjs` while the
   icon is under review.
3. Create three genuinely distinct motion directions. Give each option one
   physical idea and a plain-language concept. Avoid three parameter variants
   of the same idea.
4. Run `npm run dev:builder`. Present the three options in the Builder and ask the user
   which direction is strongest and what feels wrong. Do not finalize yet.
5. Apply feedback to the chosen option. Use the embedded DialKit panel to tune
   every amplitude and duration, save versions, compare rapidly, and copy the
   approved values back into the draft.
6. Recheck the rest pose, 13–16px legibility, hover exit, rapid interruption,
   keyboard focus, touch behavior, and reduced motion. Read
   [references/motion-spec.md](references/motion-spec.md) for the hard rules.
7. Ask the user to lock the direction. After explicit approval, run
   `npm run icon:finalize -- <slug> <candidate-id>`. This promotes the draft,
   regenerates every adapter, tests, and stages the icon.
8. Review the staged diff, run `npm run check`, then commit. Never hand-edit
   `src/generated/` or `src/svelte/generated/`.

## Direction quality

- Express one action: a lid opens, a sheet separates, a chain tightens.
- Move a meaningful part before moving the whole glyph.
- Follow physical logic. Hinges rotate around hinges; attached pieces remain
  attached; overlaps use actual masks rather than crossing strokes.
- Keep movement quiet: usually at most 30° rotation or 2 SVG units of travel.
- Prefer reversible transitions driven by `--mi-progress`. Use keyframes only
  when a two-state transition cannot express the idea.
- Preserve color, layout, and resting geometry. Consumers own size and color.
- Make the visible action finish quickly, generally within 300ms.

## Source contract

- Use the `mi` namespace exclusively: `.mi-<slug>-<part>`, `--mi-<slug>-*`.
- Put all motion behind `@media (prefers-reduced-motion: no-preference)`.
- Define each tunable value once as a `var()` fallback and mirror it exactly in
  `knobs`. The generator rejects drift.
- Keep SVG body strings trusted and static. Never interpolate user input.
- Preserve accessible wrapper behavior in the adapters. Decorative icons are
  `aria-hidden`; titled/labeled icons expose image semantics.
- Keep React, Vue, Svelte, and vanilla behavior derived from the same
  `IconDefinition`; never fork geometry by framework.

## Repository map

- `drafts/*.mjs`: unshipped options under human review.
- `src/icons/*.ts`: finalized canonical definitions.
- `site/App.tsx`: minimal public gallery; never expose authoring controls here.
- `builder.html` and `site/BuilderApp.tsx`: local-only reusable DialKit builder.
- `scripts/new-icon.mjs`: scaffold three options from Lucide geometry.
- `scripts/finalize-icon.mjs`: validate, promote, generate, test, and stage.
- `src/generated/`, `src/svelte/generated/`: generated adapters and styles.

For framework output and public API details, read
[references/frameworks.md](references/frameworks.md).
