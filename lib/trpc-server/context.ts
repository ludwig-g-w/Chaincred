import * as trpcNext from "@trpc/server/adapters/next";
import { getUser } from "@routes/api/auth/[...thirdweb]+api";

export async function createContext({
  req,
  res,
}: trpcNext.CreateNextContextOptions) {
  const user = await getUser(req);
  return {
    user,
  };
}
export type Context = Awaited<ReturnType<typeof createContext>>;
