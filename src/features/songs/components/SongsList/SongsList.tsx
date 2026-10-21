import type { ListRenderItem } from '@shopify/flash-list';
import { memo, useCallback, useMemo, type FC } from 'react';

import { List } from '@/components';
import { spacing } from '@/theme';
import { formatSectionDate } from '@/utils';

import { END_REACHED_THRESHOLD, IN_PROGRESS_TITLE, START_REACHED_THRESHOLD } from '../../constants';
import { getRowCoverUrl, getRowType, type SongRow as SongListRow } from '../../song-rows';
import { SongListItem } from '../SongListItem';
import { SongSectionHeader } from '../SongSectionHeader';
import { styles } from './SongsList.styles';

const keyExtractor = (row: SongListRow) => row.key;

type SongsListProps = {
  rows: readonly SongListRow[];
  bottomInset: number;
  onEndReached: () => void;
  onStartReached: () => void;
  onPressClip: (clipId: string) => void;
  onPressClipMore: (clipId: string) => void;
};

export const SongsList: FC<SongsListProps> = memo(({ rows, bottomInset, onEndReached, onStartReached, onPressClip, onPressClipMore }: SongsListProps) => {
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
      onStartReached={onStartReached}
      onStartReachedThreshold={START_REACHED_THRESHOLD}
      style={styles.list}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={false}
    />
  );
  },
);

SongsList.displayName = 'SongsList';
