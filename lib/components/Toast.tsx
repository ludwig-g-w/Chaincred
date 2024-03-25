import {
  Button,
  ButtonIcon,
  ButtonText,
  LinkIcon,
  Toast,
  ToastDescription,
  ToastTitle,
} from "@gluestack-ui/themed";
import * as WebBrowser from "expo-web-browser";

import React from "react";

const MyToast = ({ title = "", description = "", ...rest }) => {
  return (
    <Toast width="$full" flexDirection="column" {...rest}>
      <ToastTitle>{title}</ToastTitle>
      <ToastDescription>{description}</ToastDescription>
      {rest?.onPress && (
        <Button onPress={rest.onPress} variant="link" gap="$2">
          <ButtonText size="sm">Check on EAS</ButtonText>
          <ButtonIcon as={LinkIcon} />
        </Button>
      )}
    </Toast>
  );
};

export default MyToast;

// `https://sepolia.easscan.org/schema/view/${id}`
