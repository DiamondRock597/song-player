---
name: screens
description: How to add or change a screen in the Songer app — the presentational Screen + useScreen hook pattern, thin Expo Router route files, tab/overlay registration, and the catalog of existing screens. Use when creating a new screen, route, tab, modal or bottom-sheet overlay.
---

# Screens

## Pattern

Every screen is two files inside its feature folder:

```
features/<feature>/
├── <Name>Screen.tsx     # Renders JSX only
└── use<Name>Screen.ts   # All logic: queries, stores, handlers, derived data
```

```tsx
// features/songs/SongsScreen.tsx
export const SongsScreen = () => {
  const { sections, onEndReached, onPressClip } = useSongsScreen();
  return <SongsList data={sections} onEndReached={onEndReached} onPressClip={onPressClip} />;
};
```

Rules:

- The screen component calls exactly one logic hook, `use<Name>Screen`. Layout-only hooks (`useSafeAreaInsets`) are allowed too.
- No `useState`, `useQuery`, store access or `useCallback` in `<Name>Screen.tsx`. Put them in the hook.
- The hook returns ready-to-render values and stable callbacks (`useCallback`), so memoized list rows don't re-render.
- Sub-components used only by this screen go in `features/<feature>/components/`.
- Export the screen from the feature's `index.ts`.

## Routes

Route files in `src/app/` are thin and default-export the screen:

```tsx
// src/app/(tabs)/index.tsx
import { SongsScreen } from '@/features/songs';

export default SongsScreen;
```

- Tabs: add the file to `src/app/(tabs)/` and a `<Tabs.Screen name=... />` entry in `(tabs)/_layout.tsx`, in design order.
- Stack screens / modals: add the file to `src/app/` (or a group), and set its presentation in the nearest `_layout.tsx`.
- Not implemented yet: render `PlaceholderScreen` from `@/components` directly in the route file.

## Overlays (not routes)

Global overlays that sit over the tabs aren't routes:

- **Mini player** (above the tab bar): feature `player`, mounted once in `(tabs)/_layout.tsx`.
- **Actions sheet**: feature `song-actions`, a `@gorhom/bottom-sheet` `BottomSheetModal` opened through `useSongActionsStore` from `@/core/song-actions` (`useSongActionsStore.getState().open(clipId)` or a narrow selector), mounted once in `(tabs)/_layout.tsx`. `BottomSheetModalProvider` is already in the root layout. Fixed full height (`snapPoints={['100%']}`, `topInset` = safe-area top), content scrolls; backdrop is an `expo-blur` `BlurView` (iOS only, Android falls back to a translucent fill). Never call the modal's `dismiss()` when it isn't presented: it leaves the modal stuck and later `present()` calls do nothing. The clip is read from the songs cache with `useClip(clipId)` from `@/features/songs`. Rows come from `song-actions/actions.ts`.
- **Toasts**: `ToastHost` (`components/toast/`) is mounted once in the root layout, after `BottomSheetModalProvider`, so it draws above sheets. Show one with `showToast(text)` / `showNotImplemented()` from `@/components`; never import `react-native-toast-message` directly.
- **Search**: a screen in feature `search`, pushed over the tabs from the Songs header.

## Catalog

Update this table whenever a screen is added.

| Screen | Feature | Route | Status |
|---|---|---|---|
| `SongsScreen` | `songs` | `(tabs)/index` | In progress — header (title, search/`+` no-ops), filter chips (local selection, mock counts), list (section headers, in-progress / error / completed rows, pagination); every row's press and `⋯` open the actions sheet. Loading/empty/error states, playback and search still to do |
| Create | — | `(tabs)/create` | Placeholder (visual only) |
| Lyrics | — | `(tabs)/lyrics` | Placeholder (visual only) |
| Account | — | `(tabs)/account` | Placeholder (visual only) |
| `SearchScreen` | `search` | TBD | Planned |
| `TabBar` (overlay) | — (`components/tab-bar/`) | `(tabs)/_layout.tsx` via `tabBar={TabBar}` | Done — absolute over content; labels/icons from each `Tabs.Screen`'s `title` + `tabBarIcon`. Screens reserve space with `useBottomTabBarHeight()` from `expo-router/js-tabs` |
| `SongActionsSheet` (overlay) | `song-actions` | `(tabs)/_layout.tsx`, opened via `useSongActionsStore.open(clipId)` (`@/core/song-actions`) | Done: header + 6 action cards, every action toasts "Not implemented yet". Opened from any row's press and `⋯` in `SongsScreen` |
