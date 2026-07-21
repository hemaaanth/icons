import { defineIcon } from "../core/define";
import type { IconDefinition } from "../core/types";

export default defineIcon({
  "exportName": "Link",
  "slug": "link",
  "name": "Link — chain cinches",
  "concept": "The two diagonal chain links move a fraction toward their shared joint, tightening the connection without changing the glyph at rest.",
  "body": "<path class=\"mi-link-upper\" d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\"></path><path class=\"mi-link-lower\" d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\"></path>",
  "css": "@media (prefers-reduced-motion: no-preference) {\n  .mi-link .mi-link-upper {\n    transform: translate(\n      calc(var(--mi-progress, 0) * var(--mi-link-cinch, 0.45px) * -1),\n      calc(var(--mi-progress, 0) * var(--mi-link-cinch, 0.45px))\n    );\n    transition: transform calc(var(--mi-link-dur, 260ms) * var(--mi-time, 1))\n      var(--mi-ease-spring, ease-out);\n  }\n  .mi-link .mi-link-lower {\n    transform: translate(\n      calc(var(--mi-progress, 0) * var(--mi-link-cinch, 0.45px)),\n      calc(var(--mi-progress, 0) * var(--mi-link-cinch, 0.45px) * -1)\n    );\n    transition: transform calc(var(--mi-link-dur, 260ms) * var(--mi-time, 1))\n      var(--mi-ease-spring, ease-out);\n  }\n}",
  "knobs": [
    {
      "cssVar": "--mi-link-cinch",
      "label": "Cinch",
      "min": 0,
      "max": 1.5,
      "step": 0.05,
      "unit": "px",
      "default": 0.45
    },
    {
      "cssVar": "--mi-link-dur",
      "label": "Duration",
      "min": 120,
      "max": 600,
      "step": 20,
      "unit": "ms",
      "default": 260
    }
  ]
} as IconDefinition);
