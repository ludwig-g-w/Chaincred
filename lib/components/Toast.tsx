import {
  Button,
  ButtonIcon,
  ButtonText,
  LinkIcon,
  Toast,
} from "@gluestack-ui/themed";

import React from "react";
import { Card, CardDescription, CardHeader } from "./ui/card";

const MyToast = ({ title = "", description = "", ...rest }) => {
  return (
    <Card className="w-full p-4" {...rest}>
      <CardHeader>
        {/* <CardHeader>{title}</CardHeader>
        <CardDescription>{description}</CardDescription> */}
      </CardHeader>
      {/* {rest?.onPress && (
        <Button onPress={rest.onPress} variant="link" gap="$2">
        <ButtonText size="sm">Check on EAS</ButtonText>
        <ButtonIcon as={LinkIcon} />
        </Button>
      )} */}
    </Card>
  );
};

export default MyToast;
