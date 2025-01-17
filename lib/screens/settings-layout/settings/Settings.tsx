import { NWIcon } from "@lib/components/nativeWindInterop";
import { Switch } from "@lib/components/ui/switch";
import * as Typo from "@lib/components/ui/typography";
import { NAV_THEME, STORAGE_AUTH_KEY } from "@lib/constants";

import ConnectButtonThirdweb from "@lib/components/ConnectButtonThirdweb";
import { storage } from "@lib/services/storage.client";
import { useColorScheme } from "@lib/useColorScheme";
import * as Application from "expo-application";
import { router } from "expo-router";
import React from "react";
import { Platform, Pressable, View } from "react-native";
import { useActiveWallet, useDisconnect } from "thirdweb/react";

export default () => {
  const activeWallet = useActiveWallet();
  const { disconnect } = useDisconnect();
  const logout = async () => {
    await storage.delete(STORAGE_AUTH_KEY);
    await activeWallet?.disconnect();
    await disconnect(activeWallet as any);
  };

  const { setColorScheme, isDarkColorScheme } = useColorScheme();
  const theme = NAV_THEME[isDarkColorScheme ? "dark" : "light"];
  return (
    <View className="bg-background flex-1">
      <View>
        <Item
          title="Your Profile"
          onPress={() => router.push("/settingsProfile")}
        />
        <Item
          title="Dark Theme"
          onPress={() => {
            setColorScheme(isDarkColorScheme ? "light" : "dark");
          }}
        >
          <Switch
            checked={isDarkColorScheme}
            onCheckedChange={() =>
              setColorScheme(isDarkColorScheme ? "light" : "dark")
            }
          />
        </Item>
      </View>
      <View className="mt-auto items-center">
        <View className="flex-row gap-2 flex-wrap ">
          <ConnectButtonThirdweb />
        </View>

        <Typo.Muted>Version: {Application.nativeApplicationVersion}</Typo.Muted>
        <Typo.Small>build: {Application.nativeBuildVersion} </Typo.Small>
      </View>
    </View>
  );

  function Item({ title = "", onPress = () => {}, children = null as any }) {
    return (
      <Pressable
        className="px-2 py-4 border-b-hairline border-secondary"
        onPress={onPress}
      >
        <View className="flex-row justify-between items-center">
          <Typo.H4>{title}</Typo.H4>
          {children ?? (
            <NWIcon
              tintColor={theme.primary}
              name={
                Platform.OS === "ios"
                  ? "chevron.right.circle.fill"
                  : "circle-chevron-right"
              }
              color={theme.primary}
              size={24}
            />
          )}
        </View>
      </Pressable>
    );
  }
};
