import { setOrModifyProfile } from "@lib/services/db/functions";
import { PrivateKeyWallet } from "@thirdweb-dev/auth/evm";
import { ThirdwebAuthAppRouter as ThirdwebAuth } from "../../../thirdweb-auth-expo/src/index";
// TODO: ENV VAR move to .env when it works on server
const EXPO_PUBLIC_THIRDWEB_AUTH_PRIVATE_KEY =
  "3204c131fc0eee1a66b9fd103cbc927e0092bbe9a0407a0223d3a4c0f3794870";

const EXPO_PUBLIC_SERVER_URL = "http://http://45.91.169.221:3000";

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  domain: process.env.EXPO_PUBLIC_SERVER_URL || "",
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
