import {
  AddIcon,
  Box,
  Button,
  Fab,
  FabIcon,
  FabLabel,
  Text,
} from "@gluestack-ui/themed";
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
      <Link asChild href="/createAttestation">
        <Fab
          size="md"
          placement="bottom right"
          isHovered={false}
          isDisabled={false}
          isPressed={false}
        >
          <FabIcon as={AddIcon} mr="$1" />
          <FabLabel>New Action</FabLabel>
        </Fab>
      </Link>
    </Box>
  );
};
