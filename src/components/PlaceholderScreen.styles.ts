import { StyleSheet } from 'react-native';

import { colors, typography } from '@/theme';

export const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg900 },
  title: { ...typography.textTabbarActive, color: colors.txt500 },
});
