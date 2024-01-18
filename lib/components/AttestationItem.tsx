import { ChevronRightIcon, VStack } from "@gluestack-ui/themed";
import { Badge, Center, HStack, Text } from "@gluestack-ui/themed";
import { ProfileListItem } from "@utils/types";
import React from "react";
import { Pressable } from "react-native";
export const height = 160;

type Props = Partial<ProfileListItem> & {
  onPress: () => void;
};

const AttestationItem = ({
  title = "",
  count = 0,
  description = "",
  onPress,
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
        p="$1"
        alignItems="center"
        borderRadius="$lg"
        bgColor="$white"
      >
        <HStack alignItems="center">
          <VStack px="$4" py="$2" gap="$2">
            <Text bold>{formattedTitle}</Text>
            <Badge borderRadius={50} variant="solid">
              <Text>Recieved {count}</Text>
            </Badge>
          </VStack>
        </HStack>
        <ChevronRightIcon />
      </HStack>
    </Pressable>
  );
};

export default AttestationItem;
