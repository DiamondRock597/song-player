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

- **Mini player** (above the tab bar): feature `player`, mounted once in `(tabs)/_layout.tsx` through `TabBar`'s `accessory` prop (`useBottomTabBarHeight()` throws outside a screen, so it can't be a sibling of `<Tabs>`). Its height is not in the reported tab bar height: screens add `MINI_PLAYER_HEIGHT` while `useIsPlayerVisible()` is true.
- **Actions sheet**: feature `song-actions`, a `@gorhom/bottom-sheet` `BottomSheetModal` opened through `useSongActionsStore` from `@/core/song-actions` (`useSongActionsStore.getState().open(clipId)` or a narrow selector), mounted once in `(tabs)/_layout.tsx`. `BottomSheetModalProvider` is already in the root layout. Fixed full height (`snapPoints={['100%']}`, `topInset` = safe-area top), content scrolls; backdrop is an `expo-blur` `BlurView` (iOS only, Android falls back to a translucent fill). Never call the modal's `dismiss()` when it isn't presented: it leaves the modal stuck and later `present()` calls do nothing. The clip is read from the songs cache with `useClip(clipId)` from `@/features/songs`. Rows come from `song-actions/actions.ts`.
- **Toasts**: `ToastHost` (`components/toast/`) is mounted once in the root layout, after `BottomSheetModalProvider`, so it draws above sheets. Show one with `showToast(text)` / `showNotImplemented()` from `@/components`; never import `react-native-toast-message` directly.
- **Search** is not an overlay: it is the `search` route in the root stack (`src/app/search.tsx`), pushed from the Songs header with `router.push('/search')`.

## Catalog

Update this table whenever a screen is added.

| Screen | Feature | Route | Status |
|---|---|---|---|
| `SongsScreen` | `songs` | `(tabs)/index` | In progress — header (title, search → `/search`, `+` no-op), filter chips (local selection, mock counts), list (section headers, in-progress / error / completed rows, pagination). A completed row's press plays/toggles/switches the clip (`playTrack`) and shows a pause overlay on its cover while playing; `⋯` (and the press on in-progress/failed rows) opens the actions sheet. The list pads for the mini player while it is visible. The header search icon pushes `/search`. Loading/empty/error states still to do |
| Create | — | `(tabs)/create` | Placeholder (visual only) |
| Lyrics | — | `(tabs)/lyrics` | Placeholder (visual only) |
| Account | — | `(tabs)/account` | Placeholder (visual only) |
| `SearchScreen` | `search` | `search` (root stack, pushed over the tabs: no tab bar; the `MiniPlayer` is docked under the list in a `KeyboardDock` from `@/components`: on top of the keyboard while it is open, above the bottom safe area otherwise; the list shrinks with it) | Done: header (back = `router.back()`, uncontrolled input with autofocus; search icon while empty, ✕ while it has text, ✕ clears and keeps the keyboard). Empty input: "Search history" (in-memory Zustand store of clip ids, seeded with 3 mock ids, resolved via `useSongsByIds`; trash clears it). With text: "Songs" + results from `useSongsSearch` (250 ms debounce, `keepPreviousData`, accent-insensitive in the API), pagination, spinner only before the first answer, empty / error (Retry) states. Rows are `SongListItem` with `trailing="chevron"`; a row tap adds to history and calls the shared `usePlayClip` (the Songs list's `onPressClip`); `>` dismisses the keyboard and opens the actions sheet |
| `TabBar` (overlay) | — (`components/tab-bar/`) | `(tabs)/_layout.tsx` via `tabBar={TabBar}` | Done — absolute over content; labels/icons from each `Tabs.Screen`'s `title` + `tabBarIcon`. Screens reserve space with `useBottomTabBarHeight()` from `expo-router/js-tabs` |
| `SongActionsSheet` (overlay) | `song-actions` | `(tabs)/_layout.tsx`, opened via `useSongActionsStore.open(clipId)` (`@/core/song-actions`) | Done: header + 6 action cards, every action toasts "Not implemented yet". Opened from a row's `⋯` (and in-progress/failed row presses) in `SongsScreen`, a row's `>` in `SearchScreen`, and from the mini player bar. Renders through the root portal, so it draws above the `search` route too; `useClip` also finds clips that are only in the search / history caches |
| `MiniPlayer` (overlay) | `player` | `(tabs)/_layout.tsx` via `TabBar`'s `accessory` slot (stacked directly above the bar, outside every screen) | Done: 2pt progress line (shared value, UI thread), cover with play/pause/spinner/error overlay (play button, disabled on error), title + variant tag, mock subtitle, chevron = `stopAndHide`, rest of the bar opens the actions sheet. Fades/slides in and out. Screens clear it with `MINI_PLAYER_HEIGHT` from `@/features/player` + `useIsPlayerVisible()` from `@/core/player`. Also mounted by `SearchScreen` (in the layout flow, not over content) |
