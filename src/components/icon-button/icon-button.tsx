import { memo, type FC } from 'react';
import { Pressable, type PressableStateCallbackType } from 'react-native';

import { colors } from '@/theme';

import { Icon, type TIcon } from '../icons';
import { ICON_SIZE, MIN_TOUCH_TARGET, PADDED_SIZE, PRIMARY_SIZE } from './constants';
import { styles } from './icon-button.styles';

export type IconButtonVariant = 'padded' | 'ghost' | 'primary';

export type IconButtonProps = {
  icon: TIcon;
  accessibilityLabel: string;
  onPress: () => void;
  variant?: IconButtonVariant;
  color?: string;
};

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

const styleByVariant = {
  padded: ({ pressed }: PressableStateCallbackType) => (pressed ? styles.paddedPressed : styles.padded),
  ghost: ({ pressed }: PressableStateCallbackType) => (pressed ? styles.ghostPressed : styles.ghost),
  primary: ({ pressed }: PressableStateCallbackType) => (pressed ? styles.primaryPressed : styles.primary),
} satisfies Record<IconButtonVariant, (state: PressableStateCallbackType) => object>;

export const IconButton: FC<IconButtonProps> = memo(({ icon, accessibilityLabel, onPress, variant = 'padded', color }: IconButtonProps) => (
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
