import { EAS_GRAPHQL, TW_CLIENT_ID } from "@env";
import { config } from "@gluestack-ui/config"; // O
import { GluestackUIProvider } from "@gluestack-ui/themed";
import {
  ThirdwebProvider,
  localWallet,
  metamaskWallet,
  rainbowWallet,
  phan,
} from "@thirdweb-dev/react-native";
import { Stack } from "expo-router";
import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: EAS_GRAPHQL,
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <GluestackUIProvider config={config}>
      <ThirdwebProvider
        clientId={TW_CLIENT_ID}
        activeChain="ethereum"
        supportedWallets={[metamaskWallet(), rainbowWallet(), localWallet()]}
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
