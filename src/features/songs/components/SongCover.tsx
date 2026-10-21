import { Image } from 'expo-image';
import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { CoverOverlay, Icon, Spinner } from '@/components';
import { useIsTrackPlaying } from '@/core/player';
import { colors, radii } from '@/theme';

import type { SongItemStatus } from '../types';

const COVER_SIZE = 48;
// Figma `loading-04` / `error`: inset 25% of the cover.
const STATE_ICON_SIZE = 24;
const IN_PROGRESS_BLUR_RADIUS = 2;
// Same 18pt glyph as the mini player's cover.
const PLAYING_GLYPH_SIZE = 18;

type SongCoverProps = {
  id: string;
  status: SongItemStatus;
  coverUrl: string | null;
};

// Figma `song-cover`: 48×48, radius md.
// - completed: the cover, or a plain bg/200 square when there is none;
// - in-progress: the cover blurred, an overlays/200 layer and a spinning `loading-04`;
// - failed: a danger/500 square with the `error` icon.
// - playing (completed, current track playing or loading): Figma has no row playing state, so it
//   reuses the mini player's blurred cover layer with a `pause` glyph.
export const SongCover = memo(({ id, status, coverUrl }: SongCoverProps) => {
  // A boolean per row: re-renders only when this track starts or stops, never on progress.
  const isPlaying = useIsTrackPlaying(id);

  if (status === 'failed') {
    return (
      <View style={styles.failed}>
        <Icon name="error" size={STATE_ICON_SIZE} color={colors.misc100} />
      </View>
    );
  }

  const inProgress = status === 'in-progress';

  return (
    <View style={styles.cover}>
      {coverUrl !== null && (
        <Image
          source={coverUrl}
          recyclingKey={id}
          contentFit="cover"
          transition={150}
          blurRadius={inProgress ? IN_PROGRESS_BLUR_RADIUS : undefined}
          style={styles.image}
          accessibilityIgnoresInvertColors
        />
      )}
      {inProgress && (
        <View style={styles.overlay}>
          <Spinner size={STATE_ICON_SIZE} />
        </View>
      )}
      {!inProgress && isPlaying && (
        <CoverOverlay>
          <Icon name="pause" size={PLAYING_GLYPH_SIZE} color={colors.misc100} />
        </CoverOverlay>
      )}
    </View>
  );
});

SongCover.displayName = 'SongCover';

const styles = StyleSheet.create({
  cover: {
    width: COVER_SIZE,
    height: COVER_SIZE,
    overflow: 'hidden',
    borderRadius: radii.md,
    backgroundColor: colors.bg200,
  },
  image: {
    width: COVER_SIZE,
    height: COVER_SIZE,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.default,
    backgroundColor: colors.overlays200,
  },
  failed: {
    width: COVER_SIZE,
    height: COVER_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.md,
    backgroundColor: colors.danger500,
  },
});
