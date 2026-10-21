import { StyleSheet } from 'react-native';

import { colors, radii, shadows, spacing } from '@/theme';

export const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: colors.overlays200,
  },
  background: {
    ...shadows.sheetTop,
    backgroundColor: colors.bg900,
    borderTopLeftRadius: radii['2xl'],
    borderTopRightRadius: radii['2xl'],
  },
  content: {
    gap: 10,
    paddingHorizontal: spacing[5],
  },
  list: {
    gap: spacing[3],
  },
});
