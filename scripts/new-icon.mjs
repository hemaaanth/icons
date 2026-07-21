import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const slug = process.argv[2];
if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  throw new Error("Usage: npm run icon:new -- <lucide-slug>");
}

const root = path.resolve(import.meta.dirname, "..");
const target = path.join(root, "drafts", `${slug}.mjs`);
await mkdir(path.dirname(target), { recursive: true });
try {
  await access(target);
  throw new Error(`Draft already exists: drafts/${slug}.mjs`);
} catch (error) {
  if (error?.code !== "ENOENT") throw error;
}

const svgPath = path.join(root, "node_modules/lucide-static/icons", `${slug}.svg`);
const svg = await readFile(svgPath, "utf8");
const body = svg.match(/<svg[^>]*>([\s\S]*?)<\/svg>/)?.[1]?.trim();
if (!body) throw new Error(`Could not read Lucide geometry for ${slug}`);
const exportName = slug.split("-").map((part) => part[0].toUpperCase() + part.slice(1)).join("");

const draft = {
  exportName,
  slug,
  name: exportName.replace(/([a-z])([A-Z])/g, "$1 $2"),
  body,
  candidates: ["a", "b", "c"].map((id, index) => ({
    id,
    label: `Option ${id.toUpperCase()}`,
    concept: `TODO: describe one meaningful physical idea for option ${index + 1}`,
    css: `@media (prefers-reduced-motion: no-preference) {\n  .mi-${slug} {\n    /* TODO: animate a named SVG part with var(--mi-progress, 0). */\n  }\n}`,
    knobs: [],
  })),
};
await writeFile(target, `export default ${JSON.stringify(draft, null, 2)};\n`);
console.log(`Created drafts/${slug}.mjs with three motion directions. Add part classes, then run npm run dev.`);
