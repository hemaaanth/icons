# Motion specification

## Required behavior

- Rest must match the source Lucide icon at identical size and stroke width.
- Pointer hover must trigger only on devices matching `(hover: hover)`.
- `:focus-visible` must trigger the same motion for keyboard users.
- Disabled controls and `aria-disabled="true"` must remain still.
- `prefers-reduced-motion: reduce` must produce a static icon, not an instant snap.
- Hover-out and interrupted re-entry must remain continuous.

## Preferred implementation

Drive two-state motion with `var(--mi-progress, 0)` and CSS transitions:

```css
@media (prefers-reduced-motion: no-preference) {
  .mi-archive .mi-archive-lid {
    transform: translateY(calc(var(--mi-progress, 0) * var(--mi-archive-lift, -1.5px)));
    transition: transform calc(var(--mi-archive-duration, 240ms) * var(--mi-time, 1))
      var(--mi-ease-spring, ease-out);
  }
}
```

Use `transform-box: fill-box` and a stable `transform-origin` for rotations or
scales. For path morphs, preserve the exact SVG command sequence between states.
For moving overlapped geometry, complete the hidden geometry and mask it from a
stationary wrapper.

## Review questions

1. Can someone infer the action from the motion without a label?
2. Does only the necessary part move?
3. Does the object behave as though it has weight, hinges, and attachment?
4. Is the movement legible at 13px but restrained at 32px?
5. Does leaving halfway through reverse naturally?
