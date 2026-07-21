import { access, mkdir, rm, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { pathToFileURL } from "node:url";

const [slug, candidateId] = process.argv.slice(2).filter((arg) => arg !== "--no-stage");
const shouldStage = !process.argv.includes("--no-stage");
if (!slug || !candidateId) throw new Error("Usage: npm run icon:finalize -- <slug> <candidate-id> [--no-stage]");

const root = path.resolve(import.meta.dirname, "..");
const draftPath = path.join(root, "drafts", `${slug}.mjs`);
await access(draftPath);
const draft = (await import(`${pathToFileURL(draftPath).href}?t=${Date.now()}`)).default;
const candidate = draft.candidates.find((item) => item.id === candidateId);
if (!candidate) throw new Error(`Unknown candidate ${candidateId}; choose ${draft.candidates.map((item) => item.id).join(", ")}`);
if (/TODO/.test(candidate.concept + candidate.css)) throw new Error("Resolve every TODO before finalizing the icon");

const definition = {
  exportName: draft.exportName,
  slug: draft.slug,
  name: `${draft.name} — ${candidate.label}`,
  concept: candidate.concept,
  body: draft.body,
  css: candidate.css,
  knobs: candidate.knobs,
};
await mkdir(path.join(root, "src/icons"), { recursive: true });
await writeFile(
  path.join(root, "src/icons", `${slug}.ts`),
  `import { defineIcon } from "../core/define";\nimport type { IconDefinition } from "../core/types";\n\nexport default defineIcon(${JSON.stringify(definition, null, 2)} as IconDefinition);\n`,
);
run("npm", ["run", "generate"]);
run("npm", ["test"]);
await rm(draftPath);
if (shouldStage) run("git", ["add", `src/icons/${slug}.ts`, `drafts/${slug}.mjs`, "src/generated", "src/svelte"]);
console.log(`Finalized ${draft.exportName} from option ${candidateId}${shouldStage ? " and staged it" : ""}.`);

function run(command, args) {
  const result = spawnSync(command, args, { cwd: root, stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
