import type { TIcon } from '@/components';

type SongAction = { key: string; label: string; icon: TIcon };
type SongActionSection = { key: string; actions: readonly SongAction[] };

// One entry per card in the sheet, in design order (Figma 1:5534).
export const SONG_ACTION_SECTIONS = [
  {
    key: 'generate',
    actions: [{ key: 'generate-again', label: 'Generate Again', icon: 'refresh-cw-03' }],
  },
  {
    key: 'library',
    actions: [
      { key: 'add-to-favorites', label: 'Add to Favorites', icon: 'star' },
      { key: 'share', label: 'Share', icon: 'share-07' },
      { key: 'download', label: 'Download', icon: 'download-01' },
    ],
  },
  {
    key: 'view',
    actions: [
      { key: 'full-song', label: 'Full Song', icon: 'music-note-01' },
      { key: 'lyrics', label: 'Lyrics', icon: 'pencil-02' },
    ],
  },
  {
    key: 'edit',
    actions: [
      { key: 'extend', label: 'Extend', icon: 'extend' },
      { key: 'cut', label: 'Cut', icon: 'scissors-2' },
      { key: 'get-stems', label: 'Get Stems', icon: 'playlist' },
    ],
  },
  {
    key: 'organize',
    actions: [{ key: 'add-to-folder', label: 'Add to Folder', icon: 'folder-add-right' }],
  },
  {
    key: 'archive',
    actions: [{ key: 'archive', label: 'Archive', icon: 'box-2-alt-fill' }],
  },
] as const satisfies readonly SongActionSection[];

export type SongActionKey = (typeof SONG_ACTION_SECTIONS)[number]['actions'][number]['key'];
