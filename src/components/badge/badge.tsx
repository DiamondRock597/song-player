import { memo, type FC } from 'react';
import { Text, View } from 'react-native';

import { styles } from './badge.styles';

export type BadgeTone = 'danger';

export type BadgeProps = {
  label: string;
  tone?: BadgeTone;
};

const containerByTone = {
  danger: styles.danger,
} satisfies Record<BadgeTone, object>;

export const Badge: FC<BadgeProps> = memo(({ label, tone = 'danger' }: BadgeProps) => (
  <View style={containerByTone[tone]}>
    <Text style={styles.text} numberOfLines={1}>
      {label}
    </Text>
  </View>
));

Badge.displayName = 'Badge';
