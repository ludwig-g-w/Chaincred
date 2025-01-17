import { useReactNavigationDevTools } from "@dev-plugins/react-navigation";
import { ToastProvider } from "react-native-toast-notifications";
import MyErrorBoundary from "@lib/components/ErrorBoudary";
import { useColorScheme } from "@lib/useColorScheme";
import { useSelectColorScheme } from "@lib/utils/hooks";
import NetInfo from "@react-native-community/netinfo";
import { PortalHost } from "@rn-primitives/portal";
import { onlineManager } from "@tanstack/react-query";
import TRPCProvider from "@utils/tRPCProvider";
import { SplashScreen, Stack, useNavigationContainerRef } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { StrictMode, useCallback } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThirdwebProvider, useAutoConnect } from "thirdweb/react";
import Header from "./Header";
import { useRedirectAuth } from "./useRedirectAuth";

import { connectConfig } from "@lib/services/thirdwebClient";
import { LogBox } from "react-native";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

SplashScreen.preventAutoHideAsync();
console.log({
  EXPO_PUBLIC_SERVER_URL: process.env.EXPO_PUBLIC_SERVER_URL,
  TW: process.env.EXPO_PUBLIC_TW_CLIENT_ID,
  THIRDWEB_FACTORY_ADDRESS: process.env.EXPO_PUBLIC_THIRDWEB_FACTORY_ADDRESS,
  ENV: process.env.NODE_ENV,
});

const App = () => {
  return (
    <StrictMode>
      <TRPCProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ThirdwebProvider>
            <ToastProvider>
              <MyErrorBoundary>
                <Inner />
              </MyErrorBoundary>
            </ToastProvider>
          </ThirdwebProvider>
        </GestureHandlerRootView>
      </TRPCProvider>
    </StrictMode>
  );
};

const Inner = () => {
  const navigationRef = useNavigationContainerRef();
  useReactNavigationDevTools(navigationRef);
  useAutoConnect(connectConfig);
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
        initialRouteName="index"
        screenOptions={{
          header,
        }}
      >
        <Stack.Screen
          options={{
            header: () => null,
          }}
          name="index"
        />
        <Stack.Screen name="(tabs)" />
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
        <Stack.Screen
          options={{
            header: () => null,
            presentation: "modal",
          }}
          name="gettingStarted"
        />
      </Stack>
      <PortalHost />
    </>
  );
};

export default App;

LogBox.ignoreLogs([
  /.*Warning: findNodeHandle is deprecated.*/,

  /.*TRPCClientError: .*/,
]);
