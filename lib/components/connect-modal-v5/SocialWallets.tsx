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

// const oAuthOptions: InAppWalletSocialAuth[] = ["google", "facebook", "apple"];

// function ConnectInAppWallet() {
//   return (
//     <>
//       <View style={[styles.rowContainer]}>
//         {oAuthOptions.map((auth) => (
//           <ConnectWithSocial key={auth} auth={auth} />
//         ))}
//       </View>
//       <ConnectWithPhoneNumber />
//     </>
//   );
// }

// function ConnectWithSocial(props: { auth: InAppWalletSocialAuth }) {
//   const bgColor = useThemeColor({}, "border");
//   const { connect, isConnecting } = useConnect();
//   const strategy = props.auth;
//   const connectInAppWallet = async () => {
//     await connect(async () => {
//       const wallet = inAppWallet({
//         smartAccount: {
//           chain,
//           sponsorGas: true,
//         },
//       });
//       await wallet.connect({
//         client,
//         strategy,
//         redirectUrl: "com.thirdweb.demo://",
//       });
//       return wallet;
//     });
//   };

//   return (
//     <View
//       style={{
//         flex: 1,
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         borderStyle: "solid",
//         borderWidth: 1,
//         borderColor: bgColor,
//         borderRadius: 6,
//         height: 60,
//       }}
//     >
//       {isConnecting ? (
//         <ActivityIndicator />
//       ) : (
//         <TouchableOpacity
//           key={strategy}
//           onPress={connectInAppWallet}
//           disabled={isConnecting}
//         >
//           <Image
//             source={getSocialIcon(strategy)}
//             style={{
//               width: 38,
//               height: 38,
//             }}
//           />
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// }

// function ConnectWithPhoneNumber() {
//   const [screen, setScreen] = useState<"phone" | "code">("phone");
//   const [sendingOtp, setSendingOtp] = useState(false);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [verificationCode, setVerificationCode] = useState("");
//   const { connect, isConnecting } = useConnect();

//   const sendSmsCode = async () => {
//     if (!phoneNumber) return;
//     setSendingOtp(true);
//     await preAuthenticate({
//       client,
//       strategy: "phone",
//       phoneNumber,
//     });
//     setSendingOtp(false);
//     setScreen("code");
//   };

//   const connectInAppWallet = async () => {
//     if (!verificationCode || !phoneNumber) return;
//     await connect(async () => {
//       const wallet = inAppWallet({
//         smartAccount: {
//           chain,
//           sponsorGas: true,
//         },
//       });
//       await wallet.connect({
//         client,
//         strategy: "phone",
//         phoneNumber,
//         verificationCode,
//       });
//       return wallet;
//     });
//   };

//   if (screen === "phone") {
//     return (
//       <ThemedInput
//         placeholder="Enter phone number"
//         onChangeText={setPhoneNumber}
//         value={phoneNumber}
//         keyboardType="phone-pad"
//         onSubmit={sendSmsCode}
//         isSubmitting={sendingOtp}
//       />
//     );
//   }

//   return (
//     <>
//       <ThemedInput
//         placeholder="Enter verification code"
//         onChangeText={setVerificationCode}
//         value={verificationCode}
//         keyboardType="numeric"
//         onSubmit={connectInAppWallet}
//         isSubmitting={isConnecting}
//       />
//     </>
//   );
// }

// function getSocialIcon(strategy: string) {
//   switch (strategy) {
//     case "google":
//       return require("@/assets/images/google.png");
//     case "facebook":
//       return require("@/assets/images/facebook.png");
//     case "apple":
//       return require("@/assets/images/apple.png");
//   }
// }
