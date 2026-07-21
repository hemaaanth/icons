# Icons

Meaningful microanimated icons for React, Vue, Svelte, and vanilla JavaScript.
Every icon starts from Lucide geometry, stays pixel-identical at rest, and moves
only to explain its action: a lid opens, a copy slides out, a chain cinches.

[Browse the icons](https://hemaaanth.github.io/icons/)

## Install

Until the package is published to npm, install it directly from GitHub:

```bash
npm install https://github.com/hemaaanth/icons/releases/download/v0.1.2/hemaaanth-icons-0.1.2.tgz
```

Or copy a standalone React icon from the gallery with the shadcn CLI:

```bash
npx shadcn@latest add "https://hemaaanth.github.io/icons/r/copy.json"
```

Import the framework-neutral trigger styles once:

```ts
import "@hemaaanth/icons/styles.css";
```

### React

```tsx
import { Copy } from "@hemaaanth/icons/react";

<button aria-label="Copy"><Copy size={16} /></button>
```

The package root also defaults to the React adapter.

### Vue

```vue
<script setup>
import { Copy } from "@hemaaanth/icons/vue";
</script>

<template><button aria-label="Copy"><Copy :size="16" /></button></template>
```

### Svelte

```svelte
<script>
  import { Copy } from "@hemaaanth/icons/svelte";
</script>

<button aria-label="Copy"><Copy size={16} /></button>
```

### Vanilla JavaScript

```js
import { copyDefinition, createIcon } from "@hemaaanth/icons/vanilla";

document.querySelector("button").append(createIcon(copyDefinition, { size: 16 }));
```

Icons animate from the nearest interactive ancestor on pointer hover or
`:focus-visible`. Add `.mi-trigger` to a custom interactive wrapper, or
`.mi-play` to force the active pose. Disabled controls and reduced-motion users
stay static.

## Build one icon

```bash
npm install
npm run icon:new -- bell
npm run dev:builder
```

The scaffold creates three motion directions in `drafts/bell.mjs`. The builder
shows those options and embeds DialKit for live tuning, persistent versions, and
copyable settings. After feedback selects a direction:

```bash
npm run icon:finalize -- bell b
```

Finalization validates the choice, moves it into the canonical catalog,
regenerates every framework adapter, runs tests, and stages the result.

Agents should follow
[motion-icon-builder/SKILL.md](.agents/skills/motion-icon-builder/SKILL.md).
The repository also ships an always-on
[napkin skill](.agents/skills/napkin/SKILL.md) so agents read and curate the
shared `.Codex/napkin.md` runbook before working.

## Development

```bash
npm run dev           # public gallery
npm run dev:builder   # local-only DialKit authoring surface
npm run check         # types, lint, tests, package, and site
```

The source of truth is `src/icons/*.ts`. Everything in `src/generated/` and
`src/svelte/generated/` is produced by `npm run generate`.

Resting geometry is derived from Lucide under the ISC License. See
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
