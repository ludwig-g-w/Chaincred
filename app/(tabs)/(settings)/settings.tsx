import FontAwesome from "@expo/vector-icons/FontAwesome";
import { HStack, Text, VStack } from "@gluestack-ui/themed";
import { Link, router } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

export default () => {
  return (
    <VStack gap={"$4"} flex={1}>
      <Item
        title="Attestations"
        onPress={() => router.push("/manageAttestations")}
      />
      <Item
        title="Your Profile"
        onPress={() => router.push("/settingsProfile")}
      />
    </VStack>
  );

  function Item({ title = "", onPress = () => {} }) {
    return (
      <Pressable onPress={onPress}>
        <HStack
          borderBottomColor="$trueGray700"
          justifyContent="space-between"
          alignItems="center"
          p="$4"
        >
          <Text>{title}</Text>
          <FontAwesome name="chevron-right" />
        </HStack>
      </Pressable>
    );
  }
};
