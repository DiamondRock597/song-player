import { memo } from 'react';

import type { SongItemRow } from '../song-rows';
import { SongRow, type SongRowTrailing } from './SongRow';

type SongListItemProps = {
  row: SongItemRow;
  trailing: SongRowTrailing;
  /** Press on a completed clip row, called with the clip id. */
  onPressClip: (clipId: string) => void;
  /** Press on an in-progress or failed row (nothing to play), called with clips[0].id. */
  onPressPending: (clipId: string) => void;
  /** Trailing button press (`⋯` or `>`), called with the clip id. */
  onPressMore: (clipId: string) => void;
};

// Picks the `SongRow` props for one song row (in-progress / failed generation, or a completed clip).
// Shared by the Songs list and Search, so both render a generation the same way.
export const SongListItem = memo(({ row, trailing, onPressClip, onPressPending, onPressMore }: SongListItemProps) => {
  switch (row.type) {
    case 'in-progress': {
      const clip = row.generation.clips[0];
      if (!clip) return null;
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
      if (!clip) return null;
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
