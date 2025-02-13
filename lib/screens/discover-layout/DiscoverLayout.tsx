import { NAV_THEME } from "@lib/constants";
import { useColorScheme } from "@lib/useColorScheme";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { router, Stack, usePathname } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function App() {
  const path = usePathname();

  const isMap = path === "/discoverMap";
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
          height: 48,
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
