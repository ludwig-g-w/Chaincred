import {
  localWallet,
  metamaskWallet,
  rainbowWallet,
  ThirdwebProvider,
  useUser,
} from "@thirdweb-dev/react-native";
import { Stack } from "expo-router";
import React from "react";
import { GluestackUIProvider, Text, Box, View } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config"; // O
import { TW_CLIENT_ID } from "@env";

const App = () => {
  return (
    <GluestackUIProvider config={config}>
      <ThirdwebProvider
        clientId={TW_CLIENT_ID}
        activeChain="mumbai"
        supportedWallets={[metamaskWallet(), rainbowWallet(), localWallet()]}
      >
        <Inner />
      </ThirdwebProvider>
    </GluestackUIProvider>
  );
};

const Inner = () => {
  const user = useUser();

  return (
    <Stack
      initialRouteName="login"
      screenOptions={{
        header: () => null,
      }}
    >
      {user.isLoggedIn ? (
        <Stack.Screen name="login" />
      ) : (
        <Stack.Screen name="(tabs)" />
      )}
      <Stack.Screen
        options={{
          presentation: "containedModal",
        }}
        name="createAttestation"
      />
    </Stack>
  );
};

export default App;
