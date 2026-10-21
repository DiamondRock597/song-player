import { memo, type RefObject, type FC } from 'react';
import { Pressable, View, type PressableStateCallbackType, type TextInputInstance } from 'react-native';

import { Icon } from '@/components';
import { colors } from '@/theme';

import { BACK_HIT_SLOP, BACK_ICON_SIZE } from '../../constants';
import { SearchField } from '../SearchField';
import { styles } from './SearchHeader.styles';

type SearchHeaderProps = {
  inputRef: RefObject<TextInputInstance | null>;
  hasText: boolean;
  onChangeText: (text: string) => void;
  onClear: () => void;
  onPressBack: () => void;
};

const backStyle = ({ pressed }: PressableStateCallbackType) => (pressed ? styles.backPressed : styles.back);

export const SearchHeader: FC<SearchHeaderProps> = memo(({ inputRef, hasText, onChangeText, onClear, onPressBack }: SearchHeaderProps) => (
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
