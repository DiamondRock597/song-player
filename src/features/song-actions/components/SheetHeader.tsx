import { Image } from 'expo-image';
import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Icon } from '@/components';
import { colors, radii, spacing, typography } from '@/theme';

const COVER_SIZE = 48;
const CLOSE_ICON_SIZE = 16;
const CLOSE_HIT_SLOP = (44 - CLOSE_ICON_SIZE) / 2;

type SheetHeaderProps = {
  clipId: string | null;
  title: string;
  variant: number | null;
  tags: string;
  coverUrl: string | null;
  onClose: () => void;
};

export const SheetHeader = memo(({ clipId, title, variant, tags, coverUrl, onClose }: SheetHeaderProps) => (
  <View>
    <View style={styles.row}>
      <Image
        source={coverUrl}
        recyclingKey={clipId}
        contentFit="cover"
        transition={150}
        style={styles.cover}
        accessibilityIgnoresInvertColors
      />
      <View style={styles.text}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {variant !== null && (
            <View style={styles.tag}>
              <View style={styles.tagCount}>
                <Text style={styles.tagCountText}>{variant}</Text>
              </View>
            </View>
          )}
        </View>
        {tags.length > 0 && (
          <Text style={styles.tags} numberOfLines={1}>
            {tags}
          </Text>
        )}
      </View>
    </View>
    <Pressable
      onPress={onClose}
      hitSlop={CLOSE_HIT_SLOP}
      accessibilityRole="button"
      accessibilityLabel="Close"
      style={styles.close}
    >
      <Icon name="cross-large" size={CLOSE_ICON_SIZE} color={colors.icon500} />
    </Pressable>
  </View>
));

SheetHeader.displayName = 'SheetHeader';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    paddingVertical: spacing[2],
  },
  cover: {
    width: COVER_SIZE,
    height: COVER_SIZE,
    borderRadius: radii.md,
    backgroundColor: colors.bg200,
  },
  text: {
    flex: 1,
    gap: spacing[1],
    paddingRight: CLOSE_ICON_SIZE + spacing[2],
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },
  title: {
    ...typography.textSmMedium,
    flexShrink: 1,
    color: colors.txt900,
  },
  tag: {
    padding: 1,
    borderRadius: radii.default,
    backgroundColor: colors.bg200,
  },
  tagCount: {
    height: 16,
    minWidth: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing[1],
    borderRadius: 3,
    backgroundColor: colors.bg800,
  },
  tagCountText: {
    ...typography.tagCount,
    // Figma sets an 18 line height inside a 16-tall box; 16 avoids clipping on Android.
    lineHeight: 16,
    textAlign: 'center',
    color: colors.txt900,
  },
  tags: {
    ...typography.textXsRegular,
    color: colors.txt200,
  },
  close: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
