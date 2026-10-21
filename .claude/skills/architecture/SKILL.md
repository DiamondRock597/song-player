---
name: architecture
description: Feature-sliced folder structure of the Songer app (app, features, components, api, utils), the anatomy of a feature, dependency rules between folders, state ownership (TanStack Query vs Zustand), naming conventions, and the typed asset-registry pattern for icons/SVGs. Use before adding an icon or SVG asset, creating any new file or folder, adding a feature, an API endpoint, a store, or when unsure where code belongs.
---

# Architecture

Expo (TypeScript) + Expo Router, feature-sliced. Code lives under `src/`, imported via the `@/` alias (`@/*` → `src/*`).

## Folder map

```
src/
├── app/                 # Expo Router routes only (thin)
│   ├── _layout.tsx      # Root providers: GestureHandlerRoot → QueryClient → BottomSheetModal
│   └── (tabs)/          # Create / Songs (index) / Lyrics / Account
├── features/            # One folder per product feature (vertical slice)
│   └── <feature>/
├── components/          # Shared, domain-agnostic UI (no feature knowledge)
├── api/                 # Simulated backend: transport, endpoints, DTO types, queryClient
├── theme/               # Design tokens from Figma: colors, typography, spacing (created with the first screen)
└── utils/               # Pure functions (no React, no side effects)
```

Add a new top-level folder only if none of the above fits, and record it here.

## Feature anatomy

```
features/<feature>/
├── <Name>Screen.tsx        # Presentational screen (only if the feature owns a route)
├── use<Name>Screen.ts      # All screen logic — see the `screens` skill
├── components/             # UI used only by this feature
├── hooks/                  # Query hooks + feature logic (use<Thing>.ts)
├── store/                  # Zustand store: <feature>.store.ts (client state only)
├── types.ts                # Feature-level types (UI models, not DTOs)
└── index.ts                # Public API — the only file other folders may import
```

Create subfolders only when they have content. Planned features: `songs` (list), `player` (audio + mini player), `song-actions` (bottom sheet), `search`.

## Dependency rules

```
app ──▶ features ──▶ components, api, theme, utils
                 └─▶ other features (via their index.ts only)
components ──▶ theme, utils
api ──▶ utils
```

1. `app/` imports screens from `@/features/<feature>` and providers from `@/api`. No logic, no styles beyond layout config.
2. A feature imports another feature only through `@/features/<other>` (its `index.ts`), never deep paths. No circular feature imports — if two features need the same thing, move it down to `components/`, `api/` or `utils/`.
3. `components/` never imports from `features/` or `api/`. Pass data in via props.
4. `api/` never imports React components or Zustand stores.
5. **Nothing outside `src/api/` imports `songs.json`.** The UI only sees it through paginated endpoints.

## State ownership

| Kind of state | Lives in | Example |
|---|---|---|
| Server data (anything from `api/`) | TanStack Query (`useInfiniteQuery` / `useQuery`) in `features/<f>/hooks/` | song pages, search results |
| App-wide client state | Zustand store in `features/<f>/store/` | current track, play status, sheet target |
| Local UI state | `useState` inside the screen hook or component | input focus, selected chip |
| High-frequency values | expo-audio status hook or Reanimated shared values, read by the leaf that renders them | playback position, progress bar |

- Never copy query data into Zustand.
- Components subscribe to stores with narrow selectors (`usePlayerStore(s => s.currentId === id)`), never the whole store.
- Query keys are arrays starting with the domain: `['songs', 'list']`, `['songs', 'search', query]`.

## API layer

```
api/
├── client.ts            # simulateRequest(handler, { signal }): latency jitter + abort
├── queryClient.ts       # shared QueryClient
├── <domain>/
│   ├── <domain>.api.ts   # endpoints, e.g. SongsApi.getGenerations({ cursor, limit }, { signal })
│   ├── <domain>.types.ts # DTOs mirroring the backend shape
│   └── index.ts
└── index.ts
```

