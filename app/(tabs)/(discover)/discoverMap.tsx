import Map from "@components/MapView";
import { suspenseGetAllProfiles } from "@services/clientApi";
import React from "react";

const DiscoverList = () => {
  const profiles = suspenseGetAllProfiles.read();

  return <Map {...{ profiles }} />;
};

export default DiscoverList;
