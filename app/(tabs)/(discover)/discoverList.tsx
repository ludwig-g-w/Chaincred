import { Box, FlatList, Text } from "@gluestack-ui/themed";
import { useAddress } from "@thirdweb-dev/react-native";
import React, { useState } from "react";
import ListItem from "../../../components/ListItem";
import { useCompaniesQuery } from "../../../generated/graphql";
import { schemaEncoder } from "../../../utils/eas";

const DiscoverList = () => {
  return (
    <Box py="$4" px="$4" flex={1}>
      <Text>Nothing here yet</Text>
    </Box>
  );
};

export default DiscoverList;
