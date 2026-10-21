import { router } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';

import { useIsPlayerVisible } from '@/core/player';
import { useSongActionsStore } from '@/core/song-actions';
import { MINI_PLAYER_HEIGHT } from '@/features/player';

import { DEFAULT_SONG_FILTER, isSongFilterKey, SONG_FILTERS } from './filters';
import { usePlayClip } from './hooks/use-play-clip';
import { useSongsQuery } from './hooks/use-songs-query';
import { flattenPages, type SongRow } from './song-rows';
import type { SongFilterKey } from './types';

const EMPTY_ROWS: readonly SongRow[] = [];

// All Songs screen logic lives here: data hooks, player bindings, handlers.
// SongsScreen.tsx only renders what this hook returns.
export const useSongsScreen = () => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useSongsQuery();
  const openActions = useSongActionsStore((s) => s.open);
  const isPlayerVisible = useIsPlayerVisible();
  const [selectedFilter, setSelectedFilter] = useState<SongFilterKey>(DEFAULT_SONG_FILTER);

  const rows = useMemo(() => (data ? flattenPages(data.pages) : EMPTY_ROWS), [data]);

  const onEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) void fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Row press on a completed clip: play it (toggles if it's the current track, switches otherwise).
  // Shared with Search, so both lists behave the same.
  const onPressClip = usePlayClip();
  // `⋯` (and the press on in-progress / failed rows): open the actions sheet, never play.
  const onPressClipMore = useCallback((clipId: string) => openActions(clipId), [openActions]);

  // Search is a root-stack route pushed over the tabs (no tab bar, no mini player).
  const onPressSearch = useCallback(() => router.push('/search'), []);
  // Placeholder: `+` is visual only.
  const onPressCreate = useCallback(() => {}, []);

  const onSelectFilter = useCallback((key: string) => {
    if (isSongFilterKey(key)) setSelectedFilter(key);
  }, []);

  return {
    rows,
    // Extra space under the list while the mini player sits above the tab bar.
    playerInset: isPlayerVisible ? MINI_PLAYER_HEIGHT : 0,
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
