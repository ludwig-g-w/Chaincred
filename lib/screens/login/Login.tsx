import * as Typo from "@lib/components/ui/typography";
import React from "react";
import { View } from "react-native";

import ConnectButtonThirdweb from "@lib/components/ConnectButtonThirdweb";
import { useActiveWallet, useDisconnect } from "thirdweb/react";
import { Button } from "@lib/components/ui/button";

export default function LoginScreen() {
  const { disconnect } = useDisconnect();
  const wallet = useActiveWallet();
  return (
    <View className="flex-1 justify-center items-center gap-4 bg-background">
      <Typo.H1 className="color-primary">ChainCred</Typo.H1>
      <Typo.Lead>An app for reviewing decentralized</Typo.Lead>
      <View className="flex-row gap-4 items-center">
        <ConnectButtonThirdweb />
        {wallet && (
          <Button
            className="p-8 rounded-lg"
            variant={"outline"}
            onPress={() => disconnect(wallet)}
          >
            <Typo.Large>Disconnect</Typo.Large>
          </Button>
        )}
      </View>
    </View>
  );
}
