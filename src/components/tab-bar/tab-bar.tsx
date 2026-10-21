import { useCallback, useContext } from 'react';
import { StyleSheet, View, type LayoutChangeEvent } from 'react-native';
import { BottomTabBarHeightCallbackContext, type BottomTabBarProps } from 'expo-router/js-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, spacing } from '@/theme';

import { TabBarItem } from './tab-bar-item';

/**
 * Custom bar for Expo Router `<Tabs tabBar={(props) => <TabBar {...props} />} />`
 * (render it as an element: passing `TabBar` directly runs its hooks outside a component). Domain-agnostic: label and icon
 * come from each screen's `title` / `tabBarIcon` options. Absolutely positioned over the
 * content; screens reserve space with `useBottomTabBarHeight()`.
 */
export const TabBar = ({ state, descriptors, emitter, navigateToTab }: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();
  const onHeightChange = useContext(BottomTabBarHeightCallbackContext);

  const handleLayout = useCallback(
    (e: LayoutChangeEvent) => onHeightChange?.(e.nativeEvent.layout.height),
    [onHeightChange],
  );

  const handlePress = useCallback(
    (routeKey: string, focused: boolean) => {
      const event = emitter.emit({ type: 'tabPress', target: routeKey, canPreventDefault: true });
      if (!focused && !event.defaultPrevented) navigateToTab(routeKey);
    },
    [emitter, navigateToTab],
  );

  const handleLongPress = useCallback(
    (routeKey: string) => {
      emitter.emit({ type: 'tabLongPress', target: routeKey });
    },
    [emitter],
  );

  return (
    <View
      accessibilityRole="tabbar"
      onLayout={handleLayout}
      style={[styles.bar, { paddingBottom: insets.bottom }]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title ?? route.name;
        return (
          <TabBarItem
            key={route.key}
            routeKey={route.key}
            label={label}
            accessibilityLabel={options.tabBarAccessibilityLabel ?? label}
            focused={state.index === index}
            renderIcon={options.tabBarIcon}
            onPress={handlePress}
            onLongPress={handleLongPress}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  // Figma tabbar (1:3131): 360×56, 20 side padding, overlays/200 + 0.5 border/100 top border.
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    paddingHorizontal: spacing[5],
    backgroundColor: colors.overlays200,
    borderTopWidth: 0.5,
    borderTopColor: colors.border100,
  },
});
