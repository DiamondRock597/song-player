import type { ListRenderItem } from '@shopify/flash-list';
import { memo, useCallback, useMemo, type FC } from 'react';
import { View } from 'react-native';

import { List, Spinner } from '@/components';
import { SongListItem, SongSectionHeader } from '@/features/songs';

import { END_REACHED_THRESHOLD, HISTORY_TITLE, PAGE_SPINNER_SIZE, SONGS_TITLE } from '../../constants';
import { getSearchRowCoverUrl, getSearchRowType, type SearchRow } from '../../search-rows';
import type { SearchResultsState } from '../../types';
import { styles } from './SearchList.styles';
import { SearchStatus } from '../SearchStatus';

const keyExtractor = (row: SearchRow) => row.key;

type SearchListProps = {
  rows: readonly SearchRow[];
  resultsState: SearchResultsState;
  isFetchingNextPage: boolean;
  onEndReached: () => void;
  onPressRow: (clipId: string) => void;
  onPressMore: (clipId: string) => void;
  onClearHistory: () => void;
  onRetry: () => void;
};

export const SearchList: FC<SearchListProps> = memo(
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
      if (resultsState !== 'ready') {
        return <SearchStatus state={resultsState} onRetry={onRetry} />;
      }
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
