import { useCallback, useContext, type ReactNode } from 'react';
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
 *
 * `accessory` renders stacked directly above the bar (e.g. a mini player). It is not part of
 * the reported tab bar height; screens that need to clear it add its height themselves.
 */
export type TabBarProps = BottomTabBarProps & {
  accessory?: ReactNode;
};

export const TabBar = ({ state, descriptors, emitter, navigateToTab, accessory }: TabBarProps) => {
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
    <View style={styles.container} pointerEvents="box-none">
      {accessory}
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
    </View>
  );
};

const styles = StyleSheet.create({
  // Floats over the content; holds the accessory (if any) and the bar, bottom to top.
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  // Figma tabbar (1:3131): 360×56, 20 side padding. Opaque bg/900 to match the Songs screen
  // background, with a 1pt divider on top to separate it from the list.
  bar: {
    flexDirection: 'row',
    paddingHorizontal: spacing[5],
    backgroundColor: colors.bg900,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
});
