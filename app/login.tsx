import MainButton from "@components/MainButton";
import { Box, Center, Spinner, Text } from "@gluestack-ui/themed";
import {
  ConnectWallet,
  useAddress,
  useLogin,
  useLogout,
  useUser,
  useConnect,
} from "@thirdweb-dev/react-native";
import { Redirect, useLocalSearchParams } from "expo-router";
import React from "react";
import { match, P } from "ts-pattern";

export default () => {
  const params = useLocalSearchParams<{ rUrl: string }>();
  const address = useAddress();
  const { login } = useLogin();
  const { logout } = useLogout();
  const { isLoggedIn, isLoading } = useUser();

  return (
    <Box flex={1}>
      <Center flex={1}>
        <Text
          paddingHorizontal={"$10"}
          textAlign="center"
          bold
          size="2xl"
          mb={"$4"}
        >
          ChainCred
        </Text>
        <Text paddingHorizontal={"$10"} textAlign="center" size="lg" mb={"$4"}>
          An app for reviewing decentralized
        </Text>
        {match([address, isLoggedIn, isLoading])
          .with([undefined, false, true], () => (
            <Center gap="$4">
              <Text bold>Loading...</Text>
              <Spinner />
            </Center>
          ))
          .with([undefined, false, false], () => <ConnectWallet />)
          .with([P.string, false, false], () => (
            <MainButton onPress={login}>Login</MainButton>
          ))
          .with([P.string, true, false], () => (
            // @ts-ignore
            <Redirect href={params.rUrl ?? "/(tabs)/(home)/"} />
          ))
          .otherwise(() => (
            // @ts-ignore
            <MainButton onPress={logout}>Logout</MainButton>
          ))}
      </Center>
    </Box>
  );
};
