import { Button, ButtonText, Center, Text, View } from "@gluestack-ui/themed";
import {
  ConnectWallet,
  useAddress,
  useLogout,
  useUser,
} from "@thirdweb-dev/react-native";

import { router } from "expo-router";
import React, { useEffect } from "react";
import "react-native-gesture-handler";

const WrongAccount = () => {
  const address = useAddress();
  const { logout } = useLogout();
  const { user } = useUser();

  useEffect(() => {
    if (!address || !user?.address) return;
    if (address === user.address) {
      router.replace("/(tabs)/(home)/");
    }
  }, [address, user]);
  return (
    <View flex={1}>
      <Center flex={1} gap="$4" p="$2">
        <Text textAlign="center" bold size="4xl">
          Your wallet doesn't match your user
        </Text>
        <Text textAlign="center" size="xl">
          Switch to corresponding account or logout and login with the account
          belonging to this wallet
        </Text>

        <Button
          rounded="$full"
          variant="outline"
          // @ts-ignore
          onPress={logout}
          borderColor="$backgroundLight500"
          bg="$backgroundLight200"
          w="70%"
        >
          <ButtonText color="$backgroundLight900">Logout</ButtonText>
        </Button>
        <ConnectWallet buttonTitle="Switch account here" />
      </Center>
    </View>
  );
};

export default WrongAccount;
