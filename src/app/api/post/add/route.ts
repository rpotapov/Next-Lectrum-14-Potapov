import { createClient } from "@/utils/supabase/server";
import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    const { title, description } = await request.json();

    if (!title || !description) {
      return NextResponse.json(
        { message: "Missing required fields: title and description are required." },
        { status: 400 }
      );
    }

    const postData = {
      title,
      description,
    };

    const { error } = await supabase.from("blog").insert([postData]);

    if (error) {
      console.error("Failed to insert post:", error);
      return NextResponse.json(
        { message: error.message || "Failed to add post." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Post added successfully.", status: 'OK' },
      { status: 200 }
    );
  } catch (error) {
    console.error("Add post error:", error);
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred.";

    return NextResponse.json(
      { message },
      { status: 500 }
    );
  }
}