import Map from "@components/MapView";
import { trpc } from "@lib/utils/trpc";
import React from "react";

const DiscoverList = () => {
  const [profiles] = trpc.getProfiles.useSuspenseQuery();

  return <Map {...{ profiles }} />;
};

export default DiscoverList;
