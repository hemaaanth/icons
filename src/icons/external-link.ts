import { defineIcon } from "../core/define";
import type { IconDefinition } from "../core/types";

export default defineIcon({
  "exportName": "ExternalLink",
  "slug": "external-link",
  "name": "External link — the arrow departs",
  "concept": "The arrow (corner bracket + diagonal shaft) departs 1.2px up-right, equal on both axes, on a soft spring; the box stays put. The shaft already crosses the box's deliberately open corner at rest, so its motion continues an honest exit instead of faking one.",
  "body": "<g class=\"mi-external-link-arrow\"><path d=\"M15 3h6v6\"></path><path d=\"M10 14 21 3\"></path></g><path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\"></path>",
  "css": "@media (prefers-reduced-motion: no-preference) {\n  .mi-external-link .mi-external-link-arrow {\n    transform: translate(\n      calc(var(--mi-progress, 0) * var(--mi-external-link-depart, 1.2px)),\n      calc(var(--mi-progress, 0) * var(--mi-external-link-depart, 1.2px) * -1)\n    );\n    transition: transform calc(var(--mi-external-link-dur, 300ms) * var(--mi-time, 1))\n      var(--mi-ease-spring, ease-out);\n  }\n}",
  "knobs": [
    {
      "cssVar": "--mi-external-link-depart",
      "label": "Depart",
      "min": 0,
      "max": 2.5,
      "step": 0.1,
      "unit": "px",
      "default": 1.2
    },
    {
      "cssVar": "--mi-external-link-dur",
      "label": "Duration",
      "min": 120,
      "max": 600,
      "step": 20,
      "unit": "ms",
      "default": 300
    }
  ]
} as IconDefinition);
