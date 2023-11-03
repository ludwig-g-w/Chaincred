import { Stack } from "expo-router";

export default () => {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" />
      <Stack.Screen name="attestDetails" />
    </Stack>
  );
};
