import React from "react";
import {
  Box,
  Text,
  Badge,
  Button,
  Center,
  VStack,
  HStack,
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
      <VStack overflow="hidden" borderRadius="$lg" bgColor="$white">
        <Image
          style={{
            height: 100,
          }}
          cachePolicy={"none"}
          source={{
            uri: imageUrl,
          }}
        />
        <VStack px="$4" py="$2" gap="$2">
          <Text bold>{formattedTitle}</Text>
          {description && (
            <Text color="$warmGray600">{description.slice(0, 38)}...</Text>
          )}

          <Badge
            position="absolute"
            top="$4"
            right="$4"
            aspectRatio="1"
            borderRadius={50}
            variant="solid"
            bg="$yellow200"
          >
            <Center>
              <Text bold>{count}</Text>
            </Center>
          </Badge>
        </VStack>
      </VStack>
    </Pressable>
  );
};

export default ProfileCard;
