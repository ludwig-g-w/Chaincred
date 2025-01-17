import ReviewListItem from "@components/ReviewListItem";
import { Text } from "@lib/components/ui/text";
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
import { type Profile } from "@prisma/client";

type Attestation = {
  id: string;
  data: { message: string; review: number } | null;
  attester: string | Profile;
  recipient: string;
  timeCreated: number;
};

const ProfileScreen = () => {
  const { address } = useLocalSearchParams<{ address: string }>();
  const [profile] = trpc.getProfileByAddress.useSuspenseQuery({
    address: address!,
  });

  const [reviews] = trpc.attestations.useSuspenseQuery({
    recipients: [address!],
  });

  const avgScore = useMemo(
    () =>
      reviews?.reduce((prev, curr, i) => {
        let accScore = prev + (curr.data?.review ?? 0);
        let l = i + 1;
        return l === reviews.length ? Math.round(accScore / l) : accScore;
      }, 0),
    [reviews]
  );

  const reviewsByDate = useMemo(
    () => sortAndGroupByDateReviews(reviews as Attestation[]),
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
          renderItem={({ item: [date, reviews] }) => {
            return (
              <View className="px-4">
                <Text className="text-sm text-gray-500 mb-2">
                  {format(parseISO(date), "MMMM d, yyyy")}
                </Text>
                <View className="space-y-4">
                  {reviews.map((review) => (
                    <ReviewListItem
                      key={review.id}
                      id={review.id}
                      avatarUri={
                        typeof review.attester === "object"
                          ? review.attester.image_url ?? undefined
                          : undefined
                      }
                      userName={
                        typeof review.attester === "object"
                          ? review.attester.title ?? review.attester.address
                          : review.attester
                      }
                      comment={review.data?.message}
                      rating={review.data?.review}
                      userAttested={false}
                    />
                  ))}
                </View>
              </View>
            );
          }}
          ItemSeparatorComponent={() => (
            <View className="h-px bg-gray-200 my-4" />
          )}
        />
      </Suspense>
    </View>
  );
};

export default ProfileScreen;

type ListHeaderProps = {
  profile: {
    title: string | null;
    image_url: string | null;
    description: string | null;
  } | null;
  address: string;
  avgScore: number | undefined;
};

const ListHeader = React.memo(
  ({ profile, address, avgScore }: ListHeaderProps) => (
    <View className="gap-4">
      <Image
        style={{
          aspectRatio: 1.5 / 1,
          width: "100%",
        }}
        source={{
          uri: profile?.image_url ?? "",
        }}
        contentFit="cover"
      />
      <View className="gap-2 px-2">
        <Typo.H2>{profile?.title}</Typo.H2>
        <Typo.P className="text-primary">{shortenAddress(address)}</Typo.P>
        <Typo.Large>{profile?.description}</Typo.Large>
      </View>
      <View className="h-px bg-gray-200" />
      <View className="gap-2 px-2">
        <Typo.H4>Reviews</Typo.H4>
        <View className="flex-row items-center gap-4">
          <View className="p-2 rounded-full border border-secondary bg-secondary/10 items-center justify-center aspect-square">
            <Typo.H3>
              {typeof avgScore === "number"
                ? ["😔", "😐", "😊", "😃", "🤩"][avgScore]
                : "🤷‍♂️"}
            </Typo.H3>
          </View>
          <Typo.P>Average score</Typo.P>
        </View>
      </View>
    </View>
  )
);
