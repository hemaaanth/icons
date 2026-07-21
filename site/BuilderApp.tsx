import { useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { DialRoot, useDialKit } from "dialkit";
import { createReactIcon } from "../src/react/create-icon";
import { icons } from "../src/core";
import type { DraftCandidate, IconDefinition, IconDraft, IconKnob } from "../src/core";

type DraftModule = { default: IconDraft };

const draftModules = import.meta.glob<DraftModule>("../drafts/*.mjs", { eager: true });
const drafts = Object.values(draftModules).map((module) => module.default);

export default function BuilderApp() {
  return <Builder />;
}

function Builder() {
  const [draftSlug, setDraftSlug] = useState(drafts[0]?.slug ?? "");
  const [copyStatus, setCopyStatus] = useState("Copy an instruction from the icon rail to begin.");
  const activeDraft = drafts.find((draft) => draft.slug === draftSlug) ?? drafts[0] ?? null;

  async function copyInstruction(prompt: string, confirmation: string) {
    await copyText(prompt);
    setCopyStatus(confirmation);
  }

  return (
    <main className="builder-layout">
      <aside className="dial-panel" aria-label="DialKit controls">
        <RailHeading eyebrow="Tune" title="Parameters" />
        {activeDraft ? (
          <DialRoot mode="inline" productionEnabled theme="system" />
        ) : (
          <div className="rail-empty">
            <span className="rail-empty-mark" aria-hidden="true" />
            <p>Tuning controls appear when a draft is ready to shape.</p>
          </div>
        )}
      </aside>

      <section className="builder-workspace">
        <header className="workspace-header">
          <div>
            <p className="eyebrow">Motion icon workbench</p>
            <h1>{activeDraft?.name ?? "Start an icon"}</h1>
          </div>
          {drafts.length > 1 && (
            <label className="draft-select">
              <span>Draft</span>
              <select value={activeDraft?.slug} onChange={(event) => setDraftSlug(event.target.value)}>
                {drafts.map((draft) => <option key={draft.slug} value={draft.slug}>{draft.name}</option>)}
              </select>
            </label>
          )}
        </header>

        {activeDraft ? (
          <DraftWorkbench key={activeDraft.slug} draft={activeDraft} />
        ) : (
          <EmptyWorkbench />
        )}
      </section>

      <aside className="catalog-panel" aria-label="Icon catalog">
        <RailHeading eyebrow="Start" title="Current icons" />
        <button
          className="new-icon-button"
          onClick={() => void copyInstruction(newIconPrompt(), "New-icon instruction copied.")}
        >
          <span className="new-icon-plus" aria-hidden="true">+</span>
          <span>New icon</span>
        </button>
        <div className="catalog-grid">
          {icons.map((icon) => (
            <CatalogIconButton
              key={icon.slug}
              definition={icon}
              onCopy={() => void copyInstruction(refineIconPrompt(icon), `${icon.exportName} refinement instruction copied.`)}
            />
          ))}
        </div>
        <p className="copy-status" role="status">{copyStatus}</p>
      </aside>
    </main>
  );
}

function RailHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <header className="rail-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
    </header>
  );
}

function EmptyWorkbench() {
  return (
    <div className="empty-workbench">
      <div className="empty-canvas" aria-hidden="true">
        <span className="canvas-axis canvas-axis-x" />
        <span className="canvas-axis canvas-axis-y" />
      </div>
      <div className="empty-copy">
        <p>Choose <strong>New icon</strong> or a named mark from the catalog.</p>
        <p>Each item on the right copies a purpose-built AI brief.</p>
      </div>
      <OptionScaffold />
    </div>
  );
}

function OptionScaffold() {
  return (
    <section className="options-section" aria-label="Option scaffold">
      <div className="section-heading">
        <p className="eyebrow">Options</p>
        <span>0–3 passing directions · never a quota</span>
      </div>
      <div className="option-grid">
        <div className="option-placeholder option-placeholder-flex">
          <span aria-hidden="true">0→3</span>
          <p>The row grows only as directions pass review.</p>
        </div>
      </div>
    </section>
  );
}

