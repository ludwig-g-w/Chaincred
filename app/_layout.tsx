import {
  localWallet,
  metamaskWallet,
  rainbowWallet,
  ThirdwebProvider,
} from "@thirdweb-dev/react-native";
import { Redirect, Stack } from "expo-router";
import React from "react";
import { GluestackUIProvider, Text, Box, View } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config"; // O
import { TW_CLIENT_ID } from "@env";

const App = () => {
  return (
    <GluestackUIProvider config={config}>
      <ThirdwebProvider
        clientId={TW_CLIENT_ID}
        activeChain="ethereum"
        supportedWallets={[metamaskWallet(), rainbowWallet(), localWallet()]}
      >
        <Inner />
      </ThirdwebProvider>
    </GluestackUIProvider>
  );
};

const Inner = () => {
  return (
    <Stack
      initialRouteName="(tabs)"
      screenOptions={{
        header: () => null,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="login" />
      <Stack.Screen
        options={{
          presentation: "containedModal",
        }}
        name="createAttestation"
      />
      <Stack.Screen
        options={{
          presentation: "modal",
        }}
        name="confirmAttest"
      />
    </Stack>
  );
};

export default App;
