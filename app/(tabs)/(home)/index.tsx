import ReviewListItem from "@components/ReviewListItem";
import SuspenseFallback from "@components/SuspenseFallback";
import { ListAttestationFragment } from "@generated/graphql";
import { Box, Text } from "@gluestack-ui/themed";
import { trpc } from "@utils/trpc";
import { _fetch } from "@services/clientApi";
import { FlashList } from "@shopify/flash-list";
import { useAddress } from "@thirdweb-dev/react-native";
import { isReviewItem } from "@utils/types";
import { format, parseISO } from "date-fns";
import React, { Suspense, useEffect, useMemo, useState } from "react";

const Index = () => {
  const address = useAddress();
  const [attestations] = trpc.attestations.useSuspenseQuery({
    recipients: [address ?? ""],
    attesters: [address ?? ""],
  });

  const sortedAndGroupedList = useMemo(() => {
    const groups =
      attestations?.reduce((acc, item) => {
        const date = format(new Date(item.timeCreated * 1000), "yyyy-MM-dd");
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push({ ...item, timeCreated: date });
        return acc;
      }, {} as Record<string, ListAttestationFragment[]>) ?? {};

    return Object.entries(groups).sort(
      ([date1], [date2]) => -date1.localeCompare(date2)
    );
  }, [attestations]);

  return (
    <Box px="$2" flex={1} bg="$white">
      <Text color="$textLight600" my="$4" size="lg" bold>
        All Activity
      </Text>
      <Suspense fallback={<SuspenseFallback />}>
        <FlashList
          // TODO: Put back when tRPC
          // onRefresh={fetcher}
          numColumns={1}
          estimatedItemSize={88}
          data={sortedAndGroupedList}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <Box h="$4" />}
          renderItem={({ item }) => {
            const [date, items] = item;

            return isReviewItem(items[0]?.data) ? (
              <Box>
                <Text pb="$2" size="md" bold>
                  {format(parseISO(date), "MMMM do, yyyy")}
                </Text>
                {items.map((subItem, index) => {
                  const isUserAttester =
                    address ===
                    (subItem?.attester?.address ?? subItem.attester);

                  const user = isUserAttester
                    ? subItem.recipient
                    : subItem.attester;

                  console.log(user.image_url);

                  return (
                    <Box pb="$2" key={index}>
                      <ReviewListItem
                        avatarUri={user?.image_url}
                        userAttested={isUserAttester}
                        userName={user?.title ?? user}
                        rating={subItem.data.rating}
                        comment={subItem.data.comment}
                        timeAgo={subItem.timeCreated}
                      />
                    </Box>
                  );
                })}
              </Box>
            ) : null;
          }}
        />
      </Suspense>
    </Box>
  );
};

export default Index;
