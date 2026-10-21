import { memo, type FC } from 'react';
import { Pressable, Text, View, type PressableStateCallbackType } from 'react-native';

import { Spinner } from '@/components';

import { STATUS_SPINNER_SIZE } from '../../constants';
import type { SearchResultsState } from '../../types';
import { styles } from './SearchStatus.styles';

type SearchStatusProps = {
  state: Exclude<SearchResultsState, 'ready'>;
  onRetry: () => void;
};

const retryStyle = ({ pressed }: PressableStateCallbackType) => (pressed ? styles.retryPressed : styles.retry);

export const SearchStatus: FC<SearchStatusProps> = memo(({ state, onRetry }: SearchStatusProps) => {
  switch (state) {
    case 'loading':
      return (
        <View style={styles.container}>
          <Spinner size={STATUS_SPINNER_SIZE} />
        </View>
      );
    case 'empty':
      return (
        <View style={styles.container}>
          <Text style={styles.title}>No songs found</Text>
          <Text style={styles.subtitle}>Try a different title</Text>
        </View>
      );
    case 'error':
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Couldn&apos;t load results</Text>
          <Pressable onPress={onRetry} accessibilityRole="button" accessibilityLabel="Retry" style={retryStyle}>
            <Text style={styles.retryText}>Retry</Text>
          </Pressable>
        </View>
      );
  }
});

SearchStatus.displayName = 'SearchStatus';
