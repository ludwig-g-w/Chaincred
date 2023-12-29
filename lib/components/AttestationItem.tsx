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
        p="$2"
        justifyContent="space-between"
        overflow="hidden"
        bgColor="$white"
        alignItems="center"
      >
        <Text bold>{formattedTitle}</Text>
        <Badge
          aspectRatio="1"
          borderRadius={50}
          variant="solid"
          bg="$yellow200"
        >
          <Center>
            <Text bold>{count}</Text>
          </Center>
        </Badge>
      </HStack>
    </Pressable>
  );
};

export default AttestationItem;
