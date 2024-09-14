import MyErrorBoundary from "@components/ErrorBoudary";
import { Stack } from "expo-router";

export default () => {
  return (
    <MyErrorBoundary>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="homeIndex"
      >
        <Stack.Screen name="homeIndex" />
      </Stack>
    </MyErrorBoundary>
  );
};
