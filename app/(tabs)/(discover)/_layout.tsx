import { Stack } from "expo-router";

export default () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="list"
    >
      <Stack.Screen name="discoverList" />
    </Stack>
  );
};
