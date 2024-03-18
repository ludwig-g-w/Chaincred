import { appRouter } from "@lib/trpc-server/routers/_app";
import { getUser } from "@routes/api/auth/[...thirdweb]+api";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { ExpoRequest } from "expo-router/server";

export async function GET(req: ExpoRequest) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: req as unknown as Request,
    router: appRouter,
    createContext: async () => {
      const user = await getUser(req);
      return {
        user,
      };
    },
  });
}

export async function POST(req: ExpoRequest) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: req as unknown as Request,
    router: appRouter,
    createContext: async ({ req }) => {
      const user = await getUser(req);
      return {
        user,
      };
    },
  });
}
