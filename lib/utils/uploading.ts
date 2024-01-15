import { supabase } from "@services/supabase";
import * as ImagePicker from "expo-image-picker";
import { decode } from "base64-arraybuffer";

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
