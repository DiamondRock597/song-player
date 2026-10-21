import { memo, type RefObject } from 'react';
import { Pressable, StyleSheet, View, type PressableStateCallbackType, type TextInputInstance } from 'react-native';

import { Icon } from '@/components';
import { colors, spacing } from '@/theme';

import { SearchField } from './SearchField';

const BACK_ICON_SIZE = 16;
// Grows the 16pt back chevron to a 44pt touch target.
const BACK_HIT_SLOP = (44 - BACK_ICON_SIZE) / 2;
const PRESSED_OPACITY = 0.7;

type SearchHeaderProps = {
  inputRef: RefObject<TextInputInstance | null>;
  hasText: boolean;
  onChangeText: (text: string) => void;
  onClear: () => void;
  onPressBack: () => void;
};

// Module-level so pressing doesn't allocate a new style per render.
const backStyle = ({ pressed }: PressableStateCallbackType) => (pressed ? styles.backPressed : styles.back);

// Figma `header-mobile` (1:3134 / 1:3161): 20×16 padding, back chevron and the search field, 12 apart.
export const SearchHeader = memo(({ inputRef, hasText, onChangeText, onClear, onPressBack }: SearchHeaderProps) => (
  <View style={styles.container}>
    <Pressable
      onPress={onPressBack}
      hitSlop={BACK_HIT_SLOP}
      accessibilityRole="button"
      accessibilityLabel="Go back"
      style={backStyle}
    >
      <Icon name="chevron-left" size={BACK_ICON_SIZE} color={colors.txt900} />
    </Pressable>
    <SearchField inputRef={inputRef} hasText={hasText} onChangeText={onChangeText} onClear={onClear} />
  </View>
));

SearchHeader.displayName = 'SearchHeader';

const back = {
  width: BACK_ICON_SIZE,
  height: BACK_ICON_SIZE,
} as const;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[4],
  },
  back,
  backPressed: { ...back, opacity: PRESSED_OPACITY },
});
