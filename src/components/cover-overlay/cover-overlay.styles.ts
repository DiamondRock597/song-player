import { StyleSheet } from 'react-native';

import { colors, radii } from '@/theme';

import { INSET } from './constants';

export const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: INSET,
    right: INSET,
    bottom: INSET,
    left: INSET,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: radii.sm,
    backgroundColor: colors.overlays100,
  },
});
