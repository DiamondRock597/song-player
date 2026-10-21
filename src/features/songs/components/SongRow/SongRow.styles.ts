import { StyleSheet } from 'react-native';

import { colors, radii, spacing, typography } from '@/theme';

import { PRESSED_OPACITY, PROGRESS_LABEL_WIDTH, SUPPORTING_LINE_HEIGHT } from '../../constants';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: radii.xl,
    overflow: 'hidden',
  },
  rowPressed: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: radii.xl,
    overflow: 'hidden',
    opacity: PRESSED_OPACITY,
  },
  text: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing[1],
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },
  titleRowFailed: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  title: {
    ...typography.body400,
    flexShrink: 1,
    color: colors.txt900,
  },
  supportingLine: {
    height: SUPPORTING_LINE_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },
  progressLabelBox: {
    width: PROGRESS_LABEL_WIDTH,
  },
  progressBar: {
    flex: 1,
  },
  supportingText: {
    ...typography.caption200,
    flexShrink: 1,
    color: colors.txt200,
  },
});
