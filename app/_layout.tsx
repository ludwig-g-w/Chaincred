import { EAS_GRAPHQL, TW_CLIENT_ID } from "@env";
import { config } from "@gluestack-ui/config"; // O
import { GluestackUIProvider } from "@gluestack-ui/themed";
import {
  ThirdwebProvider,
  embeddedWallet,
  localWallet,
  metamaskWallet,
  rainbowWallet,
  walletConnect,
  smartWallet,
} from "@thirdweb-dev/react-native";
import { Stack } from "expo-router";
import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: EAS_GRAPHQL,
  cache: new InMemoryCache(),
});

const conf = {
  factoryAddress: "0x7675fbfd3c6aff22db02edb74773067b5e15ac0f",
  gasless: true,
};

const App = () => {
  return (
    <GluestackUIProvider config={config}>
      <ThirdwebProvider
        clientId={TW_CLIENT_ID}
        activeChain="sepolia"
        supportedWallets={[
          smartWallet(embeddedWallet(), conf),
          metamaskWallet(),
          rainbowWallet(),
          localWallet(),
          walletConnect(),
        ]}
      >
        <ApolloProvider client={client}>
          <Inner />
        </ApolloProvider>
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
