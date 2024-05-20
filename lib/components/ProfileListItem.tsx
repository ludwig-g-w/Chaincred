import { ChevronRightIcon, HStack, Text, VStack } from "@gluestack-ui/themed";
import { Profile } from "@utils/types";
import { Image } from "expo-image";
import React from "react";
import { Pressable } from "react-native";
import { isAddress, shortenAddress } from "../utils";

type Props = Profile & {
  onPress: () => void;
};

const ProfileListItem = (props: Props) => {
  const formattedTitle =
    props.title && isAddress(props?.title)
      ? shortenAddress(props.title)
      : props.title;
  return (
    <Pressable onPress={props.onPress}>
      <HStack
        borderWidth="$1"
        borderColor="$coolGray300"
        justifyContent="space-between"
        p="$2"
        alignItems="center"
        borderRadius="$lg"
        bgColor="$white"
      >
        <HStack alignItems="center">
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
          <VStack px="$4" py="$2" gap="$2">
            <Text bold>{formattedTitle}</Text>
          </VStack>
        </HStack>
        <ChevronRightIcon />
      </HStack>
    </Pressable>
  );
};

export default ProfileListItem;
