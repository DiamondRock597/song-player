import type { FC } from 'react';
import type { SvgProps } from 'react-native-svg';

// One import per file in ./svg, sorted alphabetically:
// import Play from './svg/play.svg';

export const iconMap = {
  // 'play': Play,
} satisfies Record<string, FC<SvgProps>>;

export type TIcon = keyof typeof iconMap;
