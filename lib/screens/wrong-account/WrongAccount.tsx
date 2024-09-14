import { Button, ButtonText, Center, Text, View } from "@gluestack-ui/themed";
import { router } from "expo-router";
import React, { useEffect } from "react";
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
          // onPress={logout}
          borderColor="$backgroundLight500"
          bg="$backgroundLight200"
          w="70%"
        >
          <ButtonText color="$backgroundLight900">Logout</ButtonText>
        </Button>
        {/* <ConnectWallet buttonTitle="Switch account here" /> */}
      </Center>
    </View>
  );
};

export default WrongAccount;
