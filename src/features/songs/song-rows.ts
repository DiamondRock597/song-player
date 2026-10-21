import type { GenerationsPage } from './api';
import type { CompletedClip, FailedGeneration, Generation, InProgressGeneration } from './types';

export type SongRow =
  | { type: 'in-progress-header'; key: string }
  | { type: 'date-header'; key: string; dayKey: string; date: Date }
  | { type: 'in-progress'; key: string; generation: InProgressGeneration }
  | { type: 'failed'; key: string; generation: FailedGeneration }
  | { type: 'clip'; key: string; clip: CompletedClip; generationId: string };

export type SongRowType = SongRow['type'];

export type SongItemRow = Extract<SongRow, { type: 'in-progress' | 'failed' | 'clip' }>;

// The song rows of one generation. `keyPrefix` keeps keys unique when the same song appears
// in two lists that share a FlashList (e.g. search history and results).
export const generationToRows = (generation: Generation, keyPrefix = ''): SongItemRow[] => {
  switch (generation.status) {
    case 'in_progress':
      return [{ type: 'in-progress', key: `${keyPrefix}${generation.id}`, generation }];
    case 'error':
      return [{ type: 'failed', key: `${keyPrefix}${generation.id}`, generation }];
    case 'completed':
      return generation.clips.map((clip) => ({
        type: 'clip',
        key: `${keyPrefix}${clip.id}`,
        clip,
        generationId: generation.id,
      }));
  }
};

const toDayKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

const IN_PROGRESS_SECTION = 'in-progress';

// Expects generations newest first (the API order). A day that spans two pages gets a single header.
// In-progress generations (at the top in the API order) go under one "New in progress" header
// instead of their date header.
export const flattenPages = (pages: readonly GenerationsPage[]): SongRow[] => {
  const rows: SongRow[] = [];
  let currentSection: string | null = null;

  for (const page of pages) {
    for (const generation of page.items) {
      const date = new Date(generation.createdAt);
      const dayKey = toDayKey(date);
      const section = generation.status === 'in_progress' ? IN_PROGRESS_SECTION : dayKey;
      if (section !== currentSection) {
        currentSection = section;
        rows.push(
          section === IN_PROGRESS_SECTION
            ? { type: 'in-progress-header', key: `in-progress-${generation.id}` }
            : { type: 'date-header', key: `date-${dayKey}`, dayKey, date },
        );
      }

      rows.push(...generationToRows(generation));
    }
  }

  return rows;
};

export const getRowType = (row: SongRow): SongRowType => row.type;

export const getRowCoverUrl = (row: SongRow): string | null => {
  switch (row.type) {
    case 'clip':
      return row.clip.coverUrl;
    case 'in-progress':
      return row.generation.clips[0]?.coverUrl ?? null;
    default:
      return null;
  }
};
