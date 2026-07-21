import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Copy } from "./index";

describe("React adapter", () => {
  it("renders accessible, Lucide-compatible SVG markup", () => {
    const markup = renderToStaticMarkup(<Copy size={18} strokeWidth={1.5} title="Copy it" />);
    expect(markup).toContain('width="18"');
    expect(markup).toContain('stroke-width="1.5"');
    expect(markup).toContain('class="mi mi-copy"');
    expect(markup).toContain("<title>Copy it</title>");
    expect(markup).toContain('role="img"');
  });
});
