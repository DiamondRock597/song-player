import type { SongItemRow } from '@/features/songs';
import { spacing } from '@/theme';

import type { SearchRow } from './search-rows';

export const MIN_TOUCH_TARGET = 44;
export const PRESSED_OPACITY = 0.7;

// Search field
export const PLACEHOLDER = 'Search songs, lyrics, and more';
export const FIELD_ICON_SIZE = 16;
export const FIELD_BUTTON_WIDTH = FIELD_ICON_SIZE + spacing[1.5] * 2;
export const FIELD_BUTTON_HEIGHT = FIELD_ICON_SIZE + spacing[1] * 2;
export const CLEAR_HIT_SLOP = {
  top: (MIN_TOUCH_TARGET - FIELD_BUTTON_HEIGHT) / 2,
  bottom: (MIN_TOUCH_TARGET - FIELD_BUTTON_HEIGHT) / 2,
  left: (MIN_TOUCH_TARGET - FIELD_BUTTON_WIDTH) / 2,
  right: (MIN_TOUCH_TARGET - FIELD_BUTTON_WIDTH) / 2,
};
export const INPUT_HEIGHT = 20;

// Search header
export const BACK_ICON_SIZE = 16;
export const BACK_HIT_SLOP = (MIN_TOUCH_TARGET - BACK_ICON_SIZE) / 2;

// Search list
export const HISTORY_TITLE = 'Search History';
export const SONGS_TITLE = 'Songs';
export const END_REACHED_THRESHOLD = 0.5;
export const PAGE_SPINNER_SIZE = 16;

// Search status
export const STATUS_TOP_OFFSET = 48;
export const STATUS_SPINNER_SIZE = 24;

// Rows
export const HISTORY_HEADER_ROW: SearchRow = { type: 'history-header', key: 'history-header' };
export const SONGS_HEADER_ROW: SearchRow = { type: 'songs-header', key: 'songs-header' };
// History and results share one FlashList, so history keys get their own namespace.
export const HISTORY_KEY_PREFIX = 'history-';
export const EMPTY_ROWS: readonly SearchRow[] = [];
export const EMPTY_ITEMS: readonly SongItemRow[] = [];

// Mock history (TEST_TASK allows it): three completed clips from songs.json, newest first.
export const MOCK_HISTORY_CLIP_IDS: readonly string[] = ['clip_000_1', 'clip_001_2', 'clip_002_1'];
