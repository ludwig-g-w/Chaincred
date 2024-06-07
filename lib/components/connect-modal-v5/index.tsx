import { ActivityIndicator, StyleSheet, View } from "react-native";

import { sepolia } from "thirdweb/chains";
import { useActiveWallet, useAutoConnect } from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets/in-app";

import { Button, Spinner } from "@gluestack-ui/themed";
import BottomSheet from "@gorhom/bottom-sheet";
import * as Typo from "@lib/components/ui/typography";
import { NAV_THEME } from "@lib/constants";
import { thirdwebClient } from "@lib/services/thirdweb";
import { useColorScheme } from "@lib/useColorScheme";
import { useRef, useState } from "react";
import { createWallet } from "thirdweb/wallets";
import { ConnectExternalWallet } from "./ExternalWallets";

const wallets = [
  inAppWallet({
    smartAccount: {
      sepolia,
      sponsorGas: true,
    },
  }),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("com.trustwallet.app"),
  createWallet("io.zerion.wallet"),
  createWallet("xyz.argent"),
  createWallet("com.ledger"),
  createWallet("com.alphawallet"),
];
const externalWallets = wallets.slice(1);

export default function HomeScreen() {
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

  return (
    <>
      <Button onPress={(o) => setOpen(!o)}>
        {autoConnecting ? (
          <Spinner />
        ) : (
          <Typo.Large>Connect to wallet</Typo.Large>
        )}
      </Button>
      {open && (
        <BottomSheet
          backgroundStyle={{
            backgroundColor: tTheme.background,
          }}
          ref={bottomSheetRef}
          keyboardBehavior="extend"
          snapPoints={["80%"]}
          enablePanDownToClose={true}
          onClose={() => setOpen(false)}
        >
          <View style={styles.stepContainer}>
            {wallet ? (
              <>{/* <ConnectedSection /> */}</>
            ) : (
              <View style={{ gap: 16 }}>
                {/* <Typo.Large>In-app wallet</Typo.Large> */}
                {/* <ConnectInAppWallet /> */}
                <View style={{ height: 12 }} />
                <Typo.Large>External wallet</Typo.Large>
                <View style={styles.rowContainer}>
                  {externalWallets.map((w) => (
                    <ConnectExternalWallet key={w.id} {...w} />
                  ))}
                </View>
              </View>
            )}
          </View>
        </BottomSheet>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  rowContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,
    justifyContent: "space-evenly",
  },
});
