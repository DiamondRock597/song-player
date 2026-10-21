import type { BottomSheetHandleProps } from '@gorhom/bottom-sheet';
import { memo, type FC } from 'react';
import { View } from 'react-native';

import { styles } from './SheetHandle.styles';

export const SheetHandle: FC<BottomSheetHandleProps> = memo((_props: BottomSheetHandleProps) => (
  <View style={styles.container}>
    <View style={styles.indicator} />
  </View>
));

SheetHandle.displayName = 'SheetHandle';
