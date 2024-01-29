import ListItem from "@components/ProfileCard";
import { ORGANIZATION_MANAGER_ADDRESS } from "@env";
import { Box, Text } from "@gluestack-ui/themed";
import { getProfilesByAddresses } from "@services/supabase";
import { format, parseISO } from "date-fns";
import { FlashList } from "@shopify/flash-list";
import { useAddress, useContract } from "@thirdweb-dev/react-native";
import { groupAttestationsByAttester } from "@utils/attestations";
import { ProfileListItem, isAttestItem } from "@utils/types";
import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { useHomeFeedSuspenseQuery } from "../../../generated/graphql";
import AttestationItem from "@components/AttestationItem";
import ReviewListItem from "@components/ReviewListItem";

// Dummy data for restaurants, replace with your actual data source
const data = {
  Restaurants: [{ id: 1, title: "Test 1", description: "test", count: 4 }],
  Dishes: [
    // ...your dishes data
  ],
};

const Companies = () => {
  const [profileData, setProfileData] = useState<ProfileListItem[]>([]);
  const { contract } = useContract(ORGANIZATION_MANAGER_ADDRESS);

  const address = useAddress();
  const { data } = useHomeFeedSuspenseQuery({
    skip: !address,
    variables: {
      id: address ?? "",
    },
  });

  const sortedAndGroupedList = useMemo(() => {
    if (!data?.attestations) return [];
    const groups =
      data?.attestations?.reduce((acc, item) => {
        const date = format(new Date(item.timeCreated * 1000), "yyyy-MM-dd");
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(item.data);
        return acc;
      }, {}) ?? {};

    return Object.entries(groups).sort(
      ([date1], [date2]) => -date1.localeCompare(date2)
    );
  }, [data?.attestations]);

  return (
    <Box px="$2" flex={1} bg="$white">
      <Text color="$textLight600" my="$4" size="lg" bold>
        All Activity
      </Text>
      <FlashList
        numColumns={1}
        estimatedItemSize={88}
        data={sortedAndGroupedList}
        ItemSeparatorComponent={() => <Box h="$4" />}
        renderItem={({ item }) => {
          const [date, items] = item;
          return (
            <Box>
              <Text pb="$2" size="md" bold>
                {format(parseISO(date), "MMMM do, yyyy")}
              </Text>
              {items.map((subItem, index) => (
                <Box pb="$2">
                  {isAttestItem(subItem) ? (
                    <AttestationItem
                      key={index}
                      title={subItem.title}
                      description={subItem.description}
                    />
                  ) : (
                    <ReviewListItem
                      key={index}
                      rating={subItem.rating}
                      comment={subItem.comment}
                    />
                  )}
                </Box>
              ))}
            </Box>
          );
        }}
      />
    </Box>
  );
};

export default Companies;
