import type { ViewStyle } from 'react-native';

export const shadows = {
  /** Shakuro_Glassmorf/dark drop shadow (its 200 background blur is not implemented) */
  glassmorfDark: {
    boxShadow: '0px 0px 36.6px 0px rgba(18, 18, 19, 0.5)',
  },
} satisfies Record<string, ViewStyle>;
