import "@thirdweb-dev/react-native-compat";
import "expo-dev-client";
import "react-native-gesture-handler";
import "../../../global.css";
import { useAsyncStorageDevTools } from "@dev-plugins/async-storage";
import { useReactNavigationDevTools } from "@dev-plugins/react-navigation";
import { config } from "@gluestack-ui/config";
import { StatusBar } from "expo-status-bar";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import NetInfo from "@react-native-community/netinfo";
import { onlineManager } from "@tanstack/react-query";
import TRPCProvider from "@utils/tRPCProvider";
import { SplashScreen, Stack, useNavigationContainerRef } from "expo-router";
import React, { StrictMode } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import MyErrorBoundary from "@lib/components/ErrorBoudary";
import { useCallback } from "react";
import Header from "./Header";
import MyThirdwebProvider from "./ThirdwebProvider";
import { useRedirectAuth } from "./useRedirectAuth";
import { useSelectColorScheme } from "@lib/utils/hooks";
import { useColorScheme } from "@lib/useColorScheme";

SplashScreen.preventAutoHideAsync();
console.log({
  EXPO_PUBLIC_SERVER_URL: process.env.EXPO_PUBLIC_SERVER_URL,
  POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
});

const App = () => {
  const navigationRef = useNavigationContainerRef();
  useReactNavigationDevTools(navigationRef);
  useAsyncStorageDevTools({
    errorHandler: (err) => {
      console.log("", err);
    },
  });

  return (
    <StrictMode>
      <MyErrorBoundary>
        <TRPCProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <GluestackUIProvider config={config}>
              <MyThirdwebProvider>
                <Inner />
              </MyThirdwebProvider>
            </GluestackUIProvider>
          </GestureHandlerRootView>
        </TRPCProvider>
      </MyErrorBoundary>
    </StrictMode>
  );
};

const Inner = () => {
  useSelectColorScheme();
  useRedirectAuth();

  const { isDarkColorScheme } = useColorScheme();

  onlineManager.setEventListener((setOnline) => {
    return NetInfo.addEventListener((state) => {
      setOnline(!!state.isConnected);
    });
  });

  const header = useCallback(() => <Header />, []);

  return (
    <>
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
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
    </>
  );
};

export default App;
