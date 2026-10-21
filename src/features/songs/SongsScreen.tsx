import { useBottomTabBarHeight } from 'expo-router/js-tabs';
import type { FC } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SongsFilterBar, SongsHeader, SongsList } from './components';
import { styles } from './SongsScreen.styles';
import { useSongsScreen } from './useSongsScreen';

export const SongsScreen: FC = () => {
  const {
    rows,
    playerInset,
    filters,
    selectedFilter,
    onSelectFilter,
    onEndReached,
    onStartReached,
    onPressClip,
    onPressClipMore,
    onPressSearch,
    onPressCreate,
  } = useSongsScreen();
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <SongsHeader onPressSearch={onPressSearch} onPressCreate={onPressCreate} />
      <SongsFilterBar filters={filters} selected={selectedFilter} onSelect={onSelectFilter} />
      <SongsList
        rows={rows}
        bottomInset={tabBarHeight + playerInset}
        onEndReached={onEndReached}
        onStartReached={onStartReached}
        onPressClip={onPressClip}
        onPressClipMore={onPressClipMore}
      />
    </View>
  );
};
