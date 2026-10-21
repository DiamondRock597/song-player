import { memo, type FC } from 'react';
import { Text, View } from 'react-native';

import { styles } from './count-tag.styles';

export type CountTagProps = {
  count: number | string;
};

export const CountTag: FC<CountTagProps> = memo(({ count }: CountTagProps) => (
  <View style={styles.tag}>
    <View style={styles.count}>
      <Text style={styles.text}>{count}</Text>
    </View>
  </View>
));

CountTag.displayName = 'CountTag';
