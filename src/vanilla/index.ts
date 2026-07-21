import { iconClass, type IconDefinition, type IconProps } from "../core";
export * from "../generated/catalog";

export function toSvg(definition: IconDefinition, props: IconProps = {}): string {
  const size = props.size ?? 24;
  const strokeWidth = props.strokeWidth ?? 2;
  const title = props.title ? `<title>${escapeText(props.title)}</title>` : "";
  const aria = props.title || props.ariaLabel
    ? `role="img"${props.ariaLabel ? ` aria-label="${escapeAttribute(props.ariaLabel)}"` : ""}`
    : 'aria-hidden="true"';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${escapeAttribute(String(size))}" height="${escapeAttribute(String(size))}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${escapeAttribute(String(strokeWidth))}" stroke-linecap="round" stroke-linejoin="round" ${aria} class="${escapeAttribute(iconClass(definition, props.className))}">${title}${definition.body}</svg>`;
}

export function createIcon(definition: IconDefinition, props: IconProps = {}): SVGSVGElement {
  const template = document.createElement("template");
  template.innerHTML = toSvg(definition, props);
  return template.content.firstElementChild as SVGSVGElement;
}

function escapeText(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function escapeAttribute(value: string): string {
  return escapeText(value).replaceAll('"', "&quot;");
}
