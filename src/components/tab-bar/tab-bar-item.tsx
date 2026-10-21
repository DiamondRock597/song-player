import { memo, useCallback, type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { colors, spacing, typography } from '@/theme';

export type TabBarIconRenderer = (props: {
  focused: boolean;
  color: string;
  size: number;
}) => ReactNode;

type TabBarItemProps = {
  routeKey: string;
  label: string;
  accessibilityLabel: string;
  focused: boolean;
  renderIcon?: TabBarIconRenderer;
  onPress: (routeKey: string, focused: boolean) => void;
  onLongPress: (routeKey: string) => void;
};

const ICON_SIZE = 20;
const PRESSED_SCALE = 0.88;
const PRESS_SPRING = { damping: 12, stiffness: 320 };

export const TabBarItem = memo(
  ({ routeKey, label, accessibilityLabel, focused, renderIcon, onPress, onLongPress }: TabBarItemProps) => {
    const color = focused ? colors.brand : colors.txt200;

    const handlePress = useCallback(() => onPress(routeKey, focused), [onPress, routeKey, focused]);
    const handleLongPress = useCallback(() => onLongPress(routeKey), [onLongPress, routeKey]);

    const scale = useSharedValue(1);
    const handlePressIn = useCallback(() => scale.set(withSpring(PRESSED_SCALE, PRESS_SPRING)), [scale]);
    const handlePressOut = useCallback(() => scale.set(withSpring(1, PRESS_SPRING)), [scale]);
    const contentStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.get() }] }));

    return (
      <Pressable
        accessibilityRole="tab"
        accessibilityState={{ selected: focused }}
        accessibilityLabel={accessibilityLabel}
        onPress={handlePress}
        onLongPress={handleLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.item}
      >
        <Animated.View style={[styles.content, contentStyle]}>
          <View style={styles.icon}>{renderIcon?.({ focused, color, size: ICON_SIZE })}</View>
          <Text
            numberOfLines={1}
            style={[focused ? typography.textTabbarActive : typography.textTabbar, styles.label, { color }]}
          >
            {label}
          </Text>
        </Animated.View>
      </Pressable>
    );
  },
);

TabBarItem.displayName = 'TabBarItem';

const styles = StyleSheet.create({
  item: {
    flex: 1,
    paddingTop: spacing[2],
    paddingBottom: spacing[3],
  },
  content: {
    alignItems: 'center',
    gap: spacing[1],
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
  label: {
    alignSelf: 'stretch',
    textAlign: 'center',
  },
});
