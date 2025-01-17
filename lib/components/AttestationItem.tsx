import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { Text } from "@lib/components/ui/text";
import { Entypo } from "@expo/vector-icons";
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
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomColor: "transparent",
  };

  return (
    <Pressable onPress={handlePress}>
      <View className="flex flex-col">
        <View
          className="flex-row justify-between items-center p-1 rounded-xl bg-white border border-gray-300"
          style={styleExpanded}
        >
          <View className="flex-row items-center">
            <View className="px-4 py-2 gap-2">
              <Text className="font-bold">{formattedTitle}</Text>
              {count > 0 && (
                <View className="bg-blue-500 rounded-full px-2 py-1">
                  <Text className="text-white">Received {count}</Text>
                </View>
              )}
            </View>
          </View>
          {description ? (
            isExpanded ? (
              <Entypo name="chevron-down" size={24} color="#000" />
            ) : (
              <Entypo name="chevron-right" size={24} color="#000" />
            )
          ) : null}
        </View>
        {isExpanded && description && (
          <View className="border border-gray-300 rounded-xl bg-gray-100 px-4 py-2">
            <Text>{description}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default AttestationItem;
