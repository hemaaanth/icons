import { defineIcon } from "../core/define";
import type { IconDefinition } from "../core/types";

export default defineIcon({
  "exportName": "FileText",
  "slug": "file-text",
  "name": "File text — lines riffle",
  "concept": "The three text lines shift together as though a thumb briefly riffles the page; the page outline and folded corner remain still.",
  "body": "<path d=\"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z\"></path><path d=\"M14 2v5a1 1 0 0 0 1 1h5\"></path><path class=\"mi-file-text-l1\" d=\"M10 9H8\"></path><path class=\"mi-file-text-l2\" d=\"M16 13H8\"></path><path class=\"mi-file-text-l3\" d=\"M16 17H8\"></path>",
  "css": "@media (prefers-reduced-motion: no-preference) {\n  .mi-file-text-l1,\n  .mi-file-text-l2,\n  .mi-file-text-l3 {\n    transform: translateX(calc(var(--mi-progress, 0) * var(--mi-file-text-nudge, 1px)));\n    transition: transform calc(300ms * var(--mi-time, 1))\n      var(--mi-ease-spring, ease-out);\n  }\n}",
  "knobs": [
    {
      "cssVar": "--mi-file-text-nudge",
      "label": "Line nudge",
      "min": 0,
      "max": 3,
      "step": 0.25,
      "unit": "px",
      "default": 1
    }
  ]
} as IconDefinition);
