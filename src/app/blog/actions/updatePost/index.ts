"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function updatePost(
  id: string,
  updatedFields: { title?: string; description?: string }
) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("blog")
    .update(updatedFields)
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to update post: ${error.message}`);
  }

  revalidatePath("/blog");

  redirect("/blog");

  return { data };
}