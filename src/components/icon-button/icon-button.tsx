import { memo } from 'react';
import { Pressable, StyleSheet, type PressableStateCallbackType } from 'react-native';

import { colors, radii, shadows, spacing } from '@/theme';

import { Icon, type TIcon } from '../icons';

const ICON_SIZE = 16;
const MIN_TOUCH_TARGET = 44;
const PADDED_SIZE = ICON_SIZE + spacing[2] * 2;
const PRIMARY_SIZE = ICON_SIZE + spacing[1] * 2;
const PRIMARY_BORDER_WIDTH = 2;
const PRESSED_OPACITY = 0.7;

export type IconButtonVariant = 'padded' | 'ghost' | 'primary';

export type IconButtonProps = {
  icon: TIcon;
  accessibilityLabel: string;
  onPress: () => void;
  variant?: IconButtonVariant;
  color?: string;
};

const sizeByVariant = {
  padded: PADDED_SIZE,
  ghost: ICON_SIZE,
  primary: PRIMARY_SIZE,
} satisfies Record<IconButtonVariant, number>;

const iconColorByVariant = {
  padded: colors.txt200,
  ghost: colors.icon500,
  primary: colors.primary100Contrast,
} satisfies Record<IconButtonVariant, string>;

const hitSlopByVariant = {
  padded: (MIN_TOUCH_TARGET - PADDED_SIZE) / 2,
  ghost: (MIN_TOUCH_TARGET - ICON_SIZE) / 2,
  primary: (MIN_TOUCH_TARGET - PRIMARY_SIZE) / 2,
} satisfies Record<IconButtonVariant, number>;

export const IconButton = memo(({ icon, accessibilityLabel, onPress, variant = 'padded', color }: IconButtonProps) => (
  <Pressable
    onPress={onPress}
    hitSlop={hitSlopByVariant[variant]}
    accessibilityRole="button"
    accessibilityLabel={accessibilityLabel}
    style={styleByVariant[variant]}
  >
    <Icon name={icon} size={ICON_SIZE} color={color ?? iconColorByVariant[variant]} />
  </Pressable>
));

IconButton.displayName = 'IconButton';

const centered = {
  alignItems: 'center',
  justifyContent: 'center',
} as const;

const padded = {
  ...centered,
  width: sizeByVariant.padded,
  height: sizeByVariant.padded,
  borderRadius: radii.md,
} as const;

const ghost = {
  ...centered,
  width: sizeByVariant.ghost,
  height: sizeByVariant.ghost,
  borderRadius: radii.md,
} as const;

const primary = {
  ...centered,
  ...shadows.btnXsSkeumorphic,
  width: sizeByVariant.primary,
  height: sizeByVariant.primary,
  borderWidth: PRIMARY_BORDER_WIDTH,
  borderColor: colors.primaryButtonBorder,
  borderRadius: radii.default,
  backgroundColor: colors.primary500,
} as const;

const styles = StyleSheet.create({
  padded,
  paddedPressed: { ...padded, opacity: PRESSED_OPACITY },
  ghost,
  ghostPressed: { ...ghost, opacity: PRESSED_OPACITY },
  primary,
  primaryPressed: { ...primary, opacity: PRESSED_OPACITY },
});

const styleByVariant = {
  padded: ({ pressed }: PressableStateCallbackType) => (pressed ? styles.paddedPressed : styles.padded),
  ghost: ({ pressed }: PressableStateCallbackType) => (pressed ? styles.ghostPressed : styles.ghost),
  primary: ({ pressed }: PressableStateCallbackType) => (pressed ? styles.primaryPressed : styles.primary),
} satisfies Record<IconButtonVariant, (state: PressableStateCallbackType) => object>;
