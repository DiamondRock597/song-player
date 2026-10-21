import { create } from 'zustand';

import { MOCK_HISTORY_CLIP_IDS } from '../constants';

type SearchHistoryState = {
  clipIds: readonly string[];
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
