# AGENTS.md

## Prompt log (mandatory, never remove this section)

On **every** user message, before doing anything else, append it to `PROMPTS.md` in the repo root (create the file if it is missing):

```
### <YYYY-MM-DD HH:MM> · <Claude Code | Codex>
<the user's message, verbatim>

---
```

- Copy it word for word. Do not summarize, rephrase or fix typos. Short replies like "yes" or "continue" count too.
- For attached images, write `[image attached]`.
- Only append. Never edit, reorder or delete existing entries.
- Get the timestamp with `date "+%Y-%m-%d %H:%M"`.

<!-- Add project knowledge for agents below. -->

## Project

Songer: the Songs screen of a music-generation app. Spec: `TEST_TASK.md`. Design: `mockup.fig`. Data: `songs.json`, which is treated as a remote backend.

## Stack

Expo SDK 58, React Native 0.88, TypeScript (strict), Expo Router, Reanimated 4, @gorhom/bottom-sheet v5, @shopify/flash-list v2, expo-audio, expo-image, TanStack Query v5, Zustand v5.

Expo changes between SDKs. Before you use an Expo API, check the docs for this SDK (`https://docs.expo.dev/versions/v58.0.0/`) instead of relying on memory.

## Commands

```bash
npx expo install <pkg>   # always use this instead of npm install (picks SDK-compatible versions)
npx expo start           # dev server (a dev build is needed for native modules)
npm run typecheck        # tsc --noEmit
npm run lint             # expo lint
```

Run typecheck and lint before calling a task done.

## Rules

- Folder structure, dependency rules, state ownership and naming are in the `architecture` skill. Read it before creating files.
- To add screens, routes or overlays, use the `screens` skill.
- To build a screen from Figma and requirements, delegate to the `screen-builder` agent (`.claude/agents/`). Give it a Figma node, the requirements and the scope.
- Only `src/api/` reads `songs.json`, through paginated endpoints with simulated latency.
- Server data belongs in TanStack Query and client state in Zustand. Never put playback progress in a store.
- Use the typed registry pattern for named SVG sets (icons, logos, illustrations). Start from the "Asset registries" section of the `architecture` skill and copy `src/components/Icon/`. Derive the name union from the map with `keyof typeof xMap`, never write it by hand, and never import a raw SVG outside its registry.
- Never create or edit `ios/` or `android/`. Configure native behaviour through `app.json` and config plugins.
