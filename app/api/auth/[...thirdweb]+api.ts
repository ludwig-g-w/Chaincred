import { setOrModifyProfile } from "@lib/services/db/functions";
import { PrivateKeyWallet } from "@thirdweb-dev/auth/evm";
import { ThirdwebAuthAppRouter as ThirdwebAuth } from "../../../thirdweb-auth-expo/src/index";
// TODO: ENV VAR move to .env when it works on server

console.log({
  EXPO_PUBLIC_SERVER_URL: process.env.EXPO_PUBLIC_SERVER_URL,
  EXPO_PUBLIC_THIRDWEB_AUTH_PRIVATE_KEY:
    process.env.EXPO_PUBLIC_THIRDWEB_AUTH_PRIVATE_KEY,
});

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  domain: process.env.EXPO_PUBLIC_SERVER_URL || "",
  wallet: new PrivateKeyWallet(
    process.env.EXPO_PUBLIC_THIRDWEB_AUTH_PRIVATE_KEY
  ),
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
