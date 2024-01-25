import Map from "@components/MapView";
import { suspenseGetAllProfiles } from "@services/supabase";
import React from "react";

const DiscoverList = () => {
  const profiles = suspenseGetAllProfiles.read();
  // @ts-ignore
  return <Map {...{ profiles }} />;
};

export default DiscoverList;
