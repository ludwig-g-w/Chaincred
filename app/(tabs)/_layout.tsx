import { useStyled, ICustomConfig } from "@gluestack-ui/themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const theme: { config: ICustomConfig } = useStyled();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.config.tokens.colors.amber200,
        tabBarStyle: {
          backgroundColor: theme.config.tokens.colors.backgroundDark950,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Testing Walletconnect",
          headerStyle: {
            backgroundColor: theme.config.tokens.colors.backgroundDark950,
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "BCH",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="android" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