- Every endpoint goes through `simulateRequest` and accepts `{ signal }` (pass the one from the TanStack `queryFn` context).
- Paginated endpoints return `{ items, nextCursor }`, where `nextCursor` is `null` on the last page.
- Map DTOs to UI models in the feature (`select` or a hook), not in components.

## Naming

| What | File | Export |
|---|---|---|
| Component | `SongRow.tsx` | `SongRow` (named export, no default) |
| Hook | `useSongsQuery.ts` | `useSongsQuery` |
| API | `songs.api.ts` | `SongsApi` |
| DTO types | `songs.types.ts` | `GenerationDto`, `ClipDto` |
| Store | `player.store.ts` | `usePlayerStore` |
| Util | `formatDuration.ts` | `formatDuration` |

- Named exports everywhere. The only exception is route files in `app/`, which must default-export.
- Styles: `StyleSheet.create` at the bottom of the component file.
- Each folder that is imported from outside has an `index.ts` barrel.

## Asset registries (Icon and friends)

Any set of SVG assets picked by name (icons, logos, illustrations) is a typed registry component in `components/<X>/`. `Icon` is the reference implementation; copy its shape for every new kind.

```
components/Icon/
├── svg/              # <kebab-name>.svg, one file per asset
├── types.ts          # imports + iconMap + TIcon
├── Icon.tsx          # memo component
└── index.ts          # Icon, IconProps, TIcon
```

`types.ts`: the map is the single source of truth. The name union is derived from it, never written by hand.

```ts
import type { FC } from 'react';
import type { SvgProps } from 'react-native-svg';

import Pause from './svg/pause.svg';
import Play from './svg/play.svg';

export const iconMap = {
  pause: Pause,
  play: Play,
} satisfies Record<string, FC<SvgProps>>;

export type TIcon = keyof typeof iconMap;
```

`Icon.tsx`:

```tsx
import { memo, type FC } from 'react';
import type { SvgProps } from 'react-native-svg';

import { iconMap, type TIcon } from './types';

const DEFAULT_ICON_SIZE = 24;

// Widened view of the map so unknown runtime names resolve to undefined.
const icons: Partial<Record<string, FC<SvgProps>>> = iconMap;

export type IconProps = { name: TIcon; size?: number } & SvgProps;

export const Icon = memo(function Icon({ name, size = DEFAULT_ICON_SIZE, width, height, ...rest }: IconProps) {
  const Component = icons[name];
  if (!Component) return null;
  return <Component width={width ?? size} height={height ?? size} {...rest} />;
});
```

`index.ts` re-exports only the component, its props type and the name type:

```ts
export { Icon, type IconProps } from './Icon';
export type { TIcon } from './types';
```

Rules:

- Use `satisfies`, not a type annotation, so the literal keys survive and `keyof typeof` gives a union.
- Keys are kebab-case and match the SVG file name (`arrow-left.svg` → `'arrow-left'`). Keep imports and map entries sorted alphabetically.
- Adding an asset means one import and one map entry. Touch nothing else.
- Explicit `width`/`height` win over `size`, for non-square assets. Put the default size in a named constant.
- The `null` return guards names that arrive as untyped strings at runtime.
- Don't export the map or the raw SVG components from `index.ts`.
- Name a new registry `<X>` / `xMap` / `TX` / `XProps`, e.g. `Logo` / `logoMap` / `TLogo` / `LogoProps`.
- Look the name up through the widened `Partial<Record<string, FC<SvgProps>>>` view, not `xMap[name]` directly. An empty map makes the name type `never`, which breaks JSX.
- SVG imports already work: `react-native-svg`, `react-native-svg-transformer` (set up in `metro.config.js`) and the `*.svg` module declaration in `svg.d.ts`. A new registry needs no extra setup.

## Checklist for a new feature

1. Create `src/features/<feature>/` with `index.ts`.
2. If it calls the backend, add the endpoint in `src/api/<domain>/` first, then a query hook in `features/<feature>/hooks/`.
3. If it owns a screen, follow the `screens` skill and add a thin route in `src/app/`.
4. Run `npm run typecheck` and `npm run lint`.
