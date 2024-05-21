import React from "react";
import { View, Pressable, Text } from "react-native";
import { Link, Stack, usePathname } from "expo-router";
import * as Typo from "@lib/components/ui/typography";

export default function App() {
  const path = usePathname();
  const isMap = path === "/discoverMap" ?? true;

  return (
    <View className="flex-1">
      <View className="w-full flex-row bg-background pb-2">
        <Link href="/discoverMap" asChild>
          <Pressable
            className={`flex items-center rounded-l-full w-24 px-4 py-2 ${
              isMap ? "bg-accent" : "bg-gray-300"
            }`}
          >
            <Typo.Muted
              className={`font-bold ${
                isMap ? "text-accent-foreground" : "text-gray-800"
              }`}
            >
              Map
            </Typo.Muted>
          </Pressable>
        </Link>
        <Link href="/discoverList" asChild>
          <Pressable
            className={`flex items-center rounded-r-full px-4 py-2 w-24 ${
              !isMap ? "bg-accent" : "bg-gray-300"
            }`}
          >
            <Typo.Muted
              className={`font-bold ${
                !isMap ? "text-accent-foreground" : "text-gray-800"
              }`}
            >
              List
            </Typo.Muted>
          </Pressable>
        </Link>
      </View>

      <Stack
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="discoverList"
      >
        <Stack.Screen name="discoverMap" />
        <Stack.Screen name="discoverList" />
      </Stack>
    </View>
  );
}
