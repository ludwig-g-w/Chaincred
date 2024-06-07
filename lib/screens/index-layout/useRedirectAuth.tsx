import AsyncStorage from "@react-native-async-storage/async-storage";
import { useActiveAccount, useAutoConnect } from "thirdweb/react";
import { router } from "expo-router";
import { useEffect } from "react";
import { focusManager } from "@tanstack/react-query";
import type { AppStateStatus } from "react-native";
import { AppState, Platform } from "react-native";

export const useRedirectAuth = () => {
  const user = useActiveAccount();
  const { isLoading, isl } = useAutoConnect();

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
