import Map from "@components/MapView";
import { getAllProfiles } from "@services/supabase";
import { Profile } from "@utils/types";
import React from "react";

const DiscoverList = () => {
  const { data: profiles } = getAllProfiles.read();
  const coordinates: string[] = profiles?.map(
    (p: Profile) => p.location_coords
  );

  return <Map {...{ coordinates }} />;
};

export default DiscoverList;
