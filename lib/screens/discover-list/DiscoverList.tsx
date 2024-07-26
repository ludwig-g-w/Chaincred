import { Box } from "@gluestack-ui/themed";
import ListItem from "@lib/components/ProfileListItem";
import { trpc } from "@lib/utils/trpc";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { useActiveAccount } from "thirdweb/react";

const DiscoverList = () => {
  const user = useActiveAccount();
  const [profiles, { refetch, isRefetching }] = trpc.profiles.useSuspenseQuery({
    where: {
      image_url: {
        startsWith: "https://",
      },
      address: {
        notIn: [user?.address ?? ""],
      },
    },
  });

  return (
    <View className="flex-1 bg-background">
      <FlashList
        numColumns={1}
        onRefresh={refetch}
        estimatedItemSize={88}
        refreshing={isRefetching}
        keyExtractor={(d) => d.id.toString()}
        data={profiles}
        style={{ flex: 1 }}
        ItemSeparatorComponent={() => <Box h="$2" />}
        renderItem={({ item }) => (
          <ListItem
            onPress={() => router.push(`/profiles/${item.address}`)}
            {...item}
          />
        )}
      />
    </View>
  );
};

export default DiscoverList;
