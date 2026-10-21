import { useCallback, useMemo, useState } from 'react';

import { useSongActionsStore } from '@/core/song-actions';

import { DEFAULT_SONG_FILTER, isSongFilterKey, SONG_FILTERS } from './filters';
import { useSongsQuery } from './hooks/use-songs-query';
import { flattenPages, type SongRow } from './song-rows';
import type { SongFilterKey } from './types';

const EMPTY_ROWS: readonly SongRow[] = [];

// All Songs screen logic lives here: data hooks, player bindings, handlers.
// SongsScreen.tsx only renders what this hook returns.
export const useSongsScreen = () => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useSongsQuery();
  const openActions = useSongActionsStore((s) => s.open);
  const [selectedFilter, setSelectedFilter] = useState<SongFilterKey>(DEFAULT_SONG_FILTER);

  const rows = useMemo(() => (data ? flattenPages(data.pages) : EMPTY_ROWS), [data]);

  const onEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) void fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // TODO: tapping a clip plays it (spec); until the player is wired it opens the actions sheet.
  const onPressClip = useCallback((clipId: string) => openActions(clipId), [openActions]);
  const onPressClipMore = useCallback((clipId: string) => openActions(clipId), [openActions]);

  // Placeholders: the search view is planned separately; `+` is visual only.
  const onPressSearch = useCallback(() => {}, []);
  const onPressCreate = useCallback(() => {}, []);

  const onSelectFilter = useCallback((key: string) => {
    if (isSongFilterKey(key)) setSelectedFilter(key);
  }, []);

  return {
    rows,
    filters: SONG_FILTERS,
    selectedFilter,
    onSelectFilter,
    onEndReached,
    onPressClip,
    onPressClipMore,
    onPressSearch,
    onPressCreate,
  };
};
