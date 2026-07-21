import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { compile } from "svelte/compiler";
import { describe, expect, it } from "vitest";
import { icons } from "../core";

describe("Svelte adapter", () => {
  it("compiles the generic and generated Svelte 5 components", async () => {
    const directory = path.resolve("src/svelte");
    const generated = (await readdir(path.join(directory, "generated"))).filter((file) => file.endsWith(".svelte"));
    const files = ["MotionIcon.svelte", ...generated.map((file) => `generated/${file}`)];
    expect(generated).toHaveLength(icons.length);
    for (const file of files) {
      const source = await readFile(path.join(directory, file), "utf8");
      expect(() => compile(source, { filename: file, generate: "client", modernAst: true })).not.toThrow();
    }
  });
});
