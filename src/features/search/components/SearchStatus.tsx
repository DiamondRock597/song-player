import { memo } from 'react';
import { Pressable, StyleSheet, Text, View, type PressableStateCallbackType } from 'react-native';

import { Spinner } from '@/components';
import { colors, spacing, typography } from '@/theme';

import type { SearchResultsState } from '../types';

// Not in Figma: the loading / empty / error blocks sit centred, 48pt under the "Songs" header.
const TOP_OFFSET = 48;
const SPINNER_SIZE = 24;
const MIN_TOUCH_TARGET = 44;
const PRESSED_OPACITY = 0.7;

type SearchStatusProps = {
  state: Exclude<SearchResultsState, 'ready'>;
  onRetry: () => void;
};

// Module-level so pressing doesn't allocate a new style per render.
const retryStyle = ({ pressed }: PressableStateCallbackType) => (pressed ? styles.retryPressed : styles.retry);

export const SearchStatus = memo(({ state, onRetry }: SearchStatusProps) => {
  switch (state) {
    case 'loading':
      return (
        <View style={styles.container}>
          <Spinner size={SPINNER_SIZE} />
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

const retry = {
  minHeight: MIN_TOUCH_TARGET,
  justifyContent: 'center',
  paddingHorizontal: spacing[3],
} as const;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing[1],
    paddingTop: TOP_OFFSET,
  },
  title: {
    ...typography.body400,
    textAlign: 'center',
    color: colors.txt900,
  },
  subtitle: {
    ...typography.caption200,
    textAlign: 'center',
    color: colors.txt200,
  },
  retry,
  retryPressed: { ...retry, opacity: PRESSED_OPACITY },
  retryText: {
    ...typography.btn200,
    color: colors.primary500,
  },
});
