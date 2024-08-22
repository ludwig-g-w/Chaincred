import ReviewListItem from "@components/ReviewListItem";

import { Box, Divider, HStack, Text, VStack } from "@gluestack-ui/themed";
import SuspenseFallback from "@lib/components/SuspenseFallback";
import { trpc } from "@lib/utils/trpc";
import { FlashList } from "@shopify/flash-list";
import { shortenAddress, sortAndGroupByDateReviews } from "@utils/index";
import { format, parseISO } from "date-fns";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { Suspense, useMemo } from "react";
import { View } from "react-native";
import * as Typo from "@lib/components/ui/typography";
const ProfileScreen = () => {
  const { address } = useLocalSearchParams<{ address: string }>();
  const [profile] = trpc.getProfileByAddress.useSuspenseQuery({
    address: address,
  });

  const [reviews] = trpc.attestations.useSuspenseQuery({
    recipients: [address],
  });

  const avgScore = useMemo(
    () =>
      reviews?.reduce((prev, curr, i) => {
        let accScore = prev + (curr.data?.rating ?? 0);
        let l = i + 1;
        return l === reviews.length ? Math.round(accScore / l) : accScore;
      }, 0),
    [reviews]
  );

  const reviewsByDate = useMemo(
    () => sortAndGroupByDateReviews(reviews as ReviewListItem[]),
    [reviews]
  );

  return (
    <View className="bg-background flex-1">
      <Suspense fallback={<SuspenseFallback />}>
        <FlashList
          ListHeaderComponent={
            <ListHeader {...{ profile, avgScore, address }} />
          }
          estimatedItemSize={88}
          data={reviewsByDate}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const [date, items] = item;

            return (
              <Box px="$2">
                <Typo.H4 pb="$2" size="lg">
                  {format(parseISO(date), "MMMM do, yyyy")}
                </Typo.H4>
                {items.map((subItem, index) => {
                  return (
                    <Box pb="$2" key={index}>
                      <ReviewListItem
                        avatarUri={subItem?.attester?.image_url}
                        userName={subItem?.attester?.title ?? subItem.attester}
                        rating={subItem.data.rating}
                        comment={subItem.data.comment}
                        id={subItem.id}
                      />
                    </Box>
                  );
                })}
              </Box>
            );
          }}
        />
      </Suspense>
    </View>
  );
};

export default ProfileScreen;

const ListHeader = React.memo(({ profile, address, avgScore }: any) => (
  <>
    <Image
      style={{
        aspectRatio: 1.5 / 1,
        width: "100%",
        backgroundColor: "#0553",
      }}
      source={{
        uri: profile?.image_url ?? "",
      }}
      contentFit="cover"
    />
    <VStack gap={"$2"} pt="$6" pb="$4" px="$2" flex={1}>
      <Typo.H2>{profile?.title}</Typo.H2>
      <Typo.Large className="color-primary">
        {shortenAddress(address)}
      </Typo.Large>
      <Typo.Large>{profile?.description}</Typo.Large>
      <Divider />
      <Typo.H4>Reviews</Typo.H4>
      <HStack alignItems="center" gap="$4">
        <View className="p-2 rounded-full border-secondary border-1 bg-secondary aspect-square items-center justify-center">
          <Typo.H3 className="b-2">
            {avgScore ? ["😔", "😐", "😊", "😃", "🤩"][avgScore] : "🤷‍♂️"}
          </Typo.H3>
        </View>
        <Typo.P>Avg score</Typo.P>
      </HStack>
    </VStack>
  </>
));
