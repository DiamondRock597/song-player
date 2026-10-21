import { StyleSheet, Text, View } from 'react-native';

import { colors, typography } from '@/theme';

type PlaceholderScreenProps = {
  title: string;
};

export const PlaceholderScreen = ({ title }: PlaceholderScreenProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg900 },
  title: { ...typography.textTabbarActive, color: colors.txt500 },
});
