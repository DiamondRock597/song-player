import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { KeyboardDock } from '@/components';
import { MiniPlayer } from '@/features/player';
import { colors } from '@/theme';

import { SearchHeader } from './components/SearchHeader';
import { SearchList } from './components/SearchList';
import { useSearchScreen } from './useSearchScreen';

// Figma `bs/songs-list/default/search/01` (results) and `/02` (history). A root-stack route,
// so the tab bar stays underneath. The global MiniPlayer sits in a KeyboardDock under the list:
// on top of the keyboard while it is open, above the bottom safe area otherwise. It is in the
// layout flow (not floating), so the list shrinks with it and never hides rows behind it.
// MiniPlayer renders nothing while no track is loaded.
export const SearchScreen = () => {
  const {
    inputRef,
    hasText,
    rows,
    resultsState,
    isFetchingNextPage,
    onChangeText,
    onClear,
    onPressBack,
    onEndReached,
    onPressRow,
    onPressMore,
    onClearHistory,
    onRetry,
  } = useSearchScreen();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <SearchHeader
        inputRef={inputRef}
        hasText={hasText}
        onChangeText={onChangeText}
        onClear={onClear}
        onPressBack={onPressBack}
      />
      <SearchList
        rows={rows}
        resultsState={resultsState}
        isFetchingNextPage={isFetchingNextPage}
        onEndReached={onEndReached}
        onPressRow={onPressRow}
        onPressMore={onPressMore}
        onClearHistory={onClearHistory}
        onRetry={onRetry}
      />
      <KeyboardDock>
        <MiniPlayer />
      </KeyboardDock>
    </View>
  );
};

const styles = StyleSheet.create({
  // Figma frame fill: bg/900.
  container: { flex: 1, backgroundColor: colors.bg900 },
});
