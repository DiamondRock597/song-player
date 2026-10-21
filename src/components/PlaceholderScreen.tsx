import type { FC } from 'react';
import { Text, View } from 'react-native';

import { styles } from './PlaceholderScreen.styles';

type PlaceholderScreenProps = {
  title: string;
};

export const PlaceholderScreen: FC<PlaceholderScreenProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};
