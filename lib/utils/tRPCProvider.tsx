import { trpc } from "@utils/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    // @ts-ignore works well
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:8081/api/trpc",
          async headers() {
            const jwt = await AsyncStorage.getItem("auth_token_storage_key");
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
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}

export default Providers;
