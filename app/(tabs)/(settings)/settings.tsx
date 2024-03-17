import FontAwesome from "@expo/vector-icons/FontAwesome";
import { HStack, Pressable, Text, VStack } from "@gluestack-ui/themed";
import { router } from "expo-router";
import React from "react";

export default () => {
  return (
    <VStack p="$4" bg="$white" gap={"$2"} flex={1}>
      {/* <Item
        title="Attestations"
        onPress={() => router.push("/manageAttestations")}
      /> */}
      <Item
        title="Your Profile"
        onPress={() => router.push("/settingsProfile")}
      />
    </VStack>
  );

  function Item({ title = "", onPress = () => {} }) {
    return (
      <Pressable py="$4" onPress={onPress}>
        <HStack
          borderBottomColor="$trueGray700"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text>{title}</Text>
          <FontAwesome name="chevron-right" />
        </HStack>
      </Pressable>
    );
  }
};
