import { StyleSheet } from 'react-native';

import { colors, radii, spacing, typography } from '@/theme';

import { FIELD_BUTTON_HEIGHT, FIELD_BUTTON_WIDTH, INPUT_HEIGHT, PRESSED_OPACITY } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1.5],
    paddingVertical: spacing[2],
    borderBottomWidth: 1,
    borderBottomColor: colors.border100,
  },
  input: {
    ...typography.body400,
    flex: 1,
    height: INPUT_HEIGHT,
    padding: 0,
    color: colors.txt900,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  button: {
    width: FIELD_BUTTON_WIDTH,
    height: FIELD_BUTTON_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.default,
  },
  buttonPressed: {
    width: FIELD_BUTTON_WIDTH,
    height: FIELD_BUTTON_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.default,
    opacity: PRESSED_OPACITY,
  },
});
