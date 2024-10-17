import { STORAGE_AUTH_KEY } from "@lib/constants";
import { storage } from "@lib/services/storage.client";
import { thirdwebClient, wallets } from "@lib/services/thirdwebClient";
import { useColorScheme } from "@lib/useColorScheme";
import { trpc } from "@lib/utils/trpc";
import React from "react";
import { View } from "react-native";
import { baseSepolia } from "thirdweb/chains";

import { ConnectButton, useActiveWallet, useDisconnect } from "thirdweb/react";
import invariant from "tiny-invariant";

function ConnectButtonThirdweb() {
  const utils = trpc.useUtils();
  const { mutateAsync: verifyLoginPayload } =
    trpc.verifyLoginPayload.useMutation();
  const { mutateAsync: generatePayload } = trpc.generatePayload.useMutation();
  const { disconnect } = useDisconnect();
  const wallet = useActiveWallet();
  const { isDarkColorScheme } = useColorScheme();

  const logout = async () => {
    invariant(wallet, "No wallet connected");
    await storage.delete(STORAGE_AUTH_KEY);
    await wallet.disconnect();
    await disconnect(wallet);
  };

  return (
    <View className="w-[200px]">
      <ConnectButton
        client={thirdwebClient}
        wallets={wallets}
        chain={baseSepolia}
        chains={[baseSepolia]}
        theme={isDarkColorScheme ? "dark" : "light"}
        appMetadata={{
          name: "ChainCred",
          logoUrl: "assets/icon.png",
          url: "https://gtfol.xyz",
        }}
        auth={{
          isLoggedIn: async () => {
            const jwt = storage.getString(STORAGE_AUTH_KEY);
            if (!jwt) return false;
            const isLoggedIn = await utils.isLoggedIn.fetch(jwt);
            return isLoggedIn;
          },
          doLogin: async (params) => {
            const jwt = await verifyLoginPayload(params);
            if (jwt) {
              storage.set(STORAGE_AUTH_KEY, jwt);
            }
          },
          getLoginPayload: async (payload) => generatePayload(payload),
          doLogout: async () => {
            await logout();
          },
        }}
      />
    </View>
  );
}

export default ConnectButtonThirdweb;
