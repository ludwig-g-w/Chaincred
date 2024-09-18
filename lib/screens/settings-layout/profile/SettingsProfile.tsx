import MainButton from "@components/MainButton";
import MyToast from "@components/Toast";
import { Divider, useToast } from "@gluestack-ui/themed";
import SuspenseFallback from "@lib/components/SuspenseFallback";
import { Input } from "@lib/components/ui/input";
import { Textarea } from "@lib/components/ui/textarea";
import { NAV_THEME } from "@lib/constants";
import { useColorScheme } from "@lib/useColorScheme";

import { Button } from "@lib/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@lib/components/ui/tooltip";
import * as Typo from "@lib/components/ui/typography";
import { thirdwebClient } from "@lib/services/thirdwebClient";
import { useRefreshOnFocus } from "@lib/utils/hooks";
import { trpc } from "@lib/utils/trpc";
import { Profile } from "@prisma/client";
import { Location } from "@services/supabase";
import {
  fetchImageAndConvertToBase64,
  pickImage,
  uploadImage,
} from "@utils/uploading";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { Suspense, useEffect, useState } from "react";
import { View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useActiveAccount, useSocialProfiles } from "thirdweb/react";
import invariant from "tiny-invariant";
import { EditableField } from "./EditableField";
import ImageUploadArea from "./ImageUploadArea";

export default function SettingsProfile() {
  const user = useActiveAccount();
  const { data: profiles } = useSocialProfiles({
    address: user?.address ?? "",
    client: thirdwebClient,
  });
  const trpcUtils = trpc.useUtils();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset>();
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState<Location>({
    coords: undefined,
    name: undefined,
  });

  const lensProfile = profiles?.find((p) => p.type === "lens");

  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
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

  const copyLensProfile = async () => {
    if (lensProfile) {
      setTitle(lensProfile.name || "");
      setDescription(lensProfile.bio || "");
      // @ts-ignore
      setProfile({
        ...profile,
        title: lensProfile.name ?? "",
        description: lensProfile.bio ?? "",
      });

      if (lensProfile.avatar) {
        try {
          const base64 = await fetchImageAndConvertToBase64(lensProfile.avatar);
          if (base64) {
            setImage({
              uri: lensProfile.avatar,
              base64,
            } as ImagePicker.ImagePickerAsset);
          } else {
            // Fallback to just setting the URI if base64 conversion fails
            setImage({
              uri: lensProfile.avatar,
            } as ImagePicker.ImagePickerAsset);
          }
        } catch (error) {
          console.error("Error setting image:", error);
          // Fallback to just setting the URI if there's an error
          setImage({ uri: lensProfile.avatar } as ImagePicker.ImagePickerAsset);
        }
      }

      toast.show({
        placement: "top",
        render: () => (
          <MyToast
            title="Lens Profile Copied!"
            action="success"
            variant="solid"
          />
        ),
      });
    }
  };

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

      await trpcUtils.profiles.invalidate({
        where: {
          address: user.address,
        },
      });

      toast.show({
        placement: "top",
        duration: 8_000,
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

  const insets = useSafeAreaInsets();
  const contentInsets = {
    left: 12,
    right: 12,
    top: insets.top,
    bottom: insets.bottom,
  };

  return (
    <>
      <KeyboardAwareScrollView className="bg-background flex-1 p-2 ">
        <Suspense fallback={<SuspenseFallback />}>
          <View className=" gap-2 p-4">
            <View className="w-full items-center">
              <ImageUploadArea
                img={image?.uri ?? profile?.image_url ?? ""}
                onPress={handleImageUpload}
              />
            </View>
            <View className="flex-row gap-2">
              {lensProfile && (
                <Tooltip className="flex-grow-0" delayDuration={150}>
                  <TooltipTrigger className="flex-row gap-2">
                    <Image
                      source={{
                        uri: "https://pbs.twimg.com/profile_images/1762570225109590017/FFkzuaBS_400x400.jpg",
                      }}
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        marginBottom: 4,
                      }}
                    />
                    <Typo.P>{lensProfile.name}</Typo.P>
                  </TooltipTrigger>
                  <TooltipContent insets={contentInsets}>
                    <Typo.P
                      className="color-primary text-primary"
                      onPress={copyLensProfile}
                      className="p-0 m-0"
                    >
                      Copy
                    </Typo.P>
                  </TooltipContent>
                </Tooltip>
              )}
            </View>
            <Divider mb={24} />

            <EditableField
              label={"Title"}
              isEditing={isEditing.title}
              onSave={() => handleFieldSave("title")}
              profileValue={profile?.title}
              setEditing={setEditing}
            >
              <Input
                className="border-primary focus:border-2"
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
