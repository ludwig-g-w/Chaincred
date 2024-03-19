import ReviewListItem from "@components/ReviewListItem";
import { Box, Divider, Text, VStack } from "@gluestack-ui/themed";
import SuspenseFallback from "@lib/components/SuspenseFallback";
import { trpc } from "@lib/utils/trpc";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { FlashList } from "@shopify/flash-list";
import { skipToken } from "@tanstack/react-query";
import { shortenAddress } from "@utils/index";
import { formatDistanceToNow } from "date-fns";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { Suspense, useState } from "react";
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

const segmentsValues = ["Registered Actions", "Reviews"] as const;
const ProfileScreen = () => {
  const { address } = useLocalSearchParams<{ address: string }>();
  const [profile] = trpc.getProfileByAddress.useSuspenseQuery({
    address: address,
  });

  const [reviews] = trpc.attestations.useSuspenseQuery({
    recipients: [address],
  });

  const [segment, setSegment] =
    useState<(typeof segmentsValues)[number]>("Reviews");

  return (
    <Box bgColor="$white" flex={1}>
      <Suspense fallback={<SuspenseFallback />}>
        <FlashList
          ListHeaderComponent={
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
              <VStack gap={"$2"} pt="$6" px="$2" flex={1}>
                <Text color="$textLight950" bold size="2xl">
                  {profile?.title}
                </Text>
                <Text color="$purple500">{shortenAddress(address)}</Text>
                <Text>{profile?.description}</Text>
                <Divider />
                <Text bold size="xl">
                  Reviews
                </Text>
              </VStack>
            </>
          }
          estimatedItemSize={88}
          data={reviews}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Box p="$2">
              <ReviewListItem
                userName={item?.attester?.title ?? item.attester}
                timeAgo={formatDistanceToNow(
                  new Date(item.timeCreated * 1000),
                  {
                    addSuffix: true,
                  }
                )}
                rating={item?.data?.rating}
                comment={item?.data?.comment}
              />
            </Box>
          )}
        />
      </Suspense>
    </Box>
  );
};

export default ProfileScreen;
