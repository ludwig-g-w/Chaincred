import { useAsyncStorageDevTools } from "@dev-plugins/async-storage";
import { useReactNavigationDevTools } from "@dev-plugins/react-navigation";
import { EAS_GRAPHQL, TW_CLIENT_ID } from "@env";
import { config } from "@gluestack-ui/config"; // O
import { GluestackUIProvider } from "@gluestack-ui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Sepolia } from "@thirdweb-dev/chains";
import {
  ThirdwebProvider,
  embeddedWallet,
  localWallet,
  metamaskWallet,
  rainbowWallet,
  smartWallet,
  walletConnect,
} from "@thirdweb-dev/react-native";
import "@thirdweb-dev/react-native-compat";
import "expo-dev-client";
import { Stack, useNavigationContainerRef } from "expo-router";
import React from "react";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const conf = {
  factoryAddress: "0x7675fbfd3c6aff22db02edb74773067b5e15ac0f",
  gasless: true,
};

const App = () => {
  const navigationRef = useNavigationContainerRef();
  useReactNavigationDevTools(navigationRef);
  useAsyncStorageDevTools({
    errorHandler: (err) => {
      console.log("", err);
    },
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GluestackUIProvider config={config}>
        <ThirdwebProvider
          clientId={TW_CLIENT_ID}
          activeChain={Sepolia}
          supportedChains={[Sepolia]}
          theme={"light"}
          authConfig={{
            secureStorage: AsyncStorage,
            // This domain should match the backend
            domain: process.env.THIRDWEB_AUTH_DOMAIN || "",
            // Pass the URL of the auth endpoints
            authUrl: "/api/auth",
          }}
          supportedWallets={[
            smartWallet(embeddedWallet(), conf),
            metamaskWallet(),
            rainbowWallet(),
            localWallet(),
            walletConnect(),
          ]}
        >
          <Inner />
        </ThirdwebProvider>
      </GluestackUIProvider>
    </GestureHandlerRootView>
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
          presentation: "modal",
        }}
        name="createAttestation"
      />
      <Stack.Screen
        options={{
          presentation: "modal",
        }}
        name="confirmAttest"
      />
      <Stack.Screen
        options={{
          presentation: "modal",
        }}
        name="profiles/[address]"
      />
    </Stack>
  );
};

export default App;
