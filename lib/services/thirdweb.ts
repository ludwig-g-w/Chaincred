import { createThirdwebClient } from "thirdweb";

export const thirdwebClient = createThirdwebClient({
  clientId: process.env.EXPO_PUBLIC_TW_CLIENT_ID,
});
