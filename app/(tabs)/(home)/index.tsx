import ReviewListItem from "@components/ReviewListItem";
import SuspenseFallback from "@components/SuspenseFallback";
import { Box, Text } from "@gluestack-ui/themed";
import { FlashList } from "@shopify/flash-list";
import { skipToken } from "@tanstack/react-query";
import { useUser } from "@thirdweb-dev/react-native";
import { trpc } from "@utils/trpc";
import { isReviewItem, Attestation } from "@utils/types";
import { format, parseISO } from "date-fns";
import React, { Suspense, useMemo } from "react";

const Index = () => {
  const { user } = useUser();

  const [attestations, { refetch, isRefetching }] =
    trpc.attestations.useSuspenseQuery(
      // @ts-ignore
      user
        ? {
            recipients: [user?.address],
            attesters: [user?.address],
          }
        : skipToken
    );

  const sortedAndGroupedList = useMemo(() => {
    const groups =
      attestations?.reduce((acc, item) => {
        const date = format(new Date(item.timeCreated * 1000), "yyyy-MM-dd");
        if (!acc[date]) {
          acc[date] = [];
        }
        // @ts-ignore
        acc[date].push({ ...item, timeCreated: date });
        return acc;
      }, {} as Record<string, Attestation[]>) ?? {};

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
          onRefresh={refetch}
          refreshing={isRefetching}
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
                    user?.address ===
                    (subItem?.attester?.address ?? subItem.attester);

                  const itemUser = isUserAttester
                    ? subItem.recipient
                    : subItem.attester;
                  return (
                    <Box pb="$2" key={index}>
                      <ReviewListItem
                        avatarUri={itemUser?.image_url}
                        userAttested={isUserAttester}
                        userName={itemUser?.title ?? itemUser}
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
