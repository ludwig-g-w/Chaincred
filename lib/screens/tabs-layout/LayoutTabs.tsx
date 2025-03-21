import { NWIcon } from "@lib/components/nativeWindInterop";
import { NAV_THEME } from "@lib/constants";
import { useColorScheme } from "@lib/useColorScheme";
import { Tabs } from "expo-router";
import { Platform, View } from "react-native";

export default function TabLayout() {
  const { isDarkColorScheme } = useColorScheme();

  const theme = NAV_THEME[isDarkColorScheme ? "dark" : "light"];

  return (
    <Tabs
      initialRouteName="(home)"
      screenOptions={{
        tabBarActiveTintColor: theme.primary,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor: theme.border,
        },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          header: () => <View className="top-safe bg-primary" />,
          tabBarIcon: ({ color }) => (
            <NWIcon
              className={Platform.OS === "ios" ? "aspect-square, w-8" : ""}
              name={Platform.OS === "ios" ? "house.fill" : "house-chimney"}
              tintColor={color}
              type="hierarchical"
              color={color}
              size={24}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="(discover)"
        options={{
          title: "Discover",
          header: () => <View className="h-2 pt-safe bg-background" />,
          tabBarIcon: ({ color }) => (
            <NWIcon
              className={Platform.OS === "ios" ? "aspect-square, w-8" : ""}
              name={Platform.OS === "ios" ? "binoculars.fill" : "binoculars"}
              tintColor={color}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="scanAddress"
        options={{
          title: "Scan",
          header: () => <View className="h-2 pt-safe bg-background" />,
          tabBarIcon: ({ color }) => (
            <NWIcon
              className={Platform.OS === "ios" ? "aspect-square, w-8" : ""}
              name={Platform.OS === "ios" ? "camera.fill" : "camera"}
              tintColor={color}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(settings)"
        options={{
          title: "Settings",
          header: () => <View className="h-2 pt-safe bg-background" />,
          tabBarIcon: ({ color }) => (
            <NWIcon
              className={Platform.OS === "ios" ? "aspect-square, w-8" : ""}
              name={Platform.OS === "ios" ? "gearshape.fill" : "gear"}
              tintColor={color}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
