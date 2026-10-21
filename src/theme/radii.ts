// Figma `Border Radius/<name>` variables, plus raw radii the components use without a variable.
export const radii = {
  /** Raw 3 in Figma: inner box of the tag count */
  xs: 3,
  /** Border Radius/DEFAULT */
  default: 4,
  /** Border Radius/md */
  md: 6,
  /** Raw 8 in Figma: progress bar track */
  lg: 8,
  /** Border Radius/xl */
  xl: 12,
  /** Border Radius/2xl */
  '2xl': 16,
  /** Border Radius/full */
  full: 9999,
} as const;
