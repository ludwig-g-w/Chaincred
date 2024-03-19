import ListItem from "@lib/components/ProfileListItem";
import { Box } from "@gluestack-ui/themed";
import { trpc } from "@lib/utils/trpc";
import { FlashList } from "@shopify/flash-list";
import { useUser } from "@thirdweb-dev/react-native";
import { router } from "expo-router";
import React from "react";

const DiscoverList = () => {
  const { user } = useUser();
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
            {...item}
          />
        )}
      />
    </Box>
  );
};

export default DiscoverList;
