import React from "react";
import { Button, ButtonProps } from "./ui/button";
import * as Typo from "@lib/components/ui/typography";
import { ButtonSpinner } from "@gluestack-ui/themed";

type Props = {
  loading?: boolean;
  children: string;
} & ButtonProps;

const MainButton = ({ loading, children, ...rest }: Props) => {
  return (
    <Button className={`rounded-full h-16 `} {...rest} disabled={loading}>
      <Typo.Large className="color-primary-foreground">{children}</Typo.Large>
      {loading && (
        <ButtonSpinner color="$white" right="$4" position="absolute" />
      )}
    </Button>
  );
};

export default MainButton;
