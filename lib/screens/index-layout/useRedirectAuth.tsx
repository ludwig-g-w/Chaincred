import { STORAGE_AUTH_KEY } from "@lib/constants";
import {
  connectConfig,
  thirdwebClient,
  wallets,
} from "@lib/services/thirdwebClient";
import { trpc } from "@lib/utils/trpc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { focusManager } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect } from "react";
import type { AppStateStatus } from "react-native";
import { AppState, Platform } from "react-native";
import { sepolia } from "thirdweb/chains";
import {
  useActiveAccount,
  useActiveWalletConnectionStatus,
  useAutoConnect,
} from "thirdweb/react";

export const useRedirectAuth = () => {
  const status = useActiveWalletConnectionStatus();
  useAutoConnect(connectConfig);
  // const utils = trpc.useUtils();

  // useEffect(() => {
  //   (async () => {
  //     if (status === "connected") {
  //       const jwt = await AsyncStorage.getItem(STORAGE_AUTH_KEY);
  //       if (jwt) {
  //         const isLoggedIn = await utils.isLoggedIn.fetch(jwt);
  //         if (isLoggedIn) {
  //           router.replace("/(tabs)/(home)/");
  //         }
  //       }
  //     }
  //     if (status === "disconnected") {
  //       await AsyncStorage.removeItem(STORAGE_AUTH_KEY);
  //       router.replace("/login");
  //     }
  //   })();
  // }, [status]);

  // useEffect(() => {
  //   console.log(siwe);

  //   if (!siwe) return;

  //   if (siwe.sub !== connectedAccount?.address) {
  //     router.replace("/wrongAccount");
  //   }
  // }, [siwe, connectedAccount]);

  function onAppStateChange(status: AppStateStatus) {
    if (Platform.OS !== "web") {
      focusManager.setFocused(status === "active");
    }
  }

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_AUTH_KEY).then((s) => {
      if (!s) {
        console.log("not logged in redirecting to login");
        router.replace("/login");
      }
    });
    const subscription = AppState.addEventListener("change", onAppStateChange);

    return () => subscription.remove();
  }, []);
};
