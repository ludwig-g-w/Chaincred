import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";

import {
  useActiveAccount,
  useConnect,
  useDisconnect,
  useActiveWallet,
  useAutoConnect,
  useWalletBalance,
  useConnectedWallets,
  useSetActiveWallet,
} from "thirdweb/react";
import {
  getUserEmail,
  inAppWallet,
  preAuthenticate,
} from "thirdweb/wallets/in-app";
import { sepolia } from "thirdweb/chains";
import { shortenAddress } from "thirdweb/utils";

import { useEffect, useState } from "react";

import {
  InAppWalletSocialAuth,
  Wallet,
  createWallet,
  getWalletInfo,
} from "thirdweb/wallets";
import { Button } from "../ui/button";
import * as Typo from "@lib/components/ui/typography";
import { ConnectExternalWallet } from "./ExternalWallets";

// function ConnectedSection() {
//   const { disconnect } = useDisconnect();
//   const account = useActiveAccount();
//   const activeWallet = useActiveWallet();
//   const setActive = useSetActiveWallet();
//   const connectedWallets = useConnectedWallets();
//   const balanceQuery = useWalletBalance({
//     address: account?.address,
//     chain: activeWallet?.getChain(),
//     client,
//   });
//   const [email, setEmail] = useState("");
//   useEffect(() => {
//     const fetchEmail = async () => {
//       if (activeWallet?.id === "inApp") {
//         try {
//           const email = await getUserEmail({
//             client,
//           });
//           if (email) {
//             setEmail(email);
//           }
//         } catch (e) {
//           // no email
//         }
//       } else {
//         setEmail("");
//       }
//     };
//     fetchEmail();
//   }, [account]);

//   const switchWallet = async () => {
//     const activeIndex = connectedWallets.findIndex(
//       (w) => w.id === activeWallet?.id
//     );
//     const nextWallet =
//       connectedWallets[(activeIndex + 1) % connectedWallets.length];
//     if (nextWallet) {
//       await setActive(nextWallet);
//     }
//   };

//   return (
//     <>
//       {account ? (
//         <>
//           <Text>Connected Wallets: </Text>
//           <View style={{ gap: 2 }}>
//             {connectedWallets.map((w, i) => (
//               <Text key={w.id + i} type="defaultSemiBold">
//                 - {w.id} {w.id === activeWallet?.id ? "✅" : ""}
//               </Text>
//             ))}
//           </View>
//           <View style={{ height: 12 }} />
//           {email && activeWallet?.id === "inApp" && (
//             <Text>
//               Email: <Typo.Large>{email}</Typo.Large>
//             </Text>
//           )}
//           <Text>
//             Address:{" "}
//             <Typo.Large>
//               {shortenAddress(account.address)}
//             </Typo.Large>
//           </Text>
//           <Text>
//             Chain:{" "}
//             <Typo.Large>
//               {activeWallet?.getChain()?.name || "Unknown"}
//             </Typo.Large>
//           </Text>
//           <Text>
//             Balance:{" "}
//             {balanceQuery.data && (
//               <Typo.Large>
//                 {`${balanceQuery.data?.displayValue.slice(0, 8)} ${
//                   balanceQuery.data?.symbol
//                 }`}
//               </Typo.Large>
//             )}
//           </Text>
//           <View style={{ height: 12 }} />
//           {connectedWallets.length > 1 && (
//             <Button
//               variant="secondary"
//               title="Switch Wallet"
//               onPress={switchWallet}
//             />
//           )}
//           <Button
//             title="Sign message"
//             variant="secondary"
//             onPress={async () => {
//               if (account) {
//                 account.signMessage({ message: "hello world" });
//               }
//             }}
//           />
//           <Button
//             title="Disconnect"
//             variant="secondary"
//             onPress={async () => {
//               if (activeWallet) {
//                 disconnect(activeWallet);
//               }
//             }}
//           />
//           <View style={{ height: 12 }} />
//           <Typo.Large>Connect another wallet</Typo.Large>
//           <View style={styles.rowContainer}>
//             {externalWallets
//               .filter(
//                 (w) => !connectedWallets.map((cw) => cw.id).includes(w.id)
//               )
//               .map((w, i) => (
//                 <ConnectExternalWallet key={w.id + i} {...w} />
//               ))}
//           </View>
//         </>
//       ) : (
//         <>
//           <Text>Connect to mint an NFT.</Text>
//         </>
//       )}
//     </>
//   );
// }
