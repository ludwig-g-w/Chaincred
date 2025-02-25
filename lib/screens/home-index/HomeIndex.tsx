import GetStartedCard from "@components/GetStartedCard";
import ReviewListItem from "@components/ReviewListItem";
import SuspenseFallback from "@components/SuspenseFallback";
import { Image, Pressable } from "react-native";

import { NAV_THEME } from "@lib/constants";
import { useColorScheme } from "@lib/useColorScheme";
import { FlashList } from "@shopify/flash-list";
import { trpc } from "@utils/trpc";
import { Attestation, isReviewItem } from "@utils/types";
import { format, parseISO } from "date-fns";
import { useRouter } from "expo-router";
import React, { Suspense, useMemo, useState, useRef } from "react";
import { useActiveAccount } from "thirdweb/react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Typo from "@lib/components/ui/typography";
import { N } from "ethers";
import { NWIcon } from "@lib/components/nativeWindInterop";

const Index = () => {
  const user = useActiveAccount();
  const { isDarkColorScheme } = useColorScheme();
  const router = useRouter();
  const theme = NAV_THEME[isDarkColorScheme ? "dark" : "light"];

  const [attestations, { refetch, isRefetching }] =
    trpc.attestations.useSuspenseQuery({
      recipients: [user?.address ?? ""],
      attesters: [user?.address ?? ""],
    });

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
    <View className="bg-background flex-1">
      <Suspense fallback={<SuspenseFallback />}>
        <FlashList
          ListHeaderComponent={() => (
            <>
              <LinearGradient
                colors={["#1652F0", "#1652F4"]}
                style={{
                  overflow: "visible",
                  width: "100%",
                  height: 300,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typo.H1 className="text-textLight600 my-4 text-lg font-bold">
                  All Activity
                </Typo.H1>
              </LinearGradient>
              <View className="flex flex-row justify-around w-full absolute bottom-16">
                <Pressable className="aspect-square bg-primary rounded-lg p-2 items-center justify-center shadow-border">
                  <NWIcon
                    name="plus"
                    size={24}
                    color={NAV_THEME.dark.card}
                    type="hierarchical"
                  />
                </Pressable>
                <Pressable className="aspect-square bg-card rounded-lg p-2 align-middle">
                  <Text className="text-textLight600">Button 2</Text>
                </Pressable>
                <Pressable className="aspect-square bg-card rounded-lg p-2 align-middle">
                  <Text className="text-textLight600">Button 3</Text>
                </Pressable>
              </View>
              <View className="h-12" />
              <Text className="text-textLight600 my-4 text-lg font-bold ">
                All Activity
              </Text>
            </>
          )}
          onRefresh={refetch}
          refreshing={isRefetching}
          numColumns={1}
          estimatedItemSize={88}
          data={sortedAndGroupedList}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="h-10" />}
          ListEmptyComponent={<GetStartedCard />}
          renderItem={({ item }) => {
            const [date, items] = item;

            return isReviewItem(items[0]?.data) ? (
              <View>
                <Text className="text-foreground pb-2 text-md font-bold">
                  {format(parseISO(date), "MMMM do, yyyy")}
                </Text>
                {items.map((subItem, index) => {
                  const isUserAttester =
                    user?.address ===
                    (typeof subItem.attester === "object"
                      ? subItem.attester.address
                      : subItem.attester);

                  const itemUser = isUserAttester
                    ? subItem.recipient
                    : subItem.attester;

                  const avatarUri =
                    typeof itemUser === "object"
                      ? itemUser.image_url
                      : undefined;
                  const userName =
                    typeof itemUser === "object" ? itemUser.title : itemUser;

                  return (
                    <View className={`${!index ? "mt-2" : "mt-0"}`} key={index}>
                      <ReviewListItem
                        avatarUri={avatarUri ?? undefined}
                        userAttested={isUserAttester}
                        userName={userName ?? undefined}
                        rating={subItem.data?.review ?? 0}
                        comment={subItem.data?.message ?? ""}
                        id={subItem.id}
                      />
                    </View>
                  );
                })}
              </View>
            ) : null;
          }}
        />
      </Suspense>
    </View>
  );
};

export default Index;
