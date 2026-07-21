import { defineIcon } from "../core/define";
import type { IconDefinition } from "../core/types";

export default defineIcon({
  "exportName": "RefreshCw",
  "slug": "refresh-cw",
  "name": "Refresh — winds back, ready to spin",
  "concept": "The whole glyph winds back -14° about the icon's exact center and holds — stored potential energy, not a spin. RefreshCw spins clockwise when it acts, so the hover anticipation coils the opposite way; the release is the click's consequence, not the hover's.",
  "body": "<g class=\"mi-refresh-cw-glyph\"><path d=\"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8\"></path><path d=\"M21 3v5h-5\"></path><path d=\"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16\"></path><path d=\"M8 16H3v5\"></path></g>",
  "css": "@media (prefers-reduced-motion: no-preference) {\n  .mi-refresh-cw .mi-refresh-cw-glyph {\n    transform-box: view-box;\n    transform-origin: 12px 12px;\n    transform: rotate(calc(var(--mi-progress, 0) * var(--mi-refresh-cw-windup, -14deg)));\n    transition: transform calc(300ms * var(--mi-time, 1))\n      var(--mi-ease-spring, ease-out);\n  }\n}",
  "knobs": [
    {
      "cssVar": "--mi-refresh-cw-windup",
      "label": "Windup",
      "min": -30,
      "max": 0,
      "step": 1,
      "unit": "deg",
      "default": -14
    }
  ]
} as IconDefinition);
