import { memo, type FC } from 'react';
import type { SvgProps } from 'react-native-svg';

import { DEFAULT_ICON_COLOR, DEFAULT_ICON_SIZE } from './constants';
import { iconMap, type TIcon } from './types';

// Widened view of the map so unknown runtime names resolve to undefined.
const icons: Partial<Record<string, FC<SvgProps>>> = iconMap;

export type IconProps = { name: TIcon; size?: number } & SvgProps;

export const Icon: FC<IconProps> = memo(({
  name,
  size = DEFAULT_ICON_SIZE,
  color = DEFAULT_ICON_COLOR,
  width,
  height,
  ...rest
}: IconProps) => {
  const Component = icons[name];
  if (!Component) {
    return null;
  }

  return <Component width={width ?? size} height={height ?? size} color={color} {...rest} />;
});

Icon.displayName = 'Icon';
