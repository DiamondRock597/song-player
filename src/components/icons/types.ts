import type { FC } from 'react';
import type { SvgProps } from 'react-native-svg';

import Box2AltFill from './svg/box-2-alt-fill.svg';
import CrossLarge from './svg/cross-large.svg';
import Download01 from './svg/download-01.svg';
import Extend from './svg/extend.svg';
import FolderAddRight from './svg/folder-add-right.svg';
import Headphones from './svg/headphones.svg';
import MusicNote01 from './svg/music-note-01.svg';
import MusicNote02 from './svg/music-note-02.svg';
import Pencil02 from './svg/pencil-02.svg';
import Playlist from './svg/playlist.svg';
import Profile from './svg/profile.svg';
import RefreshCw03 from './svg/refresh-cw-03.svg';
import Scissors2 from './svg/scissors-2.svg';
import Share07 from './svg/share-07.svg';
import Star from './svg/star.svg';

// SVGs use `currentColor`, so the `color` prop tints them.
export const iconMap = {
  'box-2-alt-fill': Box2AltFill,
  'cross-large': CrossLarge,
  'download-01': Download01,
  extend: Extend,
  'folder-add-right': FolderAddRight,
  headphones: Headphones,
  'music-note-01': MusicNote01,
  'music-note-02': MusicNote02,
  'pencil-02': Pencil02,
  playlist: Playlist,
  profile: Profile,
  'refresh-cw-03': RefreshCw03,
  'scissors-2': Scissors2,
  'share-07': Share07,
  star: Star,
} satisfies Record<string, FC<SvgProps>>;

export type TIcon = keyof typeof iconMap;
