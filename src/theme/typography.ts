import type { TextStyle } from 'react-native';

// Figma `Typography/Font family/font-family-body` = Inter. One family per weight,
// loaded by name in the root layout (see `fontAssets`).
export const fontFamily = {
  interRegular: 'Inter-Regular',
  interMedium: 'Inter-Medium',
  interSemiBold: 'Inter-SemiBold',
} as const;

export const fontAssets = {
  [fontFamily.interRegular]: require('../../assets/fonts/Inter-Regular.ttf'),
  [fontFamily.interMedium]: require('../../assets/fonts/Inter-Medium.ttf'),
  [fontFamily.interSemiBold]: require('../../assets/fonts/Inter-SemiBold.ttf'),
};

export const typography = {
  /**
   * title/200: Forma DJR Display 600, 20/28, letter spacing 0.2.
   * TODO: swap back to Forma DJR Display once the font is licensed and bundled (Inter SemiBold stands in).
   */
  title200: {
    fontFamily: fontFamily.interSemiBold,
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.2,
  },
  /**
   * nav/100: Forma DJR Display 600, 12/16, letter spacing 1. Section headers (uppercased at the call site).
   * TODO: swap back to Forma DJR Display once the font is licensed and bundled (Inter SemiBold stands in).
   */
  nav100: {
    fontFamily: fontFamily.interSemiBold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1,
  },
  /** body/400: Inter Regular 14/20, letter spacing 0. List row title */
  body400: {
    fontFamily: fontFamily.interRegular,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
  },
  /** caption/200: Inter Regular 12/16, letter spacing 0. Row supporting text, tag count, badge */
  caption200: {
    fontFamily: fontFamily.interRegular,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0,
  },
  /** caption/250: Inter Medium 12/16, letter spacing 0. Filter chips */
  caption250: {
    fontFamily: fontFamily.interMedium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0,
  },
  /** text-tabbar: Inter Medium 10/12, letter spacing 0 */
  textTabbar: {
    fontFamily: fontFamily.interMedium,
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 0,
  },
  /** text-tabbar, active tab: same metrics in SemiBold */
  textTabbarActive: {
    fontFamily: fontFamily.interSemiBold,
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 0,
  },
  /** Medium/text-sm: Inter Medium 14/20, letter spacing 0 */
  textSmMedium: {
    fontFamily: fontFamily.interMedium,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
  },
  /** Regular/text-xs: Inter Regular 12/16, letter spacing 0 */
  textXsRegular: {
    fontFamily: fontFamily.interRegular,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0,
  },
  /**
   * btn/200: Forma DJR Display Medium 14/20, letter spacing 0.4.
   * Forma DJR Display is not bundled; Inter Medium stands in.
   */
  btn200: {
    fontFamily: fontFamily.interMedium,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.4,
  },
  /**
   * Tag count: Forma DJR Display Medium 12, line height Font Size/lg (18).
   * Inter Medium stands in for Forma DJR Display.
   */
  tagCount: {
    fontFamily: fontFamily.interMedium,
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0,
  },
} satisfies Record<string, TextStyle>;
