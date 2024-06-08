import { createThirdwebClient } from "thirdweb";
import { createAuth } from "thirdweb/auth";
import { sepolia } from "thirdweb/chains";
import { privateKeyToAccount } from "thirdweb/wallets";

export const chain = sepolia;

export const thirdwebClient = createThirdwebClient({
  clientId: process.env.EXPO_PUBLIC_TW_CLIENT_ID,
});

export const thirdwebAuth = createAuth({
  domain: process.env.EXPO_PUBLIC_SERVER_URL || "",
  client: thirdwebClient,
  adminAccount: privateKeyToAccount({
    client: thirdwebClient,
    privateKey: process.env.EXPO_PUBLIC_THIRDWEB_AUTH_PRIVATE_KEY!,
  }),
});
