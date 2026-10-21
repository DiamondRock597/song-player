import { memo, type FC } from 'react';
import { ScrollView } from 'react-native';

import { Chip } from '@/components';

import { FILTER_ICON_CHIP } from '../../constants';
import type { SongFilter, SongFilterKey } from '../../types';
import { styles } from './SongsFilterBar.styles';

type SongsFilterBarProps = {
  filters: readonly SongFilter[];
  selected: SongFilterKey;
  onSelect: (key: string) => void;
};

export const SongsFilterBar: FC<SongsFilterBarProps> = memo(({ filters, selected, onSelect }: SongsFilterBarProps) => (
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
