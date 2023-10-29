import {
  localWallet,
  metamaskWallet,
  rainbowWallet,
  ThirdwebProvider,
} from "@thirdweb-dev/react-native";
import { Stack } from "expo-router";
import React from "react";
import { GluestackUIProvider, Text, Box } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config"; // O

const App = () => {
  return (
    <GluestackUIProvider config={config}>
      <ThirdwebProvider
        // clientId={TW_CLIENT_ID} // uncomment this line after you set your clientId in the .env file
        activeChain="mumbai"
        supportedWallets={[metamaskWallet(), rainbowWallet(), localWallet()]}
      >
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ThirdwebProvider>
    </GluestackUIProvider>
  );
};

export default App;
