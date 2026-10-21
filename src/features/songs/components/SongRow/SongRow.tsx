import { memo, useCallback, type FC } from 'react';
import { Pressable, Text, View, type PressableStateCallbackType } from 'react-native';

import { Badge, CountTag, IconButton, ProgressBar, type TIcon } from '@/components';

import type { SongItemStatus } from '../../types';
import { SongCover } from '../SongCover';
import { styles } from './SongRow.styles';

export type SongRowTrailing = 'more' | 'chevron';

const trailingIcon = {
  more: 'dot-grid-1x3-horizontal',
  chevron: 'chevron-right',
} satisfies Record<SongRowTrailing, TIcon>;

type SongRowProps = {
  id: string;
  status: SongItemStatus;
  title: string;
  variant: number;
  subtitle: string;
  progress: number;
  coverUrl: string | null;
  onPress: (id: string) => void;
  onPressMore: (id: string) => void;
  trailing?: SongRowTrailing;
};

const rowStyle = ({ pressed }: PressableStateCallbackType) => (pressed ? styles.rowPressed : styles.row);

export const SongRow: FC<SongRowProps> = memo(
  ({
    id,
    status,
    title,
    variant,
    subtitle,
    progress,
    coverUrl,
    onPress,
    onPressMore,
    trailing = 'more',
  }: SongRowProps) => {
    const handlePress = useCallback(() => onPress(id), [onPress, id]);
    const handlePressMore = useCallback(() => onPressMore(id), [onPressMore, id]);

    const failed = status === 'failed';

    return (
      <Pressable onPress={handlePress} accessibilityRole="button" accessibilityLabel={title} style={rowStyle}>
        <SongCover id={id} status={status} coverUrl={coverUrl} />
        <View style={styles.text}>
          <View style={failed ? styles.titleRowFailed : styles.titleRow}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            {failed ? <Badge label="Error" tone="danger" /> : <CountTag count={variant} />}
          </View>
          {status === 'in-progress' ? (
            <View style={styles.supportingLine}>
              <View style={styles.progressLabelBox}>
                <Text style={styles.supportingText} numberOfLines={1}>
                  {`${progress}%`}
                </Text>
              </View>
              <View style={styles.progressBar}>
                {/* Keyed by song so a recycled row replays the fill-in for the new song. */}
                <ProgressBar key={id} progress={progress} />
              </View>
            </View>
          ) : (
            <View style={styles.supportingLine}>
              <Text style={styles.supportingText} numberOfLines={1}>
                {subtitle}
              </Text>
            </View>
          )}
        </View>
        {/* Figma `Action Button`: 8 padding around a 16 icon (32×32); IconButton grows it to 44pt. */}
        <IconButton
          icon={trailingIcon[trailing]}
          accessibilityLabel={`More actions for ${title}`}
          onPress={handlePressMore}
        />
      </Pressable>
    );
  },
);

SongRow.displayName = 'SongRow';
