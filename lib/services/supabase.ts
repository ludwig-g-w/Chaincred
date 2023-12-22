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
