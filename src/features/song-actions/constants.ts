import type { TIcon } from '@/components';

export const SNAP_POINTS = ['100%'];

export const ACTION_ICON_SIZE = 20;

export const COVER_SIZE = 48;
export const CLOSE_ICON_SIZE = 16;
export const MIN_TOUCH_TARGET = 44;
export const CLOSE_HIT_SLOP = (MIN_TOUCH_TARGET - CLOSE_ICON_SIZE) / 2;

type SongAction = { key: string; label: string; icon: TIcon };
type SongActionSection = { key: string; actions: readonly SongAction[] };

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
