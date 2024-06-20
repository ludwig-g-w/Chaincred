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
      options: ["google", "facebook", "apple"],
    },
  }),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("com.trustwallet.app"),
  createWallet("app.backpack"),
  createWallet("com.bitcoin"),
];
