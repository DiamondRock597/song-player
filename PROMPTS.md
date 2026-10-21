### 2026-10-21 13:55 · Claude Code
Check @TEST_TASK.md , describe what metrics I should follow, how task is reviewing, and about what I should implement

---
### 2026-10-21 14:00 · Claude Code
Let's start from plan what libraires i should use

TypeScript and expo, for animationd i will choose reanimated and gorhom bottom sheet, for list I will take flash list, about state management and api call make suggestion

---
### 2026-10-21 15:06 · Claude Code
Install expo & typescirpt Make basic setup with these library, feature sliced folder structure, where we have default components, features, api, utils folders. Make skills regarding folder structure like @.claude/skills/architecture/SKILL.md  @.claude/skills/screens/SKILL.md

---
### 2026-10-21 15:44 · Claude Code
make the agent @.claude/  what takes the screen design and requirements and make the screen related to all @.claude/skills/

---
### 2026-10-21 22:36 · Claude Code
Using screen builder make the plan related to this figma screen, for now without bottom bar and any requests only ui
https://www.figma.com/design/4R64V2kqls5Wcb5H0bHu44/mockup?node-id=1-3080&t=gtycLHWxK9crDqNm-0

---
### 2026-10-21 22:37 · Claude Code
Make ui for bottom bar take all stuff with codestyle from @.claude/agents/screen-builder.md 
With active/unactive styles

https://www.figma.com/design/4R64V2kqls5Wcb5H0bHu44/mockup?node-id=1-3131&t=gtycLHWxK9crDqNm-0

---
### 2026-10-21 22:40 · Claude Code
Build typed registry-driven component in the same style as src/components/Icon/:

- types.ts: import every asset (SVG) once, export a `const xMap = { 'kebab-name': Component, ... } satisfies Record<string, FC<SvgProps>>` and derive the name union with `export type TX = keyof typeof xMap` — the map is the single source of truth, no hand-written union.
- X.tsx: a `memo`-wrapped component with props `{ name: TX; size?: number } & SvgProps`. Look up `xMap[name]`, render it with `width={width ?? size} height={height ?? size}` plus `...rest` (explicit width/height override `size` for non-square assets), return `null` if the name is unknown. Default size as a named constant.
- index.ts: re-export only the component, its props type, and `TX`.
- Keys are kebab-case matching the asset file names, sorted alphabetically; adding an item = one import + one map entry, nothing else.


Add it to skills and rules

---
### 2026-10-21 22:45 · Claude Code
Install react-native-svg and react-native-svg-transformer  and make the Icon component related to apporch, no matter if we don't have svg files for now

---
### 2026-10-21 22:53 · Claude Code
Add the audio layer with expo-audio.

- `src/core/player/player-service.ts`: ONE app-wide player created with `createAudioPlayer()` at module level (not the hook). Export `playTrack(track)`, `togglePlay()` and `seekTo(sec)`. `playTrack` calls `player.replace({ uri })` then `play()`. If the track is already current, it toggles instead. Never create a second player.

---
### 2026-10-21 22:58 · Claude Code
Make also store structure for player with zustand

