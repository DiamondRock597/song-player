import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { IconButton, type TIcon } from '@/components';
import { colors, spacing, typography } from '@/theme';

const HEADER_ROW_HEIGHT = 32;

type SongSectionHeaderProps = {
  title: string;
  actionIcon?: TIcon;
  actionLabel?: string;
  onPressAction?: () => void;
};

export const SongSectionHeader = memo(({ title, actionIcon, actionLabel, onPressAction }: SongSectionHeaderProps) => (
  <View style={styles.container}>
    <View style={styles.row}>
      <Text style={styles.title} numberOfLines={1} accessibilityRole="header">
        {title}
      </Text>
      {actionIcon && onPressAction ? (
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
    paddingTop: 1,
    textTransform: 'uppercase',
    color: colors.txt100,
  },
});
