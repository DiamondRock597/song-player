import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '@/theme';

const COUNT_HEIGHT = 16;

export type CountTagProps = {
  count: number | string;
};

export const CountTag = memo(({ count }: CountTagProps) => (
  <View style={styles.tag}>
    <View style={styles.count}>
      <Text style={styles.text}>{count}</Text>
    </View>
  </View>
));

CountTag.displayName = 'CountTag';

const styles = StyleSheet.create({
  tag: {
    padding: 1,
    borderRadius: radii.default,
    backgroundColor: colors.bg200,
  },
  count: {
    height: COUNT_HEIGHT,
    minWidth: COUNT_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing[1],
    borderRadius: radii.xs,
    backgroundColor: colors.bg800,
  },
  text: {
    ...typography.caption200,
    textAlign: 'center',
    color: colors.txt900,
  },
});
