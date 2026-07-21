export interface IconKnob {
  cssVar: `--mi-${string}`;
  label: string;
  min: number;
  max: number;
  step: number;
  unit: "deg" | "px" | "ms" | "";
  default: number;
}

export interface IconDefinition {
  exportName: string;
  slug: string;
  name: string;
  concept: string;
  body: string;
  css: string;
  knobs: IconKnob[];
}

export interface IconProps {
  size?: number | string;
  strokeWidth?: number | string;
  className?: string;
  title?: string;
  ariaLabel?: string;
}

export interface DraftCandidate {
  id: string;
  label: string;
  concept: string;
  css: string;
  knobs: IconKnob[];
}

export interface IconDraft {
  exportName: string;
  slug: string;
  name: string;
  body: string;
  candidates: DraftCandidate[];
}
