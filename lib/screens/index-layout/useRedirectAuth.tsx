import { STORAGE_AUTH_KEY } from "@lib/constants";
import { storage } from "@lib/services/storage.client";
import { connectConfig } from "@lib/services/thirdwebClient";
import { focusManager } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect } from "react";
import type { AppStateStatus } from "react-native";
import { AppState, Platform } from "react-native";
import { useAutoConnect } from "thirdweb/react";

export const useRedirectAuth = () => {
  useAutoConnect(connectConfig);

  function onAppStateChange(status: AppStateStatus) {
    if (Platform.OS !== "web") {
      focusManager.setFocused(status === "active");
    }
  }

  useEffect(() => {
    const jwt = storage.getString(STORAGE_AUTH_KEY);
    if (!jwt) {
      console.log("not logged in redirecting to login");
      router.replace("/login");
    }
    const subscription = AppState.addEventListener("change", onAppStateChange);

    return () => subscription.remove();
  }, []);
};
