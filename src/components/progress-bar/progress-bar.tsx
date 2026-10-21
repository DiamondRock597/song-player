import { memo, useEffect, useMemo, useState, type FC } from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

import { styles } from './progress-bar.styles';

export type ProgressBarProps = {
  progress: number;
};

// Figma `progress-bar-small`. The fill grows from 0 on mount, then follows `progress`,
// both via a Reanimated CSS transition on `width`. Remount (e.g. `key`) to replay the intro.
export const ProgressBar: FC<ProgressBarProps> = memo(({ progress }: ProgressBarProps) => {
  const value = Math.min(100, Math.max(0, progress));
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

