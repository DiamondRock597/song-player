import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';

import { fetchGenerationsPage, type GenerationsCursor } from '../api/songs-api';

export const PAGE_LIMIT = 20;

// Shared by useSongsQuery and useClip so both observe the same cache entry.
export const songsListQueryOptions = infiniteQueryOptions({
  queryKey: ['songs', 'list'],
  queryFn: ({ pageParam, signal }) =>
    fetchGenerationsPage({ cursor: pageParam, limit: PAGE_LIMIT }, { signal }),
  initialPageParam: 0 as GenerationsCursor,
  getNextPageParam: (lastPage) => lastPage.nextCursor,
  // songs.json never changes.
  staleTime: Infinity,
});

export const useSongsQuery = () => {
  return useInfiniteQuery(songsListQueryOptions);
};
