import Map from "@components/MapView";
import { trpc } from "@lib/utils/trpc";
import { useUser } from "@thirdweb-dev/react-native";
import React, { useMemo } from "react";

const DiscoverList = () => {
  const { user } = useUser();
  const [profiles, { refetch, isRefetching }] =
    trpc.getProfiles.useSuspenseQuery();

  const filterProfiles = useMemo(
    () =>
      profiles.filter((p) => {
        return p.address !== user?.address && !!p?.image_url?.length;
      }),
    [profiles]
  );

  return <Map profiles={filterProfiles} />;
};

export default DiscoverList;
