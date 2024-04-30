import { useAsyncStorageDevTools } from "@dev-plugins/async-storage";
import { useReactNavigationDevTools } from "@dev-plugins/react-navigation";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import NetInfo from "@react-native-community/netinfo";
import { onlineManager } from "@tanstack/react-query";
import "@thirdweb-dev/react-native-compat";
import TRPCProvider from "@utils/tRPCProvider";
import "expo-dev-client";
import { Stack, useNavigationContainerRef } from "expo-router";
import React from "react";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import MyErrorBoundary from "@lib/components/ErrorBoudary";
import { useCallback } from "react";
import Header from "./Header";
import MyLensProvider from "./LensProvider";
import MyThirdwebProvider from "./ThirdwebProvider";
import { useRedirectAuth } from "./useRedirectAuth";

const App = () => {
  const navigationRef = useNavigationContainerRef();
  useReactNavigationDevTools(navigationRef);
  useAsyncStorageDevTools({
    errorHandler: (err) => {
      console.log("", err);
    },
  });

  return (
    <MyErrorBoundary>
      <TRPCProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <GluestackUIProvider config={config}>
            <MyThirdwebProvider>
              <MyLensProvider>
                <Inner />
              </MyLensProvider>
            </MyThirdwebProvider>
          </GluestackUIProvider>
        </GestureHandlerRootView>
      </TRPCProvider>
    </MyErrorBoundary>
  );
};

const Inner = () => {
  useRedirectAuth();
  onlineManager.setEventListener((setOnline) => {
    return NetInfo.addEventListener((state) => {
      setOnline(!!state.isConnected);
    });
  });

  const header = useCallback(() => <Header />, []);

  return (
    <Stack
      initialRouteName="(tabs)"
      screenOptions={{
        header,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="login" />
      <Stack.Screen
        options={{
          header: () => null,
          presentation: "modal",
        }}
        name="wrongAccount"
      />
      <Stack.Screen
        options={{
          header: () => null,
          presentation: "modal",
        }}
        name="profiles/[address]"
      />
    </Stack>
  );
};

export default App;
