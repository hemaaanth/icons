import { readFile } from "node:fs/promises";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { icons } from "../src/core";
import App from "./App";

describe("public gallery", () => {
  it("renders only the quiet catalog and hover actions", () => {
    const markup = renderToStaticMarkup(<App />);

    expect(markup.match(/class="icon-card mi-trigger"/g)).toHaveLength(icons.length);
    expect(markup.match(/<button/g)).toHaveLength(icons.length * 2);
    expect(markup).not.toContain("Meaningful motion");
    expect(markup).not.toContain("Motion builder");
    expect(markup).not.toContain("Theme");
    expect(markup).not.toContain("class=\"icon-name\"");
    expect(markup).not.toContain("class=\"icon-concept\"");
  });

  it("keeps the glyph visible while hover actions are shown", async () => {
    const css = await readFile(new URL("./styles.css", import.meta.url), "utf8");

    expect(css).not.toContain("opacity: 0.16");
    expect(css).toContain("top: 0.5rem");
    expect(css).toContain("right: 0.5rem");
  });
});
