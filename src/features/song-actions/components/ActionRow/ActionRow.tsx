import { memo, useCallback, type FC } from 'react';
import { Pressable, Text } from 'react-native';

import { Icon, type TIcon } from '@/components';
import { colors } from '@/theme';

import { ACTION_ICON_SIZE } from '../../constants';
import type { SongActionKey } from '../../types';
import { styles } from './ActionRow.styles';

type ActionRowProps = {
  actionKey: SongActionKey;
  label: string;
  icon: TIcon;
  onPress: (key: SongActionKey) => void;
};

export const ActionRow: FC<ActionRowProps> = memo(({ actionKey, label, icon, onPress }: ActionRowProps) => {
  const handlePress = useCallback(() => onPress(actionKey), [onPress, actionKey]);

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <Icon name={icon} size={ACTION_ICON_SIZE} color={colors.icon500} />
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
});

ActionRow.displayName = 'ActionRow';
