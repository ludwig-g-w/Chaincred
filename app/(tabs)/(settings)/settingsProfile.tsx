import ImageUploadArea from "@components/ImageUploadArea";
import MainButton from "@components/MainButton";
import MyToast from "@components/Toast";
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
import SuspenseFallback from "@lib/components/SuspenseFallback";
import { useRefreshOnFocus } from "@lib/utils/hooks";
import { trpc } from "@lib/utils/trpc";
import { Profile } from "@prisma/client";
import { Location } from "@services/supabase";
import { skipToken } from "@tanstack/react-query";
import { useUser } from "@thirdweb-dev/react-native";
import { pickImage, uploadImage } from "@utils/uploading";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { ReactElement, Suspense, useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import invariant from "tiny-invariant";

export default function SettingsProfile() {
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset>();
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState<Location>({
    coords: undefined,
    name: undefined,
  });
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState();
  const [fetchedProfile, { refetch }] =
    trpc.getProfileByAddress.useSuspenseQuery(
      // @ts-ignore
      user?.address
        ? {
            address: user.address,
          }
        : skipToken
    );

  useEffect(() => {
    if (!!fetchedProfile) {
      setProfile(fetchedProfile);
    }
  }, [fetchedProfile]);

  useRefreshOnFocus(refetch);

  const mutationProfile = trpc.setOrModifyProfile.useMutation();
  const toast = useToast();
  const [isEditing, setEditing] = useState({
    location: false,
    title: false,
    description: false,
    image: false,
  });

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
      invariant(user?.address, "No Address");
      setLoading(true);

      const updateObject: {
        title?: string;
        imageUrl?: string;
        description?: string;
        location?: Location;
      } = {};

      if (title) updateObject.title = title;
      if (image?.base64) {
        const path = await uploadImage(image.base64, user.address);
        updateObject.imageUrl = path;
      }
      if (description) updateObject.description = description;
      if (location.coords) updateObject.location = location;

      await mutationProfile.mutateAsync({
        // @ts-ignore
        address: user.address,
        ...updateObject,
      });

      toast.show({
        placement: "top",
        render() {
          return (
            <MyToast
              title="Profile Updated!"
              action="success"
              variant="solid"
            />
          );
        },
      });
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
      const updateObject = { address: user?.address } as Profile;
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
      <Suspense fallback={<SuspenseFallback />}>
        <View bg="$white" p="$4" gap={"$2"}>
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
                key: "AIzaSyDBx5I1YAQiApOZhhq7aAsj2_19HO4hOfM",
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
            Save changes
          </MainButton>
        </View>
      </Suspense>
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
