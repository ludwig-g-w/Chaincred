import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { useApolloClientDevTools } from "@dev-plugins/apollo-client";
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
  useAddress,
  useLogin,
  useLogout,
  walletConnect,
} from "@thirdweb-dev/react-native";
import "@thirdweb-dev/react-native-compat";
import { typePolicies } from "@utils/apolloConfig";
import "expo-dev-client";
import { Stack, useNavigationContainerRef } from "expo-router";
import React, { useEffect } from "react";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const client = new ApolloClient({
  uri: EAS_GRAPHQL,
  cache: new InMemoryCache({
    typePolicies: typePolicies,
  }),
});

const conf = {
  factoryAddress: "0x7675fbfd3c6aff22db02edb74773067b5e15ac0f",
  gasless: true,
};

const App = () => {
  const navigationRef = useNavigationContainerRef();
  useApolloClientDevTools(client);
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
          <ApolloProvider client={client}>
            <Inner />
          </ApolloProvider>
        </ThirdwebProvider>
      </GluestackUIProvider>
    </GestureHandlerRootView>
  );
};

const Inner = () => {
  const address = useAddress();
  const { login } = useLogin();
  const { logout } = useLogout();

  useEffect(() => {
    if (address) {
      login();
    } else {
      logout();
    }
  }, [address]);

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
