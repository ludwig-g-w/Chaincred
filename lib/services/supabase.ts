import { createClient } from "@supabase/supabase-js";
import { Database } from "generated/supabase";

export const supabase = createClient<Database>(
  process.env.EXPO_PUBLIC_SUPABASE_URL,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
);

export type Location = {
  coords?: string;
  name?: string;
};
