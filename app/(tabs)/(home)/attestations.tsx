import ListItem from "@components/ListItem";
import { Box } from "@gluestack-ui/themed";
import { FlashList } from "@shopify/flash-list";
import { useAddress } from "@thirdweb-dev/react-native";
import { processAttestations } from "@utils/attestations";
import React, { Suspense, useMemo } from "react";
import { useCompaniesSuspenseQuery } from "../../../generated/graphql";

const Attestations = () => {
  // const [attestationsByAttester, setAttestationsByAttester] =
  //   useState<ProcessedAttestation[]>();
  // // TODO: This needs to change to use the Companyaddress instead
  const address = useAddress();

  const { data } = useCompaniesSuspenseQuery({
    skip: !address,
    variables: {
      id: address ?? "",
    },
  });

  const attestationsByAttester = useMemo(() => {
    // @ts-expect-error same data different types
    return processAttestations(address ?? "", data.attestations);
  }, [data.attestations, address]);

  if (!address) {
    return <Box />;
  }

  return (
    <Box gap={"$4"} py="$4" px="$4" flex={1}>
      <Suspense fallback={"...loading"}>
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
      </Suspense>
    </Box>
  );
};

export default Attestations;
