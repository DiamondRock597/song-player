import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import { memo, useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { spacing } from '@/theme';
import { formatSectionDate } from '@/utils';

import { getRowType, type SongRow as SongListRow } from '../song-rows';
import { SongRow } from './SongRow';
import { SongSectionHeader } from './SongSectionHeader';

const IN_PROGRESS_TITLE = 'New in progress';
const END_REACHED_THRESHOLD = 0.5;

const keyExtractor = (row: SongListRow) => row.key;

type SongsListProps = {
  rows: readonly SongListRow[];
  /** Space to keep clear under the last row (e.g. the tab bar). */
  bottomInset: number;
  onEndReached: () => void;
  /** Row press and `⋯`, called with the clip id (clips[0].id for in-progress and failed rows). */
  onPressClip: (clipId: string) => void;
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
        case 'in-progress': {
          const clip = item.generation.clips[0];
          if (!clip) return null;
          return (
            <SongRow
              id={clip.id}
              status="in-progress"
              title={clip.title}
              variant={clip.variant}
              subtitle=""
              progress={item.generation.progress}
              coverUrl={clip.coverUrl}
              onPress={onPressClip}
              onPressMore={onPressClipMore}
            />
          );
        }
        case 'failed': {
          const clip = item.generation.clips[0];
          if (!clip) return null;
          return (
            <SongRow
              id={clip.id}
              status="failed"
              title={clip.title}
              variant={clip.variant}
              subtitle={item.generation.error}
              progress={0}
              coverUrl={null}
              onPress={onPressClip}
              onPressMore={onPressClipMore}
            />
          );
        }
        case 'clip':
          return (
            <SongRow
              id={item.clip.id}
              status="completed"
              title={item.clip.title}
              variant={item.clip.variant}
              subtitle={item.clip.tags}
              progress={0}
              coverUrl={item.clip.coverUrl}
              onPress={onPressClip}
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
    <FlashList
      data={rows}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      getItemType={getRowType}
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
