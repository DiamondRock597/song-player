import {
  generationToRows,
  getRowCoverUrl,
  type GenerationsPage,
  type SongById,
  type SongItemRow,
} from '@/features/songs';

import { HISTORY_KEY_PREFIX } from './constants';

export type SearchRow = { type: 'history-header'; key: string } | { type: 'songs-header'; key: string } | SongItemRow;

export type SearchRowType = SearchRow['type'];


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
