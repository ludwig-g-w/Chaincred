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
    if (status !== "connected") {
      router.replace("/login");
    }
  }, [status]);

  // TODO: find a way to get the SIWE address to match with the user address
  // useEffect(() => {
  //   if (!user?.address) return;

  //   if (user.address !== user.address) {
  //     router.replace("/wrongAccount");
  //   }
  // }, [address, user]);

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
