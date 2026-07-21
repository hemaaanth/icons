import { defineIcon } from "../core/define";
import type { IconDefinition } from "../core/types";

export default defineIcon({
  "exportName": "Settings",
  "slug": "settings",
  "name": "Settings — gear turns",
  "concept": "The gear rotates about the icon's exact center while the axle (the inner circle) stays fixed — it's rotationally symmetric, so animating it would be invisible. The 45° default reads as one tooth-step on this gear's 8-lobe geometry, eased with a soft spring overshoot.",
  "body": "<g class=\"mi-settings-gear\"><path d=\"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z\"></path></g><circle cx=\"12\" cy=\"12\" r=\"3\"></circle>",
  "css": "@media (prefers-reduced-motion: no-preference) {\n  .mi-settings .mi-settings-gear {\n    transform-box: view-box;\n    transform-origin: 12px 12px;\n    transform: rotate(calc(var(--mi-progress, 0) * var(--mi-settings-turn, 45deg)));\n    transition: transform calc(var(--mi-settings-dur, 400ms) * var(--mi-time, 1))\n      var(--mi-ease-spring, ease-out);\n  }\n}",
  "knobs": [
    {
      "cssVar": "--mi-settings-turn",
      "label": "Gear turn",
      "min": 0,
      "max": 120,
      "step": 1,
      "unit": "deg",
      "default": 45
    },
    {
      "cssVar": "--mi-settings-dur",
      "label": "Duration",
      "min": 120,
      "max": 700,
      "step": 20,
      "unit": "ms",
      "default": 400
    }
  ]
} as IconDefinition);
