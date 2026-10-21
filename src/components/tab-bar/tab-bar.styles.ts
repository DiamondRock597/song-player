import { StyleSheet } from 'react-native';

import { colors, spacing } from '@/theme';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  bar: {
    flexDirection: 'row',
    paddingHorizontal: spacing[5],
    backgroundColor: colors.bg900,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
});
