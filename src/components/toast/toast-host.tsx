import type { FC } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast, { type ToastConfig } from 'react-native-toast-message';

import { spacing } from '@/theme';

import { MESSAGE_TOAST_TYPE, VISIBILITY_MS } from './constants';
import { styles } from './toast-host.styles';

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
export const ToastHost: FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <Toast
      config={toastConfig}
      topOffset={insets.top + spacing[2]}
      visibilityTime={VISIBILITY_MS}
    />
  );
};
