import { PrivateKeyWallet } from "@thirdweb-dev/auth/evm";
import { ExpoRequest } from "expo-router/server";
import { ThirdwebAuthAppRouter as ThirdwebAuth } from "../../../thirdweb-auth-expo/src/index";
import { setOrModifyProfile } from "lib/db/prisma";
import { getProfileByAddress } from "@services/supabase";

const users: Record<string, any> = {};

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "",
  wallet: new PrivateKeyWallet(
    "cac51f3a1eddc7d0bc1a3a10ae24276fea5e27f9e1e4b582ff91ae1cbcbae08a" || ""
  ),
  // NOTE: All these callbacks are optional! You can delete this section and
  callbacks: {
    onLogin: async (address) => {
      try {
        setOrModifyProfile({ address });
      } catch (error) {
        console.log(error);
      }
      // We can also provide any session data to store in the user's session.
      return { role: ["admin"] };
    },
    onUser: async (user) => {
      // And we can provide any extra user data to be sent to the client
      // along with the default user object.
      return await getProfileByAddress(user.address);
    },
    onLogout: async (user) => {},
  },
});

export function POST(req: ExpoRequest, path: string) {
  return ThirdwebAuthHandler(req, path);
}

export function GET(req: ExpoRequest, path: string) {
  return ThirdwebAuthHandler(req, path);
}
