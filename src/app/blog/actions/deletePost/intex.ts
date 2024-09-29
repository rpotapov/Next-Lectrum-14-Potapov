"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function deletePost(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);


  const postId = formData.get("id")?.toString();

  if (!postId) {
    console.warn("Todo ID is missing.");
    return;
  }

  const { error } = await supabase
    .from("blog")
    .delete()
    .eq("id", postId);

  if (error) {
    throw new Error(`Failed to delete post: ${error.message}`);
  }

  revalidatePath("/blog");

  redirect("/blog");
}