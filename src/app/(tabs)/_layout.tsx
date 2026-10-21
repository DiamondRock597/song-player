import { Tabs } from 'expo-router';

// Tab order follows the design: Create / Songs / Lyrics / Account.
// Only Songs is implemented; the other tabs are visual placeholders.
// `index` (Songs) is the group's initial route by default.
const TabsLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="create" options={{ title: 'Create' }} />
      <Tabs.Screen name="index" options={{ title: 'Songs' }} />
      <Tabs.Screen name="lyrics" options={{ title: 'Lyrics' }} />
      <Tabs.Screen name="account" options={{ title: 'Account' }} />
    </Tabs>
  );
};

export default TabsLayout;
