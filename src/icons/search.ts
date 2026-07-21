import { defineIcon } from "../core/define";
import type { IconDefinition } from "../core/types";

export default defineIcon({
  "exportName": "Search",
  "slug": "search",
  "name": "Search — glass scans, then holds",
  "concept": "One-shot scan on hover-in: the glass (lens + handle, one rigid piece) sweeps past its lean, glances back toward center, then settles leaning in at -17°/×1.08 about the lens center — looking around, then locking on. The pose holds while hovered; exit is a plain spring reverse.",
  "body": "<g class=\"mi-search-glass\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><path d=\"m21 21-4.3-4.3\"></path></g>",
  "css": "@media (prefers-reduced-motion: no-preference) {\n  .mi-search .mi-search-glass {\n    transform-box: view-box;\n    transform-origin: 11px 11px;\n    transform: rotate(calc(var(--mi-progress, 0) * var(--mi-search-tilt, -17deg)))\n      scale(calc(1 + var(--mi-progress, 0) * (var(--mi-search-zoom, 1.08) - 1)));\n    transition: transform calc(var(--mi-search-dur, 420ms) * var(--mi-time, 1))\n      var(--mi-ease-spring, ease-out);\n  }\n  /* One-shot scan. The 100% frame equals the base hover pose exactly, so the\n     keyframe hands off invisibly and hover-out is a plain reverse transition. */\n  @keyframes mi-search-scan {\n    0% {\n      transform: rotate(0deg) scale(1);\n    }\n    38% {\n      transform: rotate(calc(var(--mi-search-tilt, -17deg) * 1.35))\n        scale(calc(1 + (var(--mi-search-zoom, 1.08) - 1) * 1.3));\n    }\n    64% {\n      transform: rotate(calc(var(--mi-search-tilt, -17deg) * 0.5))\n        scale(var(--mi-search-zoom, 1.08));\n    }\n    100% {\n      transform: rotate(var(--mi-search-tilt, -17deg))\n        scale(var(--mi-search-zoom, 1.08));\n    }\n  }\n  @media (hover: hover) {\n    :where(button:not(:disabled), [role=\"button\"]:not([aria-disabled=\"true\"]), [role=\"menuitem\"]:not([aria-disabled=\"true\"]), [role=\"tab\"]:not([aria-disabled=\"true\"]), [role=\"option\"]:not([aria-disabled=\"true\"]), a:not([aria-disabled=\"true\"]), summary:not([aria-disabled=\"true\"]), label:not([aria-disabled=\"true\"]), .mi-trigger:not([aria-disabled=\"true\"])):where(:hover) .mi-search .mi-search-glass {\n      animation: mi-search-scan calc(var(--mi-search-dur, 420ms) * var(--mi-time, 1))\n        ease-in-out 1;\n    }\n  }\n  :where(button:not(:disabled), [role=\"button\"]:not([aria-disabled=\"true\"]), [role=\"menuitem\"]:not([aria-disabled=\"true\"]), [role=\"tab\"]:not([aria-disabled=\"true\"]), [role=\"option\"]:not([aria-disabled=\"true\"]), a:not([aria-disabled=\"true\"]), summary:not([aria-disabled=\"true\"]), label:not([aria-disabled=\"true\"]), .mi-trigger:not([aria-disabled=\"true\"])):where(:focus-visible) .mi-search .mi-search-glass {\n    animation: mi-search-scan calc(var(--mi-search-dur, 420ms) * var(--mi-time, 1))\n      ease-in-out 1;\n  }\n}",
  "knobs": [
    {
      "cssVar": "--mi-search-tilt",
      "label": "Lean tilt",
      "min": -24,
      "max": 0,
      "step": 1,
      "unit": "deg",
      "default": -17
    },
    {
      "cssVar": "--mi-search-zoom",
      "label": "Lean zoom",
      "min": 1,
      "max": 1.2,
      "step": 0.01,
      "unit": "",
      "default": 1.08
    },
    {
      "cssVar": "--mi-search-dur",
      "label": "Duration",
      "min": 120,
      "max": 700,
      "step": 20,
      "unit": "ms",
      "default": 420
    }
  ]
} as IconDefinition);
