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

// The clip is read from the cache at press time, so the callback stays stable across pages.
export const usePlayClip = () => {
  const queryClient = useQueryClient();

  return useCallback(
    (clipId: string) => {
      const clip = findCachedClip(queryClient, clipId);
      if (clip && clip.audioUrl !== null) {
        playTrack(toTrack(clip));
      }
    },
    [queryClient],
  );
};
