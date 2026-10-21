import {
  generationToRows,
  getRowCoverUrl,
  type GenerationsPage,
  type SongById,
  type SongItemRow,
} from '@/features/songs';

// One FlashList row of the search screen: a section header, or a song row shared with the Songs list.
export type SearchRow = { type: 'history-header'; key: string } | { type: 'songs-header'; key: string } | SongItemRow;

export type SearchRowType = SearchRow['type'];

export const HISTORY_HEADER_ROW: SearchRow = { type: 'history-header', key: 'history-header' };
export const SONGS_HEADER_ROW: SearchRow = { type: 'songs-header', key: 'songs-header' };

// History and results share one FlashList, so history keys get their own namespace.
const HISTORY_KEY_PREFIX = 'history-';

// Results: every matching generation in API order, no date headers (one "Songs" section).
export const toResultRows = (pages: readonly GenerationsPage[]): SongItemRow[] =>
  pages.flatMap((page) => page.items.flatMap((generation) => generationToRows(generation)));

// History: one row per stored clip id, in history order. A completed generation contributes only
// that clip; an in-progress or failed one renders its single generation row.
export const toHistoryRows = (songs: readonly SongById[]): SongItemRow[] =>
  songs.flatMap(({ clipId, generation }) =>
    generationToRows(generation)
      .filter((row) => row.type !== 'clip' || row.clip.id === clipId)
      .map((row) => ({ ...row, key: `${HISTORY_KEY_PREFIX}${clipId}` })),
  );

export const getSearchRowType = (row: SearchRow): SearchRowType => row.type;

export const getSearchRowCoverUrl = (row: SearchRow): string | null =>
  row.type === 'history-header' || row.type === 'songs-header' ? null : getRowCoverUrl(row);
