import Map from "@components/MapView";
import { suspenseGetAllProfiles } from "@services/supabase";
import { Profile } from "@utils/types";
import React from "react";

const DiscoverList = () => {
  const profiles = suspenseGetAllProfiles.read();
  return <Map {...{ profiles }} />;
};

export default DiscoverList;
