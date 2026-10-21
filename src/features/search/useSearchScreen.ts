import { router } from 'expo-router';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Keyboard, type TextInputInstance } from 'react-native';

import { useSongActionsStore } from '@/core/song-actions';
import { usePlayClip, useSongsByIds, useSongsSearch } from '@/features/songs';

import { EMPTY_ITEMS, EMPTY_ROWS, HISTORY_HEADER_ROW, SONGS_HEADER_ROW } from './constants';
import { toHistoryRows, toResultRows, type SearchRow } from './search-rows';
import { useSearchHistoryStore } from './store';
import type { SearchResultsState } from './types';

export const useSearchScreen = () => {
  const inputRef = useRef<TextInputInstance>(null);
  const [input, setInput] = useState('');

  const { data, isError, hasNextPage, isFetchingNextPage, isPlaceholderData, fetchNextPage, refetch } =
    useSongsSearch(input);

  const historyIds = useSearchHistoryStore((s) => s.clipIds);
  const addToHistory = useSearchHistoryStore((s) => s.add);
  const clearHistory = useSearchHistoryStore((s) => s.clear);
  const { data: historySongs } = useSongsByIds(historyIds);

  const playClip = usePlayClip();
  const openActions = useSongActionsStore((s) => s.open);

  const showsHistory = input.trim().length === 0;

  const resultRows = useMemo(() => (data ? toResultRows(data.pages) : EMPTY_ITEMS), [data]);
  const historyRows = useMemo(() => (historySongs ? toHistoryRows(historySongs) : EMPTY_ITEMS), [historySongs]);

  const rows = useMemo((): readonly SearchRow[] => {
    if (showsHistory) {
      return historyIds.length > 0 ? [HISTORY_HEADER_ROW, ...historyRows] : EMPTY_ROWS;
    }
    return [SONGS_HEADER_ROW, ...resultRows];
  }, [showsHistory, historyIds.length, historyRows, resultRows]);

  // `data` includes the previous query's results (keepPreviousData), so there is nothing to show
  // only before the first search has answered: that is the one time the spinner appears.
  let resultsState: SearchResultsState = 'ready';
  if (!showsHistory) {
    if (data) {
      resultsState = resultRows.length === 0 ? 'empty' : 'ready';
    } else {
      resultsState = isError ? 'error' : 'loading';
    }
  }

  const onEndReached = useCallback(() => {
    // Placeholder pages belong to the previous query; wait for the new first page.
    if (!showsHistory && hasNextPage && !isFetchingNextPage && !isPlaceholderData) {
      void fetchNextPage();
    }
  }, [showsHistory, hasNextPage, isFetchingNextPage, isPlaceholderData, fetchNextPage]);

  // `clear()` doesn't fire onChangeText. The input keeps focus, so the keyboard stays open.
  const onClear = useCallback(() => {
    inputRef.current?.clear();
    setInput('');
  }, []);

  const onPressRow = useCallback(
    (clipId: string) => {
      addToHistory(clipId);
      playClip(clipId);
    },
    [addToHistory, playClip],
  );

  // The sheet is global (rendered through the root portal, above this route); the keyboard goes
  // down first so it doesn't cover the sheet.
  const onPressMore = useCallback(
    (clipId: string) => {
      Keyboard.dismiss();
      openActions(clipId);
    },
    [openActions],
  );

  const onPressBack = useCallback(() => router.back(), []);
  const onRetry = useCallback(() => void refetch(), [refetch]);

  return {
    inputRef,
    hasText: input.length > 0,
    rows,
    resultsState,
    isFetchingNextPage: !showsHistory && isFetchingNextPage,
    onChangeText: setInput,
    onClear,
    onPressBack,
    onEndReached,
    onPressRow,
    onPressMore,
    onClearHistory: clearHistory,
    onRetry,
  };
};
