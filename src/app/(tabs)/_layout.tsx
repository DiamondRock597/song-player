import { Tabs, type BottomTabBarProps, type BottomTabNavigationOptions } from 'expo-router/js-tabs';

import { Icon, TabBar } from '@/components';
import { SongActionsSheet } from '@/features/song-actions';

type TabBarIcon = NonNullable<BottomTabNavigationOptions['tabBarIcon']>;

// Module-level so the references stay stable for the memoized tab items.
const createIcon: TabBarIcon = ({ color, size }) => <Icon name="music-note-02" size={size} color={color} />;
const songsIcon: TabBarIcon = ({ color, size }) => <Icon name="headphones" size={size} color={color} />;
const lyricsIcon: TabBarIcon = ({ color, size }) => <Icon name="pencil-02" size={size} color={color} />;
const accountIcon: TabBarIcon = ({ color, size }) => <Icon name="profile" size={size} color={color} />;

// `tabBar` is invoked as a plain function inside a render callback, so TabBar must be
// mounted as an element; passing it directly would run its hooks outside a component.
const renderTabBar = (props: BottomTabBarProps) => <TabBar {...props} />;

// Cancels the tab press, so the tab can't be opened. TabBar emits `tabPress` as preventable.
const disabledTabListeners = { tabPress: (e: { preventDefault: () => void }) => e.preventDefault() };

// Tab order follows the design: Create / Songs / Lyrics / Account.
// Only Songs is enabled; the other tabs are visual placeholders and can't be opened.
// `index` (Songs) is the group's initial route by default.
const TabsLayout = () => {
  return (
    <>
      <Tabs tabBar={renderTabBar} screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="create"
          options={{ title: 'Create', tabBarIcon: createIcon }}
          listeners={disabledTabListeners}
        />
        <Tabs.Screen name="index" options={{ title: 'Songs', tabBarIcon: songsIcon }} />
        <Tabs.Screen
          name="lyrics"
          options={{ title: 'Lyrics', tabBarIcon: lyricsIcon }}
          listeners={disabledTabListeners}
        />
        <Tabs.Screen
          name="account"
          options={{ title: 'Account', tabBarIcon: accountIcon }}
          listeners={disabledTabListeners}
        />
      </Tabs>
      {/* Global overlay: renders through the root BottomSheetModalProvider portal. */}
      <SongActionsSheet />
    </>
  );
};

export default TabsLayout;
