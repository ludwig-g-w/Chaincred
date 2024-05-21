import { Box, Button, ButtonText, HStack, Text } from "@gluestack-ui/themed";
import { NWSymbolView } from "@lib/components/nativeWindInterop";
import { Switch } from "@lib/components/ui/switch";
import * as Typo from "@lib/components/ui/typography";
import { NAV_THEME } from "@lib/constants";
import { useColorScheme } from "@lib/useColorScheme";
import { useLogout } from "@thirdweb-dev/react-native";
import * as Application from "expo-application";
import { router } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";
export default () => {
  const { logout } = useLogout();
  const { setColorScheme, isDarkColorScheme } = useColorScheme();
  const theme = NAV_THEME[isDarkColorScheme ? "dark" : "light"];
  return (
    <View className="bg-background flex-1">
      <View>
        <Item
          title="Your Profile"
          onPress={() => router.push("/settingsProfile")}
        />
        <Item title="Dark Theme">
          <Switch
            checked={isDarkColorScheme}
            onCheckedChange={() =>
              setColorScheme(isDarkColorScheme ? "light" : "dark")
            }
          />
        </Item>
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
    </View>
  );

  function Item({ title = "", onPress = () => {}, children = null }) {
    return (
      <Pressable
        className="px-2 py-4 border-b-hairline border-secondary"
        onPress={onPress}
      >
        <HStack
          borderBottomColor="$trueGray700"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typo.H4>{title}</Typo.H4>
          {children ?? (
            <NWSymbolView
              tintColor={theme.secondary}
              name="chevron.right.circle.fill"
            />
          )}
        </HStack>
      </Pressable>
    );
  }
};
