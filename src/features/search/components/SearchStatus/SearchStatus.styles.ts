import { StyleSheet } from 'react-native';

import { colors, spacing, typography } from '@/theme';

import { MIN_TOUCH_TARGET, PRESSED_OPACITY, STATUS_TOP_OFFSET } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing[1],
    paddingTop: STATUS_TOP_OFFSET,
  },
  title: {
    ...typography.body400,
    textAlign: 'center',
    color: colors.txt900,
  },
  subtitle: {
    ...typography.caption200,
    textAlign: 'center',
    color: colors.txt200,
  },
  retry: {
    minHeight: MIN_TOUCH_TARGET,
    justifyContent: 'center',
    paddingHorizontal: spacing[3],
  },
  retryPressed: {
    minHeight: MIN_TOUCH_TARGET,
    justifyContent: 'center',
    paddingHorizontal: spacing[3],
    opacity: PRESSED_OPACITY,
  },
  retryText: {
    ...typography.btn200,
    color: colors.primary500,
  },
});
