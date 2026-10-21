import { simulateRequest, type RequestOptions } from '@/api';

import songsJson from '../../../../songs.json';

import type { Generation, SongsData } from '../types';

// Opaque to callers: pass back whatever nextCursor returned. Internally it is the offset.
export type GenerationsCursor = number;

export type GenerationsPage = {
  items: Generation[];
  nextCursor: GenerationsCursor | null;
};

const { generations } = songsJson as SongsData;

// Both variants share a title, but match any clip so a generation is kept or dropped as a whole.
const matchesTitle = (generation: Generation, needle: string) =>
  generation.clips.some((clip) => clip.title.toLowerCase().includes(needle));

// Pages by whole generations, so the two variants of a song always arrive together.
// `query` filters by title, case-insensitive; the cursor is an offset into the filtered list.
export const fetchGenerationsPage = ({
  cursor,
  limit,
  query,
}: {
  cursor: GenerationsCursor;
  limit: number;
  query?: string;
}, options?: RequestOptions): Promise<GenerationsPage> => {
  return simulateRequest(() => {
    const needle = query?.trim().toLowerCase();
    const source = needle ? generations.filter((generation) => matchesTitle(generation, needle)) : generations;

    const end = cursor + limit;
    return {
      items: source.slice(cursor, end),
      nextCursor: end < source.length ? end : null,
    };
  }, options);
};
