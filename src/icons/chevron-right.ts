import { defineIcon } from "../core/define";
import type { IconDefinition } from "../core/types";

export default defineIcon({
  "exportName": "ChevronRight",
  "slug": "chevron-right",
  "name": "Chevron right — nudges right",
  "concept": "The chevron nudges 2px straight right — its own pointing direction — on a springy 'this way' gesture, then eases back on hover-out. One part, one axis: pure translateX, no rotation.",
  "body": "<path class=\"mi-chevron-right-mark\" d=\"m9 18 6-6-6-6\"></path>",
  "css": "@media (prefers-reduced-motion: no-preference) {\n  .mi-chevron-right .mi-chevron-right-mark {\n    transform: translateX(calc(var(--mi-progress, 0) * var(--mi-chevron-right-nudge, 2px)));\n    transition: transform calc(300ms * var(--mi-time, 1))\n      var(--mi-ease-spring, ease-out);\n  }\n}",
  "knobs": [
    {
      "cssVar": "--mi-chevron-right-nudge",
      "label": "Nudge",
      "min": 0,
      "max": 3.5,
      "step": 0.25,
      "unit": "px",
      "default": 2
    }
  ]
} as IconDefinition);
