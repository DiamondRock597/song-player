import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { playTrack, type Track } from '@/core/player';

import type { CompletedClip } from '../types';
import { findCachedClip } from './use-clip';

const toTrack = (clip: CompletedClip): Track => ({
  id: clip.id,
  title: clip.title,
  audioUrl: clip.audioUrl,
  imageUrl: clip.coverUrl,
  variant: clip.variant,
});

// The row press on a completed clip, shared by the Songs list and Search: play it (toggles if it's
// the current track, switches otherwise). Clips with no audio (in progress, failed) are ignored.
// The clip is read from the cache at press time, so the callback stays stable across pages.
export const usePlayClip = () => {
  const queryClient = useQueryClient();

  return useCallback(
    (clipId: string) => {
      const clip = findCachedClip(queryClient, clipId);
      if (clip && clip.audioUrl !== null) playTrack(toTrack(clip));
    },
    [queryClient],
  );
};
