import { StyleSheet } from 'react-native';

import { colors, radii, spacing, typography } from '@/theme';

export const styles = StyleSheet.create({
  danger: {
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[0.5],
    borderRadius: radii.md,
    backgroundColor: colors.danger500,
  },
  text: {
    ...typography.caption200,
    textAlign: 'center',
    color: colors.misc100,
  },
});
