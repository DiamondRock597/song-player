import type { SongFilter, SongFilterKey } from './types';

// Mock counts from the design; filtering itself is not implemented.
export const SONG_FILTERS: readonly SongFilter[] = [
  { key: 'songs', label: 'Songs', count: 42 },
  { key: 'folders', label: 'Folders', count: 4 },
  { key: 'favorites', label: 'Favorites', count: 12 },
  { key: 'archive', label: 'Archive', count: 3 },
];

export const DEFAULT_SONG_FILTER: SongFilterKey = 'songs';

export const isSongFilterKey = (value: string): value is SongFilterKey =>
  SONG_FILTERS.some((filter) => filter.key === value);
