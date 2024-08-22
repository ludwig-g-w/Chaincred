import React from "react";
import { View, Pressable, Text } from "react-native";
import { Link, router, Stack, usePathname } from "expo-router";
import * as Typo from "@lib/components/ui/typography";
import MySegmentedControl from "@lib/components/MySegmentedControl";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useColorScheme } from "@lib/useColorScheme";
import { NAV_THEME } from "@lib/constants";

export default function App() {
  const path = usePathname();
  const isMap = path === "/discoverMap" ?? true;
  const { isDarkColorScheme } = useColorScheme();
  const theme = NAV_THEME[isDarkColorScheme ? "dark" : "light"];

  return (
    <View className="flex-1 bg-background">
      <SegmentedControl
        selectedIndex={isMap ? 0 : 1}
        activeFontStyle={{
          color: theme.text,
          fontSize: 18,
        }}
        style={{
          height: 36,
          backgroundColor: theme.background,
          marginBottom: 12,
          marginHorizontal: 12,
        }}
        values={["Map View", "List View"] as const}
        onValueChange={(name) => {
          if (name === "Map View") {
            router.replace("/discoverMap");
          } else {
            router.replace("/discoverList");
          }
        }}
      />

      <Stack
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="discoverMap"
      >
        <Stack.Screen name="discoverMap" />
        <Stack.Screen name="discoverList" />
      </Stack>
    </View>
  );
}
