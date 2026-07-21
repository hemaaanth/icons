import { cp, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
await mkdir(path.join(dist, "svelte"), { recursive: true });
await cp(path.join(root, "src/generated/styles.css"), path.join(dist, "styles.css"));
await cp(path.join(root, "src/svelte/MotionIcon.svelte"), path.join(dist, "svelte/MotionIcon.svelte"));
await cp(path.join(root, "src/svelte/index.js"), path.join(dist, "svelte/index.js"));
await cp(path.join(root, "src/svelte/generated"), path.join(dist, "svelte/generated"), { recursive: true });

const components = (await import("../dist/core.js")).icons.map((icon) => icon.exportName);
const declarations = `import type { Component } from "svelte";\nimport type { IconDefinition } from "../core";\nexport interface MotionIconProps { definition: IconDefinition; size?: number | string; strokeWidth?: number | string; title?: string; class?: string; [key: string]: unknown }\nexport const MotionIcon: Component<MotionIconProps>;\n${components.map((name) => `export const ${name}: Component<Omit<MotionIconProps, "definition">>;`).join("\n")}\n`;
await writeFile(path.join(dist, "svelte/index.d.ts"), declarations);
