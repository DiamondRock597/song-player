import { useBottomTabBarHeight } from 'expo-router/js-tabs';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/theme';

import { SongsFilterBar } from './components/SongsFilterBar';
import { SongsHeader } from './components/SongsHeader';
import { SongsList } from './components/SongsList';
import { useSongsScreen } from './useSongsScreen';

// Header and filter chips stay fixed; only the list scrolls.
export const SongsScreen = () => {
  const {
    rows,
    playerInset,
    filters,
    selectedFilter,
    onSelectFilter,
    onEndReached,
    onPressClip,
    onPressClipMore,
    onPressSearch,
    onPressCreate,
  } = useSongsScreen();
  const insets = useSafeAreaInsets();
  // The tab bar floats over the content (it already includes the bottom safe area).
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <SongsHeader onPressSearch={onPressSearch} onPressCreate={onPressCreate} />
      <SongsFilterBar filters={filters} selected={selectedFilter} onSelect={onSelectFilter} />
      <SongsList
        rows={rows}
        bottomInset={tabBarHeight + playerInset}
        onEndReached={onEndReached}
        onPressClip={onPressClip}
        onPressClipMore={onPressClipMore}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // Figma `bs/songs-list/default`: bg/900.
  container: { flex: 1, backgroundColor: colors.bg900 },
});
