import { trpc } from "@utils/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DevToolsBubble } from "react-native-react-query-devtools";

function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${"http://45.91.169.221:3000"}/api/trpc`,
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
      <QueryClientProvider client={queryClient}>
        {children}
        {process.env.NODE_ENV !== "production" ? <DevToolsBubble /> : null}
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default Providers;
