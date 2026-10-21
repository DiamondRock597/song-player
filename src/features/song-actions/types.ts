import type { SONG_ACTION_SECTIONS } from './constants';

export type SongActionKey = (typeof SONG_ACTION_SECTIONS)[number]['actions'][number]['key'];
