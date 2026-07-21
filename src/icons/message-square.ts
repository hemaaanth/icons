import { defineIcon } from "../core/define";
import type { IconDefinition } from "../core/types";

export default defineIcon({
  "exportName": "MessageSquare",
  "slug": "message-square",
  "name": "Message — sends",
  "concept": "A real path morph: the bubble's body rises while its tail tip stays pinned where it was, so the tail stretches after it like a tether paying out. The tension is the point — the message is already leaving, still anchored to where it was typed. Morph amplitude lives in the path data, so only its duration is a knob.",
  "body": "<path class=\"mi-message-square-bubble\" d=\"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z\"></path>",
  "css": "@media (prefers-reduced-motion: no-preference) {\n  .mi-message-square .mi-message-square-bubble {\n    d: path(\"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z\");\n    transition: d calc(var(--mi-message-square-dur, 300ms) * var(--mi-time, 1))\n      var(--mi-ease-spring, ease-out);\n  }\n  @media (hover: hover) {\n    :where(button:not(:disabled), [role=\"button\"]:not([aria-disabled=\"true\"]), [role=\"menuitem\"]:not([aria-disabled=\"true\"]), [role=\"tab\"]:not([aria-disabled=\"true\"]), [role=\"option\"]:not([aria-disabled=\"true\"]), a:not([aria-disabled=\"true\"]), summary:not([aria-disabled=\"true\"]), label:not([aria-disabled=\"true\"]), .mi-trigger:not([aria-disabled=\"true\"])):where(:hover) .mi-message-square .mi-message-square-bubble {\n      d: path(\"M22 15a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 4.202A.71.71 0 0 1 2 21.286V3a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z\");\n    }\n  }\n  :where(button:not(:disabled), [role=\"button\"]:not([aria-disabled=\"true\"]), [role=\"menuitem\"]:not([aria-disabled=\"true\"]), [role=\"tab\"]:not([aria-disabled=\"true\"]), [role=\"option\"]:not([aria-disabled=\"true\"]), a:not([aria-disabled=\"true\"]), summary:not([aria-disabled=\"true\"]), label:not([aria-disabled=\"true\"]), .mi-trigger:not([aria-disabled=\"true\"])):where(:focus-visible) .mi-message-square .mi-message-square-bubble,\n  .mi-play .mi-message-square .mi-message-square-bubble {\n    d: path(\"M22 15a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 4.202A.71.71 0 0 1 2 21.286V3a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z\");\n  }\n}",
  "knobs": [
    {
      "cssVar": "--mi-message-square-dur",
      "label": "Duration",
      "min": 120,
      "max": 600,
      "step": 20,
      "unit": "ms",
      "default": 300
    }
  ]
} as IconDefinition);
