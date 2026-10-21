import { memo, type ReactNode, type FC } from 'react';
import Animated, { useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { KEYBOARD_OPTIONS } from './constants';

export type KeyboardDockProps = {
  children: ReactNode;
};

// Bottom dock that rides on top of the keyboard: its bottom padding follows the keyboard height on
// the UI thread, frame by frame, and falls back to the bottom safe-area inset when the keyboard is
// closed (never both: the keyboard already covers the home indicator / navigation bar).
export const KeyboardDock: FC<KeyboardDockProps> = memo(({ children }: KeyboardDockProps) => {
  const keyboard = useAnimatedKeyboard(KEYBOARD_OPTIONS);
  const { bottom } = useSafeAreaInsets();

  const style = useAnimatedStyle(() => ({
    paddingBottom: Math.max(keyboard.height.get(), bottom),
  }));

  return <Animated.View style={style}>{children}</Animated.View>;
});

KeyboardDock.displayName = 'KeyboardDock';
