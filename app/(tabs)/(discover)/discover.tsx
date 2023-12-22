import MapComponent from "@components/MapView";
import { Box, Text } from "@gluestack-ui/themed";
import React from "react";

const DiscoverList = () => {
  return (
    <MapComponent
      coordinates={[
        "43.7101728,7.261953200000001",
        "44.7101728,7.261953200000001",
        "45.7101728,7.261953200000001",
      ]}
    />
  );
};

export default DiscoverList;
