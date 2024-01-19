import React from "react";
import {
  Button,
  ButtonText,
  Toast,
  ToastTitle,
  ToastDescription,
  useToast,
  Icon,
  CloseIcon,
  VStack,
  CheckIcon,
  Pressable,
  Center,
} from "@gluestack-ui/themed";
import { MessageCircle, AlertTriangleIcon } from "lucide-react-native";

const MyToast = ({ description = "" }) => {
  return (
    <>
      <Toast action={"success"} variant={"solid"}>
        <VStack space="xs">
          <ToastTitle>Success</ToastTitle>
          <ToastDescription>{description}</ToastDescription>
        </VStack>
      </Toast>
    </>
  );
};

export default MyToast;
