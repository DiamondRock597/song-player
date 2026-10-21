import { StyleSheet } from 'react-native';

import { colors, radii, shadows } from '@/theme';

import { ICON_SIZE, PADDED_SIZE, PRESSED_OPACITY, PRIMARY_BORDER_WIDTH, PRIMARY_SIZE } from './constants';

export const styles = StyleSheet.create({
  padded: {
    alignItems: 'center',
    justifyContent: 'center',
    width: PADDED_SIZE,
    height: PADDED_SIZE,
    borderRadius: radii.md,
  },
  paddedPressed: {
    alignItems: 'center',
    justifyContent: 'center',
    width: PADDED_SIZE,
    height: PADDED_SIZE,
    borderRadius: radii.md,
    opacity: PRESSED_OPACITY,
  },
  ghost: {
    alignItems: 'center',
    justifyContent: 'center',
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: radii.md,
  },
  ghostPressed: {
    alignItems: 'center',
    justifyContent: 'center',
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: radii.md,
    opacity: PRESSED_OPACITY,
  },
  primary: {
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.btnXsSkeumorphic,
    width: PRIMARY_SIZE,
    height: PRIMARY_SIZE,
    borderWidth: PRIMARY_BORDER_WIDTH,
    borderColor: colors.primaryButtonBorder,
    borderRadius: radii.default,
    backgroundColor: colors.primary500,
  },
  primaryPressed: {
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.btnXsSkeumorphic,
    width: PRIMARY_SIZE,
    height: PRIMARY_SIZE,
    borderWidth: PRIMARY_BORDER_WIDTH,
    borderColor: colors.primaryButtonBorder,
    borderRadius: radii.default,
    backgroundColor: colors.primary500,
    opacity: PRESSED_OPACITY,
  },
});
