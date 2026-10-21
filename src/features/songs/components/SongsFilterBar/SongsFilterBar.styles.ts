import { StyleSheet } from 'react-native';

import { spacing } from '@/theme';

import { NAVBAR_HEIGHT } from '../../constants';

export const styles = StyleSheet.create({
  bar: {
    height: NAVBAR_HEIGHT,
    flexGrow: 0,
  },
  content: {
    alignItems: 'center',
    gap: spacing[2],
    paddingHorizontal: spacing[5],
  },
});
