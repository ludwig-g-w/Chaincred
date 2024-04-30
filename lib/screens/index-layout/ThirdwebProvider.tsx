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
import React from "react";

const conf = {
  factoryAddress: "0x7675fbfd3c6aff22db02edb74773067b5e15ac0f",
  gasless: true,
};

const tConfig = {
  secureStorage: AsyncStorage,
  // This domain should match the backend
  domain: process.env.EXPO_PUBLIC_SERVER_URL || "",
  // Pass the URL of the auth endpoints
  authUrl: "/api/auth",
};
const wallets = [
  smartWallet(embeddedWallet(), conf),
  metamaskWallet(),
  rainbowWallet(),
  localWallet(),
  walletConnect(),
];

const MyThirdwebProvider = ({ children }: any) => (
  <ThirdwebProvider
    clientId={process.env.EXPO_PUBLIC_TW_CLIENT_ID}
    activeChain={Sepolia}
    supportedChains={[Sepolia]}
    theme={"light"}
    authConfig={tConfig}
    supportedWallets={wallets}
  >
    {children}
  </ThirdwebProvider>
);

export default MyThirdwebProvider;
