import { defineIcon } from "../core/define";
import type { IconDefinition } from "../core/types";

export default defineIcon({
  "exportName": "FileText",
  "slug": "file-text",
  "name": "File text — lines riffle",
  "concept": "The 3 text lines nudge 1px right in a top-to-bottom stagger — same transform and transition on every line, only transition-delay stepped 45ms per line — reading like a page riffled under a thumb. The page outline and folded corner never move.",
  "body": "<path d=\"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z\"></path><path d=\"M14 2v5a1 1 0 0 0 1 1h5\"></path><path class=\"mi-file-text-l1\" d=\"M10 9H8\"></path><path class=\"mi-file-text-l2\" d=\"M16 13H8\"></path><path class=\"mi-file-text-l3\" d=\"M16 17H8\"></path>",
  "css": "@media (prefers-reduced-motion: no-preference) {\n  .mi-file-text-l1,\n  .mi-file-text-l2,\n  .mi-file-text-l3 {\n    transform: translateX(calc(var(--mi-progress, 0) * var(--mi-file-text-nudge, 1px)));\n    transition: transform calc(var(--mi-file-text-dur, 260ms) * var(--mi-time, 1))\n      var(--mi-ease-spring, ease-out);\n  }\n  .mi-file-text-l2 {\n    transition-delay: calc(var(--mi-file-text-stagger, 45ms) * var(--mi-time, 1));\n  }\n  .mi-file-text-l3 {\n    transition-delay: calc(var(--mi-file-text-stagger, 45ms) * 2 * var(--mi-time, 1));\n  }\n}",
  "knobs": [
    {
      "cssVar": "--mi-file-text-nudge",
      "label": "Line nudge",
      "min": 0,
      "max": 3,
      "step": 0.25,
      "unit": "px",
      "default": 1
    },
    {
      "cssVar": "--mi-file-text-stagger",
      "label": "Stagger step",
      "min": 0,
      "max": 120,
      "step": 5,
      "unit": "ms",
      "default": 45
    },
    {
      "cssVar": "--mi-file-text-dur",
      "label": "Duration",
      "min": 120,
      "max": 700,
      "step": 20,
      "unit": "ms",
      "default": 260
    }
  ]
} as IconDefinition);
