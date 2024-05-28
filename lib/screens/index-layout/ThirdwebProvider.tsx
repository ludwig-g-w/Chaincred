import AsyncStorage from "@react-native-async-storage/async-storage";
import { Sepolia } from "@thirdweb-dev/chains";
import {
  ThirdwebProvider,
  localWallet,
  metamaskWallet,
  rainbowWallet,
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
  domain: process.env.EXPO_PUBLIC_SERVER_URL,
  // Pass the URL of the auth endpoints
  authUrl: `${process.env.EXPO_PUBLIC_SERVER_URL}/api/auth`,
};
const wallets = [
  // TODO: is dependent on react-native-quick-crypto which I was not able to install without ios build crashing, maybe try to reinstate when new version?
  // smartWallet(embeddedWallet(), conf),
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
