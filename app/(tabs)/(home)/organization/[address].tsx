import ListItem from "@components/ProfileCard";
import { Box, Text, VStack } from "@gluestack-ui/themed";
import { FlashList } from "@shopify/flash-list";
import { useStorage } from "@thirdweb-dev/react-native";
import { processAttestations } from "@utils/attestations";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useCompaniesSuspenseQuery } from "../../../../generated/graphql";

import { invariant } from "@apollo/client/utilities/globals";
import { ORGANIZATION_MANAGER_ADDRESS } from "@env";
import { useContract, useContractRead } from "@thirdweb-dev/react-native";
import AttestationItem from "@components/AttestationItem";

const Attestations = () => {
  // const [attestationsByAttester, setAttestationsByAttester] =
  //   useState<ProcessedAttestation[]>();

  const { address } = useLocalSearchParams<{ address: string }>();
  const { contract } = useContract(ORGANIZATION_MANAGER_ADDRESS);
  const [img, setImg] = useState("");
  const storage = useStorage();
  const { data: contractData, isLoading } = useContractRead(
    contract,
    "getOrganization",
    [address]
  );

  useEffect(() => {
    (async () => {
      if (!contractData?.[1]) return;
      const resp = await storage?.download(
        contractData?.[1].replace("coverphoto", "")
      ); // Download a file from IPFS
      const imageUrl = resp?.url;
      invariant(imageUrl, "no url");
      setImg(imageUrl);
    })();
  }, [contractData]);

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

  return (
    <Box flex={1}>
      <Suspense fallback={"...loading"}>
        <FlashList
          ListHeaderComponent={() => (
            <>
              <Image
                style={{
                  aspectRatio: 1.5 / 1,
                  width: "100%",
                  backgroundColor: "#0553",
                }}
                source={img}
                contentFit="cover"
                transition={1000}
              />
              <VStack gap={"$2"} py="$6" px="$2" flex={1}>
                <Text bold size="2xl">
                  {contractData?.[0]}
                </Text>
                <Text>{contractData?.[2]}</Text>
              </VStack>
            </>
          )}
          estimatedItemSize={88}
          data={attestationsByAttester}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Box py="$1">
              <AttestationItem title={item.title} count={item?.count} />
            </Box>
          )}
        />
      </Suspense>
    </Box>
  );
};

export default Attestations;
