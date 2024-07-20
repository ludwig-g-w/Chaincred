import { STORAGE_AUTH_KEY } from "@lib/constants";
import { storage } from "@lib/services/storage.client";
import { router } from "expo-router";
import { useEffect } from "react";

export const useRedirectAuth = () => {
  useEffect(() => {
    let jwt = storage.getString(STORAGE_AUTH_KEY);
    const subscription = storage.addOnValueChangedListener((key) => {
      console.log("useRedirectAuth");
      if (key === STORAGE_AUTH_KEY) {
        jwt = storage.getString(STORAGE_AUTH_KEY);
        if (jwt) {
          router.replace("/homeIndex");
        } else {
          router.replace("/");
        }
      }
    });

    if (jwt) {
      router.replace("/homeIndex");
    }
    return () => subscription.remove();
  }, []);
};
