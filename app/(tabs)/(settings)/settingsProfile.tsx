import { useApolloClient } from "@apollo/client";
import ImageUploadArea from "@components/ImageUploadArea";
import MainButton from "@components/MainButton";
import MyToast from "@components/Toast";
import { API_KEY_GOOGLE } from "@env";
import {
  CheckCircleIcon,
  EditIcon,
  FormControl,
  FormControlLabelText,
  HStack,
  Input,
  InputField,
  Pressable,
  Text,
  Textarea,
  TextareaInput,
  View,
  useToast,
} from "@gluestack-ui/themed";
import {
  Location,
  Profile,
  getProfileByAddress,
  setOrModifyProfile,
} from "@services/supabase";
import { useAddress } from "@thirdweb-dev/react-native";
import { pickImage, uploadImage } from "@utils/uploading";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { ReactElement, useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import invariant from "tiny-invariant";

export default function Organization() {
  const client = useApolloClient();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset>();
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState<Location>({
    coords: undefined,
    name: undefined,
  });
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<Profile>();
  const toast = useToast();
  const address = useAddress();
  const [isEditing, setEditing] = useState({
    location: false,
    title: false,
    description: false,
    image: false,
  });

  useEffect(() => {
    if (!address) return;
    (async () => {
      const p = await getProfileByAddress(address);
      setProfile(p);
    })();
  }, [address]);

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
      invariant(address, "No Address");
      setLoading(true);

      const updateObject: {
        title?: string;
        imageUrl?: string;
        description?: string;
        location?: Location;
      } = {};

      if (title) updateObject.title = title;
      if (image?.base64) {
        const path = await uploadImage(image.base64, address);
        updateObject.imageUrl = path;
      }
      if (description) updateObject.description = description;
      if (location.coords) updateObject.location = location;

      await setOrModifyProfile({
        address,
        ...updateObject,
      });

      toast.show({
        placement: "top",
        render() {
          return <MyToast description="Profile is updated!" />;
        },
      });
      client.cache.gc();
      router.push("/settings");
      // ... the rest of the original submit function
    } catch (err) {
      console.error("contract call failure", err);
    } finally {
      setLoading(false);
    }
  }

  const handleFieldSave = async (fieldName: string) => {
    try {
      setLoading(true);
      const updateObject = { address };
      if (fieldName === "title" && title) updateObject.title = title;
      if (fieldName === "description" && description)
        updateObject.description = description;
      if (fieldName === "location" && location.name) {
        updateObject.location_name = location.name;
        updateObject.location_coords = location.coords;
      }
      setProfile((prev) => ({ ...prev, ...updateObject }));
      setEditing((prev) => ({ ...prev, [fieldName]: false }));
    } catch (error) {
      console.error(`Error updating ${fieldName}`, error);
      toast.show({
        /* ... */
      });
    } finally {
      setLoading(false);
    }
  };

  const insets = useSafeAreaInsets();

  return (
    <KeyboardAwareScrollView
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <View
        justifyContent="space-between"
        height={Dimensions.get("screen").height - (insets.bottom + 210)}
        bg="$white"
        p="$4"
        gap={"$2"}
      >
        <View w="$full" alignItems="center">
          <ImageUploadArea
            img={image?.uri ?? profile?.image_url}
            onPress={handleImageUpload}
          />
        </View>
        <EditableField
          label="Location"
          isEditing={isEditing.location}
          onSave={() => handleFieldSave("location")}
          profileValue={profile?.location_name}
          setEditing={setEditing}
        >
          <GooglePlacesAutocomplete
            disableScroll
            placeholder="Where you are based?"
            keepResultsAfterBlur
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
              setLocation({
                coords: `${details?.geometry.location.lat},${details?.geometry.location.lng}`,
                name: details?.formatted_address,
              });
            }}
            query={{
              key: API_KEY_GOOGLE,
              language: "en",
            }}
          />
        </EditableField>

        <EditableField
          label="Title"
          isEditing={isEditing.title}
          onSave={() => handleFieldSave("title")}
          profileValue={profile?.title}
          setEditing={setEditing}
        >
          <Input
            bg="$white"
            borderRadius="$lg"
            h="$12"
            borderWidth="$1"
            borderColor="$borderLight300"
          >
            <InputField
              value={title}
              onChangeText={setTitle}
              placeholder={"Enter your name"}
            />
          </Input>
        </EditableField>

        <EditableField
          label="Description"
          isEditing={isEditing.description}
          onSave={() => handleFieldSave("description")}
          profileValue={profile?.description}
          setEditing={setEditing}
        >
          <Textarea>
            <TextareaInput
              value={description}
              onChangeText={setDescription}
              placeholder={"Describe your yourself"}
            />
          </Textarea>
        </EditableField>

        <MainButton mt="auto" loading={loading} onPress={submit}>
          Save
        </MainButton>
      </View>
    </KeyboardAwareScrollView>
  );
}

type EditableFieldProps = {
  label: string;
  isEditing: boolean;
  onSave: Function;
  profileValue?: string;
  setEditing: Function;
  children: ReactElement;
};

const EditableField = ({
  label,
  isEditing,
  onSave,
  profileValue,
  setEditing,
  children,
}: EditableFieldProps) => {
  return (
    <>
      <FormControlLabelText>{label}</FormControlLabelText>
      <HStack gap={"$2"} justifyContent="space-between">
        {isEditing ? (
          <>
            <FormControl flex={1}>{children}</FormControl>

            <Pressable
              aspectRatio={1}
              onPress={onSave}
              w="$8"
              bg="$green500"
              rounded="$full"
              mt="$1.5"
              alignItems="center"
              justifyContent="center"
            >
              <CheckCircleIcon size="sm" color="white" />
            </Pressable>
          </>
        ) : (
          <>
            <Text flex={1}>{profileValue || `No ${label.toLowerCase()}`}</Text>
            <Pressable
              onPress={() =>
                setEditing((prev) => ({ ...prev, [label.toLowerCase()]: true }))
              }
              aspectRatio={1}
              w="$8"
              p="$2"
              bg="$blue500"
              rounded="$full"
            >
              <EditIcon size="sm" color="white" />
            </Pressable>
          </>
        )}
      </HStack>
    </>
  );
};
