import React from "react";
import {
  Box,
  Text,
  Badge,
  Button,
  Center,
  VStack,
  HStack,
  ChevronRightIcon,
} from "@gluestack-ui/themed";
import { StyleSheet, ImageBackground, Pressable } from "react-native";
import { ProfileListItem } from "@utils/types";
import { Image } from "expo-image";
export const height = 160;

type Props = Partial<ProfileListItem> & {
  onPress: () => void;
};

const ProfileCard = ({
  title = "",
  count = 0,
  description = "",
  onPress,
  imageUrl,
  locationCoords,
}: Props) => {
  const isAddress = /^(0x)?[0-9a-fA-F]{40}$/.test(title);
  const formattedTitle = isAddress
    ? `${title.slice(0, 4)}....${title.slice(-4)}`
    : title;
  return (
    <Pressable onPress={onPress}>
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
            cachePolicy={"none"}
            source={{
              uri: imageUrl,
            }}
          />
          <VStack px="$4" py="$2" gap="$2">
            <Text bold>{formattedTitle}</Text>
            <Badge
              size="sm"
              borderRadius={50}
              variant="solid"
              bg="$coolGray300"
            >
              <Center>
                <Text>Recieved {count}</Text>
              </Center>
            </Badge>
          </VStack>
        </HStack>
        <ChevronRightIcon />
      </HStack>
    </Pressable>
  );
};

export default ProfileCard;
