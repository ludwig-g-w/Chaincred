import Map from "@components/MapView";
import { trpc } from "@lib/utils/trpc";
import { useSetAllRoleMembers, useUser } from "@thirdweb-dev/react-native";
import React, { useMemo } from "react";

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

  return <Map profiles={profiles} />;
};

export default DiscoverList;
