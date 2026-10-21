# Songer: Mobile Test Task

Build the **Songs** screen of the Songer app in **Expo (TypeScript)** with AI coding agents (**Claude Code** and/or **Codex CLI**).

This role owns an AI-driven mobile development process. We expect agents to write most of the code, and we expect you to step in by hand wherever that's faster, such as styling tweaks. You decide when to prompt and when to code. **How you prompt and how you set up the project for agents matter as much as the result.**

**We're hiring a senior engineer who uses AI as a tool to move faster, not a vibe-coder.** Prompts like "make a very optimized version of X" tell us nothing. We want to see your engineering in your prompts: the approach, architecture, libraries, data flow and trade-offs you choose, given to the agent as clear implementation instructions. The agent should be carrying out your decisions, not making them for you.

- **Design:** the attached `.fig` file. Import it into Figma.
- **Data:** `songs.json` (attached)

**Confidentiality.** All data in this test task is strictly confidential. That covers this brief, the design file, `songs.json`, and the audio and images it links to. **By starting work on the task, you agree to:**
- never share any of this data with anyone;
- remove it from your devices once you finish working on the task;
- keep the GitHub repo private, and delete it once we've told you our decision.

**Payment.** The test task is paid **US$200**. It is paid only if you are not hired as a mobile developer.

---

## 1. Setup

1. Put `CLAUDE.md`, `AGENTS.md` and `songs.json` in the **root** of your project. You can work in this folder as it is or start a new one.
2. Use git and commit as you go. We read the history.

`CLAUDE.md` (Claude Code) and `AGENTS.md` (Codex) tell the agent to append **every prompt you write** to `PROMPTS.md`, word for word. This log is one of the main things we review. Don't edit it, and don't remove that rule.

## 2. What to build

One screen, pixel-perfect to the Figma file, plus its overlays.

**Songs list**
- `songs.json` holds **976 songs**. They are grouped into generations, and each generation has **2 variants** (`1` and `2`). Each generation sits under its date header.
- Treat `songs.json` as a remote backend. Read it only through a paginated API layer that simulates real network latency.
- The list must feel endless. We're looking for the most seamless experience: the user should never feel they are waiting for content.
- Handle every generation state:
  - `in_progress` at the top, shown as "New in progress" with a spinner and a progress bar. Nothing is generated for real; this is styling only.
  - `error` shown with the error badge and message.
  - `completed` as a normal playable clip.

**Playback**
- Tapping a clip plays it. Only one track plays at a time. Rows show play/pause state.
- A **global player** appears at the bottom of the screen, directly above the bottom tab bar (Create / Songs / Lyrics / Account). It shows the current track, its progress, and play/pause. Tapping another clip switches the track.

**Actions sheet**
- Tapping the global player (anywhere except its play button) or a row's `⋯` opens the actions bottom sheet.
- The sheet closes by dragging it down or tapping ✕. The actions themselves are visual only.

**Search**
- The search icon opens the search view, which filters songs by title as you type and has a clear (✕) button.
- Search history can be mock data.

**Visual only (no logic needed)**
- The filter chips (Songs / Folders / Favorites / Archive) scroll horizontally and have a selected state.
- The `+` button, the filter icon and the tab bar are also visual only.

## 3. AI setup (required)

- **Project memory:** extend `CLAUDE.md` / `AGENTS.md` with whatever an agent should know to work well in this codebase. Keep it lean.
- **Skills:** create **at least 2 project skills** that would help an agent build the rest of this app after this screen. Put them where your agent loads project skills from.

## 4. Submit

- A **private** GitHub repo with full commit history. Invite **`FrozenGod`** as a collaborator. The repo must include `PROMPTS.md`, the skills and the memory files.
- A short `README.md` that explains how to run the app and the key decisions you made.
- A screen recording (iOS or Android) showing every state: in progress, error, playing, paused, switching tracks, a long scroll, the actions sheet, and search.

## What we evaluate

1. **Prompting:** whether your prompts are engineering instructions or wishes, plus clarity, context, scoping, and how you correct the agent (`PROMPTS.md`).
2. **AI structure:** quality of the skills and the project memory.
3. **Code structure:** folders, components, state, and how easy it is to extend.
4. **Pixel accuracy** against Figma.
5. **Performance and UX at scale:** scrolling and loading nearly 1,000 songs, playback, and memory and network usage.
6. **State handling:** generation states and player states.
