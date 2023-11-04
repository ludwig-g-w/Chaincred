import {
  useStyled,
  ICustomConfig,
  Box,
  Text,
  Center,
} from "@gluestack-ui/themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Redirect, Tabs } from "expo-router";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
          header: Header,
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

const Header = () => {
  return (
    <Box bg="white" pb="$4">
      <SafeAreaView />
      <Box
        w={"$full"}
        paddingHorizontal="$4"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text bold size="2xl">
          Home
        </Text>
        <ConnectWallet />
      </Box>
    </Box>
  );
};

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}
