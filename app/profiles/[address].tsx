import { Box, Text, VStack } from "@gluestack-ui/themed";
import { FlashList } from "@shopify/flash-list";
import { processAttestations } from "@utils/attestations";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useCompaniesSuspenseQuery } from "../../generated/graphql";

import AttestationItem from "@components/AttestationItem";
import { getProfileByAddress } from "@services/supabase";
import { Profile } from "@utils/types";

const Attestations = () => {
  const { address } = useLocalSearchParams<{ address: string }>();
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    if (!address) return;
    (async () => {
      const p = await getProfileByAddress(address);
      setProfile(p);
    })();
  }, [address]);
  console.log(profile);

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
                cachePolicy={"none"}
                source={{
                  uri: profile?.image_url,
                }}
                contentFit="cover"
              />
              <VStack gap={"$2"} py="$6" px="$2" flex={1}>
                <Text bold size="2xl">
                  {profile?.title}
                </Text>
                <Text>{profile?.description}</Text>
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
