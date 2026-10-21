import { memo, type FC } from 'react';
import { Text, View } from 'react-native';

import { IconButton, type TIcon } from '@/components';
import { colors } from '@/theme';

import { styles } from './SongSectionHeader.styles';

type SongSectionHeaderProps = {
  title: string;
  actionIcon?: TIcon;
  actionLabel?: string;
  onPressAction?: () => void;
};

export const SongSectionHeader: FC<SongSectionHeaderProps> = memo(({ title, actionIcon, actionLabel, onPressAction }: SongSectionHeaderProps) => (
  <View style={styles.container}>
    <View style={styles.row}>
      <Text style={styles.title} numberOfLines={1} accessibilityRole="header">
        {title}
      </Text>
      {actionIcon && onPressAction ? (
        <IconButton
          icon={actionIcon}
          accessibilityLabel={actionLabel ?? title}
          onPress={onPressAction}
          color={colors.icon500}
        />
      ) : null}
    </View>
  </View>
));

SongSectionHeader.displayName = 'SongSectionHeader';
