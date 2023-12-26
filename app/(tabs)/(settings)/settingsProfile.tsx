import { invariant } from "@apollo/client/utilities/globals";
import ImageUploadArea from "@components/ImageUploadArea";
import { API_KEY_GOOGLE, ORGANIZATION_MANAGER_ADDRESS } from "@env";
import { Box, ButtonSpinner } from "@gluestack-ui/themed";
import {
  AddIcon,
  Button,
  Input,
  InputField,
  InputIcon,
  Text,
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
  useToast,
} from "@gluestack-ui/themed";
import {
  useContract,
  useContractEvents,
  useContractWrite,
  useStorage,
} from "@thirdweb-dev/react-native";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default function Organization() {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [locationCoords, setLocationCoords] = useState("");
  const [loading, setLoading] = useState(false);
  const storage = useStorage();
  const toast = useToast();

  const { contract } = useContract(ORGANIZATION_MANAGER_ADDRESS);

  const { mutateAsync: createOrganization, isLoading } = useContractWrite(
    contract,
    "setOrganization"
  );

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      return result.assets[0].uri;
    }
    return null;
  }

  async function handleImageUpload() {
    try {
      const uri = await pickImage();
      invariant(uri, "no image choosen");

      setImageUrl(uri);
    } catch (err) {
      console.error(err);
    }
  }

  async function submit() {
    try {
      invariant(
        title || imageUrl || description || locationCoords,
        "Empty data"
      );
      setLoading(true);
      const fileIpfsHash = await storage?.upload({
        name: `coverphoto`,
        type: "image/jpeg",
        uri: imageUrl,
      });
      invariant(fileIpfsHash, "Error uploading image to IPFS");

      const data = await createOrganization({
        args: [title, fileIpfsHash, description, locationCoords],
      });
      toast.show({
        placement: "top",
        render() {
          return (
            <Toast action="success" variant="solid">
              <VStack space="xs">
                <ToastTitle>Organization created!</ToastTitle>
                <ToastDescription>
                  You have successfully created:
                </ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
      router.back();
    } catch (err) {
      console.error("contract call failure", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <VStack flex={1} p="$4" gap={"$4"}>
      <GooglePlacesAutocomplete
        placeholder="Choose where you are based"
        fetchDetails
        onPress={(data, details = null) => {
          console.log(details);
          setLocationCoords(
            `${details?.geometry.location.lat},${details?.geometry.location.lng}`
          );
        }}
        query={{
          key: API_KEY_GOOGLE,
          language: "en",
        }}
      />
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

      <ImageUploadArea img={imageUrl} onPress={handleImageUpload} />

      <Button
        disabled={loading}
        margin="auto"
        bgColor={loading ? "$warmGray600" : "$black"}
        onPress={submit}
      >
        <Text color="$backgroundDark100">Create Organization</Text>
        {loading && <ButtonSpinner right="$4" position="absolute" />}
      </Button>
    </VStack>
  );
}
