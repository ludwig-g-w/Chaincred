import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "@lib/trpc-server/routers/_app";

export const trpc = createTRPCReact<AppRouter>();
