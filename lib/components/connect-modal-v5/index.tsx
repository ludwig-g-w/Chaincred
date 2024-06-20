import BottomSheet from "@gorhom/bottom-sheet";
import * as Typo from "@lib/components/ui/typography";
import { NAV_THEME } from "@lib/constants";
import { thirdwebClient, wallets } from "@lib/services/thirdwebClient";
import { useColorScheme } from "@lib/useColorScheme";
import { trpc } from "@lib/utils/trpc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { signLoginPayload } from "thirdweb/auth";
import {
  useActiveAccount,
  useActiveWallet,
  useAutoConnect,
} from "thirdweb/react";
import { InAppWalletSocialAuth } from "thirdweb/wallets";
import { P, match } from "ts-pattern";
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
  const account = useActiveAccount();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jwt, setJwt] = useState<string | null>();
  const autoConnect = useAutoConnect({
    client: thirdwebClient,
    wallets,
  });

  const combinedLoading = autoConnect.isLoading || loading;

  const openModal = () => {
    setOpen(true);
    bottomSheetRef.current?.expand();
  };
  const { mutateAsync: initLogin } = trpc.login.useMutation();
  const { mutateAsync: verifyLoginPayload } =
    trpc.verifyLoginPayload.useMutation();

  useEffect(() => {
    console.log({ address: account?.address, jwt });

    (async () => {
      const _jwt = await AsyncStorage.getItem("auth_token_storage_key");
      setJwt(_jwt);
      if (!account?.address) return;
      setLoading(true);
      try {
        const loginPayload = await initLogin({
          address: account?.address,
          chainId: wallet?.getChain()?.id,
        });

        const signature = await signLoginPayload({
          payload: loginPayload!,
          account: account,
        });

        const jwt = await verifyLoginPayload(signature);
        if (jwt) {
          await AsyncStorage.setItem("auth_token_storage_key", jwt);
          setJwt(jwt);
        }
      } catch (error) {
        console.log({ error });
      } finally {
        setLoading(false);
      }
    })();
  }, [account?.address]);

  const logout = () => {
    AsyncStorage.removeItem("auth_token_storage_key");
    wallet?.disconnect();
  };

  return (
    <>
      {match([account?.address, jwt, combinedLoading])
        .with([P.string, P.string, false], () => (
          <MainButton variant="outline" onPress={logout}>
            Sign out
          </MainButton>
        ))
        .with([P.any, P.any, false], () => (
          <MainButton onPress={openModal}>Sign in</MainButton>
        ))
        .with([P.any, P.any, true], () => (
          <MainButton loading={combinedLoading}>Loading</MainButton>
        ))
        .otherwise(() => (
          <MainButton loading={combinedLoading}>Loading</MainButton>
        ))}
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
          <ScrollView className="flex-1 bg-card flex-wrap px-2">
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
          </ScrollView>
        </NWBottomSheet>
      )}
    </>
  );
}
