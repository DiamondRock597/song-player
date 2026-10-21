import { StyleSheet } from 'react-native';

import { colors, radii, spacing, typography } from '@/theme';

import { COUNT_HEIGHT } from './constants';

export const styles = StyleSheet.create({
  tag: {
    padding: 1,
    borderRadius: radii.default,
    backgroundColor: colors.bg200,
  },
  count: {
    height: COUNT_HEIGHT,
    minWidth: COUNT_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing[1],
    borderRadius: radii.xs,
    backgroundColor: colors.bg800,
  },
  text: {
    ...typography.caption200,
    textAlign: 'center',
    color: colors.txt900,
  },
});
