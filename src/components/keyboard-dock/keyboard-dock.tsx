import { memo, type ReactNode } from 'react';
import Animated, { useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// The app is edge-to-edge, so both bars are translucent. Without these flags Reanimated adds the bar
// insets as margins to the Android content root (doubling the safe area) and turns
// decorFitsSystemWindows back on when the hook unmounts. With them, `height` is the full IME inset.
const KEYBOARD_OPTIONS = {
  isStatusBarTranslucentAndroid: true,
  isNavigationBarTranslucentAndroid: true,
};

export type KeyboardDockProps = {
  children: ReactNode;
};

// Bottom dock that rides on top of the keyboard: its bottom padding follows the keyboard height on
// the UI thread, frame by frame, and falls back to the bottom safe-area inset when the keyboard is
// closed (never both: the keyboard already covers the home indicator / navigation bar).
// Put it last in a column whose content above is `flex: 1`, so that content shrinks with it.
export const KeyboardDock = memo(({ children }: KeyboardDockProps) => {
  const keyboard = useAnimatedKeyboard(KEYBOARD_OPTIONS);
  const { bottom } = useSafeAreaInsets();

  const style = useAnimatedStyle(() => ({
    paddingBottom: Math.max(keyboard.height.get(), bottom),
  }));

  return <Animated.View style={style}>{children}</Animated.View>;
});

KeyboardDock.displayName = 'KeyboardDock';
