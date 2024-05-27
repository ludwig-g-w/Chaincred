import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import * as Typo from "@lib/components/ui/typography";

const MyToast = ({ title = "", description = "", ...rest }) => {
  return (
    <Card className="bg-secondary" {...rest}>
      <CardHeader>
        <Typo.H4 className="color-secondary-foreground">{title}</Typo.H4>
        {description && (
          <Typo.Lead className="color-secondary-foreground">
            {description}
          </Typo.Lead>
        )}
      </CardHeader>
      {rest?.onPress && (
        <Button variant="link" onPress={rest.onPress}>
          <Typo.Large>Check on EAS</Typo.Large>
        </Button>
      )}
    </Card>
  );
};

export default MyToast;
