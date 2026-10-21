import { StyleSheet } from 'react-native';

import { colors, radii, spacing } from '@/theme';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: spacing[2],
    paddingBottom: spacing[3],
  },
  indicator: {
    width: 32,
    height: 4,
    borderRadius: radii.full,
    backgroundColor: colors.bg100,
  },
});
