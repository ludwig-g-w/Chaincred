import { createThirdwebClient } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { createWallet, inAppWallet } from "thirdweb/wallets";

const clientId = process.env.EXPO_PUBLIC_TW_CLIENT_ID!;

export const thirdwebClient = createThirdwebClient({
  clientId,
});

export const chain = baseSepolia;
export const wallets = [
  inAppWallet({
    auth: {
      options: ["guest"],
    },
    // smartAccount: {
    //   chain: baseSepolia,
    //   sponsorGas: true,
    //   factoryAddress: process.env.EXPO_PUBLIC_THIRDWEB_FACTORY_ADDRESS!,
    // },
  }),

  createWallet("com.coinbase.wallet", {
    chains: [baseSepolia],
    walletConfig: {
      options: "all",
    },
    mobileConfig: {
      callbackURL: "chaincred:///",
    },
  }),
  createWallet("io.metamask"),
];

export const connectConfig = {
  client: thirdwebClient,
  wallets: wallets,
  chain: chain,
  chains: [chain],
  // accountAbstraction: {
  //   factoryAddress: "0x7675fbfd3c6aff22db02edb74773067b5e15ac0f",
  //   sponsorGas: true,
  //   chain: sepolia,
  // },
  appMetadata: {
    name: "ChainCred",
    logoUrl: "assets/icon.png",
    url: "gtfol.xyz",
  },
};
