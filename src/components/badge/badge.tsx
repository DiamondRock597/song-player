import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '@/theme';

export type BadgeTone = 'danger';

export type BadgeProps = {
  label: string;
  tone?: BadgeTone;
};

// Figma `Tag-origin` (text variant): 8×2 padding, radius md, caption/200 text.
export const Badge = memo(({ label, tone = 'danger' }: BadgeProps) => (
  <View style={containerByTone[tone]}>
    <Text style={styles.text} numberOfLines={1}>
      {label}
    </Text>
  </View>
));

Badge.displayName = 'Badge';

const container = {
  paddingHorizontal: spacing[2],
  paddingVertical: spacing[0.5],
  borderRadius: radii.md,
} as const;

const styles = StyleSheet.create({
  danger: { ...container, backgroundColor: colors.danger500 },
  text: {
    ...typography.caption200,
    textAlign: 'center',
    color: colors.misc100,
  },
});

const containerByTone = {
  danger: styles.danger,
} satisfies Record<BadgeTone, object>;
