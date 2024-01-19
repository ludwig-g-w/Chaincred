import { useApolloClient } from "@apollo/client";
import ImageUploadArea from "@components/ImageUploadArea";
import MyToast from "@components/Toast";
import { API_KEY_GOOGLE } from "@env";
import {
  Button,
  ButtonSpinner,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  Text,
  View,
  useToast,
} from "@gluestack-ui/themed";
import { setOrModifyProfile } from "@services/supabase";
import { useAddress } from "@thirdweb-dev/react-native";
import { pickImage, uploadImage } from "@utils/uploading";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import invariant from "tiny-invariant";

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
      setLoading(true);
      const path = image?.base64 && (await uploadImage(image.base64, address));
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
      client.cache.gc();
      router.back();
    } catch (err) {
      console.error("contract call failure", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View height={"100%"} bg="$white" p="$4" gap={"$2"}>
      <FormControlLabel>
        <FormControlLabelText>Location</FormControlLabelText>
      </FormControlLabel>
      <GooglePlacesAutocomplete
        placeholder="Choose where you are based"
        styles={{
          container: {
            flex: 0,
            zIndex: 99,
          },
          listView: {
            zIndex: 99,
          },
          textInput: {
            zIndex: 99,
            borderWidth: 2,
            borderColor: "#eaeaea",
            borderRadius: 20,
          },
        }}
        fetchDetails
        onPress={(data, details = null) => {
          setLocationCoords(
            `${details?.geometry.location.lat},${details?.geometry.location.lng}`
          );
        }}
        query={{
          key: API_KEY_GOOGLE,
          language: "en",
        }}
      />
      <FormControl mb="$4">
        <FormControlLabel>
          <FormControlLabelText>Title</FormControlLabelText>
        </FormControlLabel>
        <Input
          bg="$white"
          borderRadius="$lg"
          h="$12"
          borderWidth="$1"
          borderColor="$borderLight300"
        >
          <InputField
            value={title}
            onChangeText={(e) => setTitle(e)}
            placeholder="Title"
          />
        </Input>
      </FormControl>
      <FormControl mb="$4">
        <FormControlLabel>
          <FormControlLabelText>Title</FormControlLabelText>
        </FormControlLabel>
        <Input
          bg="$white"
          borderRadius="$lg"
          h="$12"
          borderWidth="$1"
          borderColor="$borderLight300"
        >
          <InputField
            multiline
            value={description}
            onChangeText={(e) => setDescription(e)}
            placeholder="Description"
          />
        </Input>
      </FormControl>

      <ImageUploadArea img={image?.uri} onPress={handleImageUpload} />

      <Button
        mt="$8"
        disabled={loading}
        margin="auto"
        bgColor={loading ? "$warmGray400" : "$black"}
        onPress={submit}
      >
        <Text bold color="$white">
          Create Organization
        </Text>
        {loading && (
          <ButtonSpinner color="$black" right="$4" position="absolute" />
        )}
      </Button>
    </View>
  );
}
