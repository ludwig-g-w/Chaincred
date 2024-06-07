import MainButton from "@components/MainButton";
import { Spinner } from "@gluestack-ui/themed";
import * as Typo from "@lib/components/ui/typography";
import { NAV_THEME } from "@lib/constants";
import { useColorScheme } from "@lib/useColorScheme";
// import {
//   ConnectWallet,
//   useAddress,
//   useLogin,
//   useLogout,
//   useUser,
// } from "@thirdweb-dev/react-native";
// import {
//   _darkTheme,
//   _lightTheme,
// } from "@thirdweb-dev/react-native/dist/evm/styles/theme";
import { Redirect, useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";
import { P, match } from "ts-pattern";

export default function LoginScreen() {
  const { isDarkColorScheme } = useColorScheme();
  const tTheme = NAV_THEME[isDarkColorScheme ? "dark" : "light"];
  const params = useLocalSearchParams<{ rUrl: string }>();
  // const address = useAddress();
  // const { login } = useLogin();
  // const { logout } = useLogout();
  // const { isLoggedIn, isLoading } = useUser();
  return (
    <View className="flex-1 justify-center items-center gap-4 bg-background">
      <Typo.H1 className="color-primary">ChainCred</Typo.H1>
      <Typo.Lead>An app for reviewing decentralized</Typo.Lead>
      {/* {match([address, isLoggedIn, isLoading])
        .with([undefined, false, true], () => (
          <View className="items-center justify-center gap-4">
            <Typo.Large>Loading...</Typo.Large>
            <Spinner />
          </View>
        ))
        .with([undefined, false, false], () => (
          <ConnectWallet
            theme={{
              ...theme,
              colors: {
                ...theme.colors,
                buttonBackgroundColor: tTheme.background,
                buttonTextColor: tTheme.text,
              },
            }}
            buttonTitle="Connect to your Web3 wallet"
          />
        ))
        .with([P.string, false, false], () => (
          <MainButton onPress={login}>Sign in/Create account</MainButton>
        ))
        .with([P.string, true, false], () => (
          // @ts-ignore
          <Redirect href={params.rUrl ?? "/(tabs)/(home)/"} />
        ))
        .otherwise(() => (
          // @ts-ignore
          <MainButton onPress={logout}>Logout</MainButton>
        ))} */}
    </View>
  );
}
