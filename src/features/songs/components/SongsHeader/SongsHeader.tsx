import { memo, type FC } from 'react';
import { Text, View } from 'react-native';

import { IconButton } from '@/components';

import { styles } from './SongsHeader.styles';

type SongsHeaderProps = {
  onPressSearch: () => void;
  onPressCreate: () => void;
};

export const SongsHeader: FC<SongsHeaderProps> = memo(({ onPressSearch, onPressCreate }: SongsHeaderProps) => (
  <View style={styles.container}>
    <Text style={styles.title} numberOfLines={1} accessibilityRole="header">
      Songs
    </Text>
    <View style={styles.actions}>
      <IconButton icon="search" variant="ghost" accessibilityLabel="Search songs" onPress={onPressSearch} />
      <IconButton icon="plus-large" variant="primary" accessibilityLabel="Create song" onPress={onPressCreate} />
    </View>
  </View>
));

SongsHeader.displayName = 'SongsHeader';
