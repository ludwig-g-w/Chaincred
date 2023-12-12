import React from "react";
import {
  Box,
  Text,
  Badge,
  Button,
  Center,
  VStack,
  HStack,
} from "@gluestack-ui/themed";
import { StyleSheet, ImageBackground, Pressable } from "react-native";

const AttestationCard = ({
  title = "",
  count = 0,
  description = "",
  onPress = () => null,
}) => {
  const isAddress = /^(0x)?[0-9a-fA-F]{40}$/.test(title);
  const formattedTitle = isAddress
    ? `${title.slice(0, 4)}....${title.slice(-4)}`
    : title;
  return (
    <Pressable onPress={onPress}>
      <HStack
        justifyContent="space-between"
        alignItems="center"
        flex={1}
        style={styles.card}
      >
        <VStack>
          <Text bold fontVariant={["lining-nums"]} color="white">
            {formattedTitle}
          </Text>
          {description && <Text color="white">{description}</Text>}
        </VStack>
        <Badge aspectRatio={1} style={styles.badge} variant="solid" bg="white">
          <Text bold size="lg" fontFamily="$heading">
            {count} +
          </Text>
        </Badge>
      </HStack>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    width: "100%",
    height: 88, // Adjust height as needed
    backgroundColor: "black",
    padding: 12,
  },
  badge: {
    Height: 48,
    Width: 48,
    borderRadius: 50,
  },
  addButton: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },
});

export default AttestationCard;
