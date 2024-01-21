import ListItem from "@components/ProfileCard";
import { ORGANIZATION_MANAGER_ADDRESS } from "@env";
import { Box, Text } from "@gluestack-ui/themed";
import { getProfilesByAddresses } from "@services/supabase";
import { FlashList } from "@shopify/flash-list";
import { useAddress, useContract } from "@thirdweb-dev/react-native";
import { groupAttestationsByAttester } from "@utils/attestations";
import { ProfileListItem } from "@utils/types";
import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { useHomeFeedSuspenseQuery } from "../../../generated/graphql";

// Dummy data for restaurants, replace with your actual data source
const data = {
  Restaurants: [{ id: 1, title: "Test 1", description: "test", count: 4 }],
  Dishes: [
    // ...your dishes data
  ],
};

const Companies = () => {
  // const [searchQuery, setSearchQuery] = useState("");
  // const [activeTab, setActiveTab] = useState("Restaurants"); // For segmented control
  // const [sortOption, setSortOption] = useState("title"); // default sort by rating
  // const [activeSegment, setActiveSegment] = useState(0); // Index of the active segment
  // const [filteredData, setFilteredData] = useState(data.Restaurants);

  const [profileData, setProfileData] = useState<ProfileListItem[]>([]);
  const { contract } = useContract(ORGANIZATION_MANAGER_ADDRESS);

  const address = useAddress();
  const { data } = useHomeFeedSuspenseQuery({
    skip: !address,
    variables: {
      id: address ?? "",
    },
  });

  const attestationsByAttester = useMemo(
    () => groupAttestationsByAttester(data?.attestations),
    [data?.attestations]
  );
  useEffect(() => {
    if (!attestationsByAttester) return;
    (async function mergeProfileWithAttestations() {
      const addresses = Object.keys(attestationsByAttester);
      const profiles = await getProfilesByAddresses(addresses);

      const results: ProfileListItem[] = [];
      for (const key in attestationsByAttester) {
        if (attestationsByAttester.hasOwnProperty(key)) {
          const profile = profiles.find((p) => p.address === key);
          const amount = attestationsByAttester[key].length;

          results.push({
            title: profile?.title ?? key,
            description: profile?.description ?? "",
            locationCoords: profile?.location_coords ?? "",
            count: amount,
            id: attestationsByAttester[key][0].id,
            address: key,
            // @ts-ignore
            imageUrl: profile?.image_url,
          });
        }
      }
      setProfileData(results);
    })();
  }, [contract, attestationsByAttester]);

  // const options = {
  //   keys: ["title"],
  //   includeScore: true,
  // };

  // const fuseRestaurants = new Fuse(data.Restaurants, options);
  // const fuseDishes = new Fuse(data.Dishes, options);

  // const handleSearch = (text: string) => {
  //   setSearchQuery(text);
  //   let results = [];
  //   if (activeSegment === 0) {
  //     // If Restaurants is selected
  //     results = fuseRestaurants.search(text);
  //   } else {
  //     // If Dishes is selected
  //     results = fuseDishes.search(text);
  //   }
  //   const matches = results.map((result) => result.item);
  //   setFilteredData(matches);
  // };

  // const sortedRestaurants = useMemo(() => {
  //   return filteredData.sort((a, b) => b[sortOption] - a[sortOption]);
  // }, [data, sortOption]);

  return (
    <Box px="$2" flex={1} bg="$white">
      {/* <SegmentedControl
        values={["Available", "Done"]}
        selectedIndex={activeSegment}
        onChange={(event) => {
          setActiveSegment(event.nativeEvent.selectedSegmentIndex);
          setFilteredData(data[event.nativeEvent.value]);
        }}
      /> */}

      {/* <Input borderRadius="$full" bg="white">
        <InputSlot pl="$3">
          <InputIcon as={SearchIcon} />
        </InputSlot>
        <InputField
          placeholder="Search..."
          type="text"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </Input> */}

      <Text color="$textLight600" my="$4" size="lg" bold>
        Actions Received
      </Text>
      <FlashList
        numColumns={1}
        estimatedItemSize={88}
        keyExtractor={(d) => d.id}
        data={profileData}
        ItemSeparatorComponent={() => <Box h="$2" />}
        renderItem={({ item }) => (
          <ListItem
            onPress={() => router.push(`/profiles/${item.address}`)}
            imageUrl={item.imageUrl}
            count={item.count}
            title={item.title}
            description={item.description}
            locationCoords={item.locationCoords}
          />
        )}
      />
    </Box>
  );
};

export default Companies;
