import { memo, useCallback, type FC } from 'react';
import { Pressable, Text, View, type PressableStateCallbackType } from 'react-native';

import { colors } from '@/theme';

import { Icon, type TIcon } from '../icons';
import { styles } from './chip.styles';
import { ICON_SIZE } from './constants';

export type ChipProps = {
  value: string;
  label?: string;
  count?: number | string;
  icon?: TIcon;
  accessibilityLabel?: string;
  selected?: boolean;
  onPress?: (value: string) => void;
};

export const Chip: FC<ChipProps> = memo(
  ({ value, label, count, icon, accessibilityLabel, selected = false, onPress }: ChipProps) => {
    const handlePress = useCallback(() => onPress?.(value), [onPress, value]);

    return (
      <Pressable
        onPress={onPress ? handlePress : undefined}
        disabled={!onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityState={{ selected }}
        style={selected ? selectedStyle : defaultStyle}
      >
        {icon && <Icon name={icon} size={ICON_SIZE} color={colors.icon500} />}
        {label !== undefined && (
          <Text style={selected ? styles.labelSelected : styles.label} numberOfLines={1}>
            {label}
          </Text>
        )}
        {count !== undefined && (
          <View style={styles.subLabel}>
            <View style={selected ? styles.separatorSelected : styles.separator} />
            <Text style={selected ? styles.countSelected : styles.count}>{count}</Text>
          </View>
        )}
      </Pressable>
    );
  },
);

Chip.displayName = 'Chip';

const defaultStyle = ({ pressed }: PressableStateCallbackType) => (pressed ? styles.chipPressed : styles.chip);
const selectedStyle = ({ pressed }: PressableStateCallbackType) =>
  pressed ? styles.chipSelectedPressed : styles.chipSelected;
