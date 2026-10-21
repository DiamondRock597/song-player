import { StyleSheet } from 'react-native';

import { spacing } from '@/theme';

import { ICON_SIZE } from './constants';

export const styles = StyleSheet.create({
  item: {
    flex: 1,
    paddingTop: spacing[2],
    paddingBottom: spacing[3],
  },
  content: {
    alignItems: 'center',
    gap: spacing[1],
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
  label: {
    alignSelf: 'stretch',
    textAlign: 'center',
  },
});
