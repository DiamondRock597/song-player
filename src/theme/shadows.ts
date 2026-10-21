import type { ViewStyle } from 'react-native';

export const shadows = {
  /** Shakuro_Glassmorf/dark drop shadow (its 200 background blur is not implemented) */
  glassmorfDark: {
    boxShadow: '0px 0px 36.6px 0px rgba(18, 18, 19, 0.5)',
  },
  /** Bottom sheet `modal` drop shadow: 0 -10 30, Colors/nav-background (#ADB3C9 at 10%) */
  sheetTop: {
    boxShadow: '0px -10px 30px 0px rgba(173, 179, 201, 0.1)',
  },
  /**
   * shadow-btn-xs-skeumorphic: drop 0 1 2 shadow-xs (#120F0A0D), inner 0 -2 0 shadow-skeumorphic-inner
   * (#120F0A0F), inner spread 1 shadow-skeumorphic-inner-border (#120F0A2E).
   */
  btnXsSkeumorphic: {
    boxShadow: [
      '0px 1px 2px 0px rgba(18, 15, 10, 0.05)',
      'inset 0px -2px 0px 0px rgba(18, 15, 10, 0.06)',
      'inset 0px 0px 0px 1px rgba(18, 15, 10, 0.18)',
    ].join(', '),
  },
} satisfies Record<string, ViewStyle>;
