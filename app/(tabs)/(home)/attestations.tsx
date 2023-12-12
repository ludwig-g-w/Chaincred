import { Box, FlatList } from "@gluestack-ui/themed";
import { useAddress } from "@thirdweb-dev/react-native";
import React, { useState } from "react";
import ListItem from "@components/ListItem";
import {
  ListAttestationFragment,
  useCompaniesQuery,
} from "../../../generated/graphql";
import {
  ProcessedAttestation,
  groupAttestationsByAttester,
  processAttestations,
} from "@utils/attestations";
import { FlashList } from "@shopify/flash-list";

const Attestations = () => {
  const [attestationsByAttester, setAttestationsByAttester] =
    useState<ProcessedAttestation[]>();
  // TODO: This needs to change to use the Companyaddress instead
  const address = useAddress();

  useCompaniesQuery({
    skip: !address,
    variables: {
      id: address ?? "",
    },
    onCompleted: ({ attestations }) => {
      const groupedAttestations = processAttestations(address, attestations);
      setAttestationsByAttester(groupedAttestations);
    },
  });

  if (!address) {
    return null;
  }

  return (
    <Box gap={"$4"} py="$4" px="$4" flex={1}>
      <FlashList
        estimatedItemSize={88}
        data={attestationsByAttester}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Box mb="$2">
            <ListItem title={item.title} count={item?.count} />
          </Box>
        )}
      />
    </Box>
  );
};

export default Attestations;
