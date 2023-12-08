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
import { schemaEncoder } from "../../utils/eas";
import Fuse from "fuse.js";
import FoodItem from "../../components/ListItem";
import { gql, useQuery } from "@apollo/client";
import { useAddress } from "@thirdweb-dev/react-native";

const List = gql`
  query Attestation($id: String!) {
    attestations(where: { attester: { equals: $id } }) {
      id
      attester
      recipient
      refUID
      revocable
      revocationTime
      expirationTime
      data
    }
  }
`;

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
    Record<Attestation["attester"], Attestation[]>
  >({});
  const [filteredData, setFilteredData] = useState(data.Restaurants);

  const address = useAddress();

  const result = useQuery<{ attestations: Attestation[] }>(List, {
    skip: !address,
    variables: {
      id: address,
    },
    onError(err) {
      console.log(err);
    },

    onCompleted: ({ attestations }) => {
      const encoded = attestations.map((a) => {
        let decodedData;
        try {
          decodedData = schemaEncoder.decodeData(a.data ?? "");
        } catch (error) {}
        decodedData = decodedData ? convertJsonToObject(decodedData) : null;
        return {
          ...a,
          data: decodedData,
        };
      });
      setAttestationsByAttester(groupAttestationsByAttester(encoded));
    },
  });

  console.log(convertToTitleCount(attestationsByAttester));

  // Setup for Fuse.js for fuzzy searching
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

  const sortedRestaurants = useMemo(() => {
    return filteredData.sort((a, b) => b[sortOption] - a[sortOption]);
  }, [data, sortOption]);

  return (
    <Box gap={"$4"} py="$4" px="$4" flex={1}>
      <SegmentedControl
        values={["Available", "Done"]}
        selectedIndex={activeSegment}
        onChange={(event) => {
          setActiveSegment(event.nativeEvent.selectedSegmentIndex);
          setFilteredData(data[event.nativeEvent.value]);
        }}
      />

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

      <FlatList
        numColumns={1}
        data={convertToTitleCount(attestationsByAttester)}
        renderItem={({ item }) => (
          <FoodItem count={item.count} title={item.title} />
        )}
        keyExtractor={(item) => item.title}
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

function groupAttestationsByAttester(attestations: Attestation[]) {
  return attestations.reduce((acc, attestation) => {
    // Group by 'attester'
    if (!acc[attestation.attester]) {
      acc[attestation.attester] = [];
    }
    acc[attestation.attester].push(attestation);
    return acc;
  }, {});
}

function convertJsonToObject(jsonArray: Record<string, any>[]) {
  let result = {};
  jsonArray.forEach((item) => {
    result[item.name] = item.value.value;
  });
  return result;
}

interface InputData {
  [key: string]: Attestation[];
}

interface ResultObject {
  title: string;
  count: number;
}

function convertToTitleCount(data: InputData): ResultObject[] {
  const result: ResultObject[] = [];

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const amount = data[key].length;
      result.push({ title: key, count: amount });
    }
  }

  return result;
}
