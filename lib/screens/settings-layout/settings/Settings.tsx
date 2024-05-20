import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  Box,
  Button,
  ButtonText,
  HStack,
  Pressable,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { Switch } from "@lib/components/ui/switch";
import { useColorScheme } from "@lib/useColorScheme";
import { useLogout } from "@thirdweb-dev/react-native";
import * as Application from "expo-application";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";

export default () => {
  const { logout } = useLogout();
  const { setColorScheme, isDarkColorScheme } = useColorScheme();
  return (
    <VStack p="$4" bg="$white" gap={"$2"} flex={1}>
      <View>
        <Item
          title="Your Profile"
          onPress={() => router.push("/settingsProfile")}
        />

        <HStack
          borderBottomColor="$trueGray700"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text>Switch Theme</Text>
          <Switch
            checked={isDarkColorScheme}
            onCheckedChange={() =>
              setColorScheme(isDarkColorScheme ? "light" : "dark")
            }
          />
        </HStack>
      </View>
      <Box mt="auto" alignItems="center">
        <Button
          rounded="$full"
          variant="outline"
          //   @ts-ignore
          onPress={logout}
          borderColor="$backgroundLight500"
          bg="$backgroundLight200"
          w="70%"
        >
          <ButtonText color="$backgroundLight900">Logout</ButtonText>
        </Button>
        <Text color="$textLight500">
          Version: {Application.nativeApplicationVersion}
        </Text>
        <Text color="$textLight500">
          build: {Application.nativeBuildVersion}{" "}
        </Text>
      </Box>
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
