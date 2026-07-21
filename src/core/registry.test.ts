import { readFile } from "node:fs/promises";
import path from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { icons } from "./index";
import { reactSourceBySlug } from "../generated/react-source";

describe("copy and shadcn output", () => {
  it("generates valid standalone TSX for every icon", () => {
    expect(Object.keys(reactSourceBySlug)).toHaveLength(icons.length);

    for (const icon of icons) {
      const source = reactSourceBySlug[icon.slug];
      const result = ts.transpileModule(source, {
        compilerOptions: {
          jsx: ts.JsxEmit.ReactJSX,
          module: ts.ModuleKind.ESNext,
          target: ts.ScriptTarget.ES2022,
        },
        fileName: `${icon.slug}.tsx`,
        reportDiagnostics: true,
      });

      const errors = result.diagnostics?.filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error) ?? [];
      expect(errors, icon.slug).toEqual([]);
    }
  });

  it("keeps each Pages registry item synchronized with copied TSX", async () => {
    for (const icon of icons) {
      const file = path.resolve("public/r", `${icon.slug}.json`);
      const item = JSON.parse(await readFile(file, "utf8")) as {
        name: string;
        files: Array<{ content: string }>;
      };

      expect(item.name).toBe(icon.slug);
      expect(item.files[0]?.content).toBe(reactSourceBySlug[icon.slug]);
    }
  });
});
