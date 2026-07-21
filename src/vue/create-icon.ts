import { defineComponent, h, mergeProps } from "vue";
import { iconClass, type IconDefinition } from "../core";

export function createVueIcon(definition: IconDefinition) {
  return defineComponent({
    name: definition.exportName,
    inheritAttrs: false,
    props: {
      size: { type: [Number, String], default: 24 },
      strokeWidth: { type: [Number, String], default: 2 },
      title: String,
    },
    setup(props, { attrs }) {
      return () => {
        const ariaLabel = attrs["aria-label"] as string | undefined;
        const accessibleTitle = props.title ?? ariaLabel;
        const html = `${props.title ? `<title>${escapeText(props.title)}</title>` : ""}${definition.body}`;
        return h(
          "svg",
          mergeProps({
            xmlns: "http://www.w3.org/2000/svg",
            width: props.size,
            height: props.size,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": props.strokeWidth,
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "aria-hidden": accessibleTitle ? undefined : "true",
            role: accessibleTitle ? "img" : undefined,
            class: iconClass(definition),
          }, attrs, {
            innerHTML: html,
          }),
        );
      };
    },
  });
}

function escapeText(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
