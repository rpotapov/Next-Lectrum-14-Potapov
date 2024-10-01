import { createClient } from "@/utils/supabase/server";
import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "Missing required field: id is required." },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("blog")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Failed to delete post:", error);
      return NextResponse.json(
        { message: error.message || "Failed to delete post." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Post deleted successfully.", status: 'OK' },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete post error:", error);
    const message =
    error instanceof Error ? error.message : "An unexpected error occurred.";

  return NextResponse.json(
    { message },
    { status: 500 }
  );
  }
}