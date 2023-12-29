import ListItem from "@components/ProfileCard";
import { Box, Text, VStack } from "@gluestack-ui/themed";
import { FlashList } from "@shopify/flash-list";
import { useStorage } from "@thirdweb-dev/react-native";
import { processAttestations } from "@utils/attestations";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useCompaniesSuspenseQuery } from "../../../../generated/graphql";

import invariant from "tiny-invariant";
import { ORGANIZATION_MANAGER_ADDRESS } from "@env";
import { useContract, useContractRead } from "@thirdweb-dev/react-native";
import AttestationItem from "@components/AttestationItem";
import { getProfileByAddress } from "@services/supabase";
import { Profile } from "@utils/types";

const Attestations = () => {
  // const [attestationsByAttester, setAttestationsByAttester] =
  //   useState<ProcessedAttestation[]>();

  const { address } = useLocalSearchParams<{ address: string }>();
  const [profile, setProfile] = useState<Profile>();
  const storage = useStorage();

  useEffect(() => {
    (async () => {
      const profile = await getProfileByAddress(address);
      invariant(profile, "no profile found");
      let img = "";
      if (profile?.image_url.length && !!storage) {
        img =
          profile?.image_url &&
          (await storage?.download(profile.image_url.replace("coverphoto", "")))
            .url;
      }
      setProfile({
        ...profile,
        image_url: img,
      });
    })();
  }, []);

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
                source={profile?.image_url}
                contentFit="cover"
                transition={1000}
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
