import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getSongsByIds } from '../api';
import { SONGS_BY_IDS_KEY } from '../constants';

// Keeps the previous list while a changed id list loads, so adding an id doesn't blank the rows.
export const useSongsByIds = (ids: readonly string[]) => {
  return useQuery({
    queryKey: [...SONGS_BY_IDS_KEY, ids],
    queryFn: ({ signal }) => getSongsByIds({ ids }, { signal }),
    enabled: ids.length > 0,
    staleTime: Infinity,
    placeholderData: keepPreviousData,
  });
};
