import { useAsyncStorageDevTools } from "@dev-plugins/async-storage";
import { useReactNavigationDevTools } from "@dev-plugins/react-navigation";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { onlineManager } from "@tanstack/react-query";
import { Sepolia } from "@thirdweb-dev/chains";
import {
  ThirdwebProvider,
  embeddedWallet,
  localWallet,
  metamaskWallet,
  rainbowWallet,
  smartWallet,
  useAddress,
  useUser,
  walletConnect,
} from "@thirdweb-dev/react-native";
import "@thirdweb-dev/react-native-compat";
import TRPCProvider from "@utils/tRPCProvider";
import "expo-dev-client";
import { Stack, router, useNavigationContainerRef } from "expo-router";
import React, { useEffect } from "react";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { focusManager } from "@tanstack/react-query";
import type { AppStateStatus } from "react-native";
import { AppState, Platform } from "react-native";

import MyErrorBoundary from "@lib/components/ErrorBoudary";
import { useCallback } from "react";
import Header from "./Header";

const conf = {
  factoryAddress: "0x7675fbfd3c6aff22db02edb74773067b5e15ac0f",
  gasless: true,
};

const tConfig = {
  secureStorage: AsyncStorage,
  // This domain should match the backend
  domain: process.env.EXPO_PUBLIC_SERVER_URL || "",
  // Pass the URL of the auth endpoints
  authUrl: "/api/auth",
};
const wallets = [
  smartWallet(embeddedWallet(), conf),
  metamaskWallet(),
  rainbowWallet(),
  localWallet(),
  walletConnect(),
];

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
            <ThirdwebProvider
              clientId={process.env.EXPO_PUBLIC_TW_CLIENT_ID}
              activeChain={Sepolia}
              supportedChains={[Sepolia]}
              theme={"light"}
              authConfig={tConfig}
              supportedWallets={wallets}
            >
              <Inner />
            </ThirdwebProvider>
          </GluestackUIProvider>
        </GestureHandlerRootView>
      </TRPCProvider>
    </MyErrorBoundary>
  );
};

const Inner = () => {
  const { isLoggedIn, isLoading, user } = useUser();
  const address = useAddress();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, isLoading]);

  useEffect(() => {
    if (!address || !user?.address) return;

    if (address !== user.address) {
      router.replace("/wrongAccount");
    }
  }, [address, user]);

  useEffect(() => {
    AsyncStorage.getItem("auth_token_storage_key").then((s) => {
      !s && router.replace("/login");
    });
    const subscription = AppState.addEventListener("change", onAppStateChange);

    return () => subscription.remove();
  }, []);

  function onAppStateChange(status: AppStateStatus) {
    if (Platform.OS !== "web") {
      focusManager.setFocused(status === "active");
    }
  }

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
