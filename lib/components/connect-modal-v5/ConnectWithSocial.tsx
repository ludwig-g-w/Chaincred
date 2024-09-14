import { Image } from "expo-image";
import { ActivityIndicator, Pressable, View } from "react-native";

import { useConnect } from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets/in-app";

import {
  chain,
  thirdwebClient as client,
  wallets,
} from "@lib/services/thirdwebClient";
import { InAppWalletSocialAuth } from "thirdweb/wallets";

export default function ConnectWithSocial(props: {
  auth: InAppWalletSocialAuth;
}) {
  const { connect, isConnecting } = useConnect();
  const strategy = props.auth;
  const connectInAppWallet = async () => {
    await connect(async () => {
      const wallet = wallets[0];

      await wallet.connect({
        client,
        strategy,
        redirectUrl: "com.ludwigw.chaincred://",
      });
      return wallet;
    });
  };

  return (
    <View className="flex-row items-center justify-evenly  rounded-md bg-card">
      {isConnecting ? (
        <ActivityIndicator />
      ) : (
        <Pressable
          key={strategy}
          onPress={connectInAppWallet}
          disabled={isConnecting}
        >
          <Image
            source={getSocialIcon(strategy)}
            style={{
              backgroundColor: "black",
              borderRadius: 100,
              width: 38,
              height: 38,
            }}
          />
        </Pressable>
      )}
    </View>
  );
}

function getSocialIcon(strategy: string) {
  switch (strategy) {
    case "google":
      return require("assets/images/google.png");
    case "facebook":
      return require("assets/images/facebook.png");
    case "apple":
      return require("assets/images/apple.png");
  }
}
