import { Button, ButtonSpinner, IButtonProps } from "@gluestack-ui/themed";

import { Text } from "@gluestack-ui/themed";
import React from "react";

type Props = {
  loading: boolean;
  children: string;
} & IButtonProps["defaultProps"];

const MainButton = ({ loading, children, ...rest }: Props) => {
  return (
    <Button
      {...rest}
      disabled={loading}
      rounded="$2xl"
      h="$16"
      bg={loading ? "$blue200" : "$blue500"}
    >
      <Text color="$white" bold size="lg">
        {children}
      </Text>
      {loading && (
        <ButtonSpinner color="$white" right="$4" position="absolute" />
      )}
    </Button>
  );
};

export default MainButton;
