import { PrivateKeyWallet } from "@thirdweb-dev/auth/evm";
import { ExpoRequest } from "expo-router/server";
import { ThirdwebAuthAppRouter as ThirdwebAuth } from "../../../thirdweb-auth-expo/src/index";
import { setOrModifyProfile, getProfileByAddress } from "@services/db/prisma";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  domain: process.env.THIRDWEB_AUTH_DOMAIN || "",
  wallet: new PrivateKeyWallet(process.env.THIRDWEB_AUTH_PRIVATE_KEY || ""),
  // NOTE: All these callbacks are optional! You can delete this section and
  callbacks: {
    onLogin: async (address) => {
      setOrModifyProfile({ address });
      // We can also provide any session data to store in the user's session.
      return { role: ["admin"] };
    },
    onUser: async (user) => {},
    onLogout: async (user) => {
      const maybeKEy = AsyncStorage.getItem("auth_token_storage_key");
      console.log({ maybeKEy });
    },
  },
});

export function POST(req: ExpoRequest, path: string) {
  return ThirdwebAuthHandler(req, path);
}

export function GET(req: ExpoRequest, path: string) {
  return ThirdwebAuthHandler(req, path);
}
