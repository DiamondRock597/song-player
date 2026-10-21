import type { BottomSheetHandleProps } from '@gorhom/bottom-sheet';
import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, radii, spacing } from '@/theme';

// Figma `top` (1:5528): 8 above, 12 below, a 32×4 pill. The library makes it draggable.
export const SheetHandle = memo((_props: BottomSheetHandleProps) => (
  <View style={styles.container}>
    <View style={styles.indicator} />
  </View>
));

SheetHandle.displayName = 'SheetHandle';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: spacing[2],
    paddingBottom: spacing[3],
  },
  indicator: {
    width: 32,
    height: 4,
    borderRadius: radii.full,
    backgroundColor: colors.bg100,
  },
});
