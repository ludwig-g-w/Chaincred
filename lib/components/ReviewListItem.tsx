import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Badge,
  BadgeIcon,
  BadgeText,
  BellIcon,
  Button,
  ButtonIcon,
  ButtonText,
  ChevronDownIcon,
  ChevronRightIcon,
  HStack,
  LinkIcon,
  Pressable,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { isAddress, shortenAddress } from "@utils/index";
import React, { useState } from "react";
import * as WebBrowser from "expo-web-browser";

interface UserCommentProps {
  avatarUri?: string;
  fallbackInitials?: string;
  userName?: string;
  comment?: string;
  rating?: number;
  onPress?: () => {};
  userAttested: boolean;
  id: string;
}

const ReviewListItem: React.FC<UserCommentProps> = ({
  avatarUri,
  fallbackInitials = "A N",
  userName = "",
  comment,
  rating,
  userAttested,
  onPress = () => {},
  id,
}) => {
  const formattedUserName = isAddress(userName)
    ? shortenAddress(userName)
    : userName;

  const [isExpanded, setIsExpanded] = useState(false);

  const emoji = ["😔", "😐", "😊", "😃", "🤩"][rating ?? 0];

  const handlePress = () => {
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
            gap="$1"
          >
            <BadgeIcon
              color={userAttested ? "$yellow100" : "$purple100"}
              as={BellIcon}
              fill={userAttested ? "$yellow100" : "$purple100"}
            />
            <BadgeText color={userAttested ? "$yellow100" : "$purple100"}>
              {userAttested ? "Given to" : "Received by"}
            </BadgeText>
          </Badge>
          <Text fontWeight="medium">{formattedUserName}</Text>
        </VStack>
        <Text ml="auto" size="4xl">
          {emoji}
        </Text>
        {isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
      </HStack>
      {isExpanded && (
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
          <HStack alignItems="center" justifyContent="space-between">
            <Text>{comment}</Text>
            <Button
              onPress={() => {
                WebBrowser.openBrowserAsync(
                  `https://sepolia.easscan.org/attestation/view/${id}`
                );
              }}
              variant="link"
              gap="$2"
            >
              <ButtonText size="sm">Check on EAS</ButtonText>
              <ButtonIcon as={LinkIcon} />
            </Button>
          </HStack>
        </VStack>
      )}
    </Pressable>
  );
};

export default ReviewListItem;
