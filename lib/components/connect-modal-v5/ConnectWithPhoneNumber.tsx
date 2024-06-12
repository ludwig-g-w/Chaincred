import { useConnect } from "thirdweb/react";
import { inAppWallet, preAuthenticate } from "thirdweb/wallets/in-app";

import { useState } from "react";

import { chain, thirdwebClient as client } from "@lib/services/thirdwebAuth";
import { InputWithButton } from "../InputWithButton";
import { match } from "ts-pattern";

export default function ConnectWithPhoneNumber() {
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
      console.log({
        verificationCode: verificationCode.trim(),
        phoneNumber,
      });

      await wallet.connect({
        client,
        strategy: "phone",
        phoneNumber,
        verificationCode: verificationCode.trim(),
      });
      return wallet;
    });
  };

  return match(screen)
    .with("phone", () => (
      <InputWithButton
        placeholder="Enter phone number"
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        keyboardType="phone-pad"
        onSubmit={sendSmsCode}
        isSubmitting={sendingOtp}
      />
    ))
    .with("code", () => (
      <InputWithButton
        placeholder="Enter verification code"
        onChangeText={setVerificationCode}
        value={verificationCode}
        keyboardType="numeric"
        onSubmit={connectInAppWallet}
        isSubmitting={isConnecting}
      />
    ))
    .exhaustive();
}
