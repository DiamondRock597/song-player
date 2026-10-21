import { BlurView } from 'expo-blur';
import { memo, type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { blurs, colors, radii } from '@/theme';

const INSET = '6.25%';

export type CoverOverlayProps = {
  children: ReactNode;
};

// Place it inside a cover with `overflow: 'hidden'`. expo-blur blurs on iOS; Android falls back
// to a translucent fill.
export const CoverOverlay = memo(({ children }: CoverOverlayProps) => (
  <View style={styles.overlay} pointerEvents="none">
    <BlurView intensity={blurs.coverHover} tint="dark" style={StyleSheet.absoluteFill} />
    {children}
  </View>
));

CoverOverlay.displayName = 'CoverOverlay';

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: INSET,
    right: INSET,
    bottom: INSET,
    left: INSET,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: radii.sm,
    backgroundColor: colors.overlays100,
  },
});
