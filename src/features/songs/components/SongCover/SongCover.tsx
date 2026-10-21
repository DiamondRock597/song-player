import { Image } from 'expo-image';
import { memo, type FC } from 'react';
import { View } from 'react-native';

import { CoverOverlay, Icon, Spinner } from '@/components';
import { useIsTrackPlaying } from '@/core/player';
import { colors } from '@/theme';

import { IN_PROGRESS_BLUR_RADIUS, PLAYING_GLYPH_SIZE, STATE_ICON_SIZE } from '../../constants';
import type { SongItemStatus } from '../../types';
import { styles } from './SongCover.styles';

type SongCoverProps = {
  id: string;
  status: SongItemStatus;
  coverUrl: string | null;
};

export const SongCover: FC<SongCoverProps> = memo(({ id, status, coverUrl }: SongCoverProps) => {
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
