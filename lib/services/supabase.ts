import invariant from "tiny-invariant";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@env";
import { createClient } from "@supabase/supabase-js";
import { Database } from "generated/supabase";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export async function getProfileByAddress(address: string) {
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

export const suspenseGetProfileByAddress = (address: string) =>
  createResource(() => getProfileByAddress(address));

export type Location = {
  coords?: string;
  name?: string;
};

export async function setOrModifyProfile({
  address,
  title,
  imageUrl,
  description,
  location,
}: {
  address: string;
  title?: string;
  imageUrl?: string;
  description?: string;
  location: Location;
}) {
  const updateData: {
    address: string;
    title?: string;
    image_url?: string;
    description?: string;
    location_coords?: string;
    location_name?: string;
  } = { address };

  if (title) updateData.title = title;
  if (imageUrl) updateData.image_url = imageUrl;
  if (description) updateData.description = description;
  if (location?.coords) {
    invariant(
      isValidLocationFormat(location.coords),
      "Invalid location format"
    );
    updateData.location_coords = location.coords;
    updateData.location_name = location.name;
  }

  const { data, error } = await supabase.from("profiles").upsert(updateData, {
    onConflict: "address",
  });

  if (error) {
    throw error;
  }

  return data;
}

async function getAllProfiles() {
  const { data, error } = await supabase.from("profiles").select("*");

  if (error) {
    throw error;
  }

  return data;
}
export const suspenseGetAllProfiles = createResource(() => getAllProfiles());

export async function getProfilesByAddresses(addresses: string[]) {
  // Check if addresses array is empty
  if (!addresses || addresses.length === 0) {
    return [];
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .in("address", addresses); // Replace 'address' with the actual column name

  if (error) {
    throw error;
  }

  return data;
}

export const suspenseGetProfilesByAddresses = (addresses: string[]) =>
  createResource(() => getProfilesByAddresses(addresses));

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

export function createResource<T>(promiseFn: () => Promise<T>) {
  let status: "pending" | "success" | "error" = "pending";
  let result: T | Error;
  let suspender: Promise<void> | null = null;

  const read = () => {
    if (status === "pending") {
      if (suspender === null) {
        suspender = promiseFn().then(
          (data: T) => {
            status = "success";
            result = data;
          },
          (error: Error) => {
            status = "error";
            result = error;
          }
        );
      }
      throw suspender;
    } else if (status === "error") {
      throw result;
    } else if (status === "success") {
      return result as T;
    }
    throw new Error("This should never happen.");
  };

  return { read };
}
