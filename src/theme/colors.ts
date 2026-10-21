// Named after the Figma variables (`group/name` → camelCase). Values are the dark mode.
export const colors = {
  /** Colors/Brand/brand */
  brand: '#FCB600',
  /** primary/500: progress bar fill, primary icon button */
  primary500: '#FCB600',
  /** primary/100-contrast: icon on a primary fill */
  primary100Contrast: '#18191D',
  /** Raw 2pt stroke of the primary icon button in Figma (#FFFFFF at 20%, no variable) */
  primaryButtonBorder: 'rgba(255, 255, 255, 0.2)',
  /** secondary/500: unselected chip border */
  secondary500: '#202020',
  /** border/500: selected chip border and separator dot */
  border500: '#404040',
  /** bg/800-active: selected chip background */
  bg800Active: '#202020',
  /** bg/800-hover: unselected chip separator dot */
  bg800Hover: '#272727',
  /** danger/500: error cover and badge */
  danger500: '#D2123B',
  /** misc/100: text on coloured fills (error badge), spinner */
  misc100: '#FFFFFF',
  /** txt/100: section headers */
  txt100: '#585858',
  /** txt/200: supporting text (tags, progress, failure message), inactive tab, `⋯` icon */
  txt200: '#6E6E6E',
  /** overlays/200 (#1D1D1D at 15%) */
  overlays200: 'rgba(29, 29, 29, 0.15)',
  /** overlays/100 (#1D1D1D at 1%): blurred play/pause layer over a cover */
  overlays100: 'rgba(29, 29, 29, 0.01)',
  /** Raw stroke of the mini player chevron in Figma (#BDC2CE, no variable) */
  chevronIcon: '#BDC2CE',
  /** border/100 (#FFFFFF at 5%): progress bar track */
  border100: 'rgba(255, 255, 255, 0.05)',
  /** bg/900: screen and sheet background */
  bg900: '#0F0F0F',
  /** bg/800: sheet card, tag count */
  bg800: '#191919',
  /** bg/300: mini player progress track */
  bg300: '#1E1E1E',
  /** bg/200: tag background, empty cover */
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
