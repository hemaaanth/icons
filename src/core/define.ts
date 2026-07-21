import type { IconDefinition } from "./types";

const NAME = /^[A-Z][A-Za-z0-9]*$/;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function defineIcon(definition: IconDefinition): IconDefinition {
  if (!NAME.test(definition.exportName)) throw new Error(`Invalid exportName: ${definition.exportName}`);
  if (!SLUG.test(definition.slug)) throw new Error(`Invalid slug: ${definition.slug}`);
  if (!definition.body.trim()) throw new Error(`${definition.exportName} has no SVG body`);
  return Object.freeze({ ...definition, knobs: Object.freeze([...definition.knobs]) }) as IconDefinition;
}

export function iconClass(definition: IconDefinition, className?: string): string {
  return ["mi", `mi-${definition.slug}`, className].filter(Boolean).join(" ");
}
