import type { ListRenderItem } from '@shopify/flash-list';
import { memo, useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { List } from '@/components';
import { spacing } from '@/theme';
import { formatSectionDate } from '@/utils';

import { getRowCoverUrl, getRowType, type SongRow as SongListRow } from '../song-rows';
import { SongListItem } from './SongListItem';
import { SongSectionHeader } from './SongSectionHeader';

const IN_PROGRESS_TITLE = 'New in progress';
const END_REACHED_THRESHOLD = 0.5;

const keyExtractor = (row: SongListRow) => row.key;

type SongsListProps = {
  rows: readonly SongListRow[];
  /** Space to keep clear under the last row (e.g. the tab bar). */
  bottomInset: number;
  onEndReached: () => void;
  /** Press on a completed clip row (plays it), called with the clip id. */
  onPressClip: (clipId: string) => void;
  /**
   * `⋯` on any row, and the press on in-progress and failed rows (nothing to play there),
   * called with the clip id (clips[0].id for in-progress and failed rows).
   */
  onPressClipMore: (clipId: string) => void;
};

// Figma `container` > `box` > `list`: 20pt side padding, 8pt bottom padding.
// Rows get primitives only; callbacks take the clip id.
export const SongsList = memo(
  ({ rows, bottomInset, onEndReached, onPressClip, onPressClipMore }: SongsListProps) => {
  const renderItem: ListRenderItem<SongListRow> = useCallback(
    ({ item }) => {
      switch (item.type) {
        case 'in-progress-header':
          return <SongSectionHeader title={IN_PROGRESS_TITLE} />;
        case 'date-header':
          return <SongSectionHeader title={formatSectionDate(item.date)} />;
        default:
          return (
            <SongListItem
              row={item}
              trailing="more"
              onPressClip={onPressClip}
              onPressPending={onPressClipMore}
              onPressMore={onPressClipMore}
            />
          );
      }
    },
    [onPressClip, onPressClipMore],
  );

  const contentContainerStyle = useMemo(
    () => ({ paddingHorizontal: spacing[5], paddingBottom: spacing[2] + bottomInset }),
    [bottomInset],
  );

  return (
    <List
      data={rows}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      getItemType={getRowType}
      getImageUrl={getRowCoverUrl}
      onEndReached={onEndReached}
      onEndReachedThreshold={END_REACHED_THRESHOLD}
      style={styles.list}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={false}
    />
  );
  },
);

SongsList.displayName = 'SongsList';

const styles = StyleSheet.create({
  list: { flex: 1 },
});
