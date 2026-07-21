import { defineIcon } from "../core/define";
import type { IconDefinition } from "../core/types";

export default defineIcon({
  "exportName": "Pen",
  "slug": "pen",
  "name": "Pen — dips into writing angle",
  "concept": "The pen — a single rigid body, no separate parts to isolate — rotates 12° clockwise about its nib, the one point that stays put, laying the shaft from its poised lucide angle down into a flatter writing angle; a 0.75px screen-space press follows the tilt, as if the tip settles onto the page. Real pens pivot at the point of contact, not the middle of the shaft.",
  "body": "<g class=\"mi-pen-body\"><path d=\"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z\"></path></g>",
  "css": "@media (prefers-reduced-motion: no-preference) {\n  .mi-pen .mi-pen-body {\n    transform-box: view-box;\n    transform-origin: 2.5px 21.5px;\n    transform: translateY(calc(var(--mi-progress, 0) * var(--mi-pen-press, 0.75px)))\n      rotate(calc(var(--mi-progress, 0) * var(--mi-pen-tilt, 12deg)));\n    transition: transform calc(300ms * var(--mi-time, 1))\n      var(--mi-ease-spring, ease-out);\n  }\n}",
  "knobs": [
    {
      "cssVar": "--mi-pen-tilt",
      "label": "Writing dip",
      "min": 0,
      "max": 18,
      "step": 1,
      "unit": "deg",
      "default": 12
    },
    {
      "cssVar": "--mi-pen-press",
      "label": "Nib press",
      "min": 0,
      "max": 1.5,
      "step": 0.05,
      "unit": "px",
      "default": 0.75
    }
  ]
} as IconDefinition);
