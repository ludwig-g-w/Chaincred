import { createThirdwebClient } from "thirdweb/dist/types/client/client";

export const thirdwebClient = createThirdwebClient({
  clientId: process.env.EXPO_PUBLIC_TW_CLIENT_ID,
});
