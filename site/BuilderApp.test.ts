import { describe, expect, it } from "vitest";
import { newIconPrompt, refineIconPrompt } from "./BuilderApp";
import { icons } from "../src/core";

describe("builder prompt handoff", () => {
  it("copies the blank-canvas workflow for a new icon", () => {
    const prompt = newIconPrompt();
    expect(prompt).toContain("$motion-icon-builder");
    expect(prompt).toContain("completely new icon from scratch");
    expect(prompt).toContain("3–5 source reference matrix");
    expect(prompt).toContain("exactly 300ms");
  });

  it("treats an existing icon as a reference rather than canon", () => {
    const prompt = refineIconPrompt(icons[0]);
    expect(prompt).toContain(icons[0].exportName);
    expect(prompt).toContain(icons[0].slug);
    expect(prompt).toContain("one reference, not as canon");
    expect(prompt).toContain("up to three genuinely distinct options");
  });
});
