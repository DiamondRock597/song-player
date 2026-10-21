import { create } from 'zustand';

type SongActionsState = {
  // Only the id: the clip itself is read from the songs query cache.
  clipId: string | null;
  open: (clipId: string) => void;
  close: () => void;
};

export const useSongActionsStore = create<SongActionsState>()((set) => ({
  clipId: null,
  open: (clipId) => set({ clipId }),
  close: () => set({ clipId: null }),
}));
