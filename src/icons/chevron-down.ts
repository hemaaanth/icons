import { defineIcon } from "../core/define";
import type { IconDefinition } from "../core/types";

export default defineIcon({
  "exportName": "ChevronDown",
  "slug": "chevron-down",
  "name": "Chevron down — nudges down",
  "concept": "The chevron nudges 2px straight down — its own pointing direction — on a springy 'this way' gesture, then eases back on hover-out. One part, one axis: pure translateY, no rotation.",
  "body": "<path class=\"mi-chevron-down-mark\" d=\"m6 9 6 6 6-6\"></path>",
  "css": "@media (prefers-reduced-motion: no-preference) {\n  .mi-chevron-down .mi-chevron-down-mark {\n    transform: translateY(calc(var(--mi-progress, 0) * var(--mi-chevron-down-nudge, 2px)));\n    transition: transform calc(var(--mi-chevron-down-dur, 280ms) * var(--mi-time, 1))\n      var(--mi-ease-spring, ease-out);\n  }\n}",
  "knobs": [
    {
      "cssVar": "--mi-chevron-down-nudge",
      "label": "Nudge",
      "min": 0,
      "max": 3.5,
      "step": 0.25,
      "unit": "px",
      "default": 2
    },
    {
      "cssVar": "--mi-chevron-down-dur",
      "label": "Duration",
      "min": 120,
      "max": 700,
      "step": 20,
      "unit": "ms",
      "default": 280
    }
  ]
} as IconDefinition);
