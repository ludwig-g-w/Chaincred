import { setOrModifyProfile } from "@lib/services/db/functions";
import { PrivateKeyWallet } from "@thirdweb-dev/auth/evm";
import {
  EXPO_PUBLIC_SERVER_URL,
  EXPO_PUBLIC_THIRDWEB_AUTH_PRIVATE_KEY,
} from "@env";
import { ThirdwebAuthAppRouter as ThirdwebAuth } from "../../../thirdweb-auth-expo/src/index";

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  domain: EXPO_PUBLIC_SERVER_URL || "",
  wallet: new PrivateKeyWallet(EXPO_PUBLIC_THIRDWEB_AUTH_PRIVATE_KEY),
  callbacks: {
    onToken: (token) => {},
    onLogin: async (address) => {
      setOrModifyProfile({ address });
      return { role: ["admin"] };
    },
    onUser: async (user) => {
      return user;
    },
    onLogout: async (user) => {},
  },
});

export function POST(req: Request, path: { thirdweb: string }) {
  return ThirdwebAuthHandler(req, path);
}

export function GET(req: Request, path: { thirdweb: string }) {
  return ThirdwebAuthHandler(req, path);
}
