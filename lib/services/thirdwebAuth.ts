"use server";
import { createAuth } from "thirdweb/auth";
import { privateKeyToAccount } from "thirdweb/wallets";
import { thirdwebClient } from "./thirdwebClient";

export const thirdwebAuth = createAuth({
  domain: process.env.EXPO_PUBLIC_SERVER_URL || "",

  adminAccount: privateKeyToAccount({
    client: thirdwebClient,
    privateKey: process.env.EXPO_PUBLIC_THIRDWEB_AUTH_PRIVATE_KEY!,
  }),
});
