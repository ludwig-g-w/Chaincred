import { View } from "react-native";

import { useActiveWallet, useAutoConnect } from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets/in-app";

import { InAppWalletSocialAuth } from "thirdweb/wallets";
import BottomSheet from "@gorhom/bottom-sheet";
import * as Typo from "@lib/components/ui/typography";
import { NAV_THEME } from "@lib/constants";
import { chain, thirdwebClient } from "@lib/services/thirdwebAuth";
import { useColorScheme } from "@lib/useColorScheme";
import { useRef, useState } from "react";
import { createWallet } from "thirdweb/wallets";
import MainButton from "../MainButton";
import { NWBottomSheet } from "../nativeWindInterop";
import ConnectedSection from "./Connected";
import { ConnectExternalWallet } from "./ExternalWallets";
import ConnectWithPhoneNumber from "./ConnectWithPhoneNumber";
import ConnectWithSocial from "./ConnectWithSocial";

const wallets = [
  inAppWallet({
    auth: {
      options: ["google", "facebook", "apple"],
    },
    smartAccount: {
      factoryAddress: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
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

const oAuthOptions: InAppWalletSocialAuth[] = ["google", "facebook", "apple"];
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
  console.log(autoConnecting);

  const openModal = () => {
    setOpen(true);
    bottomSheetRef.current?.expand();
  };

  return (
    <>
      <MainButton onPress={openModal} loading={autoConnecting}>
        Connect to wallet
      </MainButton>
      {open && (
        <NWBottomSheet
          // @ts-ignore className is ok
          className="bg-card"
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
                <View className="w-full gap-2 flex-row rounded-md">
                  {oAuthOptions.map((auth) => (
                    <ConnectWithSocial key={auth} auth={auth} />
                  ))}
                </View>
                <ConnectWithPhoneNumber />
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
