import { Box, Center, Text } from "@gluestack-ui/themed";
import { ConnectWallet } from "@thirdweb-dev/react-native";
import React from "react";

const App = () => {
  return (
    <Box flex={1}>
      <Center flex={1}>
        <Text bold size="lg">
          React Native thirdweb starter
        </Text>
      </Center>
    </Box>
  );
};

export default App;
