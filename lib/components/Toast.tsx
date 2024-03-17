import { Button, Text, Toast, ToastTitle, VStack } from "@gluestack-ui/themed";
import Linking from "expo-linking";
import React from "react";

const MyToast = ({ id = "" }) => {
  return (
    <Toast action={"success"} variant={"solid"}>
      <VStack flex={1} alignItems="center" space="xs">
        <ToastTitle>Success</ToastTitle>
        <Button
          onPress={() => {
            Linking.openURL(`https://sepolia.easscan.org/schema/view/${id}`);
          }}
          bg="$success500"
          w="$full"
          size="xs"
          variant="outline"
          rounded={"$lg"}
        >
          <Text overflow="hidden" color="$textLight950">
            {id}
          </Text>
        </Button>
      </VStack>
    </Toast>
  );
};

export default MyToast;
