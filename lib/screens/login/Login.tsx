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
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";
import { match } from "ts-pattern";
import ConnectWallet from "@lib/components/connect-modal-v5";

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
      <ConnectWallet />
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
