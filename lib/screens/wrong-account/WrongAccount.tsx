import MainButton from "@lib/components/MainButton";
import * as Typo from "@lib/components/ui/typography";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";
import "react-native-gesture-handler";
import { useActiveAccount } from "thirdweb/react";

// not used
const WrongAccount = () => {
  const account = useActiveAccount();
  const address = account?.address;
  const user = account;

  useEffect(() => {
    if (!address || !user?.address) return;
    if (address === user.address) {
      router.replace("/(tabs)/(home)/");
    }
  }, [address, user]);
  return (
    <View className="flex-1">
      <View className="flex-1 gap-4 p-2">
        <Typo.H4 className="text-center">
          Your wallet doesn't match your user
        </Typo.H4>
        <Typo.H4 className="text-center">
          Switch to corresponding account or logout and login with the account
          belonging to this wallet
        </Typo.H4>

        <MainButton>Logout</MainButton>
      </View>
    </View>
  );
};

export default WrongAccount;
