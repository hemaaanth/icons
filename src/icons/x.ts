import { defineIcon } from "../core/define";
import type { IconDefinition } from "../core/types";

export default defineIcon({
  "exportName": "X",
  "slug": "x",
  "name": "X — draws in",
  "concept": "The whole glyph contracts about its center with a squashy double bounce — previewing the dismissal: what you close shrinks away. Bounces back to full size on exit. Semantic pair with Plus, which reaches out.",
  "body": "<g class=\"mi-x-glyph\"><path d=\"M18 6 6 18\"></path><path d=\"m6 6 12 12\"></path></g>",
  "css": "@media (prefers-reduced-motion: no-preference) {\n  .mi-x .mi-x-glyph {\n    transform-box: view-box;\n    transform-origin: 12px 12px;\n    transform: scale(calc(1 - var(--mi-progress, 0) * (1 - var(--mi-x-draw, 0.81))));\n    transition: transform calc(var(--mi-x-dur, 260ms) * var(--mi-time, 1))\n      var(--mi-ease-bounce, ease-out);\n  }\n}",
  "knobs": [
    {
      "cssVar": "--mi-x-draw",
      "label": "Draw in",
      "min": 0.6,
      "max": 1,
      "step": 0.01,
      "unit": "",
      "default": 0.81
    },
    {
      "cssVar": "--mi-x-dur",
      "label": "Duration",
      "min": 120,
      "max": 700,
      "step": 20,
      "unit": "ms",
      "default": 260
    }
  ]
} as IconDefinition);
