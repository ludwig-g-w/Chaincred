import {
  Badge,
  Center,
  ChevronRightIcon,
  HStack,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { ProfileListItem as ProfileListItemType } from "@utils/types";
import { Image } from "expo-image";
import React from "react";
import { Pressable } from "react-native";
import { isAddress, shortenAddress } from "../utils";
export const height = 160;

type Props = Partial<ProfileListItemType> & {
  onPress: () => void;
};

const ProfileListItem = ({
  title = "",
  count = 0,
  description = "",
  onPress,
  imageUrl,
  locationCoords,
}: Props) => {
  const formattedTitle = isAddress(title) ? shortenAddress(title) : title;
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

export default ProfileListItem;
