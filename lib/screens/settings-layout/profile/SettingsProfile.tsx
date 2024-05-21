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
  Textarea,
  TextareaInput,
  useToast,
} from "@gluestack-ui/themed";
import { Pressable, Text, View } from "react-native";
import SuspenseFallback from "@lib/components/SuspenseFallback";
import { useRefreshOnFocus } from "@lib/utils/hooks";
import { trpc } from "@lib/utils/trpc";
import { Profile } from "@prisma/client";
import { Location } from "@services/supabase";
import { useUser } from "@thirdweb-dev/react-native";
import { pickImage, uploadImage } from "@utils/uploading";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { ReactElement, Suspense, useEffect, useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import invariant from "tiny-invariant";
import * as Typo from "@lib/components/ui/typography";
import { SymbolView } from "expo-symbols";
import { Label } from "@lib/components/ui/label";
import { NAV_THEME } from "@lib/constants";
import { useColorScheme } from "@lib/useColorScheme";
import { cssInterop } from "nativewind";

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
  const [fetchedProfile, { refetch }] = trpc.profiles.useSuspenseQuery({
    where: {
      address: user?.address ?? "",
    },
  });
  const { isDarkColorScheme } = useColorScheme();
  const theme = NAV_THEME[isDarkColorScheme ? "dark" : "light"];
  useEffect(() => {
    if (!!fetchedProfile?.[0]) {
      setProfile(fetchedProfile[0]);
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
    <>
      <KeyboardAwareScrollView className="bg-background flex-1 p-2 ">
        <Suspense fallback={<SuspenseFallback />}>
          <View className="gap-2 p-4">
            <View className="w-full items-center">
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
                  key: process.env.EXPO_PUBLIC_API_KEY_GOOGLE,
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
          </View>
        </Suspense>
      </KeyboardAwareScrollView>
      <View className="absolute bottom-4 w-full px-2">
        <MainButton loading={loading} onPress={submit}>
          Save changes
        </MainButton>
      </View>
    </>
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
  const { isDarkColorScheme } = useColorScheme();
  const theme = NAV_THEME[isDarkColorScheme ? "dark" : "light"];
  return (
    <>
      <Label nativeID="asdsa">{label}</Label>
      <HStack
        width={"$full"}
        justifyContent="space-between"
        alignItems="center"
      >
        {isEditing ? (
          <>
            <FormControl flex={1}>{children}</FormControl>
            <Pressable onPress={onSave}>
              <TailwindSymbolView
                className="w-5 aspect-square color-primary"
                name="checkmark.circle"
                type="hierarchical"
                tintColor={theme.primary}
              />
            </Pressable>
          </>
        ) : (
          <>
            <Typo.Lead>{profileValue || `No ${label.toLowerCase()}`}</Typo.Lead>
            <Pressable
              onPress={() =>
                setEditing((prev) => ({ ...prev, [label.toLowerCase()]: true }))
              }
            >
              <TailwindSymbolView
                name="pencil.circle"
                type="hierarchical"
                tintColor={theme.primary}
                className="w-5 aspect-square color-primary"
              />
            </Pressable>
          </>
        )}
      </HStack>
    </>
  );
};

const TailwindSymbolView = cssInterop(SymbolView, {
  className: {
    target: "style",
  },
});
