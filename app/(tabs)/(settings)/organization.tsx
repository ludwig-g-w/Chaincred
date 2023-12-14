import { Button, Input, InputField, Text, VStack } from "@gluestack-ui/themed";
import React, { useState } from "react";
import * as FileSystem from "expo-file-system";
import { invariant } from "@apollo/client/utilities/globals";
import {
  useContract,
  useContractEvents,
  useContractWrite,
  useStorage,
} from "@thirdweb-dev/react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function Organization() {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [locationCoords, setLocationCoords] = useState("");
  const storage = useStorage();

  const { contract } = useContract(
    "0x561a49657E52D50146065C914B45f96286Ca4144"
  );

  const { mutateAsync: createOrganization, isLoading } = useContractWrite(
    contract,
    "createOrganization"
  );
  const { data: event } = useContractEvents(contract, "OrganizationCreated");

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      return result.uri;
    }
    return null;
  }

  async function handleImageUpload(file: string) {
    try {
      const fileIpfsHash = await storage?.upload({
        name: "file1",
        type: "file-mime-type",
        uri: "file-uri-on-device",
      }); // Upload a file to IPFS
      invariant(fileIpfsHash);
      setImageUrl(fileIpfsHash);
    } catch (err) {
      console.error("Error uploading image to IPFS", err);
    }
  }

  async function searchLocationAndGetCoords(query: string) {
    const apiKey = "YOUR_GOOGLE_PLACES_API_KEY"; // Replace with your API key
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
      query
    )}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      if (data.results && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        return { longitude: location.lng, latitude: location.lat };
      } else {
        return { error: "No results found" };
      }
    } catch (error) {
      return { error };
    }
  }

  async function submit() {
    try {
      const data = await createOrganization({
        args: [title, imageUrl, description, locationCoords],
      });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }

  return (
    <ScrollView>
      <VStack p="$4" gap={"$4"}>
        <Input>
          <InputField
            value={title}
            onChangeText={(e) => setTitle(e)}
            placeholder="Title"
          />
        </Input>
        <Input>
          <InputField
            value={description}
            onChangeText={(e) => setDescription(e)}
            placeholder="Description"
          />
        </Input>
        <Input>
          <InputField
            value={imageUrl}
            onChangeText={(e) => setImageUrl(e)}
            placeholder="Image URL"
          />
        </Input>
        <Input>
          <InputField
            value={locationCoords}
            onChangeText={(e) => setLocationCoords(e)}
            placeholder="Location Coordinates"
          />
        </Input>
        <Button margin="auto" bgColor="$black" onPress={submit}>
          <Text color="$backgroundDark100">Create Organization</Text>
        </Button>
      </VStack>
    </ScrollView>
  );
}
