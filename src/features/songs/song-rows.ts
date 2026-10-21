import type { GenerationsPage } from './api/songs-api';
import type { CompletedClip, FailedGeneration, InProgressGeneration } from './types';

// One FlashList row. An in-progress generation and a failed one each render as a single row;
// a completed generation contributes one row per clip.
export type SongRow =
  | { type: 'date-header'; key: string; dayKey: string; date: Date }
  | { type: 'in-progress'; key: string; generation: InProgressGeneration }
  | { type: 'failed'; key: string; generation: FailedGeneration }
  | { type: 'clip'; key: string; clip: CompletedClip; generationId: string };

export type SongRowType = SongRow['type'];

// Local calendar day, e.g. "2026-10-19".
const toDayKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

// Expects generations newest first (the API order). A day that spans two pages gets a single header.
export const flattenPages = (pages: readonly GenerationsPage[]): SongRow[] => {
  const rows: SongRow[] = [];
  let currentDay: string | null = null;

  for (const page of pages) {
    for (const generation of page.items) {
      const date = new Date(generation.createdAt);
      const dayKey = toDayKey(date);
      if (dayKey !== currentDay) {
        currentDay = dayKey;
        rows.push({ type: 'date-header', key: `date-${dayKey}`, dayKey, date });
      }

      switch (generation.status) {
        case 'in_progress':
          rows.push({ type: 'in-progress', key: generation.id, generation });
          break;
        case 'error':
          rows.push({ type: 'failed', key: generation.id, generation });
          break;
        case 'completed':
          for (const clip of generation.clips) {
            rows.push({ type: 'clip', key: clip.id, clip, generationId: generation.id });
          }
          break;
      }
    }
  }

  return rows;
};

export const getRowType = (row: SongRow): SongRowType => row.type;
