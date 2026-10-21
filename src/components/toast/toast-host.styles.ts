import { StyleSheet } from 'react-native';

import { colors, radii, spacing, typography } from '@/theme';

export const styles = StyleSheet.create({
  toast: {
    maxWidth: '90%',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.divider,
    backgroundColor: colors.bg200,
  },
  text: {
    ...typography.textSmMedium,
    color: colors.txt900,
    textAlign: 'center',
  },
});
