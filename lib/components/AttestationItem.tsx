import React, { useState } from "react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  VStack,
} from "@gluestack-ui/themed";
import { Badge, Center, HStack, Text } from "@gluestack-ui/themed";
import { Pressable } from "react-native";
import { isAddress, shortenAddress } from "@utils/index";

const AttestationItem = ({
  title = "",
  count = 0,
  description = "",
  onPress = () => {},
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const formattedTitle = isAddress(title) ? shortenAddress(title) : title;

  const handlePress = () => {
    if (!description) return;
    !onPress && setIsExpanded(!isExpanded);
    onPress();
  };

  const styleExpanded = isExpanded && {
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
    borderBottomColor: "transparent",
  };

  return (
    <Pressable onPress={handlePress}>
      <VStack>
        <HStack
          borderWidth="$1"
          borderColor="$coolGray300"
          justifyContent="space-between"
          p="$1"
          alignItems="center"
          rounded={"$xl"}
          bgColor="$white"
          style={styleExpanded}
        >
          <HStack alignItems="center">
            <VStack px="$4" py="$2" gap="$2">
              <Text bold>{formattedTitle}</Text>
              {count > 0 && (
                <Badge borderRadius={50} variant="solid">
                  <Text>Received {count}</Text>
                </Badge>
              )}
            </VStack>
          </HStack>

          {description ? (
            isExpanded ? (
              <ChevronDownIcon />
            ) : (
              <ChevronRightIcon />
            )
          ) : null}
        </HStack>
        {isExpanded && description && (
          <VStack
            borderWidth="$1"
            borderColor="$coolGray300"
            borderTopEndRadius={0}
            borderTopStartRadius={0}
            rounded={"$xl"}
            bg="$blueGray100"
            px="$4"
            py="$2"
          >
            <Text>{description}</Text>
          </VStack>
        )}
      </VStack>
    </Pressable>
  );
};

export default AttestationItem;
