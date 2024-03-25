import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  Box,
  ChevronLeftIcon,
  ICustomConfig,
  Text,
  useStyled,
} from "@gluestack-ui/themed";
import { ConnectWallet } from "@thirdweb-dev/react-native";
import { Tabs, router, usePathname } from "expo-router";
import { memo, useCallback } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { match } from "ts-pattern";

export default function TabLayout() {
  const theme: { config: ICustomConfig } = useStyled();

  const header = useCallback(() => <Header />, []);

  return (
    <Box flex={1}>
      <Tabs
        initialRouteName="/scanAddress"
        screenOptions={{
          tabBarActiveTintColor: theme.config.tokens.colors.blue500,
          header: () => null,
          tabBarStyle: {
            backgroundColor: theme.config.tokens.colors.white,
            borderTopColor: theme.config.tokens.colors.borderLight200,
          },
        }}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          }}
        />

        <Tabs.Screen
          name="(discover)"
          options={{
            title: "Discover",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="search" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="scanAddress"
          options={{
            title: "Scan",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="camera" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(settings)"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
          }}
        />
      </Tabs>
    </Box>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}
