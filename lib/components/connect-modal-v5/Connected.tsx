import { Text, View } from "react-native";
import { thirdwebClient as client } from "@lib/services/thirdwebClient";
import {
  useActiveAccount,
  useActiveWallet,
  useConnectedWallets,
  useDisconnect,
  useSetActiveWallet,
  useWalletBalance,
} from "thirdweb/react";
import { shortenAddress } from "thirdweb/utils";
import { getUserEmail } from "thirdweb/wallets/in-app";
import { useEffect, useState } from "react";
import * as Typo from "@lib/components/ui/typography";
import { Wallet } from "thirdweb/wallets";
import { Button } from "../ui/button";
import { ConnectExternalWallet } from "./ExternalWallets";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ConnectedSection({
  externalWallets,
}: {
  externalWallets: Wallet[];
}) {
  const { disconnect } = useDisconnect();
  const account = useActiveAccount();
  const activeWallet = useActiveWallet();
  const setActive = useSetActiveWallet();
  const connectedWallets = useConnectedWallets();
  const balanceQuery = useWalletBalance({
    address: account?.address,
    chain: activeWallet?.getChain(),
    client,
  });
  const [email, setEmail] = useState("");
  useEffect(() => {
    const fetchEmail = async () => {
      if (activeWallet?.id === "inApp") {
        try {
          const email = await getUserEmail({
            client,
          });
          if (email) {
            setEmail(email);
          }
        } catch (e) {
          // no email
        }
      } else {
        setEmail("");
      }
    };
    fetchEmail();
  }, [account]);

  const switchWallet = async () => {
    const activeIndex = connectedWallets.findIndex(
      (w) => w.id === activeWallet?.id
    );
    const nextWallet =
      connectedWallets[(activeIndex + 1) % connectedWallets.length];
    if (nextWallet) {
      await setActive(nextWallet);
    }
  };

  return (
    <>
      {account ? (
        <>
          <View className="gap-2 p-2">
            <Typo.Lead>Connected Wallets: </Typo.Lead>
            <View style={{ gap: 2 }}>
              {connectedWallets.map((w, i) => (
                <Typo.Large key={w.id + i}>
                  - {w.id} {w.id === activeWallet?.id ? "✅" : ""}
                </Typo.Large>
              ))}
            </View>
            {email && activeWallet?.id === "inApp" && (
              <Typo.Lead>
                Email: <Typo.Large>{email}</Typo.Large>
              </Typo.Lead>
            )}
            <Typo.Lead>
              Address:{" "}
              <Typo.Large>{shortenAddress(account.address)}</Typo.Large>
            </Typo.Lead>
            <Typo.Lead>
              Chain:{" "}
              <Typo.Large>
                {activeWallet?.getChain()?.name || "Unknown"}
              </Typo.Large>
            </Typo.Lead>
            <Typo.Lead>
              Balance:{" "}
              {balanceQuery.data && (
                <Typo.Large>
                  {`${balanceQuery.data?.displayValue.slice(0, 8)} ${
                    balanceQuery.data?.symbol
                  }`}
                </Typo.Large>
              )}
            </Typo.Lead>
          </View>
          <View className="flex-row gap-x-4 gap-y-4 flex-wrap items-center py-6 ">
            {connectedWallets.length > 1 && (
              <Button variant="secondary" onPress={switchWallet}>
                <Typo.Large>Switch Wallet</Typo.Large>
              </Button>
            )}
            <Button
              variant="destructive"
              onPress={async () => {
                if (activeWallet) {
                  disconnect(activeWallet);
                  AsyncStorage.removeItem("auth_token_storage_key");
                }
              }}
            >
              <Typo.Large className="color-destructive-foreground">
                Disconnect
              </Typo.Large>
            </Button>
          </View>
          <Typo.H3 className="pb-4">Connect another wallet</Typo.H3>
          <View className="flex-row gap-x-4 gap-y-4 flex-wrap ">
            {externalWallets
              .filter(
                (w) => !connectedWallets.map((cw) => cw.id).includes(w.id)
              )
              .map((w, i) => (
                <ConnectExternalWallet key={w.id + i} {...w} />
              ))}
          </View>
        </>
      ) : (
        <>
          <Text>Connect to mint an NFT.</Text>
        </>
      )}
    </>
  );
}
