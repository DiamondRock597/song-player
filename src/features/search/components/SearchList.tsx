import type { ListRenderItem } from '@shopify/flash-list';
import { memo, useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { List, Spinner } from '@/components';
import { SongListItem, SongSectionHeader } from '@/features/songs';
import { spacing } from '@/theme';

import { getSearchRowCoverUrl, getSearchRowType, type SearchRow } from '../search-rows';
import type { SearchResultsState } from '../types';
import { SearchStatus } from './SearchStatus';

const HISTORY_TITLE = 'Search History';
const SONGS_TITLE = 'Songs';
const END_REACHED_THRESHOLD = 0.5;
const PAGE_SPINNER_SIZE = 16;

const keyExtractor = (row: SearchRow) => row.key;

type SearchListProps = {
  rows: readonly SearchRow[];
  resultsState: SearchResultsState;
  isFetchingNextPage: boolean;
  onEndReached: () => void;
  /** Press on any song row (history or result), called with the clip id. */
  onPressRow: (clipId: string) => void;
  /** `>` on any song row: opens the actions sheet, called with the clip id. */
  onPressMore: (clipId: string) => void;
  onClearHistory: () => void;
  onRetry: () => void;
};

// Figma `container` > `box` > `list`: 20pt side padding. History and results share one list;
// song rows are the Songs list rows with `>` (opens the actions) instead of `⋯`.
export const SearchList = memo(
  ({
    rows,
    resultsState,
    isFetchingNextPage,
    onEndReached,
    onPressRow,
    onPressMore,
    onClearHistory,
    onRetry,
  }: SearchListProps) => {
    const renderItem: ListRenderItem<SearchRow> = useCallback(
      ({ item }) => {
        switch (item.type) {
          case 'history-header':
            return (
              <View style={styles.historyHeader}>
                <SongSectionHeader
                  title={HISTORY_TITLE}
                  actionIcon="trash-04"
                  actionLabel="Clear search history"
                  onPressAction={onClearHistory}
                />
              </View>
            );
          case 'songs-header':
            return <SongSectionHeader title={SONGS_TITLE} />;
          default:
            return (
              <SongListItem
                row={item}
                trailing="chevron"
                onPressClip={onPressRow}
                onPressPending={onPressRow}
                onPressMore={onPressMore}
              />
            );
        }
      },
      [onPressRow, onPressMore, onClearHistory],
    );

    const footer = useMemo(() => {
      if (resultsState !== 'ready') return <SearchStatus state={resultsState} onRetry={onRetry} />;
      if (isFetchingNextPage) {
        return (
          <View style={styles.pageSpinner}>
            <Spinner size={PAGE_SPINNER_SIZE} />
          </View>
        );
      }
      return null;
    }, [resultsState, isFetchingNextPage, onRetry]);

    return (
      <List
        data={rows}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemType={getSearchRowType}
        getImageUrl={getSearchRowCoverUrl}
        onEndReached={onEndReached}
        onEndReachedThreshold={END_REACHED_THRESHOLD}
        ListFooterComponent={footer}
        keyboardDismissMode="on-drag"
        // A row tap works on the first touch while the keyboard is open.
        keyboardShouldPersistTaps="handled"
        style={styles.list}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      />
    );
  },
);

SearchList.displayName = 'SearchList';

const styles = StyleSheet.create({
  // The screen's KeyboardDock shrinks the list above the keyboard, so no keyboard insets here.
  list: { flex: 1 },
  content: { paddingHorizontal: spacing[5], paddingBottom: spacing[2] },
  // Figma: the history rows start 4pt under the header (36 vs the header's 32).
  historyHeader: { paddingBottom: spacing[1] },
  pageSpinner: {
    alignItems: 'center',
    paddingVertical: spacing[4],
  },
});
