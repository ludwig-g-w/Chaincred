import { thirdwebAuth } from "@lib/services/thirdwebAuth";
import * as trpcNext from "@trpc/server/adapters/next";

export function getToken(req: Request): string | undefined {
  const authHeader = req.headers.get("authorization");
  if (authHeader) {
    const authorizationHeader = authHeader.split(" ");
    if (authorizationHeader?.length === 2) {
      return authorizationHeader[1];
    }
  }
}

export async function createContext({
  req,
  res,
}: trpcNext.CreateNextContextOptions) {
  try {
    const jwt = getToken(req);
    const authResult = await thirdwebAuth.verifyJWT({ jwt });
    return authResult;
  } catch (error) {
    return { valid: false };
  }
}
export type Context = Awaited<ReturnType<typeof createContext>>;
