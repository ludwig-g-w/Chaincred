import { HStack } from "@gluestack-ui/themed";
import { Profile } from "@utils/types";

import { View } from "react-native";
import { Image } from "expo-image";
import React from "react";
import { Pressable } from "react-native";
import { isAddress, shortenAddress } from "../utils";
import * as Typo from "@lib/components/ui/typography";
import { NWIcon } from "./nativeWindInterop";
import { useColorScheme } from "@lib/useColorScheme";
import { NAV_THEME } from "@lib/constants";

type Props = Profile & {
  onPress: () => void;
};

const ProfileListItem = (props: Props) => {
  const { isDarkColorScheme } = useColorScheme();
  const theme = NAV_THEME[isDarkColorScheme ? "dark" : "light"];
  const formattedTitle =
    props.title && isAddress(props?.title)
      ? shortenAddress(props.title)
      : props.title;
  return (
    <Pressable onPress={props.onPress}>
      <View className="flex-row justify-between p-2 items-center rounded-lg bg-card">
        <View className="items-center flex-row">
          <Image
            style={{
              height: 48,
              aspectRatio: 1,
              borderRadius: 100,
            }}
            source={{
              uri: props.image_url ?? "",
            }}
          />
          <View className="px-4 py-2 gap-2">
            <Typo.Large>{formattedTitle}</Typo.Large>
          </View>
        </View>
        <NWIcon tintColor={theme.primary} name="chevron.right.circle.fill" />
      </View>
    </Pressable>
  );
};

export default ProfileListItem;