- Define Track in @src/core/player/ with the fields we need from songs.json: id, title, audioUrl, imageUrl. Reuse the existing song types if they exist. Do not duplicate them.
- @src/core/player/ player-store.ts : `currentTrack`, `status` ('idle' | 'loading' | 'playing' | 'paused' | 'error'), `positionSec`, `durationSec`. Only the service writes to it. Feed it from one `playbackStatusUpdate` listener. Throttle progress writes to ~4/s. On `didJustFinish`, set paused and reset the position.
- Export selector (a boolean selector, so rows don't re-render on progress) and selector for the global player.
- Export initAudio that calls `setAudioMode({ playsInSilentMode: true })`.

---
### 2026-10-21 23:05 · Claude Code
@songs.json . Define types for objects in json file @src/features/songs/types

---
### 2026-10-21 23:09 · Claude Code
- @src/features/songs/songs-api.ts: fetchGenerationsPage({ cursor, limit }) is the only code that imports @songs.json . It paginates by whole generations, so variants 1 and 2 never split across pages. It awaits a random delay of 300–600 ms and returns `{ items, nextCursor }`, with `nextCursor` null on the last page. Keep the cursor an opaque value (the offset).
- @src/features/songs/use-songs-query.ts: useInfiniteQuery with initialPageParam and getNextPageParam from nextCursor. Use staleTime: Infinity (the data is static) and a `limit` of 20.

---
### 2026-10-21 23:11 · Claude Code
Add a pure flattenPages(pages) helper that turns pages into a flat list of rows: date header, generation or clip, and the in_progress row. Also add getRowType, so FlashList can use it for getItemType. Date headers are derived from the generation date. Group by calendar day.
Create Search in  separate hook, use-songs-search.ts. Filter by title, case-insensitive, through the same API layer: `fetchGenerationsPage` takes an optional `query`. Debounce the input by 250 ms in the hook.
Make folder for @src/features/songs/hooks and @src/features/songs/api

---
### 2026-10-21 23:12 · Claude Code
Also using for simulation of request @src/api/client.ts

---
### 2026-10-21 23:13 · Claude Code
And don't use function definition, use arrow function in whole project

---
### 2026-10-21 23:25 · Claude Code
Build the bottom tab bar from Figma node 1:3131 (360×56). Use the plan you proposed, with these decisions:

- Fonts: bundle Inter Medium and SemiBold as .ttf files and load them with expo-font.
- Colours: use the Figma variable values (grey #6E6E6E, yellow #FCB600). Ignore the other values, such as #848484.
- Active icon: check the variants of the tab component in Figma. If the active tab uses a filled icon, give each icon a `filled` prop. If the active state only changes colour, don't add the prop.
- Blur: don't add it
- Layout: position the bar absolutely over the content. Add the bottom safe-area inset below the 56pt.
- Tokens: src/theme/ holds colour, spacing, type and blur/shadow tokens, named after the Figma variables. Never hardcode these values in components.
- Structure: add `react-native-svg`. The four icons are `src/components/icons/*` and take a `color` prop. Put `tab-bar.tsx` and a memoized `tab-bar-item.tsx` in @src/app/(tabs)/_layout.tsx  They read the title and icon from the route options. Wire it in through `tabBar={TabBar}` in @src/app/(tabs)/_layout.tsx  Use kebab-case file names.
- Accessibility: use the tab role, selected state and a label on each tab. Each tab is 80×56.
- Don't touch userInterfaceStyle in @app.json

---

### 2026-10-21 23:29 · Claude Code
Make a plan with @.claude/agents/screen-builder.md  to implement the details of song, using gorhom/bottom sheet.

Rules: 
Any buttons should  call Toast "Not implemented yet"
Sheet should have dynamic size it should depends on content

https://www.figma.com/design/4R64V2kqls5Wcb5H0bHu44/mockup?node-id=1-5409&t=gtycLHWxK9crDqNm-0

---
### 2026-10-21 23:36 · Claude Code
Active icon: I didn't add a filled prop, but this isn't confirmed. Figma's tab component lives in an external library the agent couldn't open. The file only shows Songs active, and it has no filled versions of the other icons, so the active state looks like colour only. If the library does swap in filled icons, adding them is a small change.


Make the default color for all icons, and I can add it by color prop in @src/components/icons/icon.tsx


---
### 2026-10-21 23:43 · Claude Code
Fixes what you need to provide for @src/app/(tabs)/_layout.tsx @src/components/tab-bar/tab-bar.tsx @src/components/tab-bar/tab-bar-item.tsx  

- Make only songs enabled screen
- change the color what was in design, because now there is antoher color in screenshot
https://www.figma.com/design/4R64V2kqls5Wcb5H0bHu44/mockup?node-id=1-3080&t=gtycLHWxK9crDqNm-0
- remove any shadow for @src/components/tab-bar/tab-bar.tsx

---
