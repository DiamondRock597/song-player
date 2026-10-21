import { router } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';

import { useIsPlayerVisible } from '@/core/player';
import { useSongActionsStore } from '@/core/song-actions';
import { MINI_PLAYER_HEIGHT } from '@/features/player';

import { DEFAULT_SONG_FILTER, isSongFilterKey, SONG_FILTERS } from './filters';
import { usePlayClip, useSongsQuery } from './hooks';
import { flattenPages, type SongRow } from './song-rows';
import type { SongFilterKey } from './types';

const EMPTY_ROWS: readonly SongRow[] = [];

export const useSongsScreen = () => {
  const { data, hasNextPage, hasPreviousPage, isFetching, fetchNextPage, fetchPreviousPage } = useSongsQuery();
  const openActions = useSongActionsStore((s) => s.open);
  const isPlayerVisible = useIsPlayerVisible();
  const [selectedFilter, setSelectedFilter] = useState<SongFilterKey>(DEFAULT_SONG_FILTER);

  const rows = useMemo(() => (data ? flattenPages(data.pages) : EMPTY_ROWS), [data]);

  // One fetch at a time: fetchNextPage cancels an in-flight fetchPreviousPage and vice versa.
  const onEndReached = useCallback(() => {
    if (hasNextPage && !isFetching) {
      void fetchNextPage();
    }
  }, [hasNextPage, isFetching, fetchNextPage]);

  // Pages above the window were dropped by `maxPages`; load them back when the user scrolls up.
  const onStartReached = useCallback(() => {
    if (hasPreviousPage && !isFetching) {
      void fetchPreviousPage();
    }
  }, [hasPreviousPage, isFetching, fetchPreviousPage]);

  const onPressClip = usePlayClip();
  const onPressClipMore = useCallback((clipId: string) => openActions(clipId), [openActions]);

  const onPressSearch = useCallback(() => router.push('/search'), []);
  const onPressCreate = useCallback(() => {}, []);

  const onSelectFilter = useCallback((key: string) => {
    if (isSongFilterKey(key)) {
      setSelectedFilter(key);
    }
  }, []);

  return {
    rows,
    playerInset: isPlayerVisible ? MINI_PLAYER_HEIGHT : 0,
    filters: SONG_FILTERS,
    selectedFilter,
    onSelectFilter,
    onEndReached,
    onStartReached,
    onPressClip,
    onPressClipMore,
    onPressSearch,
    onPressCreate,
  };
};
