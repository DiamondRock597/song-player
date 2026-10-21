import type { TextStyle } from 'react-native';

// Figma `Typography/Font family/font-family-body` = Inter. One family per weight,
// loaded by name in the root layout (see `fontAssets`).
export const fontFamily = {
  interMedium: 'Inter-Medium',
  interSemiBold: 'Inter-SemiBold',
} as const;

export const fontAssets = {
  [fontFamily.interMedium]: require('../../assets/fonts/Inter-Medium.ttf'),
  [fontFamily.interSemiBold]: require('../../assets/fonts/Inter-SemiBold.ttf'),
};

export const typography = {
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
  /**
   * Regular/text-xs: Inter Regular 12/16, letter spacing 0.
   * Inter-Regular.ttf is not in assets/fonts yet, so this uses the system font at 400.
   */
  textXsRegular: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
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
