import { defineIcon } from "../core/define";
import type { IconDefinition } from "../core/types";

export default defineIcon({
  "exportName": "Archive",
  "slug": "archive",
  "name": "Archive — lid opens",
  "concept": "The archive lid lifts a fraction above the box, revealing the storage action without moving the rest of the glyph.",
  "body": "<rect class=\"mi-archive-lid\" width=\"20\" height=\"5\" x=\"2\" y=\"3\" rx=\"1\"></rect><path d=\"M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8\"></path><path d=\"M10 12h4\"></path>",
  "css": "@media (prefers-reduced-motion: no-preference) {\n  .mi-archive .mi-archive-lid {\n    transform: translateY(calc(var(--mi-progress, 0) * var(--mi-archive-lift, -1.5px)));\n    transition: transform calc(300ms * var(--mi-time, 1))\n      var(--mi-ease-spring, ease-out);\n  }\n}",
  "knobs": [
    {
      "cssVar": "--mi-archive-lift",
      "label": "Lid lift",
      "min": -3,
      "max": 0,
      "step": 0.25,
      "unit": "px",
      "default": -1.5
    }
  ]
} as IconDefinition);
