import { Box, Button, Text } from "@gluestack-ui/themed";
import { Link, router } from "expo-router";
import React from "react";
import ListOfAttestations from "../../../components/ListOfAttestations";

export default () => {
  return (
    <Box flex={1}>
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

      <Link asChild href={"/createAttestation"}>
        <Button m="$10" bg="$backgroundDark950">
          <Text color="white">Create Attestation</Text>
        </Button>
      </Link>
    </Box>
  );
};
