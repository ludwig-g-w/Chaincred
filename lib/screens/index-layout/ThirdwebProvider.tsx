import React from "react";
import { ThirdwebProvider } from "thirdweb/react";

const MyThirdwebProvider = ({ children }: any) => (
  <ThirdwebProvider>{children}</ThirdwebProvider>
);

export default MyThirdwebProvider;
