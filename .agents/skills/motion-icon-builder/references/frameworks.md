# Framework adapters

All adapters render one canonical `IconDefinition` and require the shared
`@hemaaanth/icons/styles.css` import.

- React: `createReactIcon`, named exports from `@hemaaanth/icons/react`, and the
  package root default. Forward refs and standard SVG props.
- Vue: `createVueIcon` and named Vue 3 components from `@hemaaanth/icons/vue`.
- Svelte: named Svelte 5 wrappers from `@hemaaanth/icons/svelte`.
- Vanilla: `toSvg` and `createIcon` from `@hemaaanth/icons/vanilla`.
- Core: definitions, metadata, and the catalog from `@hemaaanth/icons/core`.

When changing an adapter, verify equivalent size, stroke width, classes,
accessibility, body markup, and arbitrary SVG attribute forwarding where the
framework supports it. Never place framework-specific code in `src/icons/`.
