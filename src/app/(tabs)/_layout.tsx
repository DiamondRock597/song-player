import { Tabs, type BottomTabBarProps, type BottomTabNavigationOptions } from 'expo-router/js-tabs';

import { Icon, TabBar } from '@/components';
import { MiniPlayer } from '@/features/player';
import { SongActionsSheet } from '@/features/song-actions';

type TabBarIcon = NonNullable<BottomTabNavigationOptions['tabBarIcon']>;

const createIcon: TabBarIcon = ({ color, size }) => <Icon name="music-note-02" size={size} color={color} />;
const songsIcon: TabBarIcon = ({ color, size }) => <Icon name="headphones" size={size} color={color} />;
const lyricsIcon: TabBarIcon = ({ color, size }) => <Icon name="pencil-02" size={size} color={color} />;
const accountIcon: TabBarIcon = ({ color, size }) => <Icon name="profile" size={size} color={color} />;

// The global mini player rides in the tab bar's accessory slot, stacked directly above the bar
// and outside every screen. (useBottomTabBarHeight() only works inside a screen, so a sibling
// of <Tabs> can't position itself above the bar.) Module-level so the element stays stable.
const miniPlayer = <MiniPlayer />;

// `tabBar` is invoked as a plain function inside a render callback, so TabBar must be
// mounted as an element; passing it directly would run its hooks outside a component.
const renderTabBar = (props: BottomTabBarProps) => <TabBar {...props} accessory={miniPlayer} />;

const TabsLayout = () => {
  return (
    <>
      <Tabs tabBar={renderTabBar} screenOptions={{ headerShown: false }}>
        <Tabs.Screen name="create" options={{ title: 'Create', tabBarIcon: createIcon }} />
        <Tabs.Screen name="index" options={{ title: 'Songs', tabBarIcon: songsIcon }} />
        <Tabs.Screen name="lyrics" options={{ title: 'Lyrics', tabBarIcon: lyricsIcon }} />
        <Tabs.Screen name="account" options={{ title: 'Account', tabBarIcon: accountIcon }} />
      </Tabs>
      {/* Global overlay: renders through the root BottomSheetModalProvider portal. */}
      <SongActionsSheet />
    </>
  );
};

export default TabsLayout;
