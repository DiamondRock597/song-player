import { Image } from 'expo-image';
import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { CoverOverlay, Icon, Spinner } from '@/components';
import { useIsTrackPlaying } from '@/core/player';
import { colors, radii } from '@/theme';

import type { SongItemStatus } from '../types';

const COVER_SIZE = 48;
const STATE_ICON_SIZE = 24;
const IN_PROGRESS_BLUR_RADIUS = 2;
const PLAYING_GLYPH_SIZE = 18;

type SongCoverProps = {
  id: string;
  status: SongItemStatus;
  coverUrl: string | null;
};

export const SongCover = memo(({ id, status, coverUrl }: SongCoverProps) => {
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
          cachePolicy="memory-disk"
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
    backgroundColor: colors.bg200,
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
