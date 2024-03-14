import {
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
  Pressable,
  Button,
  Text,
  HStack,
} from "@gluestack-ui/themed";
import React from "react";
import Linking from "expo-linking";

const MyToast = ({ id }) => {
  return (
    <>
      <Toast action={"success"} variant={"solid"}>
        <VStack alignItems="center" space="xs">
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
            <Text color="$textLight950">Link</Text>
          </Button>
        </VStack>
      </Toast>
    </>
  );
};

export default MyToast;
