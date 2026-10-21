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
