import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { IconButton } from '@/components';
import { colors, spacing, typography } from '@/theme';

type SongsHeaderProps = {
  onPressSearch: () => void;
  onPressCreate: () => void;
};

// Figma `header-mobile` (1:3082): 20×16 padding, title200 "Songs", search (ghost) and `+` (primary), 12 apart.
export const SongsHeader = memo(({ onPressSearch, onPressCreate }: SongsHeaderProps) => (
  <View style={styles.container}>
    <Text style={styles.title} numberOfLines={1} accessibilityRole="header">
      Songs
    </Text>
    <View style={styles.actions}>
      <IconButton icon="search" variant="ghost" accessibilityLabel="Search songs" onPress={onPressSearch} />
      <IconButton icon="plus-large" variant="primary" accessibilityLabel="Create song" onPress={onPressCreate} />
    </View>
  </View>
));

SongsHeader.displayName = 'SongsHeader';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[4],
  },
  title: {
    ...typography.title200,
    flexShrink: 1,
    color: colors.txt900,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
});
