import { StyleSheet } from 'react-native';

import { colors, radii } from '@/theme';

export const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderRadius: radii.xl,
    backgroundColor: colors.bg800,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
  },
});
