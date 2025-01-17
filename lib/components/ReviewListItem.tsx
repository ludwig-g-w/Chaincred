import { Text } from "@lib/components/ui/text";
import * as Typo from "@lib/components/ui/typography";
import { isAddress, shortenAddress } from "@utils/index";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import { View, Pressable } from "react-native";

interface UserCommentProps {
  avatarUri?: string;
  fallbackInitials?: string;
  userName?: string;
  comment?: string;
  rating?: number;
  onPress?: () => void;
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

  const handlePress = () => {
    if (!comment) return;
    !onPress && setIsExpanded(!isExpanded);
    onPress();
  };

  const handleViewOnEAS = () => {
    WebBrowser.openBrowserAsync(
      `https://sepolia.easscan.org/attestation/view/${id}`
    );
  };

  return (
    <View className="bg-white rounded-xl border border-gray-300">
      <Pressable
        onPress={handlePress}
        className="flex-row items-center justify-between p-4"
      >
        <View className="flex-row items-center gap-3">
          <View className="h-10 w-10 rounded-full overflow-hidden bg-gray-100">
            {avatarUri ? (
              <Image
                source={{ uri: avatarUri }}
                className="h-full w-full"
                contentFit="cover"
              />
            ) : (
              <View className="h-full w-full items-center justify-center">
                <Text className="text-sm">{fallbackInitials}</Text>
              </View>
            )}
          </View>
          <View className="gap-1">
            <Text className="font-medium">{formattedUserName}</Text>
            {rating !== undefined && (
              <View className="flex-row items-center gap-1">
                <Text className="text-sm text-gray-500">Rating:</Text>
                <Text className="text-sm">
                  {["😔", "😐", "😊", "😃", "🤩"][rating]}
                </Text>
              </View>
            )}
          </View>
        </View>
        <View className="flex-row items-center gap-2">
          {userAttested && (
            <View className="bg-primary/10 rounded-full p-2">
              <Feather name="bell" size={16} color="#000" />
            </View>
          )}
          <Pressable
            onPress={handleViewOnEAS}
            className="bg-primary/10 rounded-full p-2"
          >
            <Feather name="external-link" size={16} color="#000" />
          </Pressable>
          {comment && (
            <View className="bg-primary/10 rounded-full p-2">
              {isExpanded ? (
                <Feather name="chevron-down" size={16} color="#000" />
              ) : (
                <Feather name="chevron-right" size={16} color="#000" />
              )}
            </View>
          )}
        </View>
      </Pressable>
      {isExpanded && comment && (
        <View className="px-4 pb-4">
          <View className="h-px bg-gray-200 mb-3" />
          <Text>{comment}</Text>
        </View>
      )}
    </View>
  );
};

export default ReviewListItem;
