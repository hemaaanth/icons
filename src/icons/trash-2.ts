import { defineIcon } from "../core/define";
import type { IconDefinition } from "../core/types";

export default defineIcon({
  "exportName": "Trash2",
  "slug": "trash2",
  "name": "Trash — lid opens",
  "concept": "The lid (rim + handle) lifts slightly and tips open around its right hinge with a soft spring; the can takes the weight with a sub-pixel settle. Delete affordances warn before they act.",
  "body": "<g class=\"mi-trash2-lid\"><path d=\"M3 6h18\"></path><path d=\"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2\"></path></g><g class=\"mi-trash2-body\"><path d=\"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6\"></path><path d=\"M10 11v6\"></path><path d=\"M14 11v6\"></path></g>",
  "css": "@media (prefers-reduced-motion: no-preference) {\n  .mi-trash2 .mi-trash2-lid {\n    transform-box: fill-box;\n    transform-origin: 100% 100%;\n    transform: translateY(calc(var(--mi-progress, 0) * var(--mi-trash2-lift, -4px)))\n      rotate(calc(var(--mi-progress, 0) * var(--mi-trash2-tilt, 18deg)));\n    transition: transform calc(var(--mi-trash2-dur, 340ms) * var(--mi-time, 1))\n      var(--mi-ease-spring, ease-out);\n  }\n  .mi-trash2 .mi-trash2-body {\n    transform: translateY(calc(var(--mi-progress, 0) * var(--mi-trash2-settle, 1.5px)));\n    transition: transform calc(var(--mi-trash2-dur, 340ms) * var(--mi-time, 1))\n      var(--mi-ease-spring, ease-out);\n  }\n}",
  "knobs": [
    {
      "cssVar": "--mi-trash2-tilt",
      "label": "Lid tilt",
      "min": 0,
      "max": 32,
      "step": 1,
      "unit": "deg",
      "default": 18
    },
    {
      "cssVar": "--mi-trash2-lift",
      "label": "Lid lift",
      "min": -6,
      "max": 0,
      "step": 0.25,
      "unit": "px",
      "default": -4
    },
    {
      "cssVar": "--mi-trash2-settle",
      "label": "Body settle",
      "min": 0,
      "max": 2.5,
      "step": 0.25,
      "unit": "px",
      "default": 1.5
    },
    {
      "cssVar": "--mi-trash2-dur",
      "label": "Duration",
      "min": 120,
      "max": 700,
      "step": 20,
      "unit": "ms",
      "default": 340
    }
  ]
} as IconDefinition);
