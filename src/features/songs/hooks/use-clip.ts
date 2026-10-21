import { useInfiniteQuery, useQueryClient, type InfiniteData, type QueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

import type { GenerationsPage, SongById } from '../api/songs-api';
import type { Clip } from '../types';
import { SONGS_BY_IDS_KEY } from './use-songs-by-ids';
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

// Cached search results and id lookups (search history): a clip opened from search may sit on
// a list page that has not been loaded yet.
const findClipOutsideList = (queryClient: QueryClient, clipId: string): Clip | undefined => {
  const searches = queryClient.getQueriesData<InfiniteData<GenerationsPage>>({ queryKey: ['songs', 'search'] });
  for (const [, data] of searches) {
    const clip = data ? findClip(data.pages, clipId) : undefined;
    if (clip) return clip;
  }

  const lookups = queryClient.getQueriesData<SongById[]>({ queryKey: SONGS_BY_IDS_KEY });
  for (const [, data] of lookups) {
    const match = data?.find((item) => item.clipId === clipId);
    const clip = match ? (match.generation.clips as Clip[]).find((item) => item.id === clipId) : undefined;
    if (clip) return clip;
  }

  return undefined;
};

// Non-reactive read for press handlers: the list first, then the other song caches.
export const findCachedClip = (queryClient: QueryClient, clipId: string): Clip | undefined => {
  const list = queryClient.getQueryData(songsListQueryOptions.queryKey);
  return (list ? findClip(list.pages, clipId) : undefined) ?? findClipOutsideList(queryClient, clipId);
};

// Reads one clip from the songs cache; never fetches on its own.
// Looks in the list first (reactive), then in the other song caches (search results, id lookups).
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

  const otherClip = useMemo(() => {
    if (!clipId || listClip) return undefined;
    return findClipOutsideList(queryClient, clipId);
  }, [clipId, listClip, queryClient]);

  return listClip ?? otherClip;
};
