import {
  ActivityIndicator,
  Image,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";

import { useConnect } from "thirdweb/react";
import { inAppWallet, preAuthenticate } from "thirdweb/wallets/in-app";

import { useState } from "react";

import { chain, thirdwebClient as client } from "@lib/services/thirdwebAuth";
import { InAppWalletSocialAuth } from "thirdweb/wallets";
import { InputWithButton } from "../InputWithButton";

const oAuthOptions: InAppWalletSocialAuth[] = ["google", "facebook", "apple"];

export default function ConnectInAppWallet() {
  return (
    <>
      <View className="flex-row items-center justify-center min-w-[100]  rounded-md border border-border bg-card">
        {oAuthOptions.map((auth) => (
          <ConnectWithSocial key={auth} auth={auth} />
        ))}
      </View>
      <ConnectWithPhoneNumber />
    </>
  );
}

function ConnectWithSocial(props: { auth: InAppWalletSocialAuth }) {
  const { connect, isConnecting } = useConnect();
  const strategy = props.auth;
  const connectInAppWallet = async () => {
    await connect(async () => {
      const wallet = inAppWallet({
        smartAccount: {
          chain,
          sponsorGas: true,
        },
      });
      await wallet.connect({
        client,
        strategy,
        redirectUrl: "com.thirdweb.demo://",
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
              width: 38,
              height: 38,
            }}
          />
        </Pressable>
      )}
    </View>
  );
}

function ConnectWithPhoneNumber() {
  const [screen, setScreen] = useState<"phone" | "code">("phone");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const { connect, isConnecting } = useConnect();

  const sendSmsCode = async () => {
    if (!phoneNumber) return;
    setSendingOtp(true);
    await preAuthenticate({
      client,
      strategy: "phone",
      phoneNumber,
    });
    setSendingOtp(false);
    setScreen("code");
  };

  const connectInAppWallet = async () => {
    if (!verificationCode || !phoneNumber) return;
    await connect(async () => {
      const wallet = inAppWallet({
        smartAccount: {
          chain,
          sponsorGas: true,
        },
      });
      await wallet.connect({
        client,
        strategy: "phone",
        phoneNumber,
        verificationCode,
      });
      return wallet;
    });
  };

  if (screen === "phone") {
    return (
      <InputWithButton
        placeholder="Enter phone number"
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        keyboardType="phone-pad"
        onSubmit={sendSmsCode}
        isSubmitting={sendingOtp}
      />
    );
  }

  return (
    <>
      <InputWithButton
        placeholder="Enter verification code"
        onChangeText={setVerificationCode}
        value={verificationCode}
        keyboardType="numeric"
        onSubmit={connectInAppWallet}
        isSubmitting={isConnecting}
      />
    </>
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
