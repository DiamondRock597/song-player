import { Image } from 'expo-image';
import { memo, type FC } from 'react';
import { Pressable, Text, View } from 'react-native';

import { Icon } from '@/components';
import { colors } from '@/theme';

import { CLOSE_HIT_SLOP, CLOSE_ICON_SIZE } from '../../constants';
import { styles } from './SheetHeader.styles';

type SheetHeaderProps = {
  clipId: string | null;
  title: string;
  variant: number | null;
  tags: string;
  coverUrl: string | null;
  onClose: () => void;
};

export const SheetHeader: FC<SheetHeaderProps> = memo(({ clipId, title, variant, tags, coverUrl, onClose }: SheetHeaderProps) => (
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
