import * as Typo from "@lib/components/ui/typography";
import React from "react";
import { View } from "react-native";
import { css } from "react-native-reanimated";
import ConnectButtonThirdweb from "@lib/components/ConnectButtonThirdweb";
import { ConnectButton, useActiveWallet, useDisconnect } from "thirdweb/react";
import { Button } from "@lib/components/ui/button";
import { AnimatedTitle } from "./components/AnimatedTitle";
import { thirdwebClient } from "@lib/services/thirdwebClient";

export default function LoginScreen() {
  const { disconnect } = useDisconnect();
  const wallet = useActiveWallet();
  return (
    <View className="flex-1 justify-center items-center gap-4 bg-background">
      <AnimatedTitle />
      <Typo.Lead>An app for reviewing decentralized</Typo.Lead>
      <View className="flex-wrap gap-4 items-center">
        <ConnectButtonThirdweb />
        {wallet && (
          <Button
            className="p-x-12 p-y-4 rounded-2xl"
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
