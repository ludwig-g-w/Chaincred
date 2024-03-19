import SuspenseFallback from "@components/SuspenseFallback";
import { Stack } from "expo-router";
import { Suspense } from "react";
export { ErrorBoundary } from "expo-router";

export default () => {
  return (
    <Suspense fallback={<SuspenseFallback />}>
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
    </Suspense>
  );
};
