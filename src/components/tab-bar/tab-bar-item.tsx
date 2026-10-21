import { memo, useCallback, type ReactNode, type FC } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { colors, typography } from '@/theme';

import { ICON_SIZE, PRESSED_SCALE, PRESS_SPRING } from './constants';
import { styles } from './tab-bar-item.styles';

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

export const TabBarItem: FC<TabBarItemProps> = memo(
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
