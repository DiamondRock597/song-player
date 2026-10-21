import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { fetchGenerationsPage, type GenerationsCursor } from '../api';
import { DEBOUNCE_MS, PAGE_LIMIT } from '../constants';

export const useSongsSearch = (input: string) => {
  const [debouncedQuery, setDebouncedQuery] = useState(() => input.trim());

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(input.trim()), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [input]);

  const query = useInfiniteQuery({
    queryKey: ['songs', 'search', debouncedQuery.toLowerCase()],
    queryFn: ({ pageParam, signal }) =>
      fetchGenerationsPage({ cursor: pageParam, limit: PAGE_LIMIT, query: debouncedQuery }, { signal }),
    initialPageParam: 0 as GenerationsCursor,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled: debouncedQuery.length > 0,
    staleTime: Infinity,
    // Old results stay on screen (isPlaceholderData) until the new query's first page arrives.
    placeholderData: keepPreviousData,
  });

  return {
    ...query,
    debouncedQuery,
    isDebouncing: input.trim() !== debouncedQuery,
  };
};
