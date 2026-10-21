import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';

import { playTrack, useIsPlayerVisible, type Track } from '@/core/player';
import { useSongActionsStore } from '@/core/song-actions';
import { MINI_PLAYER_HEIGHT } from '@/features/player';

import { DEFAULT_SONG_FILTER, isSongFilterKey, SONG_FILTERS } from './filters';
import { findClip } from './hooks/use-clip';
import { songsListQueryOptions, useSongsQuery } from './hooks/use-songs-query';
import { flattenPages, type SongRow } from './song-rows';
import type { CompletedClip, SongFilterKey } from './types';

const EMPTY_ROWS: readonly SongRow[] = [];

const toTrack = (clip: CompletedClip): Track => ({
  id: clip.id,
  title: clip.title,
  audioUrl: clip.audioUrl,
  imageUrl: clip.coverUrl,
  variant: clip.variant,
});

// All Songs screen logic lives here: data hooks, player bindings, handlers.
// SongsScreen.tsx only renders what this hook returns.
export const useSongsScreen = () => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useSongsQuery();
  const queryClient = useQueryClient();
  const openActions = useSongActionsStore((s) => s.open);
  const isPlayerVisible = useIsPlayerVisible();
  const [selectedFilter, setSelectedFilter] = useState<SongFilterKey>(DEFAULT_SONG_FILTER);

  const rows = useMemo(() => (data ? flattenPages(data.pages) : EMPTY_ROWS), [data]);

  const onEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) void fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Row press on a completed clip: play it (toggles if it's the current track, switches otherwise).
  // The clip is read from the cache at press time, so the callback stays stable across pages.
  const onPressClip = useCallback(
    (clipId: string) => {
      const data = queryClient.getQueryData(songsListQueryOptions.queryKey);
      const clip = data ? findClip(data.pages, clipId) : undefined;
      if (clip && clip.audioUrl !== null) playTrack(toTrack(clip));
    },
    [queryClient],
  );
  // `⋯` (and the press on in-progress / failed rows): open the actions sheet, never play.
  const onPressClipMore = useCallback((clipId: string) => openActions(clipId), [openActions]);

  // Placeholders: the search view is planned separately; `+` is visual only.
  const onPressSearch = useCallback(() => {}, []);
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
