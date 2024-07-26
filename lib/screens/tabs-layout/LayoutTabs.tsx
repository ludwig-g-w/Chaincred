import { NWSymbolView } from "@lib/components/nativeWindInterop";
import { NAV_THEME } from "@lib/constants";
import { useColorScheme } from "@lib/useColorScheme";
import { Tabs } from "expo-router";

export default function TabLayout() {
  const { isDarkColorScheme } = useColorScheme();

  const theme = NAV_THEME[isDarkColorScheme ? "dark" : "light"];

  return (
    <Tabs
      initialRouteName="(home)"
      screenOptions={{
        tabBarActiveTintColor: theme.primary,
        header: () => null,
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
          tabBarIcon: ({ color }) => (
            <NWSymbolView
              className="aspect-square, w-8"
              name="house.fill"
              tintColor={color}
              type="hierarchical"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="(discover)"
        options={{
          title: "Discover",
          tabBarIcon: ({ color }) => (
            <NWSymbolView
              className="aspect-square, w-8"
              name="binoculars.fill"
              tintColor={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="scanAddress"
        options={{
          title: "Scan",
          tabBarIcon: ({ color }) => (
            <NWSymbolView
              className="aspect-square, w-8"
              name="camera.fill"
              tintColor={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(settings)"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <NWSymbolView
              className="aspect-square, w-8"
              name="gearshape.fill"
              tintColor={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
