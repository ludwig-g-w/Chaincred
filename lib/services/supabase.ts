import invariant from "tiny-invariant";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@env";
import { createClient } from "@supabase/supabase-js";
import { Database } from "generated/supabase";
import { createResource } from "@utils/index";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export type Location = {
  coords?: string;
  name?: string;
};
