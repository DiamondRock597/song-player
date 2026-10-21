import { Tabs, type BottomTabBarProps, type BottomTabNavigationOptions } from 'expo-router/js-tabs';
import type { FC } from 'react';

import { Icon, TabBar, type TIcon } from '@/components';
import { MiniPlayer } from '@/features/player';
import { SongActionsSheet } from '@/features/song-actions';

type TabBarIcon = NonNullable<BottomTabNavigationOptions['tabBarIcon']>;

const createTabIcon = (name: TIcon) => {
  const TabIcon: TabBarIcon = ({ color, size }) => <Icon name={name} size={size} color={color} />;
  return TabIcon;
};

// Built once at module level so each tab keeps a stable `tabBarIcon` reference.
const tabIcons = {
  create: createTabIcon('music-note-02'),
  songs: createTabIcon('headphones'),
  lyrics: createTabIcon('pencil-02'),
  account: createTabIcon('profile'),
} satisfies Record<string, TabBarIcon>;

// The global mini player rides in the tab bar's accessory slot, stacked directly above the bar
// and outside every screen. (useBottomTabBarHeight() only works inside a screen, so a sibling
// of <Tabs> can't position itself above the bar.) Module-level so the element stays stable.
const miniPlayer = <MiniPlayer />;

// `tabBar` is invoked as a plain function inside a render callback, so TabBar must be
// mounted as an element; passing it directly would run its hooks outside a component.
const renderTabBar = (props: BottomTabBarProps) => <TabBar {...props} accessory={miniPlayer} />;

const TabsLayout: FC = () => {
  return (
    <>
      <Tabs tabBar={renderTabBar} screenOptions={{ headerShown: false }}>
        <Tabs.Screen name="create" options={{ title: 'Create', tabBarIcon: tabIcons.create }} />
        <Tabs.Screen name="index" options={{ title: 'Songs', tabBarIcon: tabIcons.songs }} />
        <Tabs.Screen name="lyrics" options={{ title: 'Lyrics', tabBarIcon: tabIcons.lyrics }} />
        <Tabs.Screen name="account" options={{ title: 'Account', tabBarIcon: tabIcons.account }} />
      </Tabs>
      {/* Global overlay: renders through the root BottomSheetModalProvider portal. */}
      <SongActionsSheet />
    </>
  );
};

export default TabsLayout;
