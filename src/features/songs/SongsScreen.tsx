import { useBottomTabBarHeight } from 'expo-router/js-tabs';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/theme';

import { SongsFilterBar, SongsHeader, SongsList } from './components';
import { useSongsScreen } from './useSongsScreen';

export const SongsScreen = () => {
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg900 },
});
