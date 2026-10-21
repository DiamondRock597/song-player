import { memo, type RefObject } from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type PressableStateCallbackType,
  type TextInputInstance,
} from 'react-native';

import { Icon } from '@/components';
import { colors, radii, spacing, typography } from '@/theme';

const PLACEHOLDER = 'Search songs, lyrics, and more';
const ICON_SIZE = 16;
const BUTTON_WIDTH = ICON_SIZE + spacing[1.5] * 2;
const BUTTON_HEIGHT = ICON_SIZE + spacing[1] * 2;
const MIN_TOUCH_TARGET = 44;
const CLEAR_HIT_SLOP = {
  top: (MIN_TOUCH_TARGET - BUTTON_HEIGHT) / 2,
  bottom: (MIN_TOUCH_TARGET - BUTTON_HEIGHT) / 2,
  left: (MIN_TOUCH_TARGET - BUTTON_WIDTH) / 2,
  right: (MIN_TOUCH_TARGET - BUTTON_WIDTH) / 2,
};
const INPUT_HEIGHT = 20;
const PRESSED_OPACITY = 0.7;

type SearchFieldProps = {
  inputRef: RefObject<TextInputInstance | null>;
  hasText: boolean;
  onChangeText: (text: string) => void;
  onClear: () => void;
};

const clearStyle = ({ pressed }: PressableStateCallbackType) => (pressed ? styles.buttonPressed : styles.button);

// The TextInput is uncontrolled (no `value`), so typing never waits on a JS render.
export const SearchField = memo(({ inputRef, hasText, onChangeText, onClear }: SearchFieldProps) => (
  <View style={styles.container}>
    <TextInput
      ref={inputRef}
      style={styles.input}
      autoFocus
      placeholder={PLACEHOLDER}
      placeholderTextColor={colors.txt100}
      selectionColor={colors.primary500}
      cursorColor={colors.primary500}
      keyboardAppearance="dark"
      returnKeyType="search"
      autoCorrect={false}
      autoCapitalize="none"
      accessibilityLabel="Search songs"
      onChangeText={onChangeText}
    />
    {hasText ? (
      <Pressable
        onPress={onClear}
        hitSlop={CLEAR_HIT_SLOP}
        accessibilityRole="button"
        accessibilityLabel="Clear search"
        style={clearStyle}
      >
        <Icon name="cross-large" size={ICON_SIZE} color={colors.chevronIcon} />
      </Pressable>
    ) : (
      <View style={styles.button} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        <Icon name="search" size={ICON_SIZE} color={colors.chevronIcon} />
      </View>
    )}
  </View>
));

SearchField.displayName = 'SearchField';

const button = {
  width: BUTTON_WIDTH,
  height: BUTTON_HEIGHT,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: radii.default,
} as const;

const styles = StyleSheet.create({
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
  button,
  buttonPressed: { ...button, opacity: PRESSED_OPACITY },
});
