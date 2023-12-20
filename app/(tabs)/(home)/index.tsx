import ListItem from "@components/ProfileCard";
import { ORGANIZATION_MANAGER_ADDRESS } from "@env";
import { Box } from "@gluestack-ui/themed";
import { FlashList } from "@shopify/flash-list";
import {
  useAddress,
  useContract,
  useSigner,
  useStorage,
} from "@thirdweb-dev/react-native";
import { groupAttestationsByAttester } from "@utils/attestations";
import { ProfileListItem } from "@utils/types";
import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { useCompaniesSuspenseQuery } from "../../../generated/graphql";

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
  const storage = useStorage();

  const address = useAddress();
  const { data } = useCompaniesSuspenseQuery({
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
    (async function mergeProfileWithAttestation() {
      const results: ProfileListItem[] = [];
      for (const key in attestationsByAttester) {
        if (attestationsByAttester.hasOwnProperty(key)) {
          const [title, imageUrl, description, locationCoords] =
            await contract?.call("getOrganization", [key]);
          const amount = attestationsByAttester[key].length;
          const imgUrl = await storage?.download(
            imageUrl.replace("coverphoto", "")
          );

          results.push({
            title: title ?? key,
            description,
            locationCoords,
            count: amount,
            id: attestationsByAttester[key][0].id,
            address: key,
            imageUrl: imgUrl?.url ?? "",
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
    <Box px="$4" flex={1}>
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

      <FlashList
        numColumns={1}
        estimatedItemSize={88}
        keyExtractor={(d) => d.id}
        data={profileData}
        renderItem={({ item }) => (
          <ListItem
            onPress={() => router.push(`/organization/${item.address}`)}
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
