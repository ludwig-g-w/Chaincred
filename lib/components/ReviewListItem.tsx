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
  VStack,
} from "@gluestack-ui/themed";
import * as Typo from "@lib/components/ui/typography";
import { isAddress, shortenAddress } from "@utils/index";
import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import { View } from "react-native";
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
      <View
        className="flex-row gap-2 border border-border justify-between p-2 items-center rounded-xl bg-card"
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
            bg={userAttested ? "$cyan500" : "$purple500"}
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
          <Typo.P>{formattedUserName}</Typo.P>
        </VStack>
        <Typo.H1 className="ml-auto">{emoji}</Typo.H1>
        {isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
      </View>
      {isExpanded && (
        <View className="border border-border bg-muted px-4 rounded-xl rounded-t-none">
          <HStack alignItems="center" justifyContent="space-between">
            <Typo.P>{comment}</Typo.P>
            <Button
              onPress={() => {
                WebBrowser.openBrowserAsync(
                  `https://base-sepolia.easscan.org/attestation/view/${id}`
                );
              }}
              variant="link"
              gap="$2"
            >
              <ButtonText size="sm">Check on EAS</ButtonText>
              <ButtonIcon as={LinkIcon} />
            </Button>
          </HStack>
        </View>
      )}
    </Pressable>
  );
};

export default ReviewListItem;
