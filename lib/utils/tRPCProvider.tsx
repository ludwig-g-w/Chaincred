import { STORAGE_AUTH_KEY } from "@lib/constants";
import { storage } from "@lib/services/storage.client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "@utils/trpc";
import React, { useState } from "react";
import { DevToolsBubble } from "react-native-react-query-devtools";

function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${process.env.EXPO_PUBLIC_SERVER_URL}/api/trpc`,
          async headers() {
            const jwt = storage.getString(STORAGE_AUTH_KEY);
            return {
              Authorization: `Bearer ${jwt}`,
            };
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
        {/* {process.env.NODE_ENV !== "production" ? <DevToolsBubble /> : null} */}
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default Providers;
