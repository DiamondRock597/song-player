import { StyleSheet } from 'react-native';

import { colors, radii, spacing } from '@/theme';

import { FILL_HEIGHT, FILL_TRANSITION_MS } from './constants';

export const styles = StyleSheet.create({
  track: {
    alignSelf: 'stretch',
    padding: spacing[0.5],
    borderRadius: radii.lg,
    backgroundColor: colors.border100,
  },
  fill: {
    height: FILL_HEIGHT,
    borderRadius: radii.default,
    backgroundColor: colors.primary500,
    transitionProperty: 'width',
    transitionDuration: FILL_TRANSITION_MS,
    transitionTimingFunction: 'ease-out',
  },
});
