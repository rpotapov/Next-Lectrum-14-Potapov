"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function getPosts() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
  .from("blog")
  .select();

  if (error) {
    throw new Error(`Failed to fetch blogs: ${error.message}`);
  }

  return { data };
}
