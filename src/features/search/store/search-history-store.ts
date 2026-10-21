import { create } from 'zustand';

// Mock history (TEST_TASK allows it): three completed clips from songs.json, newest first.
const MOCK_HISTORY_CLIP_IDS: readonly string[] = ['clip_000_1', 'clip_001_2', 'clip_002_1'];

type SearchHistoryState = {
  // Only ids: the songs themselves are resolved through `useSongsByIds`. In memory, lost on restart.
  clipIds: readonly string[];
  /** Moves the clip to the front (newest first, no duplicates). */
  add: (clipId: string) => void;
  clear: () => void;
};

export const useSearchHistoryStore = create<SearchHistoryState>()((set) => ({
  clipIds: MOCK_HISTORY_CLIP_IDS,
  add: (clipId) =>
    set((state) =>
      state.clipIds[0] === clipId ? state : { clipIds: [clipId, ...state.clipIds.filter((id) => id !== clipId)] },
    ),
  clear: () => set({ clipIds: [] }),
}));
