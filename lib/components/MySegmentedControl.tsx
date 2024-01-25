import { ICustomConfig, useStyled } from "@gluestack-ui/themed";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import React from "react";

type Props = {} & SegmentedControl;

const MySegmentedControl = (props: Props) => {
  const theme: {
    config: ICustomConfig;
  } = useStyled();
  return (
    <SegmentedControl
      {...props}
      activeFontStyle={{
        color: theme.config.tokens.colors.textLight800,
        fontSize: 18,
      }}
      fontStyle={{
        color: "white",
        fontSize: 18,
      }}
      style={{
        height: 36,
        backgroundColor: theme.config.tokens.colors.backgroundLight800,

        marginBottom: 12,
      }}
      values={["Action", "Review"] as const}
    />
  );
};

export default MySegmentedControl;
