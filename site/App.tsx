import { useMemo, useState, type CSSProperties } from "react";
import { DialRoot, useDialKit } from "dialkit";
import { createReactIcon } from "../src/react/create-icon";
import { icons } from "../src/core";
import type { DraftCandidate, IconDefinition, IconDraft, IconKnob } from "../src/core";

type Theme = "system" | "light" | "dark";
type View = "gallery" | "builder";
type DraftModule = { default: IconDraft };

const draftModules = import.meta.glob<DraftModule>("../drafts/*.mjs", { eager: true });
const drafts = Object.values(draftModules).map((module) => module.default);

export default function App() {
  const [view, setView] = useState<View>("gallery");
  const [theme, setTheme] = useState<Theme>("system");

  return (
    <div className="app" data-theme={theme}>
      <header className="topbar">
        <a className="brand" href="./" aria-label="Icons home">
          <span className="brand-mark" aria-hidden="true">↗</span>
          <span>Icons</span>
        </a>
        <nav aria-label="Primary navigation">
          <button className={view === "gallery" ? "active" : ""} onClick={() => setView("gallery")}>Gallery</button>
          <button className={view === "builder" ? "active" : ""} onClick={() => setView("builder")}>Builder</button>
          <a href="https://github.com/hemaaanth/icons">GitHub</a>
        </nav>
        <label className="theme-control">
          <span>Theme</span>
          <select value={theme} onChange={(event) => setTheme(event.target.value as Theme)}>
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
      </header>
      <main>
        {view === "gallery" ? <Gallery onBuild={() => setView("builder")} /> : <Builder theme={theme} />}
      </main>
    </div>
  );
}

function Gallery({ onBuild }: { onBuild: () => void }) {
  return (
    <div className="page-shell">
      <section className="intro">
        <p className="eyebrow">Meaningful motion</p>
        <h1>Icons that explain what happens next.</h1>
        <p>
          {icons.length} Lucide-compatible icons with quiet, physical microanimations. Hover or keyboard-focus a tile.
          React, Vue, Svelte, and vanilla JavaScript share the same geometry and motion.
        </p>
        <button className="primary-action" onClick={onBuild}>Open the builder</button>
      </section>
      <section aria-labelledby="catalog-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Catalog</p>
            <h2 id="catalog-heading">Shipped icons</h2>
          </div>
          <span>{icons.length} icons</span>
        </div>
        <div className="icon-grid">
          {icons.map((icon) => <IconCard key={icon.slug} icon={icon} />)}
        </div>
      </section>
    </div>
  );
}

function IconCard({ icon }: { icon: IconDefinition }) {
  const Component = useMemo(() => createReactIcon(icon), [icon]);
  return (
    <button className="icon-card" aria-label={`Preview ${icon.name}`}>
      <span className="icon-stage"><Component size={28} /></span>
      <span className="icon-name">{icon.exportName}</span>
      <span className="icon-concept">{icon.concept}</span>
    </button>
  );
}

function Builder({ theme }: { theme: Theme }) {
  const entries = [
    ...drafts.map((draft) => ({ kind: "draft" as const, slug: draft.slug, label: `${draft.name} · draft`, draft })),
    ...icons.map((icon) => ({ kind: "icon" as const, slug: icon.slug, label: icon.exportName, icon })),
  ];
  const [selectedSlug, setSelectedSlug] = useState(entries[0]?.slug ?? "");
  const selected = entries.find((entry) => entry.slug === selectedSlug) ?? entries[0];
  const [candidateId, setCandidateId] = useState("a");

  if (!selected) return <div className="empty-state">No icons or drafts found.</div>;
  const candidate = selected.kind === "draft"
    ? selected.draft.candidates.find((item) => item.id === candidateId) ?? selected.draft.candidates[0]
    : null;
  const definition = selected.kind === "icon" ? selected.icon : fromDraft(selected.draft, candidate!);

  return (
    <div className="builder-layout">
      <section className="builder-stage">
        <div className="builder-copy">
          <p className="eyebrow">Motion builder</p>
          <h1>{selected.label}</h1>
          <p>{candidate?.concept ?? definition.concept}</p>
        </div>
        <label className="field">
          <span>Icon</span>
          <select value={selectedSlug} onChange={(event) => { setSelectedSlug(event.target.value); setCandidateId("a"); }}>
            {entries.map((entry) => <option key={`${entry.kind}-${entry.slug}`} value={entry.slug}>{entry.label}</option>)}
          </select>
        </label>
        {selected.kind === "draft" && (
          <div className="candidate-picker" role="group" aria-label="Motion directions">
            {selected.draft.candidates.map((item) => (
              <button key={item.id} className={item.id === candidate?.id ? "active" : ""} onClick={() => setCandidateId(item.id)}>
                <span>{item.label}</span>
                <small>{item.concept}</small>
              </button>
            ))}
          </div>
        )}
        <IconTuner key={`${definition.slug}-${candidate?.id ?? "final"}`} definition={definition} />
        {drafts.length === 0 && (
          <p className="builder-note">
            No active drafts. Run <code>npm run icon:new -- bell</code> to create three directions; they appear here automatically.
          </p>
        )}
      </section>
      <aside className="dial-panel" aria-label="DialKit controls">
        <div className="dial-heading">
          <p className="eyebrow">DialKit</p>
          <p>Values persist locally. Save versions and copy the winning settings from the native panel.</p>
        </div>
        <DialRoot mode="inline" productionEnabled theme={theme} />
      </aside>
    </div>
  );
}

function IconTuner({ definition }: { definition: IconDefinition }) {
  const Component = useMemo(() => createReactIcon(definition), [definition]);
  const config = useMemo(() => {
    const motion = Object.fromEntries(definition.knobs.map((knob) => [knobKey(knob), [knob.default, knob.min, knob.max, knob.step]]));
    return {
      preview: {
        size: [64, 16, 160, 1],
        holdPose: false,
        slowMotion: false,
      },
      motion,
    };
  }, [definition]);
  const values = useDialKit(definition.name, config as any, {
    id: `icon-builder:${definition.slug}`,
    persist: true,
  }) as { preview: { size: number; holdPose: boolean; slowMotion: boolean }; motion: Record<string, number> };

  const style = {
    "--mi-time": values.preview.slowMotion ? 4 : 1,
    ...Object.fromEntries(definition.knobs.map((knob) => [knob.cssVar, `${values.motion[knobKey(knob)]}${knob.unit}`])),
  } as CSSProperties;

  return (
    <>
      <style>{definition.css}</style>
      <div className="tuning-stage" style={style}>
        <button className={values.preview.holdPose ? "preview-button mi-play" : "preview-button"} aria-label={`Preview ${definition.name}`}>
          <Component size={values.preview.size} />
        </button>
        <div className="preview-hints"><span>Hover</span><span>Tab to focus</span><span>Interrupt mid-flight</span></div>
      </div>
    </>
  );
}

function fromDraft(draft: IconDraft, candidate: DraftCandidate): IconDefinition {
  return {
    exportName: draft.exportName,
    slug: draft.slug,
    name: `${draft.name} — ${candidate.label}`,
    concept: candidate.concept,
    body: draft.body,
    css: candidate.css,
    knobs: candidate.knobs,
  };
}

function knobKey(knob: IconKnob): string {
  return knob.cssVar.replace(/^--mi-/, "").replaceAll("-", "_");
}
