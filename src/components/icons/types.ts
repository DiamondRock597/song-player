import type { FC } from 'react';
import type { SvgProps } from 'react-native-svg';

import Box2AltFill from './svg/box-2-alt-fill.svg';
import CrossLarge from './svg/cross-large.svg';
import DotGrid1x3Horizontal from './svg/dot-grid-1x3-horizontal.svg';
import Download01 from './svg/download-01.svg';
import ErrorIcon from './svg/error.svg';
import Extend from './svg/extend.svg';
import FolderAddRight from './svg/folder-add-right.svg';
import Headphones from './svg/headphones.svg';
import Loading04 from './svg/loading-04.svg';
import MusicNote01 from './svg/music-note-01.svg';
import MusicNote02 from './svg/music-note-02.svg';
import Pencil02 from './svg/pencil-02.svg';
import Playlist from './svg/playlist.svg';
import PlusLarge from './svg/plus-large.svg';
import Profile from './svg/profile.svg';
import RefreshCw03 from './svg/refresh-cw-03.svg';
import Scissors2 from './svg/scissors-2.svg';
import Search from './svg/search.svg';
import SettingsSliderHor from './svg/settings-slider-hor.svg';
import Share07 from './svg/share-07.svg';
import Star from './svg/star.svg';

// SVGs use `currentColor`, so the `color` prop tints them.
export const iconMap = {
  'box-2-alt-fill': Box2AltFill,
  'cross-large': CrossLarge,
  'dot-grid-1x3-horizontal': DotGrid1x3Horizontal,
  'download-01': Download01,
  error: ErrorIcon,
  extend: Extend,
  'folder-add-right': FolderAddRight,
  headphones: Headphones,
  'loading-04': Loading04,
  'music-note-01': MusicNote01,
  'music-note-02': MusicNote02,
  'pencil-02': Pencil02,
  playlist: Playlist,
  'plus-large': PlusLarge,
  profile: Profile,
  'refresh-cw-03': RefreshCw03,
  'scissors-2': Scissors2,
  search: Search,
  'settings-slider-hor': SettingsSliderHor,
  'share-07': Share07,
  star: Star,
} satisfies Record<string, FC<SvgProps>>;

export type TIcon = keyof typeof iconMap;
