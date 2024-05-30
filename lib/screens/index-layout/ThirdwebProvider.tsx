import { ThirdwebProvider } from "thirdweb/react";
import React from "react";

const conf = {
  factoryAddress: "0x7675fbfd3c6aff22db02edb74773067b5e15ac0f",
  gasless: true,
};

const MyThirdwebProvider = ({ children }: any) => (
  <ThirdwebProvider>{children}</ThirdwebProvider>
);

export default MyThirdwebProvider;
