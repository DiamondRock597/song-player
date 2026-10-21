import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

import type { PlayerStatus, Track } from './types';

export type PlayerState = {
  currentTrack: Track | null;
  status: PlayerStatus;
  positionSec: number;
  durationSec: number;
};

export const initialPlayerState: PlayerState = {
  currentTrack: null,
  status: 'idle',
  positionSec: 0,
  durationSec: 0,
};

// No actions on purpose: only player-service writes, via usePlayerStore.setState.
// Not exported from index.ts, so the rest of the app can only read through the hooks below.
export const usePlayerStore = create<PlayerState>()(() => initialPlayerState);

// Boolean per row: re-renders only when this track starts or stops, never on progress.
// 'loading' counts as playing so the row shows its pause state right after a tap.
export const useIsTrackPlaying = (trackId: string): boolean => {
  return usePlayerStore(
    (s) => s.currentTrack?.id === trackId && (s.status === 'playing' || s.status === 'loading'),
  );
};

// Everything the global (mini) player renders. Updates up to ~4/s while playing.
export const useGlobalPlayer = (): PlayerState => {
  return usePlayerStore(
    useShallow((s) => ({
      currentTrack: s.currentTrack,
      status: s.status,
      positionSec: s.positionSec,
      durationSec: s.durationSec,
    })),
  );
};