function DraftWorkbench({ draft }: { draft: IconDraft }) {
  const [candidateId, setCandidateId] = useState(draft.candidates[0]?.id ?? "");
  const candidate = draft.candidates.find((item) => item.id === candidateId) ?? draft.candidates[0];
  if (!candidate) return <EmptyWorkbench />;
  const definition = fromDraft(draft, candidate);

  return (
    <IconTuner key={`${draft.slug}-${candidate.id}`} definition={definition}>
      {(preview) => (
        <>
          <div className="canvas-meta">
            <span>{candidate.label}</span>
            <p>{candidate.concept}</p>
          </div>
          <div className="tuning-stage" style={preview.style}>
            <style>{definition.css}</style>
            <button
              className={preview.holdPose ? "preview-button mi-play" : "preview-button"}
              aria-label={`Preview ${definition.name}`}
            >
              <preview.Component size={preview.size} />
            </button>
            <div className="preview-hints"><span>Hover</span><span>Focus</span><span>Interrupt</span></div>
          </div>
          <section className="options-section" aria-label="Motion directions">
            <div className="section-heading">
              <p className="eyebrow">Options</p>
              <span>{draft.candidates.length} working directions</span>
            </div>
            <div className="option-grid">
              {draft.candidates.map((item) => {
                const itemDefinition = fromDraft(draft, item);
                const selected = item.id === candidate.id;
                return (
                  <div
                    key={item.id}
                    className={selected ? "option-card active" : "option-card"}
                    role="button"
                    tabIndex={0}
                    aria-pressed={selected}
                    onClick={() => setCandidateId(item.id)}
                    onKeyDown={(event) => activateOnKeyboard(event, () => setCandidateId(item.id))}
                  >
                    <ShadowIconPreview definition={itemDefinition} size={48} />
                    <span>{item.label}</span>
                    <small>{item.concept}</small>
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}
    </IconTuner>
  );
}

function IconTuner({
  definition,
  children,
}: {
  definition: IconDefinition;
  children: (preview: {
    Component: ReturnType<typeof createReactIcon>;
    size: number;
    holdPose: boolean;
    style: CSSProperties;
  }) => React.ReactNode;
}) {
  const Component = useMemo(() => createReactIcon(definition), [definition]);
  const config = useMemo(() => {
    const motion = Object.fromEntries(definition.knobs.map((knob) => [knobKey(knob), [knob.default, knob.min, knob.max, knob.step]]));
    return {
      preview: {
        size: [96, 16, 160, 1],
        holdPose: false,
        slowMotion: false,
      },
      motion,
    };
  }, [definition]);
  const values = useDialKit(definition.name, config as any, {
    id: `icon-builder:${definition.slug}:${definition.name}`,
    persist: true,
  }) as { preview: { size: number; holdPose: boolean; slowMotion: boolean }; motion: Record<string, number> };

  const style = {
    "--mi-time": values.preview.slowMotion ? 4 : 1,
    ...Object.fromEntries(definition.knobs.map((knob) => [knob.cssVar, `${values.motion[knobKey(knob)]}${knob.unit}`])),
  } as CSSProperties;

  return children({ Component, size: values.preview.size, holdPose: values.preview.holdPose, style });
}

function CatalogIconButton({ definition, onCopy }: { definition: IconDefinition; onCopy: () => void }) {
  const Component = useMemo(() => createReactIcon(definition), [definition]);
  return (
    <button className="catalog-icon" onClick={onCopy} aria-label={`Copy refinement instruction for ${definition.exportName}`} title={definition.exportName}>
      <Component size={24} />
      <span>{definition.slug.replaceAll("-", " ")}</span>
    </button>
  );
}

function ShadowIconPreview({ definition, size }: { definition: IconDefinition; size: number }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const root = host.shadowRoot ?? host.attachShadow({ mode: "open" });
    root.innerHTML = `
      <style>
        :host { display: grid; place-items: center; color: currentColor; }
        .trigger { display: grid; place-items: center; width: 100%; height: 100%; }
        .trigger:hover .mi { --mi-progress: 1; }
        .mi { display: block; overflow: visible; }
        ${definition.css}
      </style>
      <div class="trigger">
        <svg class="mi mi-${definition.slug}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${definition.body}</svg>
      </div>`;
  }, [definition, size]);

  return <div className="shadow-preview" ref={hostRef} />;
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

function activateOnKeyboard(event: KeyboardEvent, action: () => void) {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  action();
}

export function newIconPrompt(): string {
  return [
    "Use $motion-icon-builder to start a completely new icon from scratch.",
    "Ask me for the static meaning, animated action or state, and UI context before drawing.",
    "Then follow the full blank-canvas workflow: build a 3–5 source reference matrix, run the adversarial subagent review, establish optically balanced original geometry, and create up to three genuinely distinct working options in the Builder.",
    "Do not use Lucide as the default skeleton, do not pad weak directions, keep the full choreography at exactly 300ms, and do not finalize until I explicitly lock a direction.",
    "Open /icons/builder.html in the Paseo browser and keep the center preview, option row, and DialKit controls updated as you work.",
  ].join(" ");
}

export function refineIconPrompt(icon: IconDefinition): string {
  return [
    `Use $motion-icon-builder to critically refine the existing ${icon.exportName} icon (${icon.slug}).`,
    "Treat its current geometry and motion as one reference, not as canon.",
    "First explain what is strong, weak, generic, derivative, or optically unresolved; then build a 3–5 source reference matrix and run the adversarial subagent review before drawing.",
    "Work in a draft with up to three genuinely distinct options, preserve only what earns its place, keep the complete choreography at exactly 300ms, and do not edit the canonical icon or finalize until I explicitly lock a direction.",
    "Open /icons/builder.html in the Paseo browser and keep the center preview, option row, and DialKit controls updated as you work.",
  ].join(" ");
}

async function copyText(value: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}
