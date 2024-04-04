import Map from "@components/MapView";
import { trpc } from "@lib/utils/trpc";
import { useUser } from "@thirdweb-dev/react-native";
import React from "react";

const DiscoverList = () => {
  const { user } = useUser();
  const [profiles] = trpc.profiles.useSuspenseQuery({
    where: {
      address: {
        not: user?.address ?? "",
      },
      location_coords: {
        not: null,
      },
    },
  });
  // @ts-ignore works well
  return <Map profiles={profiles} />;
};

export default DiscoverList;
