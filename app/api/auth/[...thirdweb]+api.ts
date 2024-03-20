import { PrivateKeyWallet } from "@thirdweb-dev/auth/evm";
import { ExpoRequest } from "expo-router/server";
import { ThirdwebAuthAppRouter as ThirdwebAuth } from "../../../thirdweb-auth-expo/src/index";
import { setOrModifyProfile } from "@lib/services/db/functions";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  domain: process.env.THIRDWEB_AUTH_DOMAIN || "",
  wallet: new PrivateKeyWallet(process.env.THIRDWEB_AUTH_PRIVATE_KEY || ""),
  callbacks: {
    onToken: (token) => {
      console.log(token);
    },
    onLogin: async (address) => {
      setOrModifyProfile({ address });
      return { role: ["admin"] };
    },
    onUser: async (user) => {
      return user;
    },
    onLogout: async (user) => {
      const maybeKey = AsyncStorage.getItem("auth_token_storage_key");
      console.log({ maybeKey });
    },
  },
});

export function POST(req: ExpoRequest, path: { thirdweb: string }) {
  return ThirdwebAuthHandler(req, path);
}

export function GET(req: ExpoRequest, path: { thirdweb: string }) {
  return ThirdwebAuthHandler(req, path);
}
