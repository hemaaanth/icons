const draft = {
  exportName: "Share2",
  slug: "share2",
  name: "Share",
  brief: "A static three-endpoint share mark for toolbar and action controls; its motion communicates one payload leaving a source, reaching a branch, and arriving at visible recipients while the network remains fixed, at 13, 16, 20, 24, and 32px.",
  references: [
    {
      name: "Existing Share2 and Lucide Share-2",
      keep: "The broad three-endpoint convention is immediately recognizable in compact toolbars.",
      reject: "Equal 3px circles at x=6 and x=18 plus tangent diagonals are effectively Lucide's construction; splaying them and adding a fourth node reads as graph growth.",
      doNotCopy: "Do not reuse Lucide's coordinates, equal node hierarchy, straight tangent-line proportions, or fourth-node motion.",
    },
    {
      name: "Google Material Symbols and Material Icons",
      keep: "Optical sizing and compact silhouettes preserve clarity at common UI sizes.",
      reject: "A library-default heavy or filled molecule becomes generic and loses the collection's open stroke character.",
      doNotCopy: "Do not reproduce Material path contours, fill distribution, or its compact silhouette.",
    },
    {
      name: "Apple activity views and the share-sheet model",
      keep: "Sharing is an outward handoff toward a chosen destination, not a permanent topology change.",
      reject: "The platform-specific box-and-up-arrow metaphor would narrow this framework-neutral icon to one ecosystem.",
      doNotCopy: "Do not reproduce SF Symbols contours or the box-and-arrow construction.",
    },
    {
      name: "Physical relay and routed handoff",
      keep: "A payload moves through stable infrastructure, reaches a decisive branch, and arrives at recipients with clear cause and effect.",
      reject: "Repeated broadcast pulses, elastic links, and bouncing endpoints confuse a deliberate transfer with sync or celebration.",
      doNotCopy: "Do not turn the payload into a fourth endpoint or animate the network itself.",
    },
  ],
  geometryStrategy: "Original 24x24 Y-route construction: three filled nodes at (4.75,12), (18.25,5.9), and (18.25,18.1) sit above three center-to-center filled connectors meeting at a tunable X coordinate. Moving the junction from 4.75 to 18.25 continuously changes the silhouette from V to sideways T. A single consistent connector width runs beneath every node, producing a clean union without localized bubbles or stuck-on caps.",
  body: "<line class=\"mi-share2-route mi-share2-trunk\" x1=\"4.75\" y1=\"12\" x2=\"18.25\" y2=\"12\"></line><line class=\"mi-share2-route mi-share2-branch\" x1=\"4.75\" y1=\"12\" x2=\"18.25\" y2=\"5.9\"></line><line class=\"mi-share2-route mi-share2-branch\" x1=\"4.75\" y1=\"12\" x2=\"18.25\" y2=\"18.1\"></line><circle class=\"mi-share2-source\" cx=\"4.75\" cy=\"12\" r=\"1.95\" fill=\"currentColor\" stroke=\"none\"></circle><circle class=\"mi-share2-recipient\" cx=\"18.25\" cy=\"5.9\" r=\"1.95\" fill=\"currentColor\" stroke=\"none\"></circle><circle class=\"mi-share2-recipient\" cx=\"18.25\" cy=\"18.1\" r=\"1.95\" fill=\"currentColor\" stroke=\"none\"></circle><circle class=\"mi-share2-payload mi-share2-payload-top\" cx=\"0\" cy=\"0\" r=\"3\" fill=\"currentColor\" stroke=\"none\" opacity=\"0\"></circle><circle class=\"mi-share2-payload mi-share2-payload-bottom\" cx=\"0\" cy=\"0\" r=\"3\" fill=\"currentColor\" stroke=\"none\" opacity=\"0\"></circle>",
  candidates: [
    {
      id: "chosen-route",
      label: "Pop and branch",
      concept: "One large dot pops into the source, holds long enough to register, then moves down the shared trunk and splits only at the junction to land inside both recipients. The network stays fixed while the payload performs one clear share event.",
      css: `.mi-share2 {
  --mi-share2-node-radius: var(--mi-share2-node-size, 1.95px);
  --mi-share2-package-radius: var(--mi-share2-package-size, 3px);
  --mi-share2-junction-progress: var(--mi-share2-connect-x, 0.42);
  --mi-share2-connector-width: var(--mi-share2-connector-size, 2.7px);
}
.mi-share2 .mi-share2-source,
.mi-share2 .mi-share2-recipient {
  r: var(--mi-share2-node-radius);
}
.mi-share2 .mi-share2-trunk {
  transform: scaleX(var(--mi-share2-junction-progress));
  transform-box: view-box;
  transform-origin: 4.75px 12px;
}
.mi-share2 .mi-share2-branch {
  transform: scaleX(calc(1 - var(--mi-share2-junction-progress)));
  transform-box: view-box;
  transform-origin: 18.25px 12px;
}
.mi-share2 .mi-share2-route {
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: var(--mi-share2-connector-width);
}
.mi-share2 .mi-share2-payload {
  r: var(--mi-share2-package-radius);
}
@media (prefers-reduced-motion: no-preference) {
  .mi-share2 .mi-share2-payload {
    opacity: var(--mi-progress, 0);
    transform: translate(
      calc(4.75px + var(--mi-progress, 0) * 13.5px),
      calc(12px + var(--mi-progress, 0) * var(--mi-share2-end-y))
    ) scale(var(--mi-progress, 0));
    transform-box: view-box;
    transform-origin: 0 0;
    transition: transform calc(300ms * var(--mi-time, 1)) var(--mi-ease, ease-out), opacity calc(300ms * var(--mi-time, 1)) var(--mi-ease, ease-out);
  }
  .mi-share2 .mi-share2-payload-top {
    --mi-share2-end-y: -6.1px;
  }
  .mi-share2 .mi-share2-payload-bottom {
    --mi-share2-end-y: 6.1px;
  }
  @keyframes mi-share2-pop-and-branch {
    0% {
      opacity: 0;
      transform: translate(4.75px, 12px) scale(0);
    }
    18% {
      opacity: 1;
      transform: translate(4.75px, 12px) scale(1.18);
    }
    24%,
    30% {
      opacity: 1;
      transform: translate(4.75px, 12px) scale(1);
    }
    58% {
      opacity: 1;
      transform: translate(calc(4.75px + var(--mi-share2-junction-progress) * 13.5px), 12px) scale(1);
    }
    100% {
      opacity: 1;
      transform: translate(18.25px, calc(12px + var(--mi-share2-end-y))) scale(1);
    }
  }
  @media (hover: hover) {
    :where(button:not(:disabled), [role="button"]:not([aria-disabled="true"]), [role="menuitem"]:not([aria-disabled="true"]), [role="tab"]:not([aria-disabled="true"]), [role="option"]:not([aria-disabled="true"]), a:not([aria-disabled="true"]), summary:not([aria-disabled="true"]), label:not([aria-disabled="true"]), .mi-trigger:not([aria-disabled="true"])):where(:hover) .mi-share2 .mi-share2-payload {
      animation: mi-share2-pop-and-branch calc(300ms * var(--mi-time, 1)) var(--mi-ease, ease-out) 1;
    }
  }
  :where(button:not(:disabled), [role="button"]:not([aria-disabled="true"]), [role="menuitem"]:not([aria-disabled="true"]), [role="tab"]:not([aria-disabled="true"]), [role="option"]:not([aria-disabled="true"]), a:not([aria-disabled="true"]), summary:not([aria-disabled="true"]), label:not([aria-disabled="true"]), .mi-trigger:not([aria-disabled="true"])):where(:focus-visible) .mi-share2 .mi-share2-payload,
  .mi-play .mi-share2 .mi-share2-payload {
    animation: mi-share2-pop-and-branch calc(300ms * var(--mi-time, 1)) var(--mi-ease, ease-out) 1;
  }
}`,
      knobs: [
        {
          cssVar: "--mi-share2-node-size",
          label: "Filled node radius",
          min: 0.25,
          max: 4,
          step: 0.05,
          unit: "px",
          default: 1.95,
        },
        {
          cssVar: "--mi-share2-package-size",
          label: "Package radius",
          min: 0.25,
          max: 5.5,
          step: 0.05,
          unit: "px",
          default: 3,
        },
        {
          cssVar: "--mi-share2-connect-x",
          label: "Connection point",
          min: 0,
          max: 1,
          step: 0.01,
          unit: "",
          default: 0.42,
        },
        {
          cssVar: "--mi-share2-connector-size",
          label: "Connector width",
          min: 1,
          max: 4,
          step: 0.05,
          unit: "px",
          default: 2.7,
        },
      ],
    },
  ],
};

