// Named after the Figma variables (`group/name` → camelCase).
export const colors = {
  /** Colors/Brand/brand */
  brand: '#FCB600',
  /** txt/200 (value as rendered in the songs-list frame 1:3080; the variable's default mode is #6E6E6E) */
  txt200: '#848484',
  /** overlays/200 (#1D1D1D at 15%) */
  overlays200: 'rgba(29, 29, 29, 0.15)',
  /** border/100 (#FFFFFF at 5%) */
  border100: 'rgba(255, 255, 255, 0.05)',
  /** bg/900: sheet background */
  bg900: '#0F0F0F',
  /** bg/800: sheet card, tag count */
  bg800: '#191919',
  /** bg/200: tag background */
  bg200: '#202020',
  /** bg/100: sheet grabber */
  bg100: '#3E3E3E',
  /** txt/900: primary text */
  txt900: '#FFFFFF',
  /** txt/500: secondary text */
  txt500: '#ACACAD',
  /** icon/500 */
  icon500: '#ACACAD',
  /** Divider between rows of a sheet card (raw stroke in Figma: #FFFFFF at 8%, no variable) */
  divider: 'rgba(255, 255, 255, 0.08)',
} as const;
