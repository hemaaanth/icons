---
name: motion-icon-builder
description: Design, compare, tune, refine, and finalize one exceptional microanimated icon in this repository. Use when asked to add an icon, animate an icon, propose motion directions, respond to icon feedback, tune motion with DialKit, lock a chosen direction, or promote a draft into the framework-neutral catalog.
---

# Motion Icon Builder

Build one authored icon through research, ruthless critique, and explicit human
review. Start from meaning, not from an icon library. A no-ship result is better
than a merely competent icon; ten exceptional icons beat one hundred generic
ones.

Before drawing or editing an icon, read
[references/motion-spec.md](references/motion-spec.md) and
[references/quality-bar.md](references/quality-bar.md). Also load the locally
installed Interface Craft skill. Use its Storyboard Animation, DialKit, and
Design Critique methods as thinking and tuning tools, never as substitutes for
icon-specific judgment or as permission to add decorative motion. Do not copy
Interface Craft into this repository.

## Workflow

1. Write a one-sentence brief: what the static mark denotes, what action or
   state the motion communicates, its UI context, and its target sizes. Inspect
   the catalog for semantic overlap, not for geometry to reuse.
2. Build a reference matrix with 3–5 independent references. Include more than
   one kind of evidence: strong icon systems, the real object or physical
   action, typography/signage, or relevant motion. For each reference record
   what works, what fails, and what must not be copied. Lucide may be one
   reference; it is never the required skeleton or the default answer.
3. Spawn an adversarial design-review subagent before drawing. Give it the
   brief and reference matrix, but ask it to critique rather than generate. It
   must identify clichés, misleading metaphors, single-source resemblance, and
   the synthesis opportunity. If subagents are unavailable, perform the same
   review as a separate named pass and disclose that limitation.
4. Choose and explain a geometry strategy: original construction, a synthesis
   of multiple principles, or a justified adaptation. Begin on a blank 24×24
   field by default. If any existing geometry is retained, explain every
   distinctive contour retained and why it is not derivative.
5. Run `npm run icon:new -- <slug>` for a blank draft. Use
   `npm run icon:new -- <slug> --from-lucide <lucide-slug>` only after the
   adaptation decision in step 4. Edit only `drafts/<slug>.mjs` while the icon
   is under review.
6. Design the static mark first. Correct optical centering, apparent stroke
   weight, negative-space balance, baseline, and diagonal/round overshoot at
   13, 16, 20, 24, and 32px. Mathematical centering is evidence, not the goal.
   Do not animate geometry that fails the static gate.
7. Storyboard rest, decisive moment, and settled pose in plain language before
   coding. Explore broadly, then keep at most three genuinely distinct passing
   directions. Never pad the review with weak variants; presenting zero, one,
   or two options is valid.
8. Review each candidate blind first: show its still and loop without its name
   or rationale. Run an adversarial subagent review that returns `PASS`,
   `REVISE`, or `KILL` with evidence for the static form, originality, semantic
   clarity, optical balance, physical logic, restraint, and closest precedent.
   Respond point-by-point. The reviewer has veto power.
9. Run `npm run dev:builder`, then use Paseo's browser tools to open
   `/icons/builder.html` in a new tab for the current workspace. Keep that tab
   open and refresh it as the draft changes. Present only candidates that
   passed. Ask the user which direction is strongest and what feels wrong; do
   not finalize yet. If browser tools are unavailable in the active session,
   say so once and give the exact local URL instead of silently skipping it.
10. Apply feedback in the chosen draft. Use Interface Craft's storyboard method
    to keep the sequence readable, DialKit to tune amplitudes and easing, and
    Design Critique for a separate polish pass. Duration is not tunable: the
    complete choreography is exactly 300ms at `--mi-time: 1`, including delays
    and stagger.
11. Recheck rest, peak, and settled frames; all target sizes; hover exit; rapid
    interruption; keyboard focus; touch/play behavior; disabled state; and
    reduced motion. Ask the user to lock the direction only after these pass.
12. After user lock, run a second independent adversarial review. Finalize only
    on `PASS`; otherwise revise or abandon. Then run
    `npm run icon:finalize -- <slug> <candidate-id>`, review the generated diff,
    and run `npm run check` before committing.

## Non-negotiable quality bar

- The resting icon must be beautiful, recognizable in context, and useful with
  motion disabled. Animation may clarify an action; it may not rescue weak form.
- Reject any result reducible to “icon library X plus motion preset Y.” No
  distinctive silhouette or path construction may depend on one reference.
- Use one primary physical event and at most one subordinate reaction. Remove
  any movement whose absence does not reduce meaning. Complexity is not craft.
- Stock nudges, spins, scales, bounces, and path morphs require a semantic and
  mechanical reason specific to this icon. Familiar technique alone is not a
  concept.
- Prefer uncommon care over catalog coverage. “Not exceptional yet” means do
  not ship, even when the code, tests, reviewer, or user can find no bug.

## Source contract

- Treat `src/icons/*.ts` as canonical after finalization; drafts may use wholly
  original SVG geometry.
- Use the `mi` namespace exclusively: `.mi-<slug>-<part>`, `--mi-<slug>-*`.
- Put all motion behind `@media (prefers-reduced-motion: no-preference)`.
- Define each tunable value once as a `var()` fallback and mirror it exactly in
  `knobs`. Duration stays fixed at 300ms and is not a knob.
- Keep SVG body strings trusted and static. Never interpolate user input.
- Preserve accessible wrapper behavior in every adapter. Decorative icons are
  `aria-hidden`; titled or labeled icons expose image semantics.
- Keep React, Vue, Svelte, and vanilla behavior derived from the same
  `IconDefinition`; never fork geometry or choreography by framework.
- Never hand-edit `src/generated/`, `src/svelte/generated/`, `registry/icons/`,
  or `public/r/`; run `npm run generate`.

## Repository map

- `drafts/*.mjs`: unshipped options under human review.
- `src/icons/*.ts`: finalized canonical definitions.
- `site/App.tsx`: minimal public gallery; never expose authoring controls here.
- `builder.html` and `site/BuilderApp.tsx`: local-only reusable DialKit builder.
- `scripts/new-icon.mjs`: scaffold a blank draft or an explicitly chosen source.
- `scripts/finalize-icon.mjs`: validate, promote, generate, test, and stage.
- `src/generated/`, `src/svelte/generated/`: generated adapters and styles.

For framework output and public API details, read
[references/frameworks.md](references/frameworks.md).
