import {
  generationToRows,
  getRowCoverUrl,
  type GenerationsPage,
  type SongById,
  type SongItemRow,
} from '@/features/songs';

export type SearchRow = { type: 'history-header'; key: string } | { type: 'songs-header'; key: string } | SongItemRow;

export type SearchRowType = SearchRow['type'];

export const HISTORY_HEADER_ROW: SearchRow = { type: 'history-header', key: 'history-header' };
export const SONGS_HEADER_ROW: SearchRow = { type: 'songs-header', key: 'songs-header' };

// History and results share one FlashList, so history keys get their own namespace.
const HISTORY_KEY_PREFIX = 'history-';

export const toResultRows = (pages: readonly GenerationsPage[]): SongItemRow[] =>
  pages.flatMap((page) => page.items.flatMap((generation) => generationToRows(generation)));

export const toHistoryRows = (songs: readonly SongById[]): SongItemRow[] =>
  songs.flatMap(({ clipId, generation }) =>
    generationToRows(generation)
      .filter((row) => row.type !== 'clip' || row.clip.id === clipId)
      .map((row) => ({ ...row, key: `${HISTORY_KEY_PREFIX}${clipId}` })),
  );

export const getSearchRowType = (row: SearchRow): SearchRowType => row.type;

export const getSearchRowCoverUrl = (row: SearchRow): string | null =>
  row.type === 'history-header' || row.type === 'songs-header' ? null : getRowCoverUrl(row);
