import { HStack } from "@gluestack-ui/themed";
import { NWSymbolView } from "@lib/components/nativeWindInterop";
import { Button } from "@lib/components/ui/button";
import { Switch } from "@lib/components/ui/switch";
import * as Typo from "@lib/components/ui/typography";
import { NAV_THEME, STORAGE_AUTH_KEY } from "@lib/constants";
import {
  chain,
  connectConfig,
  thirdwebClient,
  wallets,
} from "@lib/services/thirdwebClient";

import { useColorScheme } from "@lib/useColorScheme";
import { storage } from "@lib/services/storage.client";
import * as Application from "expo-application";
import { router } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";
import { ConnectButton, useActiveWallet, useDisconnect } from "thirdweb/react";

export default () => {
  const activeWallet = useActiveWallet();
  const { disconnect } = useDisconnect();
  const logout = async () => {
    await storage.delete(STORAGE_AUTH_KEY);
    await activeWallet?.disconnect();
    router.replace("/login");
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
        <Item title="Dark Theme">
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
          <Button variant={"outline"} onPress={() => logout()}>
            <Typo.Large>Sign out</Typo.Large>
          </Button>
          <ConnectButton
            {...connectConfig}
            onDisconnect={() => {
              console.log("disconnect");
              logout();
            }}
          />
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
        <HStack
          borderBottomColor="$trueGray700"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typo.H4>{title}</Typo.H4>
          {children ?? (
            <NWSymbolView
              tintColor={theme.secondary}
              name="chevron.right.circle.fill"
            />
          )}
        </HStack>
      </Pressable>
    );
  }
};
