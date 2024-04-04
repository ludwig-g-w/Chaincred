import { useAsyncStorageDevTools } from "@dev-plugins/async-storage";
import { useReactNavigationDevTools } from "@dev-plugins/react-navigation";
import { THIRDWEB_AUTH_DOMAIN, TW_CLIENT_ID } from "@env";
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

import { Box, ChevronLeftIcon, Text } from "@gluestack-ui/themed";
import { ConnectWallet } from "@thirdweb-dev/react-native";
import { usePathname } from "expo-router";
import { memo, useCallback } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { match } from "ts-pattern";

const conf = {
  factoryAddress: "0x7675fbfd3c6aff22db02edb74773067b5e15ac0f",
  gasless: true,
};

const tConfig = {
  secureStorage: AsyncStorage,
  // This domain should match the backend
  domain: THIRDWEB_AUTH_DOMAIN || "",
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
    <TRPCProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <GluestackUIProvider config={config}>
          <ThirdwebProvider
            clientId={TW_CLIENT_ID}
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

const Header = memo(() => {
  const path = usePathname();

  const title = match(path)
    .with("/", () => "Home")
    .with("/profiles", () => "")
    .with("/scanAddress", () => "Scan")
    .with("/settingsProfile", () => "Your Profile")
    .with("/manageAttestations", () => "Your Actions")
    .with("/discoverMap", () => "Discover")
    .with("/discoverList", () => "Discover")
    .otherwise(
      (path) => `${path.toLocaleUpperCase().slice(1, 2)}${path.slice(2, 13)}`
    );

  return (
    <Box bg="white" pb="$4">
      <SafeAreaView />
      <Box
        w={"$full"}
        px="$2"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box alignItems="center" flexDirection="row">
          {!!router.canGoBack() && (
            <Pressable
              style={{
                opacity: router.canGoBack() ? 1 : 0,
              }}
              onPress={() => {
                if (router.canGoBack()) {
                  router.back();
                }
              }}
            >
              <ChevronLeftIcon size="xl" />
            </Pressable>
          )}
          <Text bold size="xl">
            {title}
          </Text>
        </Box>

        <ConnectWallet />
      </Box>
    </Box>
  );
});

export default App;
