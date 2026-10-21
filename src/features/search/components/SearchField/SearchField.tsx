import { memo, type RefObject, type FC } from 'react';
import {
  Pressable,
  TextInput,
  View,
  type PressableStateCallbackType,
  type TextInputInstance,
} from 'react-native';

import { Icon } from '@/components';
import { colors } from '@/theme';

import { CLEAR_HIT_SLOP, FIELD_ICON_SIZE, PLACEHOLDER } from '../../constants';
import { styles } from './SearchField.styles';

type SearchFieldProps = {
  inputRef: RefObject<TextInputInstance | null>;
  hasText: boolean;
  onChangeText: (text: string) => void;
  onClear: () => void;
};

const clearStyle = ({ pressed }: PressableStateCallbackType) => (pressed ? styles.buttonPressed : styles.button);

// The TextInput is uncontrolled (no `value`), so typing never waits on a JS render.
export const SearchField: FC<SearchFieldProps> = memo(({ inputRef, hasText, onChangeText, onClear }: SearchFieldProps) => (
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
        <Icon name="cross-large" size={FIELD_ICON_SIZE} color={colors.chevronIcon} />
      </Pressable>
    ) : (
      <View style={styles.button} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        <Icon name="search" size={FIELD_ICON_SIZE} color={colors.chevronIcon} />
      </View>
    )}
  </View>
));

SearchField.displayName = 'SearchField';
