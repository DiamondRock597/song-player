import { memo, useCallback } from 'react';
import { Pressable, StyleSheet, Text, View, type PressableStateCallbackType } from 'react-native';

import { colors, radii, spacing, typography } from '@/theme';

import { Icon, type TIcon } from '../icons';

const ICON_SIZE = 16;
const SEPARATOR_SIZE = 4;
const PRESSED_OPACITY = 0.7;

export type ChipProps = {
  value: string;
  label?: string;
  count?: number | string;
  icon?: TIcon;
  accessibilityLabel?: string;
  selected?: boolean;
  onPress?: (value: string) => void;
};

export const Chip = memo(
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

const chip = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing[1],
  paddingHorizontal: spacing[3],
  paddingVertical: spacing[1.5],
  borderWidth: 1,
  borderRadius: radii.full,
  borderColor: colors.secondary500,
} as const;

const chipSelected = {
  ...chip,
  borderColor: colors.border500,
  backgroundColor: colors.bg800Active,
} as const;

const separator = {
  width: SEPARATOR_SIZE,
  height: SEPARATOR_SIZE,
  borderRadius: radii.full,
  backgroundColor: colors.bg800Hover,
} as const;

const styles = StyleSheet.create({
  chip,
  chipPressed: { ...chip, opacity: PRESSED_OPACITY },
  chipSelected,
  chipSelectedPressed: { ...chipSelected, opacity: PRESSED_OPACITY },
  label: {
    ...typography.caption250,
    color: colors.txt500,
  },
  labelSelected: {
    ...typography.caption250,
    color: colors.txt900,
  },
  subLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },
  separator,
  separatorSelected: { ...separator, backgroundColor: colors.border500 },
  count: {
    ...typography.caption250,
    color: colors.txt200,
  },
  countSelected: {
    ...typography.caption250,
    color: colors.txt900,
  },
});

const defaultStyle = ({ pressed }: PressableStateCallbackType) => (pressed ? styles.chipPressed : styles.chip);
const selectedStyle = ({ pressed }: PressableStateCallbackType) =>
  pressed ? styles.chipSelectedPressed : styles.chipSelected;