const motionTemplate = draft.candidates[0];
draft.candidates = [
  {
    ...motionTemplate,
    id: "node-swell",
    label: "Node swell",
    concept: "The existing source node becomes the package: it expands smoothly from the resting node radius to the larger payload radius, holds, then follows the unchanged route.",
    css: replaceInitialAppearance(motionTemplate.css, `    0% {
      opacity: 1;
      transform: translate(4.75px, 12px) scale(0.65);
    }
    18% {
      opacity: 1;
      transform: translate(4.75px, 12px) scale(0.92);
    }
    24%,
    30% {
      opacity: 1;
      transform: translate(4.75px, 12px) scale(1);
    }
`),
  },
  {
    ...motionTemplate,
    id: "quiet-fade",
    label: "Quiet fade",
    concept: "The package appears at full size through opacity alone, holds briefly, then follows the unchanged route with no scale gesture.",
    css: replaceInitialAppearance(motionTemplate.css, `    0% {
      opacity: 0;
      transform: translate(4.75px, 12px) scale(1);
    }
    18% {
      opacity: 0.78;
      transform: translate(4.75px, 12px) scale(1);
    }
    24%,
    30% {
      opacity: 1;
      transform: translate(4.75px, 12px) scale(1);
    }
`),
  },
];

export default draft;

function replaceInitialAppearance(css, frames) {
  const start = css.indexOf("    0% {");
  const end = css.indexOf("    58% {");
  if (start === -1 || end === -1 || end <= start) throw new Error("Share appearance keyframes are missing");
  return `${css.slice(0, start)}${frames}${css.slice(end)}`;
}
