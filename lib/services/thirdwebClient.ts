import { createThirdwebClient } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { createWallet, inAppWallet } from "thirdweb/wallets";

const clientId = process.env.EXPO_PUBLIC_TW_CLIENT_ID!;

export const thirdwebClient = createThirdwebClient({
  clientId,
});

export const chain = sepolia;
export const wallets = [
  inAppWallet({
    auth: {
      options: ["google", "facebook", "apple", "email"],
    },
  }),

  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet", {
    chains: [sepolia],
    appMetadata: {
      name: "ChainCred",
      logoUrl: "assets/icon.png",
      url: "gtfol.xyz",
    },

    mobileConfig: {
      callbackURL: "chaincred:///",
    },
  }),
  createWallet("me.rainbow"),
  createWallet("com.trustwallet.app"),
  createWallet("app.backpack"),
  createWallet("com.bitcoin"),
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
