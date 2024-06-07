import { createThirdwebClient } from "thirdweb";
import { createAuth } from "thirdweb/auth";
import { privateKeyToAccount } from "thirdweb/wallets";

export const thirdwebClient = createThirdwebClient({
  secretKey: process.env.EXPO_PUBLIC_TW_CLIENT_ID,
});

export const thirdwebAuth = createAuth({
  domain: process.env.EXPO_PUBLIC_SERVER_URL || "",
  client: thirdwebClient,
  adminAccount: privateKeyToAccount({
    client: thirdwebClient,
    privateKey: process.env.EXPO_PUBLIC_THIRDWEB_AUTH_PRIVATE_KEY!,
  }),
});
