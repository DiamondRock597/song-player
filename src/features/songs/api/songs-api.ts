import { simulateRequest, type RequestOptions } from '@/api';

import songsJson from '../../../../songs.json';

import { DIACRITICS } from '../constants';
import type { Generation, SongsData } from '../types';

export type GenerationsCursor = number;

export type GenerationsPage = {
  items: Generation[];
  nextCursor: GenerationsCursor | null;
};

export type SongById = {
  clipId: string;
  generation: Generation;
};

const { generations } = songsJson as SongsData;

const normalizeForSearch = (text: string) => text.normalize('NFD').replace(DIACRITICS, '').toLowerCase();

// Normalized once: the titles never change, and every keystroke filters all of them.
const searchableTitles = new Map(
  generations.map((generation) => [generation.id, generation.clips.map((clip) => normalizeForSearch(clip.title))]),
);

const generationByClipId = new Map(
  generations.flatMap((generation) => generation.clips.map((clip) => [clip.id, generation] as const)),
);

// Both variants share a title, but match any clip so a generation is kept or dropped as a whole.
const matchesTitle = (generation: Generation, needle: string) =>
  searchableTitles.get(generation.id)?.some((title) => title.includes(needle)) ?? false;

// Pages by whole generations, so the two variants of a song always arrive together.
// `query` filters by title, case- and accent-insensitive; the cursor is an offset into the filtered list.
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
    const needle = query ? normalizeForSearch(query.trim()) : '';
    const source = needle ? generations.filter((generation) => matchesTitle(generation, needle)) : generations;

    const end = cursor + limit;
    return {
      items: source.slice(cursor, end),
      nextCursor: end < source.length ? end : null,
    };
  }, options);
};

export const getSongsByIds = (
  { ids }: { ids: readonly string[] },
  options?: RequestOptions,
): Promise<SongById[]> => {
  return simulateRequest(
    () =>
      ids.flatMap((clipId) => {
        const generation = generationByClipId.get(clipId);
        return generation ? [{ clipId, generation }] : [];
      }),
    options,
  );
};
