import { memo, useEffect } from 'react';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { colors } from '@/theme';

import { Icon } from '../icons';

const DEFAULT_SIZE = 24;
const DEFAULT_DURATION_MS = 1000;

export type SpinnerProps = {
  size?: number;
  color?: string;
  /** One full turn, in ms. */
  duration?: number;
};

// `loading-04` arc rotating forever on the UI thread.
export const Spinner = memo(
  ({ size = DEFAULT_SIZE, color = colors.misc100, duration = DEFAULT_DURATION_MS }: SpinnerProps) => {
    const turn = useSharedValue(0);

    useEffect(() => {
      turn.set(0);
      turn.set(withRepeat(withTiming(1, { duration, easing: Easing.linear }), -1, false));
      return () => cancelAnimation(turn);
    }, [turn, duration]);

    const rotation = useAnimatedStyle(() => ({
      transform: [{ rotate: `${turn.get() * 360}deg` }],
    }));

    return (
      <Animated.View style={rotation} accessibilityRole="progressbar" accessibilityLabel="Loading">
        <Icon name="loading-04" size={size} color={color} />
      </Animated.View>
    );
  },
);

Spinner.displayName = 'Spinner';
