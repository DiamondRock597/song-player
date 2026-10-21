import { Image } from 'expo-image';
import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { Icon, Spinner } from '@/components';
import { colors, radii } from '@/theme';

import type { SongItemStatus } from '../types';

const COVER_SIZE = 48;
// Figma `loading-04` / `error`: inset 25% of the cover.
const STATE_ICON_SIZE = 24;
const IN_PROGRESS_BLUR_RADIUS = 2;

type SongCoverProps = {
  id: string;
  status: SongItemStatus;
  coverUrl: string | null;
};

// Figma `song-cover`: 48×48, radius md.
// - completed: the cover, or a plain bg/200 square when there is none;
// - in-progress: the cover blurred, an overlays/200 layer and a spinning `loading-04`;
// - failed: a danger/500 square with the `error` icon.
export const SongCover = memo(({ id, status, coverUrl }: SongCoverProps) => {
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
