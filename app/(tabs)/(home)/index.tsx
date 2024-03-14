import AttestationItem from "@components/AttestationItem";
import ReviewListItem from "@components/ReviewListItem";
import SuspenseFallback from "@components/SuspenseFallback";
import { Box, Text } from "@gluestack-ui/themed";
import { FlashList } from "@shopify/flash-list";
import { useAddress } from "@thirdweb-dev/react-native";
import { isAttestItem } from "@utils/types";
import { format, parseISO } from "date-fns";
import React, { Suspense, useMemo } from "react";
import {
  ListAttestationFragment,
  useHomeFeedSuspenseQuery,
} from "../../../generated/graphql";

const Companies = () => {
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
        acc[date].push(item);
        return acc;
      }, {} as Record<string, ListAttestationFragment[]>) ?? {};

    return Object.entries(groups).sort(
      ([date1], [date2]) => -date1.localeCompare(date2)
    );
  }, [data?.attestations]);

  return (
    <Box px="$2" flex={1} bg="$white">
      <Text color="$textLight600" my="$4" size="lg" bold>
        All Activity
      </Text>
      <Suspense fallback={<SuspenseFallback />}>
        <FlashList
          numColumns={1}
          estimatedItemSize={88}
          data={sortedAndGroupedList}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <Box h="$4" />}
          renderItem={({ item }) => {
            const [date, items] = item;
            return (
              <Box>
                <Text pb="$2" size="md" bold>
                  {format(parseISO(date), "MMMM do, yyyy")}
                </Text>
                {items.map((subItem, index) => (
                  <Box pb="$2" key={index}>
                    {isAttestItem(subItem.data) ? (
                      <AttestationItem
                        title={subItem.data.title}
                        description={subItem.data.description}
                      />
                    ) : (
                      <ReviewListItem
                        rating={subItem.data.rating}
                        comment={subItem.data.comment}
                        timeAgo={subItem.timeCreated}
                      />
                    )}
                  </Box>
                ))}
              </Box>
            );
          }}
        />
      </Suspense>
    </Box>
  );
};

export default Companies;
