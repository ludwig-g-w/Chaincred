import { STORAGE_AUTH_KEY } from "@lib/constants";
import { storage } from "@lib/services/storage.client";
import { thirdwebClient, wallets } from "@lib/services/thirdwebClient";
import { trpc } from "@lib/utils/trpc";
import React from "react";
import { sepolia } from "thirdweb/chains";

import { ConnectButton } from "thirdweb/react";

function ConnectButtonThirdweb() {
  const utils = trpc.useUtils();
  const { mutateAsync: verifyLoginPayload } =
    trpc.verifyLoginPayload.useMutation();
  const { mutateAsync: generatePayload } = trpc.generatePayload.useMutation();

  const logout = () => {
    storage.delete(STORAGE_AUTH_KEY);
  };

  return (
    <ConnectButton
      client={thirdwebClient}
      wallets={wallets}
      chain={sepolia}
      chains={[sepolia]}
      appMetadata={{
        name: "ChainCred",
        logoUrl: "assets/icon.png",
        url: "gtfol.xyz",
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
  );
}

export default ConnectButtonThirdweb;
