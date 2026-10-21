import { memo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { Chip } from '@/components';
import { spacing } from '@/theme';

import type { SongFilter, SongFilterKey } from '../types';

const NAVBAR_HEIGHT = 44;
const FILTER_ICON_CHIP = 'filter-settings';

type SongsFilterBarProps = {
  filters: readonly SongFilter[];
  selected: SongFilterKey;
  onSelect: (key: string) => void;
};

export const SongsFilterBar = memo(({ filters, selected, onSelect }: SongsFilterBarProps) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={styles.bar}
    contentContainerStyle={styles.content}
  >
    <Chip value={FILTER_ICON_CHIP} icon="settings-slider-hor" accessibilityLabel="Filters" />
    {filters.map((filter) => (
      <Chip
        key={filter.key}
        value={filter.key}
        label={filter.label}
        count={filter.count}
        selected={filter.key === selected}
        onPress={onSelect}
      />
    ))}
  </ScrollView>
));

SongsFilterBar.displayName = 'SongsFilterBar';

const styles = StyleSheet.create({
  bar: {
    height: NAVBAR_HEIGHT,
    flexGrow: 0,
  },
  content: {
    alignItems: 'center',
    gap: spacing[2],
    paddingHorizontal: spacing[5],
  },
});
