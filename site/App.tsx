import { useMemo, useState } from "react";
import { icons } from "../src/core";
import { createReactIcon } from "../src/react/create-icon";
import type { IconDefinition } from "../src/core";

const REGISTRY_ROOT = "https://hemaaanth.github.io/icons/r";

export default function App() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <h1>Icons</h1>
        <a
          className="github-link"
          href="https://github.com/hemaaanth/icons"
          aria-label="View Icons on GitHub"
          title="GitHub"
        >
          <GithubMark />
        </a>
      </header>
      <main className="icon-grid" aria-label="Animated icon catalog">
        {icons.map((icon) => <IconCard key={icon.slug} icon={icon} />)}
      </main>
    </div>
  );
}

function IconCard({ icon }: { icon: IconDefinition }) {
  const Component = useMemo(() => createReactIcon(icon), [icon]);
  const [copied, setCopied] = useState<"tsx" | "shadcn" | null>(null);

  async function copy(value: string, kind: "tsx" | "shadcn") {
    await navigator.clipboard.writeText(value);
    setCopied(kind);
    window.setTimeout(() => setCopied((current) => current === kind ? null : current), 1600);
  }

  async function copyTsx() {
    const response = await fetch(`${import.meta.env.BASE_URL}r/${icon.slug}.json`);
    if (!response.ok) throw new Error(`Could not load ${icon.slug} source`);
    const item = await response.json() as { files: Array<{ content: string }> };
    await copy(item.files[0].content, "tsx");
  }

  return (
    <article className="icon-card mi-trigger" aria-label={icon.exportName}>
      <Component size={32} />
      <div className="icon-actions">
        <button
          type="button"
          aria-label={`Copy ${icon.exportName} TSX`}
          title={`Copy ${icon.exportName} TSX`}
          onClick={copyTsx}
        >
          {copied === "tsx" ? <CheckMark /> : <CopyMark />}
        </button>
        <button
          type="button"
          aria-label={`Copy ${icon.exportName} shadcn command`}
          title={`Copy ${icon.exportName} shadcn command`}
          onClick={() => copy(`npx shadcn@latest add "${REGISTRY_ROOT}/${icon.slug}.json"`, "shadcn")}
        >
          {copied === "shadcn" ? <CheckMark /> : <TerminalMark />}
        </button>
      </div>
    </article>
  );
}

function GithubMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.57-.29-5.27-1.28-5.27-5.68 0-1.26.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.16 1.18A11 11 0 0 1 12 6.12c.98 0 1.96.13 2.88.39 2.2-1.49 3.16-1.18 3.16-1.18.63 1.58.24 2.75.12 3.04.73.8 1.17 1.82 1.17 3.08 0 4.41-2.71 5.38-5.29 5.67.42.36.78 1.06.78 2.14v3.28c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
    </svg>
  );
}

function CopyMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="14" x="8" y="2" rx="2" />
      <path d="M16 16v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2" />
    </svg>
  );
}

function TerminalMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m4 17 6-6-6-6" />
      <path d="M12 19h8" />
    </svg>
  );
}

function CheckMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}
