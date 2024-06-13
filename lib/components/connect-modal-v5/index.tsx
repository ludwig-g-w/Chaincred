import BottomSheet from "@gorhom/bottom-sheet";
import * as Typo from "@lib/components/ui/typography";
import { NAV_THEME } from "@lib/constants";
import { thirdwebClient, wallets } from "@lib/services/thirdwebClient";
import { useColorScheme } from "@lib/useColorScheme";
import { useRef, useState } from "react";
import { View } from "react-native";
import { useActiveWallet, useAutoConnect } from "thirdweb/react";
import { InAppWalletSocialAuth } from "thirdweb/wallets";
import MainButton from "../MainButton";
import { NWBottomSheet } from "../nativeWindInterop";
import ConnectWithPhoneNumber from "./ConnectWithPhoneNumber";
import ConnectWithSocial from "./ConnectWithSocial";
import ConnectedSection from "./Connected";
import { ConnectExternalWallet } from "./ExternalWallets";

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
