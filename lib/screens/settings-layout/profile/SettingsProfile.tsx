import ImageUploadArea from "@components/ImageUploadArea";
import MainButton from "@components/MainButton";
import MyToast from "@components/Toast";
import { useToast } from "@gluestack-ui/themed";
import SuspenseFallback from "@lib/components/SuspenseFallback";
import { NWSymbolView } from "@lib/components/nativeWindInterop";
import { Input } from "@lib/components/ui/input";
import { Label } from "@lib/components/ui/label";
import { Textarea } from "@lib/components/ui/textarea";
import * as Typo from "@lib/components/ui/typography";
import { NAV_THEME } from "@lib/constants";
import { useColorScheme } from "@lib/useColorScheme";
import { useRefreshOnFocus } from "@lib/utils/hooks";
import { trpc } from "@lib/utils/trpc";
import { Profile } from "@prisma/client";
import { Location } from "@services/supabase";
import { useUser } from "@thirdweb-dev/react-native";
import { pickImage, uploadImage } from "@utils/uploading";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { ReactElement, Suspense, useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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
  const [profile, setProfile] = useState<Profile>();
  const [fetchedProfile, { refetch }] = trpc.profiles.useSuspenseQuery({
    where: {
      address: user?.address ?? "",
    },
  });
  const { isDarkColorScheme } = useColorScheme();
  const theme = NAV_THEME[isDarkColorScheme ? "dark" : "light"];
  useEffect(() => {
    if (!!fetchedProfile?.[0]) {
      setProfile(fetchedProfile[0] as unknown as Profile);
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
        duration: 60_000,
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
        updateObject.location_coords = location.coords ?? null;
      }
      setProfile((prev) => ({ ...prev, ...updateObject }));
      setEditing((prev) => ({ ...prev, [fieldName]: false }));
    } catch (error) {
      console.error(`Error updating ${fieldName}`, error);
    } finally {
      setLoading(false);
    }
  };

  // const insets = useSafeAreaInsets();

  return (
    <>
      <KeyboardAwareScrollView className="bg-background flex-1 p-2 ">
        <Suspense fallback={<SuspenseFallback />}>
          <View className="gap-2 p-4">
            <View className="w-full items-center">
              <ImageUploadArea
                img={image?.uri ?? profile?.image_url ?? ""}
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
                className="border-secondary focus:border-2"
                value={title}
                onChangeText={setTitle}
                placeholder={"Enter your name"}
              />
            </EditableField>

            <EditableField
              label="Description"
              isEditing={isEditing.description}
              onSave={() => handleFieldSave("description")}
              profileValue={profile?.description}
              setEditing={setEditing}
            >
              <Textarea
                className="border-secondary focus:border-2"
                value={description}
                onChangeText={setDescription}
                placeholder={"Describe your yourself"}
              />
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
  onSave: () => void;
  profileValue?: string | null;
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
      <View className="flex-row w-full justify-between items-center min-h-12 gap-4">
        {isEditing ? (
          <>
            <View flex={1}>{children}</View>
            <Pressable onPress={onSave}>
              <NWSymbolView
                className="w-8 aspect-square"
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
                setEditing((prev: any) => ({
                  ...prev,
                  [label.toLowerCase()]: true,
                }))
              }
            >
              <NWSymbolView
                name="pencil.circle"
                type="hierarchical"
                tintColor={theme.secondary}
                className="w-8 aspect-square "
              />
            </Pressable>
          </>
        )}
      </View>
    </>
  );
};
