import ListItem from "@lib/components/ProfileListItem";
import { Box } from "@gluestack-ui/themed";
import { trpc } from "@lib/utils/trpc";
import { FlashList } from "@shopify/flash-list";
import { useUser } from "@thirdweb-dev/react-native";
import { router } from "expo-router";
import React, { useMemo } from "react";

const DiscoverList = () => {
  const { user } = useUser();
  const [profiles, { refetch, isRefetching }] =
    trpc.getProfiles.useSuspenseQuery();

  const filterProfiles = useMemo(
    () =>
      profiles.filter((p) => {
        return p.address !== user?.address && !!p?.image_url?.length;
      }),
    [profiles]
  );

  return (
    <Box px="$2" flex={1} bg="$white">
      <FlashList
        numColumns={1}
        onRefresh={refetch}
        estimatedItemSize={88}
        refreshing={isRefetching}
        keyExtractor={(d) => d.id.toString()}
        data={filterProfiles}
        ItemSeparatorComponent={() => <Box h="$2" />}
        renderItem={({ item }) => (
          <ListItem
            onPress={() => router.push(`/profiles/${item.address}`)}
            {...item}
          />
        )}
      />
    </Box>
  );
};

export default DiscoverList;
