import { useInfiniteQuery, useQueryClient, type InfiniteData } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

import type { GenerationsPage } from '../api/songs-api';
import type { Clip } from '../types';
import { songsListQueryOptions } from './use-songs-query';

export const findClip = (pages: readonly GenerationsPage[], clipId: string): Clip | undefined => {
  for (const page of pages) {
    for (const generation of page.items) {
      const clip = (generation.clips as Clip[]).find((item) => item.id === clipId);
      if (clip) return clip;
    }
  }
  return undefined;
};

// Reads one clip from the songs cache; never fetches on its own.
// Looks in the list first (reactive), then in any cached search results, since a clip
// opened from search may sit on a list page that has not been loaded yet.
export const useClip = (clipId: string | null): Clip | undefined => {
  const queryClient = useQueryClient();

  const selectClip = useCallback(
    (data: InfiniteData<GenerationsPage>) => (clipId ? findClip(data.pages, clipId) : undefined),
    [clipId],
  );

  const { data: listClip } = useInfiniteQuery({
    ...songsListQueryOptions,
    select: selectClip,
    enabled: false,
  });

  const searchClip = useMemo(() => {
    if (!clipId || listClip) return undefined;
    const cached = queryClient.getQueriesData<InfiniteData<GenerationsPage>>({
      queryKey: ['songs', 'search'],
    });
    for (const [, data] of cached) {
      const clip = data ? findClip(data.pages, clipId) : undefined;
      if (clip) return clip;
    }
    return undefined;
  }, [clipId, listClip, queryClient]);

  return listClip ?? searchClip;
};
