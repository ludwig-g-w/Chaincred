import { router } from "expo-router";
import React from "react";
import { usePathname } from "expo-router";
import { memo } from "react";
import { Platform, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { match, P } from "ts-pattern";
import { NAV_THEME } from "@lib/constants";
import { useColorScheme } from "@lib/useColorScheme";
import * as Typo from "@lib/components/ui/typography";
import ConnectWalletV5 from "@lib/components/connect-modal-v5";
import { NWIcon } from "@lib/components/nativeWindInterop";

const Header = memo(() => {
  const { isDarkColorScheme } = useColorScheme();
  const path = usePathname();
  const tTheme = NAV_THEME[isDarkColorScheme ? "dark" : "light"];

  const title = match(path)
    .with("/homeIndex", () => "Home")
    .with("/profiles", () => "")
    .with("/scanAddress", () => "Scan")
    .with("/settingsProfile", () => "Your Profile")
    .with("/manageAttestations", () => "Your Actions")
    .with("/discoverMap", () => "Discover")
    .with("/discoverList", () => "Discover")
    .with("/gettingStarted", () => "Home")
    .otherwise(
      (path) => `${path.toLocaleUpperCase().slice(1, 2)}${path.slice(2, 13)}`
    );

  return (
    <View className="bg-background py-2  overflow-visible">
      <SafeAreaView />
      <View className="w-full px-2 flex-row items-center justify-between">
        <Pressable
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            }
          }}
        >
          <View className="gap-4 flex-row items-center justify-center">
            {!!router.canGoBack() && (
              <NWIcon
                style={{
                  opacity: router.canGoBack() ? 1 : 0,
                }}
                className="h-[20] aspect-square"
                name={
                  Platform.OS === "ios"
                    ? "chevron.compact.left"
                    : "chevron-left"
                }
                color={tTheme.text}
                size={18}
                tintColor={tTheme.text}
              />
            )}
            <Typo.H1 className="font-extrabold p-0 m-0 ">{title}</Typo.H1>
          </View>
        </Pressable>
      </View>
    </View>
  );
});

export default Header;
