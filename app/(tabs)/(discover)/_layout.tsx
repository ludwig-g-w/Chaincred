import { HStack, Text, View } from "@gluestack-ui/themed";
import { Link, Stack } from "expo-router";
export default () => {
  return (
    <View flex={1}>
      <View
        right="$4"
        bottom="$4"
        position="absolute"
        zIndex={99}
        justifyContent="center"
      >
        <HStack borderRadius="$full" bgColor="$blue500">
          <Link href={"/discoverMap"}>
            <View p="$2" borderBlockColor="$amber200" pr="$4">
              <Text color="white" bold>
                Map
              </Text>
            </View>
          </Link>
          <Link href={"/discoverList"}>
            <View p="$2" borderBlockColor="$amber200" pr="$4">
              <Text bold>List</Text>
            </View>
          </Link>
        </HStack>
      </View>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="list"
      >
        <Stack.Screen name="discoverMap" />
        <Stack.Screen name="discoverList" />
      </Stack>
    </View>
  );
};
