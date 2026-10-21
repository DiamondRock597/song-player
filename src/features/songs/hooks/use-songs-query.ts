import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchGenerationsPage, type GenerationsCursor } from '../api/songs-api';

export const PAGE_LIMIT = 20;

export const useSongsQuery = () => {
  return useInfiniteQuery({
    queryKey: ['songs', 'list'],
    queryFn: ({ pageParam, signal }) =>
      fetchGenerationsPage({ cursor: pageParam, limit: PAGE_LIMIT }, { signal }),
    initialPageParam: 0 as GenerationsCursor,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    // songs.json never changes.
    staleTime: Infinity,
  });
};
