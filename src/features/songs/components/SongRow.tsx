import { memo, useCallback } from 'react';
import { Pressable, StyleSheet, Text, View, type PressableStateCallbackType } from 'react-native';

import { Badge, CountTag, IconButton, ProgressBar } from '@/components';
import { colors, radii, spacing, typography } from '@/theme';

import type { SongItemStatus } from '../types';
import { SongCover } from './SongCover';

// Figma `additional` line: 16 tall; the progress label sits in a 32-wide box.
const SUPPORTING_LINE_HEIGHT = 16;
const PROGRESS_LABEL_WIDTH = 32;
const PRESSED_OPACITY = 0.7;

type SongRowProps = {
  id: string;
  status: SongItemStatus;
  title: string;
  variant: number;
  /** Tags (completed) or the failure message (failed). Unused while in progress. */
  subtitle: string;
  /** 0–100, used while in progress. */
  progress: number;
  coverUrl: string | null;
  onPress: (id: string) => void;
  onPressMore: (id: string) => void;
};

// Module-level so pressing doesn't allocate a new style per render.
const rowStyle = ({ pressed }: PressableStateCallbackType) => (pressed ? styles.rowPressed : styles.row);

// Figma `list-item-mobile`: cover, title + variant tag (or Error badge), a supporting line, `⋯` button.
export const SongRow = memo(
  ({ id, status, title, variant, subtitle, progress, coverUrl, onPress, onPressMore }: SongRowProps) => {
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
        <IconButton icon="dot-grid-1x3-horizontal" accessibilityLabel={`More actions for ${title}`} onPress={handlePressMore} />
      </Pressable>
    );
  },
);

SongRow.displayName = 'SongRow';

const row = {
  flexDirection: 'row',
  alignItems: 'center',
  gap: spacing[3],
  paddingVertical: spacing[2],
  borderRadius: radii.xl,
  overflow: 'hidden',
} as const;

const titleRow = {
  flexDirection: 'row',
  alignItems: 'center',
  gap: spacing[1],
} as const;

const styles = StyleSheet.create({
  row,
  rowPressed: { ...row, opacity: PRESSED_OPACITY },
  text: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing[1],
  },
  titleRow,
  titleRowFailed: { ...titleRow, gap: spacing[2] },
  title: {
    ...typography.body400,
    flexShrink: 1,
    color: colors.txt900,
  },
  supportingLine: {
    height: SUPPORTING_LINE_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },
  progressLabelBox: {
    width: PROGRESS_LABEL_WIDTH,
  },
  progressBar: {
    flex: 1,
  },
  supportingText: {
    ...typography.caption200,
    flexShrink: 1,
    color: colors.txt200,
  },
});
