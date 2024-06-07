import { ActivityIndicator, Image, Pressable, View } from "react-native";

import { useConnect } from "thirdweb/react";

import { thirdwebClient } from "@lib/services/thirdweb";

import { useEffect, useState } from "react";

import * as Typo from "@lib/components/ui/typography";
import { Wallet, getWalletInfo } from "thirdweb/wallets";

export function ConnectExternalWallet(wallet: Wallet) {
  const { connect, isConnecting, error } = useConnect();
  const [walletName, setWalletName] = useState<string | null>(null);
  const [walletImage, setWalletImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchWalletName = async () => {
      const [name, image] = await Promise.all([
        getWalletInfo(wallet.id).then((info) => info.name),
        getWalletInfo(wallet.id, true),
      ]);
      setWalletName(name);
      setWalletImage(image);
    };
    fetchWalletName();
  }, [wallet]);

  const connectExternalWallet = async () => {
    await connect(async () => {
      await wallet.connect({
        client: thirdwebClient,
      });
      return wallet;
    });
  };

  return (
    walletImage &&
    walletName && (
      <View className="flex-row items-center justify-center">
        {isConnecting && !error ? (
          <ActivityIndicator style={{ width: 60, height: 60 }} />
        ) : (
          <>
            <Pressable onPress={connectExternalWallet} disabled={isConnecting}>
              <Image
                source={{ uri: walletImage ?? "" }}
                style={{ width: 60, height: 60, borderRadius: 6 }}
              />
            </Pressable>
            <Typo.Large style={{ fontSize: 11 }}>
              {walletName.split(" ")[0]}
            </Typo.Large>
          </>
        )}
      </View>
    )
  );
}
