import {
  Box,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  SearchIcon,
} from "@gluestack-ui/themed";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { FlashList } from "@shopify/flash-list";
import { useAddress } from "@thirdweb-dev/react-native";
import { Link, router } from "expo-router";
import Fuse from "fuse.js";
import React, { useMemo, useState } from "react";
import ListItem from "../../../components/ListItem";
import {
  ListAttestationFragment,
  useCompaniesQuery,
} from "../../../generated/graphql";
import {
  convertToTitleCount,
  groupAttestationsByAttester,
} from "../../../utils/attestations";

// Dummy data for restaurants, replace with your actual data source
const data = {
  Restaurants: [{ id: 1, title: "Test 1", description: "test", count: 4 }],
  Dishes: [
    // ...your dishes data
  ],
};

const RestaurantList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Restaurants"); // For segmented control
  const [sortOption, setSortOption] = useState("title"); // default sort by rating
  const [activeSegment, setActiveSegment] = useState(0); // Index of the active segment
  const [attestationsByAttester, setAttestationsByAttester] = useState<
    Record<string, ListAttestationFragment[]>
  >({});
  const [filteredData, setFilteredData] = useState(data.Restaurants);

  const address = useAddress();

  useCompaniesQuery({
    skip: !address,
    variables: {
      id: address ?? "",
    },
    onError(err) {
      console.log(err);
    },

    onCompleted: ({ attestations }) => {
      setAttestationsByAttester(groupAttestationsByAttester(attestations));
    },
  });

  const options = {
    keys: ["title"],
    includeScore: true,
  };

  const fuseRestaurants = new Fuse(data.Restaurants, options);
  const fuseDishes = new Fuse(data.Dishes, options);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    let results = [];
    if (activeSegment === 0) {
      // If Restaurants is selected
      results = fuseRestaurants.search(text);
    } else {
      // If Dishes is selected
      results = fuseDishes.search(text);
    }
    const matches = results.map((result) => result.item);
    setFilteredData(matches);
  };

  // const sortedRestaurants = useMemo(() => {
  //   return filteredData.sort((a, b) => b[sortOption] - a[sortOption]);
  // }, [data, sortOption]);

  return (
    <Box gap={"$4"} py="$4" px="$4" flex={1}>
      {/* <SegmentedControl
        values={["Available", "Done"]}
        selectedIndex={activeSegment}
        onChange={(event) => {
          setActiveSegment(event.nativeEvent.selectedSegmentIndex);
          setFilteredData(data[event.nativeEvent.value]);
        }}
      /> */}

      <Input borderRadius="$full" bg="white">
        <InputSlot pl="$3">
          <InputIcon as={SearchIcon} />
        </InputSlot>
        <InputField
          placeholder="Search..."
          type="text"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </Input>

      <FlashList
        numColumns={1}
        estimatedItemSize={88}
        keyExtractor={(d) => d.id}
        data={convertToTitleCount(attestationsByAttester)}
        renderItem={({ item }) => (
          <ListItem
            // @ts-ignore
            onPress={() => router.push("/attestations")}
            count={item.count}
            title={item.title}
          />
        )}
      />
    </Box>
  );
};

export default RestaurantList;
