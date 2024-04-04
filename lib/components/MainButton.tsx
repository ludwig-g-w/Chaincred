import {
  Button,
  ButtonSpinner,
  ButtonText,
  IButtonProps,
} from "@gluestack-ui/themed";

import React from "react";

type Props = {
  loading?: boolean;
  children: string;
} & IButtonProps["defaultProps"];

const MainButton = ({ loading, children, ...rest }: Props) => {
  return (
    <Button
      {...rest}
      disabled={loading}
      rounded="$full"
      h="$16"
      bg={loading ? "$blue200" : "$blue500"}
    >
      <ButtonText color="$white" bold size="lg">
        {children}
      </ButtonText>
      {loading && (
        <ButtonSpinner color="$white" right="$4" position="absolute" />
      )}
    </Button>
  );
};

export default MainButton;
