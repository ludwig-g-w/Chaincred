import { SplashScreen, useFocusEffect } from "expo-router";
import React from "react";
import { NotifyOnChangeProps } from "@tanstack/query-core";
import { storage } from "@lib/services/storage.client";
import { Platform } from "react-native";
import { useColorScheme } from "@lib/useColorScheme";
import * as DevClient from "expo-dev-client";

export function useRefreshOnFocus<T>(refetch: () => Promise<T>) {
  const firstTimeRef = React.useRef(true);

  useFocusEffect(
    React.useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }

      refetch();
    }, [refetch])
  );
}

export function useFocusNotifyOnChangeProps(
  notifyOnChangeProps?: NotifyOnChangeProps
) {
  const focusedRef = React.useRef(true);

  useFocusEffect(
    React.useCallback(() => {
      focusedRef.current = true;

      return () => {
        focusedRef.current = false;
      };
    }, [])
  );

  return () => {
    if (!focusedRef.current) {
      return [];
    }

    if (typeof notifyOnChangeProps === "function") {
      return notifyOnChangeProps();
    }

    return notifyOnChangeProps;
  };
}

export const useSelectColorScheme = () => {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        DevClient.hideMenu();
        DevClient.closeMenu();
      }
      const theme = storage.getString("theme");
      if (Platform.OS === "web") {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add("bg-background");
      }
      if (!theme) {
        storage.set("theme", colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === "dark" ? "dark" : "light";
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);

        setIsColorSchemeLoaded(true);
        return;
      }
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }
};
