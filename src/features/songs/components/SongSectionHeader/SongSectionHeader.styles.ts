import { StyleSheet } from 'react-native';

import { colors, spacing, typography } from '@/theme';

import { HEADER_ROW_HEIGHT } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    paddingTop: spacing[4],
  },
  row: {
    height: HEADER_ROW_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    ...typography.nav100,
    flexShrink: 1,
    paddingTop: 1,
    textTransform: 'uppercase',
    color: colors.txt100,
  },
});
