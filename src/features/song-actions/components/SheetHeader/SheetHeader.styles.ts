import { StyleSheet } from 'react-native';

import { colors, radii, spacing, typography } from '@/theme';

import { CLOSE_ICON_SIZE, COVER_SIZE } from '../../constants';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    paddingVertical: spacing[2],
  },
  cover: {
    width: COVER_SIZE,
    height: COVER_SIZE,
    borderRadius: radii.md,
    backgroundColor: colors.bg200,
  },
  text: {
    flex: 1,
    gap: spacing[1],
    paddingRight: CLOSE_ICON_SIZE + spacing[2],
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },
  title: {
    ...typography.textSmMedium,
    flexShrink: 1,
    color: colors.txt900,
  },
  tag: {
    padding: 1,
    borderRadius: radii.default,
    backgroundColor: colors.bg200,
  },
  tagCount: {
    height: 16,
    minWidth: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing[1],
    borderRadius: 3,
    backgroundColor: colors.bg800,
  },
  tagCountText: {
    ...typography.tagCount,
    // Figma sets an 18 line height inside a 16-tall box; 16 avoids clipping on Android.
    lineHeight: 16,
    textAlign: 'center',
    color: colors.txt900,
  },
  tags: {
    ...typography.textXsRegular,
    color: colors.txt200,
  },
  close: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
