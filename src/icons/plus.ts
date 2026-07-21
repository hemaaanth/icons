import { defineIcon } from "../core/define";
import type { IconDefinition } from "../core/types";

export default defineIcon({
  "exportName": "Plus",
  "slug": "plus",
  "name": "Plus — reaches for more",
  "concept": "Both strokes stretch outward from the center — the horizontal arm wider, the vertical taller — with a springy double bounce: the glyph extends its reach, literally 'more.' Each stroke scales along its own axis only, so line thickness never changes. Semantic pair with X, which draws in.",
  "body": "<path class=\"mi-plus-h\" d=\"M5 12h14\"></path><path class=\"mi-plus-v\" d=\"M12 5v14\"></path>",
  "css": "@media (prefers-reduced-motion: no-preference) {\n  .mi-plus .mi-plus-h {\n    transform-box: view-box;\n    transform-origin: 12px 12px;\n    transform: scaleX(calc(1 + var(--mi-progress, 0) * (var(--mi-plus-reach, 1.18) - 1)));\n    transition: transform calc(300ms * var(--mi-time, 1))\n      var(--mi-ease-bounce, ease-out);\n  }\n  .mi-plus .mi-plus-v {\n    transform-box: view-box;\n    transform-origin: 12px 12px;\n    transform: scaleY(calc(1 + var(--mi-progress, 0) * (var(--mi-plus-reach, 1.18) - 1)));\n    transition: transform calc(300ms * var(--mi-time, 1))\n      var(--mi-ease-bounce, ease-out);\n  }\n}",
  "knobs": [
    {
      "cssVar": "--mi-plus-reach",
      "label": "Reach",
      "min": 1,
      "max": 1.5,
      "step": 0.01,
      "unit": "",
      "default": 1.18
    }
  ]
} as IconDefinition);
