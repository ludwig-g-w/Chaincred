import { HStack, Pressable, Text, View } from "@gluestack-ui/themed";
import {
  Link,
  Stack,
  useLocalSearchParams,
  useGlobalSearchParams,
  usePathname,
} from "expo-router";

export default () => {
  const path = usePathname();

  const isMap = path === "/discoverMap" ?? true;

  return (
    <View flex={1}>
      <View
        right="$4"
        bottom="$4"
        position="absolute"
        zIndex={99}
        justifyContent="center"
      >
        <HStack
          hardShadow="2"
          shadowRadius="$1"
          shadowColor="$black"
          borderRadius="$full"
          bg="$backgroundLight400"
        >
          <Link asChild href={"/discoverMap"}>
            <Pressable
              alignItems="center"
              borderTopLeftRadius="$full"
              borderBottomLeftRadius="$full"
              bg={isMap ? "$blue500" : "$backgroundLight400"}
              p="$2"
              pl="$4"
            >
              <Text color={isMap ? "white" : "$textLight100"} bold>
                Map
              </Text>
            </Pressable>
          </Link>
          <Link asChild href={"/discoverList"}>
            <Pressable
              borderTopRightRadius="$full"
              borderBottomRightRadius="$full"
              bg={!isMap ? "$blue500" : "$backgroundLight400"}
              p="$2"
              pr="$4"
            >
              <Text color={!isMap ? "white" : "$textLight100"} bold>
                List
              </Text>
            </Pressable>
          </Link>
        </HStack>
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
};
