import ListItem from "@components/ProfileCard";
import { ORGANIZATION_MANAGER_ADDRESS } from "@env";
import { Box, Text } from "@gluestack-ui/themed";
import { _fetch } from "@services/clientApi";
import { FlashList } from "@shopify/flash-list";
import { useAddress, useContract } from "@thirdweb-dev/react-native";
import { groupAttestationsByAttester } from "@utils/attestations";
import { ProfileListItem } from "@utils/types";
import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";

const data = {};

const DiscoverList = () => {
  const [profileData, setProfileData] = useState<ProfileListItem[]>([]);
  const { contract } = useContract(ORGANIZATION_MANAGER_ADDRESS);

  const address = useAddress();
  // const { data, error } = useDiscoverListSuspenseQuery({
  //   skip: !address,
  //   variables: {
  //     id: address ?? "",
  //   },
  // });

  const attestationsByAttester = useMemo(
    () => groupAttestationsByAttester(data?.attestations),
    [data?.attestations]
  );
  useEffect(() => {
    if (!attestationsByAttester) return;
    (async function mergeProfileWithAttestations() {
      const addresses = Object.keys(attestationsByAttester);
      const profiles = await _fetch({
        path: "profiles",
        params: {
          addresses,
        },
      });

      const results: ProfileListItem[] = [];
      for (const key in attestationsByAttester) {
        if (attestationsByAttester.hasOwnProperty(key)) {
          const profile = profiles.find((p) => p.address === key);
          const amount = attestationsByAttester[key].length;

          results.push({
            title: profile?.title ?? key,
            description: profile?.description ?? "",
            locationCoords: profile?.location_coords ?? "",
            count: amount,
            id: attestationsByAttester[key][0].id,
            address: key,
            // @ts-ignore
            imageUrl: profile?.image_url,
          });
        }
      }
      setProfileData(results);
    })();
  }, [contract, attestationsByAttester]);

  return (
    <Box px="$2" flex={1} bg="$white">
      <Text color="$textLight600" my="$4" size="lg" bold>
        Actions Received
      </Text>
      <FlashList
        numColumns={1}
        estimatedItemSize={88}
        keyExtractor={(d) => d.id}
        data={profileData}
        ItemSeparatorComponent={() => <Box h="$2" />}
        renderItem={({ item }) => (
          <ListItem
            onPress={() => router.push(`/profiles/${item.address}`)}
            imageUrl={item.imageUrl}
            count={item.count}
            title={item.title}
            description={item.description}
            locationCoords={item.locationCoords}
          />
        )}
      />
    </Box>
  );
};

export default DiscoverList;
