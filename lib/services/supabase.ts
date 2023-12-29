import invariant from "tiny-invariant";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@env";
import { createClient } from "@supabase/supabase-js";
import { Profile } from "@utils/types";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function getProfileByAddress(
  address: string
): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles") // Replace with your table name
    .select("*") // Select all fields, or replace '*' with specific fields
    .eq("address", address) // Replace 'user_id' with the column you're matching against
    .single(); // Use this if you're expecting only one result

  if (error) {
    console.error("Error fetching profile", error);
    return null;
  }

  return data;
}

export async function setOrModifyProfile({
  address,
  title,
  imageUrl,
  description,
  locationCoords,
}: {
  address: string;
  title: string;
  imageUrl: string;
  description: string;
  locationCoords: string;
}) {
  invariant(isValidLocationFormat(locationCoords), "Invalid location format");
  invariant(isValidIPFS(imageUrl), "Invalid IPFS link");
  const { data, error } = await supabase.from("profiles").upsert(
    {
      address,
      title,
      image_url: imageUrl,
      description,
      location_coords: locationCoords,
    },
    {
      onConflict: "address",
    }
  );

  if (error) {
    throw error;
  }

  return data;
}

export const getAllProfiles = createResource(
  supabase.from("profiles").select("*")
);

// Helper function to validate the location format
function isValidLocationFormat(locationCoords: string) {
  return /^-?\d+\.\d+,-?\d+\.\d+$/.test(locationCoords);
}

// Helper function to validate the IPFS URL
function isValidIPFS(imageUrl: string) {
  // For the sake of example, here's a simple regex for checking if the URL starts with 'ipfs://'
  return (
    /^ipfs:\/\/.+/i.test(imageUrl) ||
    imageUrl.startsWith("https://ipfs.io/ipfs/")
  );
}

export function createResource(promise) {
  let status = "pending";
  let result = promise
    .then((data) => {
      status = "success";
      result = data;
    })
    .catch((error) => {
      status = "error";
      result = error;
    });

  return {
    read() {
      if (status === "pending") throw result;
      if (status === "error") throw result;
      if (status === "success") return result;
    },
  };
}
