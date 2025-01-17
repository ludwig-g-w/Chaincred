import SegmentedControl from "@react-native-segmented-control/segmented-control";
import React from "react";

type Props = {} & SegmentedControl;

const MySegmentedControl = (props: Props) => {
  return (
    <SegmentedControl
      {...props}
      activeFontStyle={{
        color: "white",
        fontSize: 18,
      }}
      fontStyle={{
        color: "white",
        fontSize: 18,
      }}
      style={{
        height: 36,
        backgroundColor: "red",

        marginBottom: 12,
      }}
      values={["Action", "Review"] as const}
    />
  );
};

export default MySegmentedControl;
