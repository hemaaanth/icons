import { defineIcon } from "../core/define";
import type { IconDefinition } from "../core/types";

export default defineIcon({
  "exportName": "Link2",
  "slug": "link2",
  "name": "Link — halves link up",
  "concept": "The two brackets translate 0.7px toward each other — left rightward, right leftward — as if cinching the link shut. The connecting bar stays fixed, read as the joint the brackets close around rather than a third moving part.",
  "body": "<g class=\"mi-link2-left\"><path d=\"M9 17H7A5 5 0 0 1 7 7h2\"></path></g><g class=\"mi-link2-right\"><path d=\"M15 7h2a5 5 0 1 1 0 10h-2\"></path></g><line x1=\"8\" x2=\"16\" y1=\"12\" y2=\"12\"></line>",
  "css": "@media (prefers-reduced-motion: no-preference) {\n  .mi-link2 .mi-link2-left {\n    transform: translateX(calc(var(--mi-progress, 0) * var(--mi-link2-converge, 0.7px)));\n    transition: transform calc(300ms * var(--mi-time, 1))\n      var(--mi-ease-spring, ease-out);\n  }\n  .mi-link2 .mi-link2-right {\n    transform: translateX(calc(var(--mi-progress, 0) * var(--mi-link2-converge, 0.7px) * -1));\n    transition: transform calc(300ms * var(--mi-time, 1))\n      var(--mi-ease-spring, ease-out);\n  }\n}",
  "knobs": [
    {
      "cssVar": "--mi-link2-converge",
      "label": "Converge",
      "min": 0,
      "max": 2,
      "step": 0.05,
      "unit": "px",
      "default": 0.7
    }
  ]
} as IconDefinition);
