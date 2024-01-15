import ImageUploadArea from "@components/ImageUploadArea";
import MyToast from "@components/Toast";
import { useApolloClient } from "@apollo/client";
import { API_KEY_GOOGLE } from "@env";
import {
  Button,
  ButtonSpinner,
  Input,
  InputField,
  Text,
  VStack,
  useToast,
} from "@gluestack-ui/themed";
import { setOrModifyProfile } from "@services/supabase";
import { useAddress } from "@thirdweb-dev/react-native";
import { pickImage, uploadImage } from "@utils/uploading";
import { router } from "expo-router";
import React, { useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import invariant from "tiny-invariant";
import * as ImagePicker from "expo-image-picker";

export default function Organization() {
  const client = useApolloClient();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset>();
  const [description, setDescription] = useState("");
  const [locationCoords, setLocationCoords] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const address = useAddress();

  async function handleImageUpload() {
    try {
      const image = await pickImage();
      invariant(image, "no image choosen");
      setImage(image);
    } catch (err) {
      console.error(err);
    }
  }

  async function submit() {
    try {
      invariant(title || description || locationCoords, "Empty data");
      invariant(address, "No Address");
      invariant(image?.base64, "no image");
      setLoading(true);
      const path = await uploadImage(image.base64, address);
      invariant(path, "No path");
      await setOrModifyProfile({
        address,
        title,
        imageUrl: path,
        description,
        locationCoords,
      });

      toast.show({
        placement: "top",
        render() {
          return <MyToast />;
        },
      });
      client.cache.evict({
        fieldName: "attestations",
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

      <ImageUploadArea img={image?.uri} onPress={handleImageUpload} />

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
