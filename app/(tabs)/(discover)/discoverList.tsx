import ListItem from "@components/ProfileCard";
import { ORGANIZATION_MANAGER_ADDRESS } from "@env";
import { Box, Text } from "@gluestack-ui/themed";
import { trpc } from "@lib/utils/trpc";
import { _fetch } from "@services/clientApi";
import { FlashList } from "@shopify/flash-list";
import { useAddress, useContract } from "@thirdweb-dev/react-native";
import { groupAttestationsByAttester } from "@utils/attestations";
import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { Profile } from "@prisma/client";

const DiscoverList = () => {
  const [profiles] = trpc.getProfiles.useSuspenseQuery();
  return (
    <Box px="$2" flex={1} bg="$white">
      <FlashList
        numColumns={1}
        estimatedItemSize={88}
        keyExtractor={(d) => d.id.toString()}
        data={profiles}
        ItemSeparatorComponent={() => <Box h="$2" />}
        renderItem={({ item }) => (
          <ListItem
            onPress={() => router.push(`/profiles/${item.address}`)}
            imageUrl={item.image_url}
            count={0}
            title={item.title}
            description={item.description}
            locationCoords={item.location_coords}
          />
        )}
      />
    </Box>
  );
};

export default DiscoverList;
