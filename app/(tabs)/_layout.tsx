import {
  useStyled,
  ICustomConfig,
  Box,
  Text,
  Center,
} from "@gluestack-ui/themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { ConnectWallet } from "@thirdweb-dev/react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const theme: { config: ICustomConfig } = useStyled();

  return (
    <Box flex={1}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.config.tokens.colors.blue900,
          header: () => {
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
          },
          tabBarStyle: {
            backgroundColor: theme.config.tokens.colors.white,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",

            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        />
        <Tabs.Screen
          name="two"
          options={{
            title: "Eas",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="android" color={color} />
            ),
          }}
        />
      </Tabs>
    </Box>
  );
}
