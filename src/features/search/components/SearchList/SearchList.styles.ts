import { StyleSheet } from 'react-native';

import { spacing } from '@/theme';

export const styles = StyleSheet.create({
  // The screen's KeyboardDock shrinks the list above the keyboard, so no keyboard insets here.
  list: { flex: 1 },
  content: { paddingHorizontal: spacing[5], paddingBottom: spacing[2] },
  historyHeader: { paddingBottom: spacing[1] },
  pageSpinner: {
    alignItems: 'center',
    paddingVertical: spacing[4],
  },
});
