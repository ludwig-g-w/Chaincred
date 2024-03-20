import {
  AddIcon,
  ArrowRightIcon,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Badge,
  BadgeIcon,
  BadgeText,
  BellIcon,
  Box,
  Center,
  ChevronDownIcon,
  ChevronRightIcon,
  HStack,
  Pressable,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { isAddress, shortenAddress } from "@utils/index";
import React, { useState } from "react";

interface UserCommentProps {
  avatarUri?: string;
  fallbackInitials?: string;
  userName?: string;
  comment?: string;
  rating?: number;
  onPress?: () => {};
  userAttested: boolean;
}

const ReviewListItem: React.FC<UserCommentProps> = ({
  avatarUri,
  fallbackInitials = "A N",
  userName = "",
  comment,
  rating,
  userAttested,
  onPress = () => {},
}) => {
  const formattedUserName = isAddress(userName)
    ? shortenAddress(userName)
    : userName;

  const [isExpanded, setIsExpanded] = useState(false);

  const emoji = ["😔", "😐", "😊", "😃", "🤩"][rating ?? 0];

  const handlePress = () => {
    if (!comment) return;
    setIsExpanded(!isExpanded);
    onPress();
  };

  const styleExpanded = isExpanded && {
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
    borderBottomColor: "transparent",
  };

  return (
    <Pressable onPress={handlePress}>
      <HStack
        gap="$2"
        borderWidth="$1"
        borderColor="$coolGray300"
        justifyContent="space-between"
        p="$2"
        alignItems="center"
        rounded={"$xl"}
        bgColor="$white"
        style={styleExpanded}
      >
        <Avatar>
          <AvatarFallbackText>
            {!isAddress(userName) ? userName : fallbackInitials}
          </AvatarFallbackText>
          <AvatarImage
            alt="profileImage"
            source={{
              uri: avatarUri || "",
            }}
          />
        </Avatar>
        <VStack>
          <Badge
            alignSelf="flex-start"
            rounded="$md"
            bg={userAttested ? "$yellow500" : "$purple500"}
            gap="$2"
          >
            <BadgeText bold color={userAttested ? "$yellow900" : "$purple900"}>
              {userAttested ? "Given to" : "Received by"}
            </BadgeText>
            <BadgeIcon
              color={userAttested ? "$yellow900" : "$purple900"}
              as={BellIcon}
            />
          </Badge>
          <Text fontWeight="medium">{formattedUserName}</Text>
        </VStack>
        <Text ml="auto" size="4xl">
          {emoji}
        </Text>
        {comment ? (
          isExpanded ? (
            <ChevronDownIcon />
          ) : (
            <ChevronRightIcon />
          )
        ) : null}
      </HStack>
      {isExpanded && comment && (
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
          <Text>{comment}</Text>
        </VStack>
      )}
    </Pressable>
  );
};

export default ReviewListItem;
