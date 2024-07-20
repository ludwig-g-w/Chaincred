import * as Typo from "@lib/components/ui/typography";
import React from "react";
import { Button } from "./ui/button";
import { Card, CardHeader } from "./ui/card";

const MyToast = ({ title = "", description = "", ...rest }) => {
  return (
    <Card
      className="bg-secondary flex-row gap-2 items-center justify-center p-2"
      {...rest}
    >
      <CardHeader className="p-0">
        <Typo.H4 className="color-secondary-foreground">{title}</Typo.H4>
        {description && (
          <Typo.Lead className="color-secondary-foreground">
            {description}
          </Typo.Lead>
        )}
      </CardHeader>
      {rest?.onPress && (
        <Button variant="link" onPress={rest.onPress}>
          <Typo.Large>Link</Typo.Large>
        </Button>
      )}
    </Card>
  );
};

export default MyToast;
