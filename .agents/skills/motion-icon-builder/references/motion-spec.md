# Motion specification

## Required behavior

- The complete forward choreography is exactly 300ms at `--mi-time: 1`, from
  trigger through the last delayed or staggered part. Reverse and interrupted
  motion must remain continuous and coherent.
- Pointer hover triggers only on devices matching `(hover: hover)`.
- `:focus-visible` triggers the same motion for keyboard users.
- Disabled controls and `aria-disabled="true"` remain still.
- `prefers-reduced-motion: reduce` produces the static mark, not an instant snap.
- The rest pose is identical before and after interaction; no inline or stale
  animation state may leak across re-entry.

## Geometry and optical alignment

- Construct on the shared 24×24 viewBox, but judge the rendered mark at 13, 16,
  20, 24, and 32px.
- Center visual mass, not merely path bounds. Balance negative space and make
  intentional optical corrections for circles, diagonals, asymmetric forms,
  and apparent baseline.
- Maintain consistent apparent stroke weight, cap/join behavior, and family
  character. Avoid subpixel shimmer, accidental tangencies, and crowded edges
  in the rest, peak, and settled frames.
- Treat optical alignment as required whenever geometry permits it. Document
  any intentional imbalance and the semantic reason for it.

## Preferred implementation

Drive reversible two-state motion with `var(--mi-progress, 0)` and CSS
transitions. Use a literal 300ms duration. Encode any internal phrasing inside
keyframe percentages rather than delays that extend the choreography:

```css
@media (prefers-reduced-motion: no-preference) {
  .mi-archive .mi-archive-lid {
    transform: translateY(calc(var(--mi-progress, 0) * var(--mi-archive-lift, -1.5px)));
    transition: transform calc(300ms * var(--mi-time, 1))
      var(--mi-ease-spring, ease-out);
  }
}
```

Use `transform-box: fill-box` and a stable `transform-origin` for rotations or
scales. For path morphs, preserve the exact SVG command sequence between states.
For moving overlapped geometry, complete hidden geometry and mask it from a
stationary wrapper. Use keyframes only when a reversible transition cannot
express the physical idea.

## Validation questions

1. Can someone infer the action from motion without a label, and the static
   meaning without motion?
2. Does one primary event carry the idea, with no decorative movement?
3. Do weight, hinges, attachment, occlusion, and deformation remain credible
   frame by frame?
4. Is visual mass optically stable and legible at every target size?
5. Does leaving halfway through reverse naturally, with the final part settled
   by 300ms?
