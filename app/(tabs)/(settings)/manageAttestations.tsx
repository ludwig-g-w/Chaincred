import { Box, Button, Text } from "@gluestack-ui/themed";
import { Link, router } from "expo-router";
import React from "react";
import ListOfAttestations from "../../../lib/components/ListOfAttestations";

export default () => {
  return (
    <Box bg="$white" flex={1} px="$2">
      <ListOfAttestations
        onPressItem={(_, idx) => {
          router.push({
            pathname: "/attestDetails",
            params: {
              idx,
            },
          });
        }}
      />

      <Button m="$10" bg="$backgroundDark950">
        <Text color="white">Create Attestation</Text>
      </Button>
    </Box>
  );
};
