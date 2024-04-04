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
      <Stack.Screen name="settingsProfile" />
    </Stack>
  );
};
