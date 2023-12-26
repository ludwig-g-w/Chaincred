import { Stack } from "expo-router";

export default () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="settings"
    >
      <Stack.Screen name="settings" />
      <Stack.Screen name="attestDetails" />
      <Stack.Screen name="settingsProfile" />
      <Stack.Screen name="manageAttestations" />
    </Stack>
  );
};
