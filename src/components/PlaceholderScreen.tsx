import { StyleSheet, Text, View } from 'react-native';

type PlaceholderScreenProps = {
  title: string;
};

export const PlaceholderScreen = ({ title }: PlaceholderScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
