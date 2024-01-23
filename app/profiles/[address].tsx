import { Box, Text, VStack } from "@gluestack-ui/themed";
import { FlashList } from "@shopify/flash-list";
import { processAttestations } from "@utils/attestations";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useProfileSuspenseQuery } from "../../generated/graphql";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useAddress } from "@thirdweb-dev/react-native";
import AttestationItem from "@components/AttestationItem";
import { getProfileByAddress } from "@services/supabase";
import { Profile } from "@utils/types";
import { shortenAddress } from "@utils/index";
import ReviewListItem from "@components/ReviewListItem";
import { formatDistanceToNow } from "date-fns";

const segmentsValues = ["Registered Actions", "Reviews"] as const;

const ProfileScreen = () => {
  const { address } = useLocalSearchParams<{ address: string }>();
  const userAddress = useAddress();
  const [profile, setProfile] = useState<Profile>();
  const [segment, setSegment] =
    useState<(typeof segmentsValues)[number]>("Registered Actions");

  useEffect(() => {
    if (!address) return;
    (async () => {
      const p = await getProfileByAddress(address);
      setProfile(p);
    })();
  }, [address]);

  const { data } = useProfileSuspenseQuery({
    skip: !address || !userAddress,
    variables: {
      profileAddress: address ?? "",
      // @ts-expect-error same data different types
      userAddress,
    },
  });
  const actionsWithCount = useMemo(() => {
    // @ts-expect-error same data different types
    return processAttestations(userAddress ?? "", data.actions);
  }, [data.actions, address]);

  const reviews = useMemo(
    () =>
      data.reviews.map((r) => ({
        ...r.data,
        timestamp: r.timeCreated,
        user: r.attester,
      })),
    [data.reviews]
  );

  return (
    <Box bgColor="$white" flex={1}>
      <FlashList
        ListHeaderComponent={
          <>
            <Image
              style={{
                aspectRatio: 1.5 / 1,
                width: "100%",
                backgroundColor: "#0553",
              }}
              cachePolicy={"none"}
              source={{
                uri: profile?.image_url,
              }}
              contentFit="cover"
            />
            <VStack gap={"$2"} py="$6" px="$2" flex={1}>
              <Text bold size="2xl">
                {profile?.title}
              </Text>
              <Text color="$purple500">{shortenAddress(address)}</Text>
              <Text>{profile?.description}</Text>
              {/* @ts-ignore */}
              <SegmentedControl
                selectedIndex={segment === "Registered Actions" ? 0 : 1}
                onValueChange={setSegment}
                values={segmentsValues}
              />
            </VStack>
          </>
        }
        estimatedItemSize={88}
        data={segment === "Reviews" ? reviews : actionsWithCount}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Box p="$2">
            {segment === "Reviews" ? (
              <ReviewListItem
                userName={item.user}
                timeAgo={formatDistanceToNow(new Date(item.timestamp * 1000), {
                  addSuffix: true,
                })}
                rating={item.rating}
                comment={item.comment}
              />
            ) : (
              <AttestationItem title={item.title} count={item?.count} />
            )}
          </Box>
        )}
      />
    </Box>
  );
};

export default ProfileScreen;
