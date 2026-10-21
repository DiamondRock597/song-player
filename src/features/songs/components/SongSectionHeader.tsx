import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { IconButton, type TIcon } from '@/components';
import { colors, spacing, typography } from '@/theme';

// Figma `content` row: sized by its 32×32 `Actions` slot.
const HEADER_ROW_HEIGHT = 32;

type SongSectionHeaderProps = {
  title: string;
  /** Optional `button-icon` in the `Actions` slot (e.g. the search history trash). */
  actionIcon?: TIcon;
  actionLabel?: string;
  onPressAction?: () => void;
};

// Figma `group` header. The 16pt top padding is the `list` gap between groups
// (and the `box` top padding for the first group).
export const SongSectionHeader = memo(({ title, actionIcon, actionLabel, onPressAction }: SongSectionHeaderProps) => (
  <View style={styles.container}>
    <View style={styles.row}>
      <Text style={styles.title} numberOfLines={1} accessibilityRole="header">
        {title}
      </Text>
      {actionIcon && onPressAction ? (
        // Figma `button-icon`: 8 padding around a 16 icon, radius r6, icon/500.
        <IconButton
          icon={actionIcon}
          accessibilityLabel={actionLabel ?? title}
          onPress={onPressAction}
          color={colors.icon500}
        />
      ) : null}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    ...typography.nav100,
    flexShrink: 1,
    // Figma `text-area` has a 1pt top padding.
    paddingTop: 1,
    textTransform: 'uppercase',
    color: colors.txt100,
  },
});
