import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useSongsScreen } from './useSongsScreen';

export const SongsScreen = () => {
  const { title } = useSongsScreen();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
