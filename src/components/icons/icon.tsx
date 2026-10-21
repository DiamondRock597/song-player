import { memo, type FC } from 'react';
import type { SvgProps } from 'react-native-svg';

import { colors } from '@/theme';

import { iconMap, type TIcon } from './types';

const DEFAULT_ICON_SIZE = 24;
const DEFAULT_ICON_COLOR = colors.txt200;

// Widened view of the map so unknown runtime names resolve to undefined.
const icons: Partial<Record<string, FC<SvgProps>>> = iconMap;

export type IconProps = { name: TIcon; size?: number } & SvgProps;

export const Icon = memo(({
  name,
  size = DEFAULT_ICON_SIZE,
  color = DEFAULT_ICON_COLOR,
  width,
  height,
  ...rest
}: IconProps) => {
  const Component = icons[name];
  if (!Component) return null;

  return <Component width={width ?? size} height={height ?? size} color={color} {...rest} />;
});

Icon.displayName = 'Icon';
