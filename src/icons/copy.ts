import { defineIcon } from "../core/define";
import type { IconDefinition } from "../core/types";

export default defineIcon({
  "exportName": "Copy",
  "slug": "copy",
  "name": "Copy — the copy slides out",
  "concept": "The copy slides out from under the original — the back sheet (completed into a full rect, masked behind the front sheet's silhouette) emerges 2.35px down-left; the original never moves. Real occlusion: edges appear from behind the sheet instead of crossing it.",
  "body": "<mask id=\"mi-copy-occlusion\" maskUnits=\"userSpaceOnUse\" x=\"-4\" y=\"-4\" width=\"32\" height=\"32\"><rect x=\"-4\" y=\"-4\" width=\"32\" height=\"32\" fill=\"white\" stroke=\"none\"></rect><rect x=\"6.5\" y=\"0.5\" width=\"17\" height=\"17\" rx=\"3.5\" fill=\"black\" stroke=\"none\"></rect></mask><g mask=\"url(#mi-copy-occlusion)\"><rect class=\"mi-copy-back\" x=\"2\" y=\"2\" width=\"14\" height=\"14\" rx=\"2\" ry=\"2\"></rect></g><rect width=\"14\" height=\"14\" x=\"8\" y=\"2\" rx=\"2\" ry=\"2\"></rect>",
  "css": "@media (prefers-reduced-motion: no-preference) {\n  .mi-copy .mi-copy-back {\n    transform: translate(\n      calc(var(--mi-progress, 0) * var(--mi-copy-out, 2.35px) * -1),\n      calc(var(--mi-progress, 0) * var(--mi-copy-out, 2.35px))\n    );\n    transition: transform calc(300ms * var(--mi-time, 1))\n      var(--mi-ease-spring, ease-out);\n  }\n}",
  "knobs": [
    {
      "cssVar": "--mi-copy-out",
      "label": "Slide out",
      "min": 0,
      "max": 4,
      "step": 0.05,
      "unit": "px",
      "default": 2.35
    }
  ]
} as IconDefinition);
