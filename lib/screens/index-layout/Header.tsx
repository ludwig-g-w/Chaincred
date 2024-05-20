import { router } from "expo-router";
import React from "react";
import { Box, ChevronLeftIcon, Text, Theme } from "@gluestack-ui/themed";
import { ConnectWallet } from "@thirdweb-dev/react-native";
import { usePathname } from "expo-router";
import { memo } from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { match } from "ts-pattern";
import { NAV_THEME } from "@lib/constants";

const Header = memo(() => {
  const path = usePathname();

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

  return (
    <View className="bg-background ">
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
          <Text bold size="xl">
            {title}
          </Text>
        </Box>

        <ConnectWallet />
      </Box>
    </View>
  );
});

export default Header;
