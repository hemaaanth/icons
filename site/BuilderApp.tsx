import { useMemo, useState, type CSSProperties } from "react";
import { DialRoot, useDialKit } from "dialkit";
import { createReactIcon } from "../src/react/create-icon";
import { icons } from "../src/core";
import type { DraftCandidate, IconDefinition, IconDraft, IconKnob } from "../src/core";

type DraftModule = { default: IconDraft };

const draftModules = import.meta.glob<DraftModule>("../drafts/*.mjs", { eager: true });
const drafts = Object.values(draftModules).map((module) => module.default);

export default function BuilderApp() {
  return (
    <main className="builder-layout">
      <Builder />
    </main>
  );
}

function Builder() {
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
    <>
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
            No active drafts. Run <code>npm run icon:new -- bell</code> to create three directions.
          </p>
        )}
      </section>
      <aside className="dial-panel" aria-label="DialKit controls">
        <DialRoot mode="inline" productionEnabled theme="system" />
      </aside>
    </>
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
