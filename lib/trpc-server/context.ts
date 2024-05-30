import { thirdwebAuth } from "@lib/services/thirdwebAuth";
import { getToken } from "@routes/api/auth/isLoggedIn+api";
import * as trpcNext from "@trpc/server/adapters/next";

export async function createContext({
  req,
  res,
}: trpcNext.CreateNextContextOptions) {
  const jwt = getToken(req);
  if (!jwt) {
    return false;
  }

  const authResult = await thirdwebAuth.verifyJWT({ jwt });

  return authResult.valid;
}
export type Context = Awaited<ReturnType<typeof createContext>>;
