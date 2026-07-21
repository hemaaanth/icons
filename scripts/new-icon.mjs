import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);
const slug = args[0];
if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  throw new Error("Usage: npm run icon:new -- <slug> [--from-lucide <lucide-slug>]");
}
const sourceFlag = args.indexOf("--from-lucide");
const lucideSlug = sourceFlag === -1 ? undefined : args[sourceFlag + 1];
if (sourceFlag !== -1 && (!lucideSlug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(lucideSlug))) {
  throw new Error("--from-lucide requires a valid Lucide slug");
}
const knownArgs = new Set([slug, "--from-lucide", lucideSlug].filter(Boolean));
const unknownArg = args.find((arg) => !knownArgs.has(arg));
if (unknownArg) throw new Error(`Unknown argument: ${unknownArg}`);

const root = path.resolve(import.meta.dirname, "..");
const target = path.join(root, "drafts", `${slug}.mjs`);
await mkdir(path.dirname(target), { recursive: true });
try {
  await access(target);
  throw new Error(`Draft already exists: drafts/${slug}.mjs`);
} catch (error) {
  if (error?.code !== "ENOENT") throw error;
}

let body = `<!-- TODO: construct original ${slug} geometry on the 24x24 field -->`;
if (lucideSlug) {
  const svgPath = path.join(root, "node_modules/lucide-static/icons", `${lucideSlug}.svg`);
  const svg = await readFile(svgPath, "utf8");
  body = svg.match(/<svg[^>]*>([\s\S]*?)<\/svg>/)?.[1]?.trim();
  if (!body) throw new Error(`Could not read Lucide geometry for ${lucideSlug}`);
}
const exportName = slug.split("-").map((part) => part[0].toUpperCase() + part.slice(1)).join("");

const draft = {
  exportName,
  slug,
  name: exportName.replace(/([a-z])([A-Z])/g, "$1 $2"),
  brief: "TODO: state the static meaning, animated action/state, UI context, and target sizes",
  references: [1, 2, 3].map((number) => ({
    name: `TODO: independent reference ${number}`,
    keep: "TODO: principle worth learning from",
    reject: "TODO: weakness or mismatch",
    doNotCopy: "TODO: distinctive feature this icon must not reproduce",
  })),
  geometryStrategy: "TODO: explain the original construction, synthesis, or justified adaptation",
  body,
  candidates: ["a", "b", "c"].map((id) => ({
    id,
    label: `Option ${id.toUpperCase()}`,
    concept: `TODO: explore a distinct physical idea for option ${id.toUpperCase()}; delete it if it does not pass review`,
    css: `@media (prefers-reduced-motion: no-preference) {\n  .mi-${slug} {\n    /* TODO: animate a named SVG part with var(--mi-progress, 0). */\n    transition-duration: calc(300ms * var(--mi-time, 1));\n  }\n}`,
    knobs: [],
  })),
};
await writeFile(target, `export default ${JSON.stringify(draft, null, 2)};\n`);
console.log(
  `Created ${lucideSlug ? `Lucide-adapted (${lucideSlug})` : "blank"} draft at drafts/${slug}.mjs. Keep only directions that pass review, then run npm run dev:builder.`,
);
