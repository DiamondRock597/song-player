import { StyleSheet } from 'react-native';

import { colors, radii } from '@/theme';

import { COVER_SIZE } from '../../constants';

export const styles = StyleSheet.create({
  cover: {
    width: COVER_SIZE,
    height: COVER_SIZE,
    overflow: 'hidden',
    borderRadius: radii.md,
    backgroundColor: colors.bg200,
  },
  image: {
    width: COVER_SIZE,
    height: COVER_SIZE,
    backgroundColor: colors.bg200,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.default,
    backgroundColor: colors.overlays200,
  },
  failed: {
    width: COVER_SIZE,
    height: COVER_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.md,
    backgroundColor: colors.danger500,
  },
});
