import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';

import { fetchGenerationsPage, type GenerationsCursor } from '../api';

export const PAGE_LIMIT = 20;
const MAX_PAGES = 10;

export const songsListQueryOptions = infiniteQueryOptions({
  queryKey: ['songs', 'list'],
  queryFn: ({ pageParam, signal }) =>
    fetchGenerationsPage({ cursor: pageParam, limit: PAGE_LIMIT }, { signal }),
  initialPageParam: 0 as GenerationsCursor,
  getNextPageParam: (lastPage) => lastPage.nextCursor,
  // The first page of the window starts at `firstPageParam`, so the page before it is one limit back.
  getPreviousPageParam: (_firstPage, _pages, firstPageParam) =>
    firstPageParam > 0 ? Math.max(0, firstPageParam - PAGE_LIMIT) : undefined,
  maxPages: MAX_PAGES,
  staleTime: Infinity,
});

export const useSongsQuery = () => {
  return useInfiniteQuery(songsListQueryOptions);
};
