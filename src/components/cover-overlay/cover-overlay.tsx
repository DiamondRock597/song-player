import { BlurView } from 'expo-blur';
import { memo, type ReactNode, type FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { blurs } from '@/theme';

import { styles } from './cover-overlay.styles';

export type CoverOverlayProps = {
  children: ReactNode;
};

// Place it inside a cover with `overflow: 'hidden'`. expo-blur blurs on iOS; Android falls back
// to a translucent fill.
export const CoverOverlay: FC<CoverOverlayProps> = memo(({ children }: CoverOverlayProps) => (
  <View style={styles.overlay} pointerEvents="none">
    <BlurView intensity={blurs.coverHover} tint="dark" style={StyleSheet.absoluteFill} />
    {children}
  </View>
));

CoverOverlay.displayName = 'CoverOverlay';
