import React, { useState } from "react";
import {
  Avatar,
  Text,
  VStack,
  HStack,
  Icon,
  useToken,
  AvatarFallbackText,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@gluestack-ui/themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { isAddress, shortenAddress } from "@utils/index";
import { Pressable } from "react-native";

interface UserCommentProps {
  avatarUri?: string;
  fallbackInitials: string;
  userName: string;
  timeAgo: string;
  comment: string;
  rating: number;
  onPress: () => {};
}

const ReviewListItem: React.FC<UserCommentProps> = ({
  avatarUri,
  fallbackInitials = "A",
  userName = "Ludwig",
  timeAgo = "2024",
  comment,
  rating,
  onPress = () => {},
}) => {
  const [textColor, subTextColor] = useToken("colors", [
    "$textBase",
    "$textSecondary",
  ]);

  const formattedUserName = isAddress(userName)
    ? shortenAddress(userName)
    : userName;

  const [isExpanded, setIsExpanded] = useState(false);
  console.log(rating);

  const emoji = ["😔", "😐", "😊", "😃", "🤩"][rating];

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
      <VStack>
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
          <Avatar source={avatarUri ? { uri: avatarUri } : undefined}>
            {!avatarUri && (
              <AvatarFallbackText>{fallbackInitials}</AvatarFallbackText>
            )}
          </Avatar>
          <VStack>
            <Text fontWeight="medium">{formattedUserName}</Text>
            <Text color={subTextColor} fontSize="$sm">
              {timeAgo}
            </Text>
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
      </VStack>
    </Pressable>
  );
};

export default ReviewListItem;
