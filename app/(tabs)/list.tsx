import React, { useState, useMemo } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Avatar,
  AvatarImage,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  FlatList,
  SearchIcon,
} from "@gluestack-ui/themed";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

import Fuse from "fuse.js";

// Dummy data for restaurants, replace with your actual data source
const data = {
  Restaurants: [
    // ...your restaurants data
  ],
  Dishes: [
    // ...your dishes data
  ],
};

const RestaurantList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Restaurants"); // For segmented control
  const [sortOption, setSortOption] = useState("rating"); // default sort by rating
  const [activeSegment, setActiveSegment] = useState(0); // Index of the active segment
  const [filteredData, setFilteredData] = useState(data.Restaurants);

  // Setup for Fuse.js for fuzzy searching
  const options = {
    keys: ["name"],
    includeScore: true,
  };
  const fuseRestaurants = new Fuse(data.Restaurants, options);
  const fuseDishes = new Fuse(data.Dishes, options);

  const handleSearch = (text) => {
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

  const sortedRestaurants = useMemo(() => {
    // Implement sorting logic based on sortOption here
    // For example, sort by rating:
    return filteredData.sort((a, b) => b[sortOption] - a[sortOption]);
  }, [data, sortOption]);

  return (
    <Box py="$10">
      {/* Segmented control for navigation */}
      <SegmentedControl
        values={["Restaurants", "Dishes"]}
        selectedIndex={activeSegment}
        onChange={(event) => {
          setActiveSegment(event.nativeEvent.selectedSegmentIndex);
          setFilteredData(data[event.nativeEvent.value]);
        }}
      />

      {/* Search bar with an icon */}
      <Input>
        <InputSlot pl="$3">
          <InputIcon as={SearchIcon} />
          {/* Replace SearchIcon with actual icon component */}
        </InputSlot>
        <InputField
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
        />
        {/* You can add Sort and Filter icons and functionality here as well */}
        <InputSlot pr="$3">
          <InputIcon
            as={SearchIcon}
            onPress={() => {
              /* Handle sort */
            }}
          />
          <InputIcon
            as={SearchIcon}
            onPress={() => {
              /* Handle filter */
            }}
          />
        </InputSlot>
      </Input>

      {/* List of restaurants */}
      <FlatList
        data={sortedRestaurants}
        renderItem={({ item }) => (
          <Box borderBottomWidth="$1" borderColor="$trueGray800" py="$2">
            <HStack space="md" justifyContent="space-between">
              <Avatar size="md">
                <AvatarImage source={{ uri: item.image }} />
              </Avatar>
              <VStack>
                <Text color="$coolGray800" fontWeight="$bold">
                  {item?.name}
                </Text>
              </VStack>
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => item.id.toString()}
        // ... other props
      />
    </Box>
  );
};

export default RestaurantList;

export interface Attestation {
  id: string;
  attester: string;
  recipient: string;
  refUID: string;
  revocable: boolean;
  revocationTime: number;
  expirationTime: number;
  data: string;
}
