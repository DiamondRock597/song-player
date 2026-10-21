import { StyleSheet } from 'react-native';

import { colors, spacing, typography } from '@/theme';

export const styles = StyleSheet.create({
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
