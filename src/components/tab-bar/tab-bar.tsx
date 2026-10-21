import { useCallback, useContext, type ReactNode, type FC } from 'react';
import { View, type LayoutChangeEvent } from 'react-native';
import { BottomTabBarHeightCallbackContext, type BottomTabBarProps } from 'expo-router/js-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TabBarItem } from './tab-bar-item';
import { styles } from './tab-bar.styles';

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

export const TabBar: FC<TabBarProps> = ({ state, descriptors, emitter, navigateToTab, accessory }) => {
  const insets = useSafeAreaInsets();
  const onHeightChange = useContext(BottomTabBarHeightCallbackContext);

  const handleLayout = useCallback(
    (e: LayoutChangeEvent) => onHeightChange?.(e.nativeEvent.layout.height),
    [onHeightChange],
  );

  const handlePress = useCallback(
    (routeKey: string, focused: boolean) => {
      const event = emitter.emit({ type: 'tabPress', target: routeKey, canPreventDefault: true });
      if (!focused && !event.defaultPrevented) {
        navigateToTab(routeKey);
      }
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
