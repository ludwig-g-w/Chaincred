"use server";
import { createAuth } from "thirdweb/auth";
import { privateKeyToAccount } from "thirdweb/wallets";
import { createThirdwebClient } from "thirdweb";

const secretKey = process.env.THIRDWEB_SECRET_KEY!;

const thirdwebClient = createThirdwebClient({ secretKey });

export const thirdwebAuth = createAuth({
  domain: process.env.EXPO_PUBLIC_SERVER_URL || "",
  client: thirdwebClient,

  adminAccount: privateKeyToAccount({
    client: thirdwebClient,
    privateKey: process.env.THIRDWEB_AUTH_PRIVATE_KEY!,
  }),
});
