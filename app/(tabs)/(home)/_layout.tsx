import MyErrorBoundary from "@components/ErrorBoudary";
import { Stack } from "expo-router";

export default () => {
  return (
    <MyErrorBoundary>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="index"
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="organization/[address]" />
      </Stack>
    </MyErrorBoundary>
  );
};
