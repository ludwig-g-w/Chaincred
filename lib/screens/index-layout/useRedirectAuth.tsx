import { STORAGE_AUTH_KEY } from "@lib/constants";
import { storage } from "@lib/services/storage.client";
import { focusManager } from "@tanstack/react-query";
import { useEffect } from "react";
import type { AppStateStatus } from "react-native";
import { AppState, Platform } from "react-native";

export const useRedirectAuth = () => {
  let jwt = storage.getString(STORAGE_AUTH_KEY);

  function checkJwtOnStateChange(status: AppStateStatus) {
    if (Platform.OS !== "web") {
      jwt = storage.getString(STORAGE_AUTH_KEY);
      focusManager.setFocused(status === "active");
    }
  }

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      checkJwtOnStateChange
    );
    return () => subscription.remove();
  }, []);

  return jwt;
};
