import { defineIcon } from "../core/define";
import type { IconDefinition } from "../core/types";

export default defineIcon({
  "exportName": "Download",
  "slug": "download",
  "name": "Download — the payload drops in",
  "concept": "The arrow (shaft + arrowhead) drops 1.75px straight down into the tray's open mouth on a soft spring; the tray never moves. Real depth, not faked occlusion — the tip already meets the tray's opening at rest, so the descent reads as the payload landing.",
  "body": "<g class=\"mi-download-arrow\"><path d=\"M12 15V3\"></path><path d=\"m7 10 5 5 5-5\"></path></g><path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"></path>",
  "css": "@media (prefers-reduced-motion: no-preference) {\n  .mi-download .mi-download-arrow {\n    transform: translateY(calc(var(--mi-progress, 0) * var(--mi-download-drop, 1.75px)));\n    transition: transform calc(300ms * var(--mi-time, 1))\n      var(--mi-ease-spring, ease-out);\n  }\n}",
  "knobs": [
    {
      "cssVar": "--mi-download-drop",
      "label": "Drop",
      "min": 0,
      "max": 3,
      "step": 0.25,
      "unit": "px",
      "default": 1.75
    }
  ]
} as IconDefinition);
