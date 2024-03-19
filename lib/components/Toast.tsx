import {
  Button,
  Text,
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
} from "@gluestack-ui/themed";
import Linking from "expo-linking";
import React from "react";

const MyToast = ({ link = "", title = "", description = "", ...rest }) => {
  return (
    <Toast width="$full" flexDirection="column" {...rest}>
      <ToastTitle>{title}</ToastTitle>
      <ToastDescription>{description}</ToastDescription>
      {link && (
        <Button
          onPress={() => {
            Linking.openURL(link);
          }}
          bg="$success500"
          w="$full"
          size="xs"
          variant="outline"
          rounded={"$lg"}
        >
          <Text overflow="hidden" color="$success950">
            Open
          </Text>
        </Button>
      )}
    </Toast>
  );
};

export default MyToast;

// `https://sepolia.easscan.org/schema/view/${id}`
