import { Box, Center, Text } from "@gluestack-ui/themed";
import { ConnectWallet } from "@thirdweb-dev/react-native";
import React from "react";

export default () => {
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
