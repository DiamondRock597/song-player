import { StyleSheet } from 'react-native';

import { spacing } from '@/theme';

import { BACK_ICON_SIZE, PRESSED_OPACITY } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[4],
  },
  back: {
    width: BACK_ICON_SIZE,
    height: BACK_ICON_SIZE,
  },
  backPressed: {
    width: BACK_ICON_SIZE,
    height: BACK_ICON_SIZE,
    opacity: PRESSED_OPACITY,
  },
});
