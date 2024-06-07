import { router } from "expo-router";
import React from "react";
import { Box, ChevronLeftIcon, Text } from "@gluestack-ui/themed";
import { ConnectWallet } from "@thirdweb-dev/react-native";
import { usePathname } from "expo-router";
import { memo } from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { match, P } from "ts-pattern";
import { NAV_THEME } from "@lib/constants";
import {
  _lightTheme,
  _darkTheme,
} from "@thirdweb-dev/react-native/dist/evm/styles/theme";
import { useColorScheme } from "@lib/useColorScheme";
import * as Typo from "@lib/components/ui/typography";
import ConnectWalletV5 from "@lib/components/connect-modal-v5";

const Header = memo(() => {
  const { isDarkColorScheme } = useColorScheme();
  const path = usePathname();
  const tTheme = NAV_THEME[isDarkColorScheme ? "dark" : "light"];

  const title = match(path)
    .with("/", () => "Home")
    .with("/profiles", () => "")
    .with("/scanAddress", () => "Scan")
    .with("/settingsProfile", () => "Your Profile")
    .with("/manageAttestations", () => "Your Actions")
    .with("/discoverMap", () => "Discover")
    .with("/discoverList", () => "Discover")

    .otherwise(
      (path) => `${path.toLocaleUpperCase().slice(1, 2)}${path.slice(2, 13)}`
    );

  const theme = isDarkColorScheme ? _darkTheme : _lightTheme;

  return (
    <View className="bg-background py-2">
      <SafeAreaView />
      <Box
        w={"$full"}
        px="$2"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box alignItems="center" flexDirection="row">
          {!!router.canGoBack() && (
            <Pressable
              style={{
                opacity: router.canGoBack() ? 1 : 0,
              }}
              onPress={() => {
                if (router.canGoBack()) {
                  router.back();
                }
              }}
            >
              <ChevronLeftIcon size="xl" />
            </Pressable>
          )}
          <Typo.H2 className="font-extrabold">{title}</Typo.H2>
        </Box>
        <ConnectWalletV5 />
      </Box>
    </View>
  );
});

export default Header;
