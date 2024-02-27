import AttestationItem from "@components/AttestationItem";
import ReviewListItem from "@components/ReviewListItem";
import { ORGANIZATION_MANAGER_ADDRESS } from "@env";
import { Box, Button, HStack, Text, VStack } from "@gluestack-ui/themed";
import { FlashList } from "@shopify/flash-list";
import {
  useAddress,
  useContract,
  useLogin,
  useUser,
} from "@thirdweb-dev/react-native";
import { ProfileListItem, isAttestItem } from "@utils/types";
import { format, parseISO } from "date-fns";
import React, { useMemo, useState } from "react";
import { useHomeFeedSuspenseQuery } from "../../../generated/graphql";

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

  // TEST
  const [secret, setSecret] = useState();
  const { user, isLoggedIn } = useUser();
  const { login } = useLogin();

  const getSecret = async () => {
    const res = await fetch("/api/secret");
    const data = await res.json();
    setSecret(data.message);
  };

  return (
    <Box px="$2" flex={1} bg="$white">
      <Text color="$textLight600" my="$4" size="lg" bold>
        All Activity
      </Text>
      <HStack gap="$2">
        <Button onPress={login}>
          <Text>Login</Text>
        </Button>
        <Button onPress={getSecret}>
          <Text>Get secret</Text>
        </Button>
      </HStack>
      <VStack gap="$4">
        <Text>User: {JSON.stringify(user, undefined, 2) || "N/A"}</Text>
        <Text>Secret: {secret}</Text>
      </VStack>
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
