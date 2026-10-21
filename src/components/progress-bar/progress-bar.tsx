import { memo, useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { colors, radii, spacing } from '@/theme';

// Figma `Progress`: a 4pt fill inside a 2pt-padded track.
const FILL_HEIGHT = 4;
const FILL_TRANSITION_MS = 600;

export type ProgressBarProps = {
  /** 0–100 */
  progress: number;
};

// Figma `progress-bar-small`. The fill grows from 0 on mount, then follows `progress`,
// both via a Reanimated CSS transition on `width`. Remount (e.g. `key`) to replay the intro.
export const ProgressBar = memo(({ progress }: ProgressBarProps) => {
  const value = Math.min(100, Math.max(0, progress));
  // First frame renders an empty fill so the transition has something to start from.
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setStarted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const width = started ? value : 0;
  const fillStyle = useMemo(() => [styles.fill, { width: `${width}%` as const }], [width]);

  return (
    <View
      style={styles.track}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: value }}
    >
      <Animated.View style={fillStyle} />
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
    transitionProperty: 'width',
    transitionDuration: FILL_TRANSITION_MS,
    transitionTimingFunction: 'ease-out',
  },
});
