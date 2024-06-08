import { View } from "react-native";

import { sepolia } from "thirdweb/chains";
import { useActiveWallet, useAutoConnect } from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets/in-app";

import { Spinner } from "@gluestack-ui/themed";
import BottomSheet from "@gorhom/bottom-sheet";
import * as Typo from "@lib/components/ui/typography";
import { NAV_THEME } from "@lib/constants";
import { thirdwebClient, chain } from "@lib/services/thirdwebAuth";
import { useColorScheme } from "@lib/useColorScheme";
import { useRef, useState } from "react";
import { createWallet } from "thirdweb/wallets";
import { NWBottomSheet } from "../nativeWindInterop";
import { Button } from "../ui/button";
import ConnectedSection from "./Connected";
import { ConnectExternalWallet } from "./ExternalWallets";
import ConnectInAppWallet from "./ConnectWithSocial";
import MainButton from "../MainButton";

const wallets = [
  inAppWallet({
    smartAccount: {
      chain,
      sponsorGas: true,
    },
  }),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("com.trustwallet.app"),
  createWallet("app.backpack"),
  createWallet("com.bitcoin"),
];
const externalWallets = wallets.slice(1);

export default function ConnectButtonModal() {
  const { isDarkColorScheme } = useColorScheme();
  const tTheme = NAV_THEME[isDarkColorScheme ? "dark" : "light"];
  const bottomSheetRef = useRef<BottomSheet>(null);
  const wallet = useActiveWallet();
  const [open, setOpen] = useState(false);
  const autoConnect = useAutoConnect({
    client: thirdwebClient,
    wallets,
  });

  const autoConnecting = autoConnect.isLoading;

  const openModal = () => {
    setOpen(true);
    bottomSheetRef.current?.expand();
  };

  return (
    <>
      <MainButton onPress={openModal}>
        {autoConnecting ? (
          <Spinner />
        ) : (
          <Typo.Large>Connect to wallet</Typo.Large>
        )}
      </MainButton>
      {open && (
        <NWBottomSheet
          className="bg-primary"
          ref={bottomSheetRef}
          keyboardBehavior="extend"
          snapPoints={["60%"]}
          enablePanDownToClose={true}
          onClose={() => setOpen(false)}
        >
          <View className="flex-1 bg-card flex-wrap px-2">
            {wallet ? (
              <>{<ConnectedSection externalWallets={externalWallets} />}</>
            ) : (
              <View style={{ gap: 16 }}>
                <Typo.Large>In-app wallet</Typo.Large>
                <ConnectInAppWallet />
                <View style={{ height: 12 }} />
                <Typo.Large>External wallet</Typo.Large>
                <View className="flex-row gap-x-4 gap-y-4 flex-wrap ">
                  {externalWallets.map((w) => (
                    <ConnectExternalWallet key={w.id} {...w} />
                  ))}
                </View>
              </View>
            )}
          </View>
        </NWBottomSheet>
      )}
    </>
  );
}
