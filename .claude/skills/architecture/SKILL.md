---
name: architecture
description: Feature-sliced folder structure of the Songer app (app, features, components, api, utils), the anatomy of a feature, dependency rules between folders, state ownership (TanStack Query vs Zustand), and naming conventions. Use before creating any new file or folder, adding a feature, an API endpoint, a store, or when unsure where code belongs.
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

## Checklist for a new feature

1. Create `src/features/<feature>/` with `index.ts`.
2. If it calls the backend, add the endpoint in `src/api/<domain>/` first, then a query hook in `features/<feature>/hooks/`.
3. If it owns a screen, follow the `screens` skill and add a thin route in `src/app/`.
4. Run `npm run typecheck` and `npm run lint`.
