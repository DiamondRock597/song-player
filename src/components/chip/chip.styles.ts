import { StyleSheet } from 'react-native';

import { colors, radii, spacing, typography } from '@/theme';

import { PRESSED_OPACITY, SEPARATOR_SIZE } from './constants';

export const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[1],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1.5],
    borderWidth: 1,
    borderRadius: radii.full,
    borderColor: colors.secondary500,
  },
  chipPressed: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[1],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1.5],
    borderWidth: 1,
    borderRadius: radii.full,
    borderColor: colors.secondary500,
    opacity: PRESSED_OPACITY,
  },
  chipSelected: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[1],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1.5],
    borderWidth: 1,
    borderRadius: radii.full,
    borderColor: colors.border500,
    backgroundColor: colors.bg800Active,
  },
  chipSelectedPressed: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[1],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1.5],
    borderWidth: 1,
    borderRadius: radii.full,
    borderColor: colors.border500,
    backgroundColor: colors.bg800Active,
    opacity: PRESSED_OPACITY,
  },
  label: {
    ...typography.caption250,
    color: colors.txt500,
  },
  labelSelected: {
    ...typography.caption250,
    color: colors.txt900,
  },
  subLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },
  separator: {
    width: SEPARATOR_SIZE,
    height: SEPARATOR_SIZE,
    borderRadius: radii.full,
    backgroundColor: colors.bg800Hover,
  },
  separatorSelected: {
    width: SEPARATOR_SIZE,
    height: SEPARATOR_SIZE,
    borderRadius: radii.full,
    backgroundColor: colors.border500,
  },
  count: {
    ...typography.caption250,
    color: colors.txt200,
  },
  countSelected: {
    ...typography.caption250,
    color: colors.txt900,
  },
});
