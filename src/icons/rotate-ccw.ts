import { defineIcon } from "../core/define";
import type { IconDefinition } from "../core/types";

export default defineIcon({
  "exportName": "RotateCcw",
  "slug": "rotate-ccw",
  "name": "Rotate back — winds back, ready to spin",
  "concept": "The whole glyph winds back +14° about the icon's exact center and holds — stored potential energy, not a spin. RotateCcw spins counter-clockwise when it acts, so the hover anticipation coils the opposite way; the release is the click's consequence, not the hover's.",
  "body": "<g class=\"mi-rotate-ccw-glyph\"><path d=\"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8\"></path><path d=\"M3 3v5h5\"></path></g>",
  "css": "@media (prefers-reduced-motion: no-preference) {\n  .mi-rotate-ccw .mi-rotate-ccw-glyph {\n    transform-box: view-box;\n    transform-origin: 12px 12px;\n    transform: rotate(calc(var(--mi-progress, 0) * var(--mi-rotate-ccw-windup, 14deg)));\n    transition: transform calc(var(--mi-rotate-ccw-dur, 260ms) * var(--mi-time, 1))\n      var(--mi-ease-spring, ease-out);\n  }\n}",
  "knobs": [
    {
      "cssVar": "--mi-rotate-ccw-windup",
      "label": "Windup",
      "min": 0,
      "max": 30,
      "step": 1,
      "unit": "deg",
      "default": 14
    },
    {
      "cssVar": "--mi-rotate-ccw-dur",
      "label": "Duration",
      "min": 120,
      "max": 700,
      "step": 20,
      "unit": "ms",
      "default": 260
    }
  ]
} as IconDefinition);
