import { memo, type FC } from 'react';

import type { SongItemRow } from '../../song-rows';
import { SongRow, type SongRowTrailing } from '../SongRow';

type SongListItemProps = {
  row: SongItemRow;
  trailing: SongRowTrailing;
  onPressClip: (clipId: string) => void;
  onPressPending: (clipId: string) => void;
  onPressMore: (clipId: string) => void;
};

export const SongListItem: FC<SongListItemProps> = memo(({ row, trailing, onPressClip, onPressPending, onPressMore }: SongListItemProps) => {
  switch (row.type) {
    case 'in-progress': {
      const clip = row.generation.clips[0];
      if (!clip) {
        return null;
      }
      return (
        <SongRow
          id={clip.id}
          status="in-progress"
          title={clip.title}
          variant={clip.variant}
          subtitle=""
          progress={row.generation.progress}
          coverUrl={clip.coverUrl}
          onPress={onPressPending}
          onPressMore={onPressMore}
          trailing={trailing}
        />
      );
    }
    case 'failed': {
      const clip = row.generation.clips[0];
      if (!clip) {
        return null;
      }
      return (
        <SongRow
          id={clip.id}
          status="failed"
          title={clip.title}
          variant={clip.variant}
          subtitle={row.generation.error}
          progress={0}
          coverUrl={null}
          onPress={onPressPending}
          onPressMore={onPressMore}
          trailing={trailing}
        />
      );
    }
    case 'clip':
      return (
        <SongRow
          id={row.clip.id}
          status="completed"
          title={row.clip.title}
          variant={row.clip.variant}
          subtitle={row.clip.tags}
          progress={0}
          coverUrl={row.clip.coverUrl}
          onPress={onPressClip}
          onPressMore={onPressMore}
          trailing={trailing}
        />
      );
  }
});

SongListItem.displayName = 'SongListItem';
