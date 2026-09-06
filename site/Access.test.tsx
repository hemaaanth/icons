import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { Access, type AccessState } from "../drafts/access-icon";

describe("standalone access icon", () => {
  it.each<AccessState>(["private", "repository", "link"])("server-renders the requested %s state without browser globals", (state) => {
    const svg = renderToStaticMarkup(<Access state={state} size={16} />);
    expect(svg).toContain('width="16"');
    expect(svg).toContain('aria-hidden="true"');
    expect(svg).not.toMatch(/NaN|undefined/);
    expect(svg).toContain(`stroke-dashoffset="${state === "link" ? 0 : 1}"`);
  });

  it("supports external labels and a consistent custom stroke color", () => {
    const svg = renderToStaticMarkup(<Access state="repository" aria-labelledby="visibility-label" stroke="red" />);
    expect(svg).toContain('aria-labelledby="visibility-label"');
    expect(svg).toContain('role="img"');
    expect(svg).not.toContain('aria-hidden');
    expect(svg).toContain('stroke="red"');
    expect(svg).toContain('fill="red"');
    expect(renderToStaticMarkup(<Access state="private" aria-hidden={false} />)).toContain('aria-hidden="false"');
  });

  it("forwards SVG props and exposes an accessible label when supplied", () => {
    const svg = renderToStaticMarkup(<Access state="repository" aria-label="Repository members" className="text-muted" data-testid="visibility" />);
    expect(svg).toContain('role="img"');
    expect(svg).toContain('aria-label="Repository members"');
    expect(svg).not.toContain('aria-hidden');
    expect(svg).toContain('class="mi-access text-muted"');
    expect(svg).toContain('data-testid="visibility"');
  });
});
