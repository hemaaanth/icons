import { defineIcon } from "../core/define";
import type { IconDefinition } from "../core/types";

export default defineIcon({
  "exportName": "Share2",
  "slug": "share2",
  "name": "Share — the network grows",
  "concept": "The two satellites swing apart about the hub — rotating about it keeps their connectors pinned, so they splay without detaching — a new connector reaches out of the gap they open, and a third node pops in at the end of it. Sharing isn't the network getting louder; it's the network getting bigger.",
  "body": "<g class=\"mi-share2-top\"><circle cx=\"18\" cy=\"5\" r=\"3\"></circle><line x1=\"15.41\" x2=\"8.59\" y1=\"6.51\" y2=\"10.49\"></line></g><circle cx=\"6\" cy=\"12\" r=\"3\"></circle><g class=\"mi-share2-bottom\"><circle cx=\"18\" cy=\"19\" r=\"3\"></circle><line x1=\"8.59\" x2=\"15.42\" y1=\"13.51\" y2=\"17.49\"></line></g><g class=\"mi-share2-new\" opacity=\"0\"><line class=\"mi-share2-reach\" x1=\"9\" x2=\"15\" y1=\"12\" y2=\"12\"></line><circle class=\"mi-share2-node\" cx=\"18\" cy=\"12\" r=\"3\"></circle></g>",
  "css": "@media (prefers-reduced-motion: no-preference) {\n  .mi-share2 .mi-share2-top,\n  .mi-share2 .mi-share2-bottom {\n    transform-box: view-box;\n    transform-origin: 6px 12px;\n    transition: transform calc(300ms * var(--mi-time, 1))\n      var(--mi-ease-spring, ease-out);\n  }\n  .mi-share2 .mi-share2-top {\n    transform: rotate(calc(var(--mi-progress, 0) * var(--mi-share2-spread, -12deg)));\n  }\n  .mi-share2 .mi-share2-bottom {\n    transform: rotate(calc(var(--mi-progress, 0) * var(--mi-share2-spread, -12deg) * -1));\n  }\n  .mi-share2 .mi-share2-new {\n    opacity: var(--mi-progress, 0);\n    transition: opacity calc(300ms * var(--mi-time, 1))\n      var(--mi-ease, ease-out);\n  }\n  .mi-share2 .mi-share2-reach {\n    transform-box: view-box;\n    transform-origin: 9px 12px;\n    transform: scaleX(var(--mi-progress, 0));\n    transition: transform calc(300ms * var(--mi-time, 1))\n      var(--mi-ease-spring, ease-out);\n  }\n  .mi-share2 .mi-share2-node {\n    transform-box: view-box;\n    transform-origin: 18px 12px;\n    transform: scale(var(--mi-progress, 0));\n    transition: transform calc(300ms * var(--mi-time, 1))\n      var(--mi-ease-pop, ease-out);\n  }\n}",
  "knobs": [
    {
      "cssVar": "--mi-share2-spread",
      "label": "Spread",
      "min": -24,
      "max": 0,
      "step": 1,
      "unit": "deg",
      "default": -12
    }
  ]
} as IconDefinition);
