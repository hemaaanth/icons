# Access icon in Next.js

This is the current three-state draft, provided as a portable component. It is not yet exported by the released `@hemaaanth/icons` package.

## Copy one file

Copy [`access-icon.tsx`](./access-icon.tsx) into your app as `components/icons/access.tsx`.

It contains its own `"use client"` boundary and only imports React. No animation library, stylesheet, or builder code is required.

```tsx
import { Access } from "@/components/icons/access";

<Access state="repository" size={20} />
```

The supported states are `"private"`, `"repository"`, and `"link"`. Keep the component mounted and change `state`; do not use `key={state}`, which would remount it and skip the transition.

## Connect it to your dropdown

```tsx
"use client";

import { useState } from "react";
import { Access, type AccessState } from "@/components/icons/access";

export function VisibilityPicker() {
  const [visibility, setVisibility] = useState<AccessState>("private");

  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <Access state={visibility} size={20} />
      <select
        aria-label="Visibility"
        value={visibility}
        onChange={(event) => setVisibility(event.target.value as AccessState)}
      >
        <option value="private">Only me</option>
        <option value="repository">Anyone with repo access</option>
        <option value="link">Anyone with the link</option>
      </select>
    </label>
  );
}
```

For an existing dropdown, pass its current value to `Access` on the trigger. The icon displays the permission; the application remains responsible for saving and enforcing it.

All six changes animate directly in 200ms, including interruptions. Initial rendering is settled, and reduced-motion settings are respected. The icon inherits text color, supports `className`, `style`, `strokeWidth`, and SVG refs, and is decorative by default. Supply `aria-label` or `title` when it needs its own accessible name.

## Existing catalog icons

The current catalog can be installed from the existing GitHub release:

```bash
npm install https://github.com/hemaaanth/icons/releases/download/v0.1.2/hemaaanth-icons-0.1.2.tgz
```

Import the shared styles once in `app/layout.tsx`:

```tsx
import "@hemaaanth/icons/styles.css";
```

Then use a named React export inside a client component:

```tsx
"use client";

import { Copy } from "@hemaaanth/icons/react";

<button aria-label="Copy"><Copy size={20} /></button>
```

Catalog animations follow hover/focus on their interactive ancestor. The stateful access draft animates when its `state` changes and does not need the shared styles.

Once this draft is integrated into a future package release, the intended import is `import { Access } from "@hemaaanth/icons/react"`, with the same props. That export is not available in v0.1.2.
