import { PrivateKeyWallet } from "@thirdweb-dev/auth/evm";
import { ExpoRequest } from "expo-router/server";
import { ThirdwebAuthAppRouter as ThirdwebAuth } from "../../../thirdweb-auth-expo/src/index";
import { setOrModifyProfile, getProfileByAddress } from "@services/db/prisma";
import AsyncStorage from "@react-native-async-storage/async-storage";

const users: Record<string, any> = {};

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "",
  wallet: new PrivateKeyWallet(
    "cac51f3a1eddc7d0bc1a3a10ae24276fea5e27f9e1e4b582ff91ae1cbcbae08a" || ""
  ),
  // NOTE: All these callbacks are optional! You can delete this section and
  callbacks: {
    onLogin: async (address, ...rest) => {
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
      // let res;
      // try {
      //   res = await getProfileByAddress(user.address);
      // } catch (error) {}
      // return res;
    },
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
