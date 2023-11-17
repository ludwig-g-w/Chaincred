import {
  useStyled,
  ICustomConfig,
  Box,
  Text,
  Center,
  ChevronLeftIcon,
  Button,
} from "@gluestack-ui/themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Redirect, Tabs, router, usePathname } from "expo-router";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { memo } from "react";
import { Pressable } from "react-native";

export default function TabLayout() {
  const theme: { config: ICustomConfig } = useStyled();
  const user = useAddress();

  if (!user) {
    return (
      <Redirect href={{ pathname: "/login", params: { rUrl: "/index" } }} />
    );
  }

  return (
    <Box flex={1}>
      <Tabs
        initialRouteName="(home)"
        screenOptions={{
          tabBarActiveTintColor: theme.config.tokens.colors.blue900,
          header: () => <Header />,
          tabBarStyle: {
            backgroundColor: theme.config.tokens.colors.white,
          },
        }}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            title: "Feed",
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        />
        <Tabs.Screen
          name="list"
          options={{
            title: "List",
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        />
        <Tabs.Screen
          name="scanAddress"
          options={{
            title: "Scan",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="camera" color={"#000"} />
            ),
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="angellist" color={color} />
            ),
          }}
        />
      </Tabs>
    </Box>
  );
}

const Header = memo(() => {
  const path = usePathname();
  return (
    <Box bg="white" pb="$4">
      <SafeAreaView />
      <Box
        w={"$full"}
        paddingHorizontal="$2"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box alignItems="center" flexDirection="row">
          <Pressable
            style={{
              opacity: router.canGoBack() ? 1 : 0,
            }}
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              }
            }}
          >
            <ChevronLeftIcon size="xl" />
          </Pressable>

          <Text ml="$4" bold size="md">
            {path.toLocaleUpperCase().slice(1)}
          </Text>
        </Box>

        <ConnectWallet />
      </Box>
    </Box>
  );
});

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}
