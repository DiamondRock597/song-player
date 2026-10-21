import { memo, useEffect, type FC } from 'react';
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
import { DEFAULT_DURATION_MS, DEFAULT_SIZE } from './constants';

export type SpinnerProps = {
  size?: number;
  color?: string;
  duration?: number;
};

export const Spinner: FC<SpinnerProps> = memo(
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
