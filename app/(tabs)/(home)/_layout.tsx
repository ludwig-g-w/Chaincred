import MyErrorBoundary from "@components/ErrorBoudary";
import SuspenseFallback from "@components/SuspenseFallback";
import { Stack } from "expo-router";
import { Suspense } from "react";

export default () => {
  return (
    <MyErrorBoundary>
      <Suspense fallback={<SuspenseFallback />}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="index"
        >
          <Stack.Screen name="index" />
        </Stack>
      </Suspense>
    </MyErrorBoundary>
  );
};
