import { defineIcon } from "../core/define";
import type { IconDefinition } from "../core/types";

export default defineIcon({
  "exportName": "Bot",
  "slug": "bot",
  "name": "Bot — wakes and listens",
  "concept": "The antenna perks forward at its socket as both eyes open wider, a compact wake-up cue that the AI helper is listening.",
  "body": "<path class=\"mi-bot-antenna\" d=\"M12 8V4H8\"></path><rect width=\"16\" height=\"12\" x=\"4\" y=\"8\" rx=\"2\"></rect><path d=\"M2 14h2\"></path><path d=\"M20 14h2\"></path><g class=\"mi-bot-eyes\"><path d=\"M15 13v2\"></path><path d=\"M9 13v2\"></path></g>",
  "css": "@media (prefers-reduced-motion: no-preference) {\n  .mi-bot .mi-bot-antenna {\n    transform-box: fill-box;\n    transform-origin: 100% 100%;\n    transform: rotate(calc(var(--mi-progress, 0) * var(--mi-bot-perk, 18deg)));\n    transition: transform calc(300ms * var(--mi-time, 1))\n      var(--mi-ease-spring, ease-out);\n  }\n  .mi-bot .mi-bot-eyes {\n    transform-box: fill-box;\n    transform-origin: center;\n    transform: scaleY(calc(1 + var(--mi-progress, 0) * (var(--mi-bot-awake, 1.45) - 1)));\n    transition: transform calc(300ms * var(--mi-time, 1))\n      var(--mi-ease-pop, ease-out);\n  }\n}",
  "knobs": [
    {
      "cssVar": "--mi-bot-perk",
      "label": "Antenna tilt",
      "min": 0,
      "max": 28,
      "step": 1,
      "unit": "deg",
      "default": 18
    },
    {
      "cssVar": "--mi-bot-awake",
      "label": "Eye wake",
      "min": 1,
      "max": 1.8,
      "step": 0.05,
      "unit": "",
      "default": 1.45
    }
  ]
} as IconDefinition);
