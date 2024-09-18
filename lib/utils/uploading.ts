import { supabase } from "@services/supabase";
import { decode } from "base64-arraybuffer";
import * as ImagePicker from "expo-image-picker";

import * as FileSystem from "expo-file-system";

const SUPABASE_BUCKET = "profiles";

export async function pickImage() {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
    allowsMultipleSelection: false,
    base64: true,
  });

  if (!result.canceled) {
    return result.assets[0];
  }
}

export async function uploadImage(base64: string, address: string) {
  const safeAddress = address.replace(/[^a-zA-Z0-9]/g, ""); // Remove any special characters

  const fileName = `${safeAddress}/profile-image`;

  const { data, error } = await supabase.storage
    .from(SUPABASE_BUCKET)
    .upload(fileName, decode(base64), {
      upsert: true,
      contentType: "image/jpeg",
    });

  if (error) {
    console.error("Upload error:", error);
    throw error;
  }

  if (data) {
    return supabase.storage.from(SUPABASE_BUCKET).getPublicUrl(fileName).data
      .publicUrl;
  }
}

export const fetchImageAndConvertToBase64 = async (
  imageUrl: string
): Promise<string | null> => {
  try {
    // Download the image to a temporary file
    const fileUri = FileSystem.cacheDirectory + "temp_image.jpg";
    const downloadResult = await FileSystem.downloadAsync(imageUrl, fileUri);

    if (downloadResult.status === 200) {
      // Read the file and convert to base64
      const base64 = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Clean up: remove the temporary file
      await FileSystem.deleteAsync(fileUri);

      return base64;
    } else {
      console.error("Failed to download image");
      return null;
    }
  } catch (error) {
    console.error("Error fetching and converting image to base64:", error);
    return null;
  }
};
