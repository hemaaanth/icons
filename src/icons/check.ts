import { defineIcon } from "../core/define";
import type { IconDefinition } from "../core/types";

export default defineIcon({
  "exportName": "Check",
  "slug": "check",
  "name": "Check — tick redraws",
  "concept": "One-shot stroke draw-on the way a hand ticks a box: from the short left tip, down to the vertex, then whipping up the long stroke — left to right on an accelerating ease (slow start, fast finish). Rest is always a complete, pixel-identical tick — the draw is a flourish on arrival, not a state change.",
  "body": "<path class=\"mi-check-tick\" d=\"M20 6 9 17l-5-5\" pathLength=\"24\"></path>",
  "css": "@media (prefers-reduced-motion: no-preference) {\n  .mi-check .mi-check-tick {\n    stroke-dasharray: 24;\n    stroke-dashoffset: 0;\n  }\n  /* One-shot draw-on. The 100% frame equals the always-on base state\n     (dashoffset 0), so the keyframe hands off invisibly — drawn-in and\n     rest are the same pose. */\n  @keyframes mi-check-draw {\n    0% {\n      stroke-dashoffset: -24;\n    }\n    100% {\n      stroke-dashoffset: 0;\n    }\n  }\n  @media (hover: hover) {\n    :where(button:not(:disabled), [role=\"button\"]:not([aria-disabled=\"true\"]), [role=\"menuitem\"]:not([aria-disabled=\"true\"]), [role=\"tab\"]:not([aria-disabled=\"true\"]), [role=\"option\"]:not([aria-disabled=\"true\"]), a:not([aria-disabled=\"true\"]), summary:not([aria-disabled=\"true\"]), label:not([aria-disabled=\"true\"]), .mi-trigger:not([aria-disabled=\"true\"])):where(:hover) .mi-check .mi-check-tick {\n      animation: mi-check-draw calc(var(--mi-check-dur, 300ms) * var(--mi-time, 1))\n        cubmi-bezier(0.45, 0.1, 0.9, 0.4) 1;\n    }\n  }\n  :where(button:not(:disabled), [role=\"button\"]:not([aria-disabled=\"true\"]), [role=\"menuitem\"]:not([aria-disabled=\"true\"]), [role=\"tab\"]:not([aria-disabled=\"true\"]), [role=\"option\"]:not([aria-disabled=\"true\"]), a:not([aria-disabled=\"true\"]), summary:not([aria-disabled=\"true\"]), label:not([aria-disabled=\"true\"]), .mi-trigger:not([aria-disabled=\"true\"])):where(:focus-visible) .mi-check .mi-check-tick {\n    animation: mi-check-draw calc(var(--mi-check-dur, 300ms) * var(--mi-time, 1))\n      ease-out 1;\n  }\n}",
  "knobs": [
    {
      "cssVar": "--mi-check-dur",
      "label": "Duration",
      "min": 120,
      "max": 700,
      "step": 20,
      "unit": "ms",
      "default": 300
    }
  ]
} as IconDefinition);
