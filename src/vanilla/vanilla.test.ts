import { describe, expect, it } from "vitest";
import { copyDefinition } from "../core";
import { toSvg } from "./index";

describe("vanilla adapter", () => {
  it("returns escaped, accessible SVG", () => {
    const svg = toSvg(copyDefinition, { size: 20, title: "Copy <value>" });
    expect(svg).toContain('width="20"');
    expect(svg).toContain('class="mi mi-copy"');
    expect(svg).toContain("<title>Copy &lt;value&gt;</title>");
    expect(svg).toContain('role="img"');
  });
});
