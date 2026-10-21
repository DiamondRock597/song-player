import { memo, useCallback, type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

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

export const TabBarItem = memo(
  ({ routeKey, label, accessibilityLabel, focused, renderIcon, onPress, onLongPress }: TabBarItemProps) => {
    const color = focused ? colors.brand : colors.txt200;

    const handlePress = useCallback(() => onPress(routeKey, focused), [onPress, routeKey, focused]);
    const handleLongPress = useCallback(() => onLongPress(routeKey), [onLongPress, routeKey]);

    return (
      <Pressable
        accessibilityRole="tab"
        accessibilityState={{ selected: focused }}
        accessibilityLabel={accessibilityLabel}
        onPress={handlePress}
        onLongPress={handleLongPress}
        style={styles.item}
      >
        <View style={styles.content}>
          <View style={styles.icon}>{renderIcon?.({ focused, color, size: ICON_SIZE })}</View>
          <Text
            numberOfLines={1}
            style={[focused ? typography.textTabbarActive : typography.textTabbar, styles.label, { color }]}
          >
            {label}
          </Text>
        </View>
      </Pressable>
    );
  },
);

TabBarItem.displayName = 'TabBarItem';

const styles = StyleSheet.create({
  // Figma tabbar-item: 80×56 at 360 wide (flex: 1), padding 8 top / 12 bottom.
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
