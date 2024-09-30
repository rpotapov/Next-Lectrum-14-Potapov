"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function addPost(formData: { title: string, description: string }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const postData = {
    title: formData.title || "",
    description: formData.description || ""
  };

  const { error } = await supabase.from("blog").insert([postData]);

  if (error) {
    throw new Error(`Failed to insert todo: ${error.message}`);
  }

  revalidatePath("/blog");

  redirect("/blog");
}