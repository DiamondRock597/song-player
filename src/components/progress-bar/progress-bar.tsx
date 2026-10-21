import { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, radii, spacing } from '@/theme';

// Figma `Progress`: a 4pt fill inside a 2pt-padded track.
const FILL_HEIGHT = 4;

export type ProgressBarProps = {
  /** 0–100 */
  progress: number;
};

// Figma `progress-bar-small`. Static: the fill width follows `progress`, no animation.
export const ProgressBar = memo(({ progress }: ProgressBarProps) => {
  const value = Math.min(100, Math.max(0, progress));
  const fillStyle = useMemo(() => [styles.fill, { width: `${value}%` as const }], [value]);

  return (
    <View
      style={styles.track}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: value }}
    >
      <View style={fillStyle} />
    </View>
  );
});

ProgressBar.displayName = 'ProgressBar';

const styles = StyleSheet.create({
  track: {
    alignSelf: 'stretch',
    padding: spacing[0.5],
    borderRadius: radii.lg,
    backgroundColor: colors.border100,
  },
  fill: {
    height: FILL_HEIGHT,
    borderRadius: radii.default,
    backgroundColor: colors.primary500,
  },
});
