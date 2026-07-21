import { describe, expect, it } from "vitest";
import { botDefinition, icons } from "./index";

describe("icon catalog", () => {
  it("contains unique framework-neutral definitions", () => {
    expect(icons.length).toBeGreaterThan(0);
    expect(new Set(icons.map((icon) => icon.slug)).size).toBe(icons.length);
    expect(new Set(icons.map((icon) => icon.exportName)).size).toBe(icons.length);
  });

  it("keeps every animation behind the reduced-motion preference", () => {
    for (const icon of icons) {
      expect(icon.css, icon.slug).toContain("@media (prefers-reduced-motion: no-preference)");
      expect(icon.css, icon.slug).not.toContain("--ic");
      expect(icon.body, icon.slug).not.toContain('class="ic');
    }
  });

  it("keeps knob metadata synchronized with CSS fallbacks", () => {
    for (const icon of icons) {
      for (const knob of icon.knobs) {
        expect(icon.css, `${icon.slug}:${knob.cssVar}`).toContain(`${knob.cssVar}, ${knob.default}${knob.unit}`);
      }
    }
  });

  it("uses one fixed 300ms choreography budget", () => {
    for (const icon of icons) {
      const millisecondValues = [...icon.css.matchAll(/(?<![\w-])(\d+)ms\b/g)].map((match) => Number(match[1]));
      expect(millisecondValues.length, icon.slug).toBeGreaterThan(0);
      expect(millisecondValues.every((value) => value === 300), icon.slug).toBe(true);
      expect(icon.knobs.some((knob) => knob.unit === "ms"), icon.slug).toBe(false);
      expect(icon.css, icon.slug).not.toMatch(/\b(?:transition|animation)-delay\s*:/);
    }
  });

  it("gives the bot a legible wake-up motion", () => {
    expect(botDefinition.body).toContain("mi-bot-eyes");
    expect(botDefinition.css).toContain("--mi-bot-perk, 18deg");
    expect(botDefinition.css).toContain("--mi-bot-awake, 1.45");
  });
});
