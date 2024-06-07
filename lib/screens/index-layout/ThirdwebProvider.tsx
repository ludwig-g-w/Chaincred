import React from "react";
import { ThirdwebProvider as ThirdwebProviderV5 } from "thirdweb/react";

const MyThirdwebProvider = ({ children }: any) => (
  <ThirdwebProviderV5>{children}</ThirdwebProviderV5>
);

export default MyThirdwebProvider;
