import Map from "@components/MapView";
import { trpc } from "@lib/utils/trpc";
import { useActiveAccount } from "thirdweb/react";
import React from "react";

const DiscoverList = () => {
  const user = useActiveAccount();
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
