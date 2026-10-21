import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast, { type ToastConfig } from 'react-native-toast-message';

import { colors, radii, spacing, typography } from '@/theme';

import { MESSAGE_TOAST_TYPE } from './toast';

const VISIBILITY_MS = 2000;

const toastConfig: ToastConfig = {
  [MESSAGE_TOAST_TYPE]: ({ text1 }) => (
    <View style={styles.toast} accessibilityRole="alert" accessibilityLiveRegion="polite">
      <Text style={styles.text} numberOfLines={2}>
        {text1}
      </Text>
    </View>
  ),
};

// Mount once, as the last child of the root layout, so it draws above sheets and modals.
export const ToastHost = () => {
  const insets = useSafeAreaInsets();

  return (
    <Toast
      config={toastConfig}
      topOffset={insets.top + spacing[2]}
      visibilityTime={VISIBILITY_MS}
    />
  );
};

const styles = StyleSheet.create({
  toast: {
    maxWidth: '90%',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.divider,
    backgroundColor: colors.bg200,
  },
  text: {
    ...typography.textSmMedium,
    color: colors.txt900,
    textAlign: 'center',
  },
});
