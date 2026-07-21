import { forwardRef, type SVGProps } from "react";
import { iconClass, type IconDefinition } from "../core";

export interface MotionIconProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  size?: number | string;
  title?: string;
}

export function createReactIcon(definition: IconDefinition) {
  const Component = forwardRef<SVGSVGElement, MotionIconProps>(function MotionIcon(
    { size = 24, strokeWidth = 2, className, title, "aria-label": ariaLabel, ...props },
    ref,
  ) {
    const accessibleTitle = title ?? ariaLabel;
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden={accessibleTitle ? undefined : true}
        aria-label={ariaLabel}
        role={accessibleTitle ? "img" : undefined}
        className={iconClass(definition, className)}
        dangerouslySetInnerHTML={{
          __html: `${title ? `<title>${escapeText(title)}</title>` : ""}${definition.body}`,
        }}
        {...props}
      />
    );
  });
  Component.displayName = definition.exportName;
  return Component;
}

function escapeText(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
