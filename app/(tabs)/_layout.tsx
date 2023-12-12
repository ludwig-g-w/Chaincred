import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  Box,
  ChevronLeftIcon,
  ICustomConfig,
  Text,
  useStyled,
} from "@gluestack-ui/themed";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react-native";
import { Redirect, Tabs, router, usePathname } from "expo-router";
import { memo } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
  const theme: { config: ICustomConfig } = useStyled();

  // TODO: Put back
  // const user = useAddress();
  // if (!user) {
  //   return (
  //     <Redirect href={{ pathname: "/login", params: { rUrl: "/index" } }} />
  //   );
  // }

  return (
    <Box flex={1}>
      <Tabs
        initialRouteName="(home)"
        screenOptions={{
          tabBarActiveTintColor: theme.config.tokens.colors.black,
          header: () => <Header />,
          tabBarStyle: {
            backgroundColor: theme.config.tokens.colors.white,
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
          {!!router.canGoBack() && (
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
          )}
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
