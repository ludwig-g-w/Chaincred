import { trpc } from "@lib/utils/trpc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { focusManager } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect } from "react";
import type { AppStateStatus } from "react-native";
import { AppState, Platform } from "react-native";
import {
  useActiveAccount,
  useActiveWalletConnectionStatus,
} from "thirdweb/react";

export const useRedirectAuth = () => {
  const status = useActiveWalletConnectionStatus();

  useEffect(() => {
    (async () => {
      const jwt = await AsyncStorage.getItem("auth_token_storage_key");
      if (status !== "connected" || !jwt) {
        router.replace("/login");
      }
    })();
  }, [status]);

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
    AsyncStorage.getItem("auth_token_storage_key").then((s) => {
      !s && router.replace("/login");
    });
    const subscription = AppState.addEventListener("change", onAppStateChange);

    return () => subscription.remove();
  }, []);
};
