import React from "react";
import { Pressable, Platform, View } from "react-native";
import { useRouter } from "expo-router";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@lib/components/ui/card";
import { NWIcon } from "@lib/components/nativeWindInterop";
import { NAV_THEME } from "@lib/constants";
import { useColorScheme } from "@lib/useColorScheme";

const GetStartedCard = () => {
  const router = useRouter();
  const { isDarkColorScheme } = useColorScheme();
  const theme = NAV_THEME[isDarkColorScheme ? "dark" : "light"];

  return (
    <Pressable onPress={() => router.navigate("/gettingStarted")}>
      <Card className="w-full bg-secondary flex-row justify-between items-center">
        <CardHeader>
          <CardTitle className="color-secondary-foreground">
            Get started here!
          </CardTitle>
          <CardDescription className="color-secondary-foreground">
            We will show you what you can do!
          </CardDescription>
        </CardHeader>
        <CardHeader>
          <View className="animate-pulse">
            <NWIcon
              tintColor={theme.primary}
              name={
                Platform.OS === "ios"
                  ? "chevron.right.circle.fill"
                  : "circle-chevron-right"
              }
              color={theme.primary}
              size={24}
            />
          </View>
        </CardHeader>
      </Card>
    </Pressable>
  );
};

export default GetStartedCard;
