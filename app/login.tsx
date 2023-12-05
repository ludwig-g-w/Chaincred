import { Box, Center, Text } from "@gluestack-ui/themed";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react-native";
import { Redirect, useLocalSearchParams } from "expo-router";
import React from "react";

export default () => {
  const user = useAddress();
  const params = useLocalSearchParams<{ rUrl: string }>();

  if (user) {
    return <Redirect href={"/list"} />;
  }

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
          Cross pollination
        </Text>
        <Text paddingHorizontal={"$10"} textAlign="center" size="lg" mb={"$4"}>
          Cross pollination, create your interlinked rewards program
        </Text>
        <ConnectWallet />
      </Center>
    </Box>
  );
};
