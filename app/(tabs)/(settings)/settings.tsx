import MainButton from "@components/MainButton";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { HStack, Pressable, Text, VStack } from "@gluestack-ui/themed";
import {
  useAddress,
  useLogin,
  useLogout,
  useUser,
} from "@thirdweb-dev/react-native";
import { router } from "expo-router";
import React from "react";

import { match, P } from "ts-pattern";

export default () => {
  const address = useAddress();
  const { login } = useLogin();
  const { logout } = useLogout();
  const { isLoggedIn } = useUser();

  return (
    <VStack p="$4" bg="$white" gap={"$2"} flex={1}>
      <Item
        title="Attestations"
        onPress={() => router.push("/manageAttestations")}
      />
      <Item
        title="Your Profile"
        onPress={() => router.push("/settingsProfile")}
      />
      {match([address, isLoggedIn])
        .with([P.string, false], () => (
          <MainButton onPress={login}>Login</MainButton>
        ))
        .otherwise(() => (
          <MainButton onPress={logout}>Logout</MainButton>
        ))}
    </VStack>
  );

  function Item({ title = "", onPress = () => {} }) {
    return (
      <Pressable py="$4" onPress={onPress}>
        <HStack
          borderBottomColor="$trueGray700"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text>{title}</Text>
          <FontAwesome name="chevron-right" />
        </HStack>
      </Pressable>
    );
  }
};
