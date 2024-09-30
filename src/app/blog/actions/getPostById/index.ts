"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function getPostById(id: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("blog")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
   console.error(`Failed to fetch blog post: ${error.message}`);
   return null;
  }

  return data;
}