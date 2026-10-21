import { memo, useCallback } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { Icon, type TIcon } from '@/components';
import { colors, spacing, typography } from '@/theme';

import type { SongActionKey } from '../actions';

const ICON_SIZE = 20;

type ActionRowProps = {
  actionKey: SongActionKey;
  label: string;
  icon: TIcon;
  onPress: (key: SongActionKey) => void;
};

export const ActionRow = memo(({ actionKey, label, icon, onPress }: ActionRowProps) => {
  const handlePress = useCallback(() => onPress(actionKey), [onPress, actionKey]);

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <Icon name={icon} size={ICON_SIZE} color={colors.icon500} />
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
});

ActionRow.displayName = 'ActionRow';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    padding: spacing[4],
  },
  pressed: {
    backgroundColor: colors.divider,
  },
  label: {
    ...typography.btn200,
    flexShrink: 1,
    color: colors.txt900,
  },
});
