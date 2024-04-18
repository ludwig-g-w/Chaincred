import { createContext } from "@lib/trpc-server/context";
import { appRouter } from "@lib/trpc-server/routers/_app";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { ExpoRequest } from "expo-router/server";

export async function GET(req: ExpoRequest) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: req as unknown as Request,
    router: appRouter,
    onError: (err) => {},
    // @ts-ignore
    createContext,
  });
}

export async function POST(req: ExpoRequest) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: req as unknown as Request,
    router: appRouter,
    onError: (err) => {
      console.log(JSON.stringify(err));
    },
    // @ts-ignore
    createContext,
  });
}
