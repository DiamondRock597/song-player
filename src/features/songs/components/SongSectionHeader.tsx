import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/theme';

// Figma `content` row: sized by its empty 32×32 `Actions` slot.
const HEADER_ROW_HEIGHT = 32;

type SongSectionHeaderProps = {
  title: string;
};

// Figma `group` header. The 16pt top padding is the `list` gap between groups
// (and the `box` top padding for the first group).
export const SongSectionHeader = memo(({ title }: SongSectionHeaderProps) => (
  <View style={styles.container}>
    <View style={styles.row}>
      <Text style={styles.title} numberOfLines={1} accessibilityRole="header">
        {title}
      </Text>
    </View>
  </View>
));

SongSectionHeader.displayName = 'SongSectionHeader';

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing[4],
  },
  row: {
    height: HEADER_ROW_HEIGHT,
    justifyContent: 'center',
  },
  title: {
    ...typography.nav100,
    // Figma `text-area` has a 1pt top padding.
    paddingTop: 1,
    textTransform: 'uppercase',
    color: colors.txt100,
  },
});
